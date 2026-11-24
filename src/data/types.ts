export interface Option {
  label: 'A' | 'B' | 'C' | 'D';
  text: string;
}

export interface MCQuestion {
  id: string;
  unit: 1 | 2 | 3 | 4;
  type: 'teoria' | 'calculo';
  stem: string;
  options: Option[];
  correct: 'A' | 'B' | 'C' | 'D';
  explanation: string;
}

export interface OpenQuestion {
  id: string;
  unit: 1 | 2 | 3 | 4;
  stem: string;
  keyIdeas: string[];
}

export interface Unit {
  id: 1 | 2 | 3 | 4;
  title: string;
  short: string;
  description: string;
  topics: string[];
  color: string;
  bar: string;
}

export const units: Unit[] = [
  {
    id: 1,
    title: 'Conceptos básicos de Ingeniería Económica',
    short: 'Conceptos básicos',
    description:
      'Qué es la ingeniería económica, el valor del dinero en el tiempo, interés simple y los elementos P, F, A, i, n.',
    topics: [
      'Qué es la ingeniería económica',
      'Valor del dinero en el tiempo e inflación',
      'Interés, interés simple y capital',
      'Notación P, F, A, i, n',
      'Diagrama de flujo de efectivo',
    ],
    color: 'bg-emerald-50 border-emerald-200 text-emerald-700',
    bar: 'bg-emerald-500',
  },
  {
    id: 2,
    title: 'Tasas de interés, anualidades y amortización',
    short: 'Tasas y anualidades',
    description:
      'Tasas nominales y efectivas, conversión entre ellas, interés compuesto, series uniformes, tablas de amortización y gradientes.',
    topics: [
      'Tasa nominal y tasa efectiva',
      'Conversión de tasa nominal a efectiva',
      'Interés compuesto y capitalización',
      'Series uniformes (anualidades)',
      'Tabla de amortización y gradientes',
      'OMA y el sistema financiero',
    ],
    color: 'bg-sky-50 border-sky-200 text-sky-700',
    bar: 'bg-sky-500',
  },
  {
    id: 3,
    title: 'Criterios de decisión e inversiones',
    short: 'Criterios de decisión',
    description:
      'Rentabilidad neta, flujos de fondos, análisis de alternativas, análisis de reemplazo y sensibilidad.',
    topics: [
      'Rentabilidad neta de una inversión',
      'Flujos de fondos acumulables y periódicos',
      'Alternativas mutuamente excluyentes e independientes',
      'Análisis de reemplazo: obsolescencia y rendimiento',
      'Análisis de sensibilidad y riesgo',
    ],
    color: 'bg-amber-50 border-amber-200 text-amber-700',
    bar: 'bg-amber-500',
  },
  {
    id: 4,
    title: 'VPN, TIR y decisiones de inversión',
    short: 'VPN y TIR',
    description:
      'Valor Presente Neto, Tasa Interna de Retorno, TMAR, criterios de aceptación y comparación de proyectos.',
    topics: [
      'VPN: valor presente neto',
      'TIR y TIR modificada',
      'TMAR y premio al riesgo',
      'Criterios de aceptación y rechazo',
      'Índice de rentabilidad',
      'Conflictos entre VPN y TIR',
    ],
    color: 'bg-rose-50 border-rose-200 text-rose-700',
    bar: 'bg-rose-500',
  },
];
