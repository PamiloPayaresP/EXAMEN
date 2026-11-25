import { useEffect, useMemo, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  BookOpenText,
  Calculator,
  CheckCircle2,
  Clock3,
  GraduationCap,
  RotateCcw,
  Trophy,
} from 'lucide-react';
import { subjects, type Formula, type Subject } from '../data/subjects';

interface Props {
  onOpenEconomicsUnits: () => void;
}

interface StudyQuestion {
  id: string;
  text: string;
  choices: string[];
  correct: string;
  equation: Formula | null;
  kind: string;
  codeSnippet?: string;
  explanation?: string;
}

interface EquationToken {
  id: number;
  label: string;
}

type View = 'dashboard' | 'subject' | 'quiz' | 'results';

const subjectIcons = ['AE', 'ARQ', 'SEG', 'SIG', 'IE', 'PD', 'ROB'];
const questionForms = [
  (topic: Subject['topics'][number]) => `¿Qué opción define correctamente «${topic[0]}»?`,
  (topic: Subject['topics'][number]) =>
    `Situación: ${topic[2]} ¿Cuál concepto describe mejor el caso?`,
  (topic: Subject['topics'][number]) =>
    `Si el objetivo es ${topic[3]}, ¿qué enfoque se debe aplicar?`,
  (topic: Subject['topics'][number]) =>
    `¿Cuál afirmación expresa correctamente «${topic[0]}»?`,
];

