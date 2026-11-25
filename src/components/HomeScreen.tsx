import { BookOpenText, Calculator, ListChecks, ArrowRight, ClipboardList, PenLine } from 'lucide-react';
import { units, type Unit } from '../data/types';
import { mcQuestions } from '../data/mcQuestions';
import { openQuestions } from '../data/openQuestions';

interface Props {
  onSelectUnit: (unit: Unit) => void;
  onOpenFormulas: () => void;
  onOpenHistory: () => void;
  lastSessions: { unit: number; score: number }[];
}

export default function HomeScreen({ onSelectUnit, onOpenFormulas, onOpenHistory, lastSessions }: Props) {
  const totalMC = mcQuestions.length;
  const totalOpen = openQuestions.length;

  return (
    <div className="animate-fade-up">
      <section className="rounded-3xl bg-slate-900 p-8 text-white sm:p-12">
        <p className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-amber-300">
          <BookOpenText className="h-4 w-4" />
          Ingeniería Económica
        </p>
        <h1 className="max-w-2xl text-3xl font-extrabold leading-tight tracking-tight sm:text-5xl">
          Estudia paso a paso y pon a prueba lo que sabes
        </h1>
        <p className="mt-4 max-w-xl text-sm leading-relaxed text-slate-300 sm:text-base">
          Practica con {totalMC} preguntas cerradas y de cálculo, y {totalOpen} preguntas abiertas
          con ideas clave para autoevaluarte. Cada respuesta viene con explicación.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <button
            onClick={() => document.getElementById('unidades')?.scrollIntoView({ behavior: 'smooth' })}
            className="inline-flex items-center gap-2 rounded-xl bg-amber-400 px-5 py-3 text-sm font-bold text-slate-900 transition-colors hover:bg-amber-300"
          >
            Empezar a practicar
            <ArrowRight className="h-4 w-4" />
          </button>
          <button
            onClick={onOpenFormulas}
            className="inline-flex items-center gap-2 rounded-xl border border-white/25 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
          >
            <Calculator className="h-4 w-4" />
            Formulario
          </button>
          <a
            href="/"
            className="inline-flex items-center gap-2 rounded-xl border border-white/25 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
          >
            <BookOpenText className="h-4 w-4" />
            Ver todas las materias
          </a>
          <button
            onClick={onOpenHistory}
            className="inline-flex items-center gap-2 rounded-xl border border-white/25 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
          >
            <ClipboardList className="h-4 w-4" />
            Mi historial
          </button>
        </div>
      </section>

      <section id="unidades" className="mt-10">
        <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">Elige una unidad para practicar</h2>
        <p className="mt-1 text-sm text-slate-500">
          Cada unidad tiene preguntas teóricas, ejercicios de cálculo y preguntas abiertas.
        </p>

        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          {units.map((unit) => (
            <UnitCard
              key={unit.id}
              unit={unit}
              onSelect={() => onSelectUnit(unit)}
              lastScore={lastSessions.find((s) => s.unit === unit.id)?.score}
            />
          ))}
        </div>
      </section>

      <section className="mt-10 grid gap-5 sm:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-100">
            <ListChecks className="h-5 w-5 text-emerald-700" />
          </div>
          <h3 className="font-bold text-slate-900">Preguntas cerradas y de cálculo</h3>
          <p className="mt-1 text-sm leading-relaxed text-slate-600">
            Opción múltiple con cuatro alternativas. Al responder ves al instante si acertaste y por
            qué, con la explicación del concepto o el procedimiento completo del ejercicio.
          </p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-violet-100">
            <PenLine className="h-5 w-5 text-violet-700" />
          </div>
          <h3 className="font-bold text-slate-900">Preguntas abiertas</h3>
          <p className="mt-1 text-sm leading-relaxed text-slate-600">
            Escribe tu respuesta con tus propias palabras y compárala con las ideas clave que debería
            incluir. Tus respuestas quedan guardadas en tu historial.
          </p>
        </div>
      </section>
    </div>
  );
}

function UnitCard({
  unit,
  onSelect,
  lastScore,
}: {
  unit: Unit;
  onSelect: () => void;
  lastScore?: number;
}) {
  const mcCount = mcQuestions.filter((q) => q.unit === unit.id).length;
  const openCount = openQuestions.filter((q) => q.unit === unit.id).length;

  return (
    <button
      onClick={onSelect}
      className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 text-left transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
    >
      <div className="flex items-center justify-between">
        <span className="rounded-lg bg-slate-900 px-3 py-1 text-xs font-bold text-white">
          Unidad {unit.id}
        </span>
        {lastScore !== undefined && (
          <span className="text-xs font-semibold text-slate-400">Último: {lastScore.toFixed(1)}/5.0</span>
        )}
      </div>
      <h3 className="mt-3 font-bold text-slate-900">{unit.short}</h3>
      <p className="mt-1.5 flex-1 text-sm leading-relaxed text-slate-600">{unit.description}</p>
      <div className="mt-4 flex items-center justify-between text-xs font-medium text-slate-500">
        <span>
          {mcCount} cerradas · {openCount} abiertas
        </span>
        <span className="inline-flex items-center gap-1 font-bold text-slate-900 transition-transform group-hover:translate-x-1">
          Practicar <ArrowRight className="h-3.5 w-3.5" />
        </span>
      </div>
    </button>
  );
}
