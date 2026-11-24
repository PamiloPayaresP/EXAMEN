import { Trophy, RotateCcw, ArrowRight } from 'lucide-react';

interface Props {
  correct: number;
  total: number;
  score: number;
  mode: 'practica' | 'examen';
  onRetry: () => void;
  onFinish: () => void;
}

function message(pct: number): { title: string; text: string } {
  if (pct >= 90)
    return {
      title: '¡Excelente dominio!',
      text: 'Tienes este tema muy bien manejado. Puedes pasar a la siguiente unidad con confianza.',
    };
  if (pct >= 70)
    return {
      title: '¡Muy bien!',
      text: 'Vas por buen camino. Repasa las explicaciones de las que fallaste y vuelve a intentarlo para consolidar.',
    };
  if (pct >= 50)
    return {
      title: 'Buen intento',
      text: 'Ya dominas lo básico, pero hay conceptos que necesitan otra vuelta. Revisa las explicaciones con calma.',
    };
  return {
    title: 'Sigue practicando',
    text: 'No te desanimes: lee las explicaciones de cada pregunta, vuelve a la guía de la unidad y repite el intento. ¡Paso a paso!',
  };
}

export default function ResultsScreen({ correct, total, score, mode, onRetry, onFinish }: Props) {
  const pct = Math.round((correct / total) * 100);
  const msg = message(pct);

  return (
    <div className="animate-pop mx-auto max-w-lg text-center">
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-100">
          <Trophy className="h-8 w-8 text-amber-600" />
        </div>

        <p className="text-sm font-semibold uppercase tracking-wide text-slate-400">
          {mode === 'examen' ? 'Simulado finalizado' : 'Práctica finalizada'}
        </p>
        <p className="mt-2 text-5xl font-extrabold tracking-tight text-slate-900">
          {score.toFixed(1)}
          <span className="text-2xl text-slate-400"> / 5.0</span>
        </p>
        <p className="mt-2 text-sm text-slate-500">
          Acertaste {correct} de {total} preguntas ({pct}%)
        </p>

        <div className="mt-6 rounded-2xl bg-slate-50 p-4 text-left">
          <p className="font-bold text-slate-800">{msg.title}</p>
          <p className="mt-1 text-sm leading-relaxed text-slate-600">{msg.text}</p>
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <button
            onClick={onRetry}
            className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 transition-colors hover:border-slate-400"
          >
            <RotateCcw className="h-4 w-4" />
            Volver a intentar
          </button>
          <button
            onClick={onFinish}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-slate-700"
          >
            <ArrowRight className="h-4 w-4" />
            Volver a las unidades
          </button>
        </div>
      </div>
    </div>
  );
}
