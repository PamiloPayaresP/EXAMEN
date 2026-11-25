import { useEffect, useMemo, useState } from 'react';
import { X, ArrowLeft, Calculator, ClipboardList, PenLine, ListChecks, ArrowRight } from 'lucide-react';
import HomeScreen from '@/components/HomeScreen';
import QuestionCard from '@/components/QuestionCard';
import OpenQuestionCard from '@/components/OpenQuestionCard';
import ResultsScreen from '@/components/ResultsScreen';
import FormulaSheet from '@/components/FormulaSheet';
import SubjectsApp from '@/components/SubjectsApp';
import { units, type Unit } from '@/data/types';
import { mcQuestions } from '@/data/mcQuestions';
import { openQuestions } from '@/data/openQuestions';
import {
  saveSession,
  loadSessions,
  saveWrongQuestion,
  type SessionRow,
} from '@/lib/progress';

type View = 'home' | 'quiz' | 'open' | 'results';

function EconomicsUnitsApp() {
  const [view, setView] = useState<View>('home');
  const [unit, setUnit] = useState<Unit | null>(null);
  const [showFormulas, setShowFormulas] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [sessions, setSessions] = useState<SessionRow[]>([]);

  const [questions, setQuestions] = useState<typeof mcQuestions>([]);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<('A' | 'B' | 'C' | 'D' | null)[]>([]);
  const [openList, setOpenList] = useState<typeof openQuestions>([]);
  const [openIndex, setOpenIndex] = useState(0);

  useEffect(() => {
    loadSessions().then(setSessions).catch(() => undefined);
  }, [view]);

  const lastSessions = useMemo(() => {
    const byUnit = new Map<number, number>();
    for (const s of sessions) {
      if (s.mode === 'practica' || s.mode === 'examen') {
        if (!byUnit.has(s.unit)) byUnit.set(s.unit, s.score);
      }
    }
    return Array.from(byUnit.entries()).map(([u, score]) => ({ unit: u, score }));
  }, [sessions]);

  function startQuiz(u: Unit) {
    const qs = mcQuestions.filter((q) => q.unit === u.id);
    setUnit(u);
    setQuestions(qs);
    setAnswers(new Array(qs.length).fill(null));
    setCurrent(0);
    setView('quiz');
  }

  function startOpen(u: Unit) {
    const qs = openQuestions.filter((q) => q.unit === u.id);
    setUnit(u);
    setOpenList(qs);
    setOpenIndex(0);
    setView('open');
  }

  function selectAnswer(label: 'A' | 'B' | 'C' | 'D') {
    setAnswers((prev) => {
      const next = [...prev];
      next[current] = label;
      return next;
    });
    const q = questions[current];
    if (label !== q.correct) {
      saveWrongQuestion(q.id).catch(() => undefined);
    }
  }

  function nextQuestion() {
    if (current < questions.length - 1) {
      setCurrent((c) => c + 1);
    } else {
      finishQuiz();
    }
  }

  function finishQuiz() {
    const correct = answers.reduce<number>((acc, a, i) => acc + (a === questions[i].correct ? 1 : 0), 0);
    const total = questions.length;
    const score = (correct / total) * 5;
    if (unit) {
      saveSession({ unit: unit.id, mode: 'practica', totalQuestions: total, correctCount: correct, score }).catch(
        () => undefined
      );
    }
    setView('results');
  }

  function retry() {
    if (unit) startQuiz(unit);
  }

  function goHome() {
    setView('home');
    setUnit(null);
  }

  const correctCount = answers.reduce<number>(
    (acc, a, i) => acc + (a === questions[i]?.correct ? 1 : 0),
    0
  );

  return (
    <div className="min-h-screen bg-slate-50">
      <Header onHome={goHome} />

      <main className="mx-auto max-w-3xl px-4 pb-24 pt-6 sm:px-6">
        {view === 'home' && (
          <HomeScreen
            onSelectUnit={startQuiz}
            onOpenFormulas={() => setShowFormulas(true)}
            onOpenHistory={() => setShowHistory(true)}
            lastSessions={lastSessions}
          />
        )}

        {view === 'quiz' && unit && questions[current] && (
          <QuizLayout
            unit={unit}
            current={current}
            total={questions.length}
            onBack={goHome}
          >
            <QuestionCard
              question={questions[current]}
              selected={answers[current]}
              onSelect={selectAnswer}
              index={current}
              total={questions.length}
            />
            {answers[current] !== null && (
              <div className="mt-6 flex justify-end">
                <button
                  onClick={nextQuestion}
                  className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-slate-700"
                >
                  {current < questions.length - 1 ? 'Siguiente' : 'Ver resultados'}
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            )}
            <FormulaSheet question={questions[current]} />
          </QuizLayout>
        )}

        {view === 'open' && unit && openList[openIndex] && (
          <QuizLayout
            unit={unit}
            current={openIndex}
            total={openList.length}
            onBack={goHome}
            openMode
          >
            <OpenQuestionCard
              question={openList[openIndex]}
              index={openIndex}
              total={openList.length}
            />
            {openIndex < openList.length - 1 && (
              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setOpenIndex((i) => i + 1)}
                  className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-slate-700"
                >
                  Siguiente pregunta
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            )}
          </QuizLayout>
        )}

        {view === 'results' && unit && (
          <ResultsScreen
            correct={correctCount}
            total={questions.length}
            score={(correctCount / questions.length) * 5}
            mode="practica"
            onRetry={retry}
            onFinish={goHome}
          />
        )}

        {view === 'results' && unit && (
          <div className="mx-auto mt-6 max-w-lg">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center">
              <p className="mb-3 text-sm font-semibold text-slate-500">
                ¿Quieres practicar las preguntas abiertas de esta unidad?
              </p>
              <button
                onClick={() => startOpen(unit)}
                className="inline-flex items-center gap-2 rounded-xl border-2 border-violet-200 bg-violet-50 px-5 py-2.5 text-sm font-bold text-violet-700 transition-colors hover:bg-violet-100"
              >
                <PenLine className="h-4 w-4" />
                Practicar preguntas abiertas
              </button>
            </div>
          </div>
        )}
      </main>

      {showFormulas && <FormulaModal onClose={() => setShowFormulas(false)} />}
      {showHistory && (
        <HistoryModal sessions={sessions} onClose={() => setShowHistory(false)} />
      )}
    </div>
  );
}

