import type { MCQuestion } from '../data/types';

interface Props {
  question: MCQuestion;
}

const factorRows: Array<{ pattern: string; formula: string; name: string }> = [
  { pattern: 'P dado F', formula: '(P/F, i, n) = (1+i)⁻ⁿ', name: 'Valor presente' },
  { pattern: 'F dado P', formula: '(F/P, i, n) = (1+i)ⁿ', name: 'Valor futuro' },
  { pattern: 'P dado A', formula: '(P/A, i, n) = [(1+i)ⁿ − 1] / [i(1+i)ⁿ]', name: 'Serie uniforme' },
  { pattern: 'A dado P', formula: '(A/P, i, n) = [i(1+i)ⁿ] / [(1+i)ⁿ − 1]', name: 'Recuperación de capital' },
  { pattern: 'F dado A', formula: '(F/A, i, n) = [(1+i)ⁿ − 1] / i', name: 'Fondo de amortización' },
  { pattern: 'A dado F', formula: '(A/F, i, n) = i / [(1+i)ⁿ − 1]', name: 'Depósito de fondo' },
  { pattern: 'P dado G', formula: '(P/G, i, n) = [(1+i)ⁿ − 1 − i·n] / [i²(1+i)ⁿ]', name: 'Gradiente aritmético' },
];

function FormulaBox({ question }: Props) {
  if (question.type !== 'calculo') return null;
  return (
    <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm">
      <p className="mb-2 font-semibold text-slate-700">Formulario de apoyo</p>
      <ul className="space-y-1.5 text-slate-600">
        <li>
          Interés simple: <span className="formula">I = P · i · n</span>
        </li>
        <li>
          Interés compuesto: <span className="formula">F = P(1 + i)ⁿ</span>
        </li>
        <li>
          Tasa efectiva anual: <span className="formula">TEA = (1 + j/m)ᵐ − 1</span>
        </li>
      </ul>
    </div>
  );
}

export default function FormulaSheet({ question }: Props) {
  if (question.type !== 'calculo') return null;
  return (
    <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm">
      <p className="mb-2 font-semibold text-slate-700">Factores de interés comunes</p>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-slate-600">
          <thead>
            <tr className="border-b border-slate-200 text-xs uppercase tracking-wide text-slate-400">
              <th className="py-1.5 pr-4">Factor</th>
              <th className="py-1.5 pr-4">Fórmula</th>
              <th className="py-1.5">Nombre</th>
            </tr>
          </thead>
          <tbody>
            {factorRows.map((f) => (
              <tr key={f.pattern} className="border-b border-slate-100 last:border-0">
                <td className="py-1.5 pr-4 font-medium text-slate-700">{f.pattern}</td>
                <td className="py-1.5 pr-4 font-mono text-xs">{f.formula}</td>
                <td className="py-1.5">{f.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <FormulaBox question={question} />
    </div>
  );
}
