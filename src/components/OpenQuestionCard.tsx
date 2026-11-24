import { useState } from 'react';
import { Eye, RotateCcw, Lightbulb, Check } from 'lucide-react';
import type { OpenQuestion } from '../data/types';
import { saveOpenAnswer } from '../lib/progress';

interface Props {
  question: OpenQuestion;
  index: number;
  total: number;
}

export default function OpenQuestionCard({ question, index, total }: Props) {
  const [answer, setAnswer] = useState('');
  const [showIdeas, setShowIdeas] = useState(false);
  const [saved, setSaved] = useState(false);

  const wordCount = answer.trim() ? answer.trim().split(/\s+/).length : 0;
  const minWords = 20;

  const handleCompare = () => {
    if (!showIdeas) {
      saveOpenAnswer(question.id, question.unit, answer)
        .then(() => setSaved(true))
        .catch(() => undefined);
    }
    setShowIdeas((v) => !v);
  };

  return (
    <div className="animate-fade-up">
      <div className="mb-4 flex items-center justify-between">
        <span className="inline-flex rounded-full bg-violet-100 px-3 py-1 text-xs font-semibold text-violet-700">
          Pregunta abierta
        </span>
        <span className="text-sm font-medium text-slate-400">
          Pregunta {index + 1} de {total}
        </span>
      </div>

      <h2 className="mb-5 text-xl font-bold leading-snug text-slate-900 sm:text-2xl">
        {question.stem}
      </h2>

      <textarea
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        rows={7}
        placeholder="Escribe tu respuesta con tus propias palabras. Intenta que tenga al menos 20 palabras..."
        className="w-full resize-y rounded-xl border-2 border-slate-200 bg-white p-4 text-sm leading-relaxed text-slate-700 outline-none transition-colors placeholder:text-slate-400 focus:border-slate-800 sm:text-base"
      />
      <div className="mt-2 flex items-center justify-between text-xs text-slate-400">
        <span>{wordCount} palabras</span>
        <span>Mínimo sugerido: {minWords} palabras</span>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <button
          onClick={handleCompare}
          disabled={wordCount < minWords}
          className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <Eye className="h-4 w-4" />
          {showIdeas ? 'Ocultar ideas clave' : 'Comparar con ideas clave'}
        </button>
        <button
          onClick={() => {
            setAnswer('');
            setShowIdeas(false);
            setSaved(false);
          }}
          className="inline-flex items-center gap-2 rounded-xl border-2 border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-600 transition-colors hover:border-slate-400 hover:text-slate-800"
        >
          <RotateCcw className="h-4 w-4" />
          Reescribir
        </button>
        {saved && (
          <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-600">
            <Check className="h-3.5 w-3.5" /> Respuesta guardada
          </span>
        )}
      </div>

      {showIdeas && (
        <div className="mt-5 animate-fade-up rounded-xl border border-amber-200 bg-amber-50 p-4">
          <p className="mb-2 flex items-center gap-2 text-sm font-semibold text-amber-800">
            <Lightbulb className="h-4 w-4" />
            Ideas clave que tu respuesta debería incluir
          </p>
          <ul className="space-y-1.5">
            {question.keyIdeas.map((idea) => (
              <li key={idea} className="flex gap-2 text-sm leading-relaxed text-amber-900">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />
                {idea}
              </li>
            ))}
          </ul>
          <p className="mt-3 text-xs text-amber-700">
            Compara lo que escribiste con estas ideas: si cubriste la mayoría, ¡muy bien! Si faltó
            alguna, usa "Reescribir" e inténtalo de nuevo.
          </p>
        </div>
      )}
    </div>
  );
}
