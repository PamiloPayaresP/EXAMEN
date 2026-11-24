import { CheckCircle2, XCircle } from 'lucide-react';
import type { MCQuestion } from '../data/types';

interface Props {
  question: MCQuestion;
  selected: 'A' | 'B' | 'C' | 'D' | null;
  onSelect: (label: 'A' | 'B' | 'C' | 'D') => void;
  index: number;
  total: number;
}

const letterColors: Record<'A' | 'B' | 'C' | 'D', string> = {
  A: 'bg-emerald-600',
  B: 'bg-sky-600',
  C: 'bg-amber-500',
  D: 'bg-rose-500',
};

export default function QuestionCard({ question, selected, onSelect, index, total }: Props) {
  const answered = selected !== null;

  return (
    <div className="animate-fade-up">
      <div className="mb-4 flex items-center justify-between">
        <span
          className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${
            question.type === 'calculo'
              ? 'bg-sky-100 text-sky-700'
              : 'bg-emerald-100 text-emerald-700'
          }`}
        >
          {question.type === 'calculo' ? 'Ejercicio de cálculo' : 'Pregunta teórica'}
        </span>
        <span className="text-sm font-medium text-slate-400">
          Pregunta {index + 1} de {total}
        </span>
      </div>

      <h2 className="mb-6 text-xl font-bold leading-snug text-slate-900 sm:text-2xl">
        {question.stem}
      </h2>

      <div className="space-y-3">
        {question.options.map((opt) => {
          const isCorrect = opt.label === question.correct;
          const isSelected = opt.label === selected;

          let state =
            'border-slate-200 bg-white hover:border-slate-400 hover:bg-slate-50 cursor-pointer';
          if (answered) {
            if (isCorrect) {
              state = 'border-emerald-500 bg-emerald-50 ring-1 ring-emerald-500';
            } else if (isSelected) {
              state = 'border-rose-400 bg-rose-50 ring-1 ring-rose-400';
            } else {
              state = 'border-slate-200 bg-white opacity-60';
            }
          }

          return (
            <button
              key={opt.label}
              onClick={() => !answered && onSelect(opt.label)}
              disabled={answered}
              className={`flex w-full items-start gap-3 rounded-xl border-2 p-4 text-left transition-all duration-150 ${state}`}
            >
              <span
                className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-sm font-bold text-white ${
                  answered && isCorrect
                    ? 'bg-emerald-600'
                    : answered && isSelected
                      ? 'bg-rose-500'
                      : letterColors[opt.label]
                }`}
              >
                {opt.label}
              </span>
              <span className="flex-1 text-sm leading-relaxed text-slate-700 sm:text-base">
                {opt.text}
              </span>
              {answered && isCorrect && (
                <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-600" />
              )}
              {answered && isSelected && !isCorrect && (
                <XCircle className="h-5 w-5 shrink-0 text-rose-500" />
              )}
            </button>
          );
        })}
      </div>

      {answered && (
        <div className="mt-5 animate-fade-up rounded-xl border-l-4 border-slate-800 bg-slate-100 p-4">
          <p className="text-sm font-semibold text-slate-800">
            {selected === question.correct ? '¡Correcto!' : 'Respuesta correcta: ' + question.correct}
          </p>
          <p className="mt-1 text-sm leading-relaxed text-slate-600">{question.explanation}</p>
        </div>
      )}
    </div>
  );
}