function Header({ onHome }: { onHome: () => void }) {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-3 sm:px-6">
        <button onClick={onHome} className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-900 text-amber-300">
            <Calculator className="h-5 w-5" />
          </span>
          <span className="text-sm font-extrabold tracking-tight text-slate-900">
            Ingeniería Económica
          </span>
        </button>
      </div>
    </header>
  );
}

function QuizLayout({
  unit,
  current,
  total,
  onBack,
  openMode,
  children,
}: {
  unit: Unit;
  current: number;
  total: number;
  onBack: () => void;
  openMode?: boolean;
  children: React.ReactNode;
}) {
  const pct = ((current + 1) / total) * 100;
  return (
    <div>
      <div className="mb-5 flex items-center justify-between">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-500 transition-colors hover:text-slate-800"
        >
          <ArrowLeft className="h-4 w-4" />
          Unidades
        </button>
        <span className="rounded-lg bg-slate-900 px-3 py-1 text-xs font-bold text-white">
          {unit.short}
        </span>
      </div>
      <div className="mb-6 h-2 w-full overflow-hidden rounded-full bg-slate-200">
        <div
          className={`h-full rounded-full transition-all duration-300 ${openMode ? 'bg-violet-500' : 'bg-slate-900'}`}
          style={{ width: `${pct}%` }}
        />
      </div>
      {children}
    </div>
  );
}

function FormulaModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-slate-900/50 p-0 sm:items-center sm:p-4">
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-t-3xl bg-white p-6 shadow-xl sm:rounded-3xl sm:p-8">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="flex items-center gap-2 text-lg font-extrabold text-slate-900">
            <Calculator className="h-5 w-5 text-slate-700" />
            Formulario
          </h2>
          <button
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="space-y-5 text-sm text-slate-700">
          <Section title="Interés">
            <Formula f="I = P · i · n" label="Interés simple" />
            <Formula f="F = P(1 + i)ⁿ" label="Interés compuesto (valor futuro)" />
            <Formula f="P = F / (1 + i)ⁿ" label="Valor presente desde valor futuro" />
          </Section>
          <Section title="Tasas">
            <Formula f="i_periodica = j / m" label="Tasa periódica desde nominal" />
            <Formula f="TEA = (1 + j/m)ᵐ − 1" label="Tasa efectiva anual" />
          </Section>
          <Section title="Series uniformes (anualidades)">
            <Formula f="(P/A, i, n) = [(1+i)ⁿ − 1] / [i(1+i)ⁿ]" label="Valor presente de una serie" />
            <Formula f="(A/P, i, n) = [i(1+i)ⁿ] / [(1+i)ⁿ − 1]" label="Recuperación de capital" />
            <Formula f="(F/A, i, n) = [(1+i)ⁿ − 1] / i" label="Valor futuro de una serie" />
            <Formula f="(A/F, i, n) = i / [(1+i)ⁿ − 1]" label="Fondo de amortización" />
          </Section>
          <Section title="Gradiente aritmético">
            <Formula f="(P/G, i, n) = [(1+i)ⁿ − 1 − i·n] / [i²(1+i)ⁿ]" label="Valor presente del gradiente" />
          </Section>
          <Section title="Criterios de decisión">
            <Formula f="VPN = Σ Fₜ / (1+i)ᵗ − P" label="Valor presente neto" />
            <Formula f="TIR: VPN = 0" label="Tasa interna de retorno" />
            <Formula f="IR = VP(flujos) / inversión" label="Índice de rentabilidad" />
          </Section>
        </div>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="mb-2 text-xs font-bold uppercase tracking-wide text-slate-400">{title}</p>
      <div className="space-y-2">{children}</div>
    </div>
  );
}

function Formula({ f, label }: { f: string; label: string }) {
  return (
    <div className="flex flex-col gap-1 rounded-xl border border-slate-200 bg-slate-50 p-3 sm:flex-row sm:items-center sm:gap-3">
      <span className="formula">{f}</span>
      <span className="text-xs text-slate-500">{label}</span>
    </div>
  );
}

function HistoryModal({ sessions, onClose }: { sessions: SessionRow[]; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-slate-900/50 p-0 sm:items-center sm:p-4">
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-t-3xl bg-white p-6 shadow-xl sm:rounded-3xl sm:p-8">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="flex items-center gap-2 text-lg font-extrabold text-slate-900">
            <ClipboardList className="h-5 w-5 text-slate-700" />
            Mi historial
          </h2>
          <button
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        {sessions.length === 0 ? (
          <div className="py-10 text-center">
            <ListChecks className="mx-auto mb-3 h-10 w-10 text-slate-300" />
            <p className="text-sm text-slate-500">
              Aún no has completado ninguna sesión. ¡Empieza a practicar!
            </p>
          </div>
        ) : (
          <ul className="space-y-2">
            {sessions.map((s, i) => {
              const u = units.find((x) => x.id === s.unit);
              return (
                <li
                  key={i}
                  className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-4"
                >
                  <div>
                    <p className="text-sm font-bold text-slate-800">
                      Unidad {s.unit}: {u?.short ?? '—'}
                    </p>
                    <p className="text-xs text-slate-400">
                      {s.mode} · {s.correctCount}/{s.totalQuestions} correctas ·{' '}
                      {new Date(s.created_at).toLocaleDateString('es-CO', {
                        day: 'numeric',
                        month: 'short',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                  <span className="text-lg font-extrabold text-slate-900">
                    {Number(s.score).toFixed(1)}
                    <span className="text-xs text-slate-400">/5</span>
                  </span>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}

export default function App() {
  const showEconomicsUnits = new URLSearchParams(window.location.search).get('vista') === 'unidades';

  if (showEconomicsUnits) {
    return <EconomicsUnitsApp />;
  }

  return (
    <SubjectsApp
      onOpenEconomicsUnits={() => {
        window.location.href = '/?vista=unidades';
      }}
    />
  );
}