function shuffle<T>(items: T[]): T[] {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

function getQuestionCount(subject: Subject): number {
  return subject.questions?.length ?? subject.topics.length * questionForms.length;
}

function makeQuestionBank(subject: Subject, subjectIndex: number): StudyQuestion[] {
  if (subject.questions) {
    return subject.questions.map((question, index) => ({
      id: `${subjectIndex}-${question.unit}-${index}`,
      text: question.stem,
      choices: shuffle(question.choices),
      correct: question.correct,
      equation: null,
      kind: `Unidad ${question.unit} · Robótica`,
      explanation: question.explanation,
    }));
  }

  return subject.topics.flatMap((topic, topicIndex) =>
    questionForms.map((makePrompt, formIndex) => {
      const calculation = subject.calculations?.[topicIndex];
      const codeQuestion = formIndex === 3 ? subject.codeQuestions?.[topicIndex] : undefined;
      const isCalculation = formIndex === 3 && Boolean(calculation);
      const formula = subject.formulas?.[topicIndex];

      if (isCalculation && !formula) {
        throw new Error(`Falta la fórmula del ejercicio ${topicIndex + 1} de ${subject.name}.`);
      }

      const choices = codeQuestion
        ? codeQuestion.choices
        : isCalculation && calculation
          ? calculation.slice(1)
          : [
              topic[1],
              ...Array.from({ length: 3 }, (_, offset) => {
                const distractorIndex =
                  (topicIndex + (offset + 1) * 3 + subjectIndex) % subject.topics.length;
                return subject.topics[distractorIndex][1];
              }),
            ];

      return {
        id: `${subjectIndex}-${topicIndex}-${formIndex}`,
        text: codeQuestion
          ? codeQuestion.prompt
          : isCalculation && calculation
            ? calculation[0]
            : makePrompt(topic),
        choices: shuffle(choices),
        correct: codeQuestion
          ? codeQuestion.correct
          : isCalculation && calculation
            ? calculation[1]
            : topic[1],
        equation: isCalculation && formula ? formula : null,
        codeSnippet: codeQuestion?.snippet,
        explanation: codeQuestion?.explanation,
        kind: codeQuestion
          ? 'Lectura de código · Workly'
          : isCalculation
            ? 'Taller de ecuaciones'
            : formIndex === 3
              ? 'Comprensión'
              : 'Concepto y aplicación',
      };
    })
  );
}

function numericCandidates(value: string): number[] {
  const text = value.trim().replace(/[^\d,.-]/g, '');
  if (!text || !/\d/.test(text)) return [];

  const candidates = new Set<number>();
  const add = (input: string) => {
    const parsed = Number(input);
    if (Number.isFinite(parsed)) candidates.add(parsed);
  };

  add(text);
  if (text.includes(',')) {
    add(text.replace(/\./g, '').replace(',', '.'));
    add(text.replace(/,/g, ''));
  }
  if (text.includes('.')) add(text.replace(/\./g, ''));
  return [...candidates];
}

function formatClock(seconds: number): string {
  return `${String(Math.floor(seconds / 60)).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`;
}

export default function SubjectsApp({ onOpenEconomicsUnits }: Props) {
  const [view, setView] = useState<View>('dashboard');
  const [subject, setSubject] = useState<Subject | null>(null);
  const [questionCount, setQuestionCount] = useState(10);
  const [durationMinutes, setDurationMinutes] = useState(15);
  const [quizQuestions, setQuizQuestions] = useState<StudyQuestion[]>([]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [attemptedCount, setAttemptedCount] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [feedback, setFeedback] = useState('');
  const [timeExpired, setTimeExpired] = useState(false);
  const [deadlineAt, setDeadlineAt] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [equationPalette, setEquationPalette] = useState<EquationToken[]>([]);
  const [equationSelection, setEquationSelection] = useState<number[]>([]);
  const [numericAnswer, setNumericAnswer] = useState('');

  const subjectIndex = subject ? subjects.indexOf(subject) : -1;
  const questionBank = useMemo(
    () => subject ? makeQuestionBank(subject, subjectIndex) : [],
    [subject, subjectIndex]
  );
  const question = quizQuestions[questionIndex];

  useEffect(() => {
    if (view !== 'quiz' || !deadlineAt) return undefined;

    const updateCountdown = () => {
      const remaining = Math.max(0, Math.ceil((deadlineAt - Date.now()) / 1000));
      setTimeRemaining(remaining);
      if (remaining === 0) {
        setTimeExpired(true);
        setView('results');
      }
    };

    updateCountdown();
    const timer = window.setInterval(updateCountdown, 250);
    return () => window.clearInterval(timer);
  }, [view, deadlineAt]);

  useEffect(() => {
    if (view !== 'quiz' || !question?.equation || answered) return;

    const tokens = question.equation.tokens;
    const decoyPool = ['A', 'F', 'P', 'i', 'n', '+', '−', '×', '÷', 'CF', 't'];
    const decoy = decoyPool.find((token) => !tokens.includes(token));
    const palette = tokens.map((label, id) => ({ id, label }));
    if (decoy) palette.push({ id: tokens.length, label: decoy });

    setEquationPalette(shuffle(palette));
    setEquationSelection([]);
    setNumericAnswer('');
    setFeedback('');
  }, [view, question, answered]);

  function chooseSubject(selected: Subject) {
    setSubject(selected);
    setQuestionCount((count) => Math.min(count, getQuestionCount(selected)));
    setView('subject');
  }

  function startQuiz() {
    if (!subject || questionBank.length === 0) return;
    const selectedQuestions = shuffle(questionBank).slice(0, questionCount);
    const deadline = Date.now() + durationMinutes * 60 * 1000;

    setQuizQuestions(selectedQuestions);
    setQuestionIndex(0);
    setCorrectCount(0);
    setAttemptedCount(0);
    setAnswered(false);
    setSelectedAnswer(null);
    setFeedback('');
    setEquationPalette([]);
    setEquationSelection([]);
    setNumericAnswer('');
    setTimeExpired(false);
    setTimeRemaining(durationMinutes * 60);
    setDeadlineAt(deadline);
    setView('quiz');
  }

  function answerChoice(choice: string) {
    if (!question || answered) return;
    const isCorrect = choice === question.correct;
    setSelectedAnswer(choice);
    setAnswered(true);
    setAttemptedCount((count) => count + 1);
    if (isCorrect) setCorrectCount((count) => count + 1);
    setFeedback(isCorrect ? '¡Correcto!' : `Respuesta correcta: ${question.correct}`);
  }

  function checkEquation() {
    if (!question?.equation || answered) return;
    if (equationSelection.length === 0 || !numericAnswer.trim()) {
      setFeedback('Completa la ecuación y escribe el resultado antes de comprobar.');
      return;
    }

    const selectedFormula = equationSelection.map(
      (id) => equationPalette.find((token) => token.id === id)?.label ?? ''
    );
    const formulaCorrect =
      selectedFormula.length === question.equation.tokens.length &&
      selectedFormula.every((token, index) => token === question.equation?.tokens[index]);
    const expectedValues = numericCandidates(question.correct);
    const enteredValues = numericCandidates(numericAnswer);
    const valueCorrect = expectedValues.some((expected) =>
      enteredValues.some(
        (actual) => Math.abs(actual - expected) <= Math.max(0.01, Math.abs(expected) * 0.0002)
      )
    );
    const isCorrect = formulaCorrect && valueCorrect;

    setAnswered(true);
    setSelectedAnswer(null);
    setAttemptedCount((count) => count + 1);
    if (isCorrect) setCorrectCount((count) => count + 1);
    setFeedback(
      isCorrect
        ? '¡Ecuación y resultado correctos!'
        : `Revisa la fórmula y el cálculo. Solución: ${question.equation.display} = ${question.correct}`
    );
  }

  function nextQuestion() {
    if (questionIndex + 1 >= quizQuestions.length) {
      setTimeExpired(false);
      setView('results');
      return;
    }
    setQuestionIndex((index) => index + 1);
    setAnswered(false);
    setSelectedAnswer(null);
    setFeedback('');
    setEquationSelection([]);
    setNumericAnswer('');
  }

  function backToSubjects() {
    setDeadlineAt(0);
    setView('dashboard');
    setSubject(null);
  }

  function retryQuiz() {
    startQuiz();
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <header className="overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-blue-800 text-white">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="mb-7 flex items-center gap-3 text-sm font-bold tracking-wide text-blue-100">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/20 bg-white/10">
              <GraduationCap className="h-5 w-5" />
            </span>
            CENTRO DE PRÁCTICA ACADÉMICA
          </div>
          <h1 className="max-w-3xl text-3xl font-extrabold tracking-tight sm:text-5xl">
            Evaluaciones por materia
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-blue-100 sm:text-base">
            Practica conceptos, resuelve ejercicios y construye ecuaciones paso a paso. Tu progreso
            se revisa al instante.
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        {view === 'dashboard' && (
          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-9">
            <div className="max-w-2xl">
              <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-blue-700">
                Panel de materias
              </p>
              <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
                Selecciona una materia
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-500">
                Los bancos tienen distintas cantidades de preguntas según la materia. Elige la
                cantidad y el tiempo para iniciar una evaluación interactiva.
              </p>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {subjects.map((item, index) => {
                const calculationCount = Object.keys(item.calculations ?? {}).length;
                const codeQuestionCount = Object.keys(item.codeQuestions ?? {}).length;
                const availableQuestionCount = getQuestionCount(item);
                return (
                  <button
                    key={item.name}
                    onClick={() => chooseSubject(item)}
                    className="group min-h-44 rounded-2xl border border-slate-200 bg-white p-5 text-left transition hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-lg"
                  >
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-xs font-extrabold text-slate-700 transition group-hover:bg-blue-700 group-hover:text-white">
                      {subjectIcons[index]}
                    </span>
                    <span className="mt-4 block text-base font-extrabold text-slate-900">
                      {item.name}
                    </span>
                    <span className="mt-1 block text-xs font-bold text-blue-700">
                      {availableQuestionCount} preguntas
                      {calculationCount
                        ? ` · ${calculationCount} ejercicios con ecuación`
                        : codeQuestionCount
                          ? ` · ${codeQuestionCount} preguntas con código`
                          : item.questions
                            ? ' · preguntas de 4 unidades'
                            : ' · evaluación conceptual'}
                    </span>
                    <span className="mt-2 block text-sm leading-relaxed text-slate-500">
                      {item.description}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="mt-6 flex flex-wrap gap-3 text-xs font-bold text-slate-600">
              <span className="rounded-full bg-slate-100 px-3 py-2">{subjects.length} materias</span>
              <span className="rounded-full bg-slate-100 px-3 py-2">
                {subjects.reduce((total, item) => total + getQuestionCount(item), 0)} preguntas disponibles
              </span>
              <span className="rounded-full bg-slate-100 px-3 py-2">Taller de fórmulas</span>
            </div>
          </section>
        )}

        {view === 'subject' && subject && (
          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-9">
            <button
              onClick={backToSubjects}
              className="mb-6 inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-slate-900"
            >
              <ArrowLeft className="h-4 w-4" />
              Todas las materias
            </button>

            <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-blue-700">
              {questionBank.length} preguntas disponibles
            </p>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900">
              {subject.name}
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-500">
              {subject.description}
            </p>
            {subject.codeQuestions && (
              <p className="mt-2 max-w-2xl text-xs leading-relaxed text-slate-400">
                Los fragmentos son ejemplos didácticos en TypeScript para entender estos patrones;
                no representan una API específica del producto.
              </p>
            )}

            {subject.formulas && (
              <div className="mt-7">
                <h3 className="mb-3 flex items-center gap-2 text-sm font-extrabold text-slate-800">
                  <Calculator className="h-4 w-4" />
                  Hoja de fórmulas
                </h3>
                <div className="grid gap-3 sm:grid-cols-2">
                  {Object.values(subject.formulas).map((formula) => (
                    <div
                      key={formula.name}
                      className="rounded-xl border border-blue-100 bg-blue-50/60 p-4"
                    >
                      <p className="text-xs font-bold text-slate-500">{formula.name}</p>
                      <p className="mt-1 font-mono text-sm font-bold text-blue-900">
                        {formula.display}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-8 grid gap-4 rounded-2xl bg-slate-50 p-5 sm:grid-cols-3 sm:items-end">
              <label className="block text-sm font-bold text-slate-700">
                Preguntas
                <select
                  value={questionCount}
                  onChange={(event) => setQuestionCount(Number(event.target.value))}
                  className="mt-2 block w-full rounded-xl border border-slate-300 bg-white px-3 py-3 text-sm font-semibold"
                >
                  {[10, 20, 40, 80].filter((count) => count <= questionBank.length).map((count) => (
                    <option key={count} value={count}>
                      {count} preguntas
                    </option>
                  ))}
                </select>
              </label>
              <label className="block text-sm font-bold text-slate-700">
                Tiempo
                <select
                  value={durationMinutes}
                  onChange={(event) => setDurationMinutes(Number(event.target.value))}
                  className="mt-2 block w-full rounded-xl border border-slate-300 bg-white px-3 py-3 text-sm font-semibold"
                >
                  {[5, 10, 15, 20, 30, 45, 60].map((minutes) => (
                    <option key={minutes} value={minutes}>
                      {minutes} minutos
                    </option>
                  ))}
                </select>
              </label>
              <button
                onClick={startQuiz}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-blue-700 px-5 py-3 text-sm font-extrabold text-white transition hover:bg-blue-800"
              >
                Iniciar evaluación <ArrowRight className="h-4 w-4" />
              </button>
            </div>

            {subject.name === 'Ingeniería Económica' && (
              <button
                onClick={onOpenEconomicsUnits}
                className="mt-5 inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-3 text-sm font-bold text-slate-700 hover:bg-slate-50"
              >
                <BookOpenText className="h-4 w-4" />
                Abrir también el estudio por unidades
              </button>
            )}
          </section>
        )}

        {view === 'quiz' && subject && question && (
          <section className="mx-auto max-w-3xl rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-9">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <button
                onClick={() => setView('subject')}
                className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-slate-900"
              >
                <ArrowLeft className="h-4 w-4" />
                Salir de la evaluación
              </button>
              <span
                className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-extrabold ${
                  timeRemaining <= 60
                    ? 'bg-rose-100 text-rose-700'
                    : 'bg-slate-100 text-slate-700'
                }`}
              >
                <Clock3 className="h-4 w-4" />
                {formatClock(timeRemaining)}
              </span>
            </div>

            <div className="mt-6 flex items-center justify-between text-xs font-bold text-slate-500">
              <span>{subject.name}</span>
              <span>
                Pregunta {questionIndex + 1} de {quizQuestions.length}
              </span>
            </div>
            <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full rounded-full bg-blue-700 transition-all"
                style={{ width: `${((questionIndex + (answered ? 1 : 0)) / quizQuestions.length) * 100}%` }}
              />
            </div>

            <div className="mt-7">
              <span className="rounded-full bg-blue-50 px-3 py-1.5 text-xs font-bold text-blue-700">
                {question.kind}
              </span>
              <h2 className="mt-5 text-xl font-extrabold leading-snug text-slate-900 sm:text-2xl">
                {question.text}
              </h2>
            </div>

            {question.codeSnippet && (
              <pre className="mt-5 overflow-x-auto rounded-2xl bg-slate-950 p-5 text-sm leading-relaxed text-emerald-100">
                <code>{question.codeSnippet}</code>
              </pre>
            )}

            {question.equation ? (
              <div className="mt-6 rounded-2xl border border-blue-100 bg-blue-50/50 p-5">
                <p className="text-xs font-bold text-slate-500">
                  Arma la fórmula y escribe el resultado
                </p>
                <div
                  aria-live="polite"
                  className="mt-3 flex min-h-14 flex-wrap items-center gap-2 rounded-xl border border-dashed border-blue-200 bg-white p-3"
                >
                  {equationSelection.length === 0 ? (
                    <span className="text-sm text-slate-400">Tu ecuación aparecerá aquí…</span>
                  ) : (
                    equationSelection.map((id) => {
                      const token = equationPalette.find((item) => item.id === id);
                      return (
                        <span
                          key={id}
                          className="rounded-lg bg-slate-900 px-2.5 py-1.5 font-mono text-sm font-bold text-white"
                        >
                          {token?.label}
                        </span>
                      );
                    })
                  )}
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {equationPalette.map((token) => (
                    <button
                      key={token.id}
                      disabled={answered || equationSelection.includes(token.id)}
                      onClick={() => setEquationSelection((current) => [...current, token.id])}
                      aria-label={`Añadir ${token.label}`}
                      className="rounded-lg border border-slate-200 bg-white px-3 py-2 font-mono text-sm font-bold text-slate-800 hover:border-blue-400 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      {token.label}
                    </button>
                  ))}
                </div>
                <div className="mt-4 flex flex-wrap items-end gap-3">
                  <label className="min-w-40 flex-1 text-xs font-bold text-slate-600">
                    Resultado
                    <input
                      value={numericAnswer}
                      onChange={(event) => setNumericAnswer(event.target.value)}
                      onKeyDown={(event) => {
                        if (event.key === 'Enter') checkEquation();
                      }}
                      disabled={answered}
                      className="mt-1.5 block w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm font-semibold"
                      inputMode="decimal"
                    />
                  </label>
                  <button
                    onClick={() => setEquationSelection((current) => current.slice(0, -1))}
                    disabled={answered || equationSelection.length === 0}
                    className="rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm font-bold disabled:opacity-40"
                  >
                    Deshacer
                  </button>
                  <button
                    onClick={() => {
                      setEquationSelection([]);
                      setNumericAnswer('');
                      setFeedback('');
                    }}
                    disabled={answered}
                    className="rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm font-bold disabled:opacity-40"
                  >
                    Limpiar
                  </button>
                  <button
                    onClick={checkEquation}
                    disabled={answered}
                    className="rounded-xl bg-blue-700 px-4 py-2.5 text-sm font-bold text-white hover:bg-blue-800 disabled:opacity-40"
                  >
                    Comprobar
                  </button>
                </div>
              </div>
            ) : (
              <div className="mt-6 space-y-3">
                {question.choices.map((choice, index) => {
                  const isCorrect = answered && choice === question.correct;
                  const isSelected = selectedAnswer === choice;
                  return (
                    <button
                      key={`${question.id}-${choice}`}
                      onClick={() => answerChoice(choice)}
                      disabled={answered}
                      className={`flex w-full items-start gap-3 rounded-xl border-2 p-4 text-left text-sm leading-relaxed transition ${
                        isCorrect
                          ? 'border-emerald-500 bg-emerald-50'
                          : answered && isSelected
                            ? 'border-rose-400 bg-rose-50'
                            : 'border-slate-200 bg-white hover:border-blue-300'
                      }`}
                    >
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-xs font-extrabold text-slate-700">
                        {String.fromCharCode(65 + index)}
                      </span>
                      <span className="flex-1">{choice}</span>
                      {isCorrect && <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-600" />}
                    </button>
                  );
                })}
              </div>
            )}

            {feedback && (
              <div>
                <p
                  role="status"
                  className={`mt-4 rounded-xl p-4 text-sm font-semibold ${
                    answered && (selectedAnswer === question.correct || feedback.startsWith('¡'))
                      ? 'bg-emerald-50 text-emerald-800'
                      : 'bg-amber-50 text-amber-800'
                  }`}
                >
                  {feedback}
                </p>
                {answered && question.explanation && (
                  <p className="mt-2 rounded-xl bg-slate-50 p-4 text-sm leading-relaxed text-slate-600">
                    {question.explanation}
                  </p>
                )}
              </div>
            )}

            {answered && (
              <div className="mt-6 flex justify-end">
                <button
                  onClick={nextQuestion}
                  className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-bold text-white hover:bg-slate-700"
                >
                  {questionIndex + 1 === quizQuestions.length ? 'Ver resultado' : 'Siguiente pregunta'}
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            )}
          </section>
        )}

        {view === 'results' && subject && (
          <section className="mx-auto max-w-xl rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm sm:p-10">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-100">
              <Trophy className="h-8 w-8 text-amber-700" />
            </div>
            <p className="mt-5 text-xs font-extrabold uppercase tracking-[0.15em] text-slate-400">
              Evaluación terminada
            </p>
            <h2 className="mt-2 text-3xl font-extrabold text-slate-900">
              {Math.round((correctCount / quizQuestions.length) * 100)}%
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              {correctCount} de {quizQuestions.length} respuestas correctas
            </p>
            <p className="mt-5 rounded-xl bg-slate-50 p-4 text-sm leading-relaxed text-slate-600">
              {timeExpired
                ? `Se agotó el tiempo. Respondiste ${attemptedCount} de ${quizQuestions.length} preguntas.`
                : correctCount / quizQuestions.length >= 0.8
                  ? '¡Buen trabajo! Puedes practicar otra materia o repetir la evaluación.'
                  : 'Repasa las respuestas y vuelve a intentarlo para afianzar los conceptos.'}
            </p>
            <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
              <button
                onClick={retryQuiz}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 px-4 py-3 text-sm font-bold text-slate-700 hover:bg-slate-50"
              >
                <RotateCcw className="h-4 w-4" />
                Intentar de nuevo
              </button>
              <button
                onClick={backToSubjects}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-3 text-sm font-bold text-white hover:bg-slate-700"
              >
                <BookOpenText className="h-4 w-4" />
                Volver a materias
              </button>
            </div>
          </section>
        )}
      </main>
      <footer className="mx-auto max-w-6xl px-4 pb-8 text-xs leading-relaxed text-slate-400 sm:px-6 lg:px-8">
        Preguntas de práctica de {subjects.length} materias. Ingeniería Económica incluye fórmulas
        y ejercicios de cálculo.
      </footer>
    </div>
  );
}
