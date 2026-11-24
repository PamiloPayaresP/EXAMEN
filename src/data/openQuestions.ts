import type { OpenQuestion } from './types';

export const openQuestions: OpenQuestion[] = [
  // Unidad 1
  {
    id: 'ab-u1-1',
    unit: 1,
    stem: 'Explica con tus propias palabras por qué $100 de hoy no valen lo mismo que $100 dentro de un año.',
    keyIdeas: [
      'El dinero puede invertirse y generar interés, por eso vale más hoy.',
      'La inflación reduce el poder de compra del dinero futuro.',
      'Existe incertidumbre: el dinero futuro no es seguro.',
    ],
  },
  {
    id: 'ab-u1-2',
    unit: 1,
    stem: '¿Cuál es la diferencia entre interés simple e interés compuesto? Da un ejemplo numérico corto.',
    keyIdeas: [
      'Interés simple se calcula siempre sobre el capital inicial (I = P·i·n).',
      'Interés compuesto se calcula sobre capital + intereses acumulados.',
      'Ejemplo: $1.000 al 10% por 2 años → simple: $200; compuesto: $210.',
    ],
  },
  {
    id: 'ab-u1-3',
    unit: 1,
    stem: 'Describe qué elementos debe tener un diagrama de flujo de efectivo y para qué sirve.',
    keyIdeas: [
      'Una línea de tiempo con períodos numerados.',
      'Flechas hacia arriba para ingresos y hacia abajo para egresos.',
      'Sirve para visualizar cómo se mueve el dinero en el tiempo antes de calcular.',
    ],
  },
  {
    id: 'ab-u1-4',
    unit: 1,
    stem: 'Un amigo te dice: "me prestaron dinero a tasa 0%, así que no pierdo nada". ¿Es cierto? Justifica.',
    keyIdeas: [
      'Aunque no pague interés monetario, el dinero pierde poder adquisitivo por la inflación.',
      'Pierde la oportunidad de invertir ese dinero (costo de oportunidad).',
      'Por eso el valor del dinero cambia con el tiempo incluso sin interés.',
    ],
  },
  {
    id: 'ab-u1-5',
    unit: 1,
    stem: 'Explica qué significa que dos montos de dinero en fechas distintas sean "equivalentes".',
    keyIdeas: [
      'Equivalencia: montos distintos en momentos distintos pueden tener el mismo valor económico.',
      'Se relacionan mediante la tasa de interés y el número de períodos.',
      'Ejemplo: $1.000 hoy equivalen a $1.100 en un año al 10%.',
    ],
  },
  // Unidad 2
  {
    id: 'ab-u2-1',
    unit: 2,
    stem: 'Explica la diferencia entre tasa nominal y tasa efectiva, y por qué la nominal no puede usarse directamente en las fórmulas.',
    keyIdeas: [
      'La nominal (j) es solo de referencia y siempre va acompañada de su capitalización.',
      'La efectiva refleja el costo o rendimiento real del período considerando la capitalización.',
      'Para usarla en fórmulas debe convertirse: tasa periódica j/m y efectiva (1+j/m)^m − 1.',
    ],
  },
  {
    id: 'ab-u2-2',
    unit: 2,
    stem: 'Un banco ofrece "24% nominal anual capitalizable mensualmente" y otro "26% efectivo anual". ¿Cómo decidirías cuál conviene? Sin calcular el resultado exacto, explica el procedimiento.',
    keyIdeas: [
      'Convertir la nominal a efectiva anual: TEA = (1 + j/m)^m − 1.',
      'Con j = 24% mensual: TEA = (1,02)^12 − 1 ≈ 26,8%.',
      'Comparar ambas efectivas anuales y elegir la menor si se presta o la mayor si se invierte.',
    ],
  },
  {
    id: 'ab-u2-3',
    unit: 2,
    stem: 'Describe la estructura de una tabla de amortización y qué información aporta en cada columna.',
    keyIdeas: [
      'Columnas: período, pago, interés, abono a capital y saldo pendiente.',
      'Interés del período = saldo anterior × tasa periódica.',
      'Abono a capital = pago − interés; el saldo disminuye en cada período.',
    ],
  },
  {
    id: 'ab-u2-4',
    unit: 2,
    stem: '¿Qué diferencia hay entre una serie uniforme (anualidad) y un gradiente? Pon un ejemplo de la vida real de cada uno.',
    keyIdeas: [
      'Serie uniforme: pagos iguales en cada período (ej. arriendo fijo mensual).',
      'Gradiente: pagos que aumentan o disminuyen en un valor o porcentaje constante (ej. cuotas que suben cada año).',
      'Cada tipo tiene sus propias fórmulas de valor presente y valor futuro.',
    ],
  },
  {
    id: 'ab-u2-5',
    unit: 2,
    stem: 'Explica qué hace el Banco de la República con una OMA de expansión y una de contracción, y qué busca con cada una.',
    keyIdeas: [
      'Expansión: compra títulos e inyecta dinero para aumentar la liquidez.',
      'Contracción: vende títulos y recoge dinero para disminuir la liquidez.',
      'Son herramientas de política monetaria para regular la economía.',
    ],
  },
  // Unidad 3
  {
    id: 'ab-u3-1',
    unit: 3,
    stem: 'Explica la diferencia entre proyectos independientes y alternativas mutuamente excluyentes, con un ejemplo de cada uno.',
    keyIdeas: [
      'Independientes: pueden aceptarse varios a la vez (ej. comprar máquinas para plantas distintas).',
      'Mutuamente excluyentes: elegir una descarta las demás (ej. escoger entre dos proveedores).',
      'La opción NO HACER NADA siempre está disponible como alternativa.',
    ],
  },
  {
    id: 'ab-u3-2',
    unit: 3,
    stem: 'Un equipos viejo funciona pero gasta más energía y se daña seguido. ¿Qué conceptos del análisis de reemplazo aplican y cómo decidirías si cambiarlo?',
    keyIdeas: [
      'Rendimiento disminuido: pierde eficiencia por deterioro físico.',
      'Obsolescencia: hay tecnología nueva más adecuada.',
      'Comparar costos del defensor (actual) contra el retador (nuevo) y la vida útil económica.',
    ],
  },
  {
    id: 'ab-u3-3',
    unit: 3,
    stem: '¿Para qué sirve el análisis de sensibilidad antes de aprobar un proyecto?',
    keyIdeas: [
      'Muestra cómo cambian los resultados al variar variables clave (precio, tasa, demanda).',
      'Identifica los factores con mayor impacto en el VPN o la rentabilidad.',
      'Ayuda a conocer el riesgo y concentrarse en las variables críticas.',
    ],
  },
  {
    id: 'ab-u3-4',
    unit: 3,
    stem: 'Explica por qué la globalización del sistema financiero aumenta el riesgo sistémico.',
    keyIdeas: [
      'Los mercados están más interconectados entre países.',
      'Una crisis en un mercado se propaga rápidamente a los demás.',
      'El riesgo sistémico afecta a todo el sistema, no solo a una entidad.',
    ],
  },
  // Unidad 4
  {
    id: 'ab-u4-1',
    unit: 4,
    stem: 'Explica con un ejemplo qué mide el VPN y por qué un VPN positivo justifica aceptar un proyecto.',
    keyIdeas: [
      'El VPN trae todos los flujos futuros a pesos de hoy con una tasa de descuento.',
      'VPN = VP(ingresos) − VP(egresos), incluida la inversión inicial.',
      'VPN > 0 significa que el proyecto genera más valor que la TMAR exigida.',
    ],
  },
  {
    id: 'ab-u4-2',
    unit: 4,
    stem: '¿Qué relación hay entre la TIR y el VPN? Explica por qué la TIR es la tasa que hace el VPN igual a cero.',
    keyIdeas: [
      'La TIR es la tasa de descuento para la cual VPN = 0.',
      'Si la TIR existe, el proyecto equilibra exactamente la inversión con los flujos descontados.',
      'Comparar la TIR contra la TMAR equivale a mirar el signo del VPN.',
    ],
  },
  {
    id: 'ab-u4-3',
    unit: 4,
    stem: 'Describe cómo se construye la TMAR y qué papel juega el premio al riesgo.',
    keyIdeas: [
      'TMAR = tasa base (ej. inflación o costo de capital) + prima por riesgo.',
      'A mayor riesgo del proyecto, mayor premio al riesgo y mayor TMAR.',
      'La TMAR es el filtro mínimo contra el que se comparan TIR y VPN.',
    ],
  },
  {
    id: 'ab-u4-4',
    unit: 4,
    stem: 'Dos proyectos mutuamente excluyentes: el A tiene mayor TIR pero menor VPN que el B. ¿Cuál eliges y por qué?',
    keyIdeas: [
      'En alternativas mutuamente excluyentes prevalece el criterio del VPN.',
      'El VPN mide el valor absoluto en pesos de hoy que se agrega.',
      'Se elige B porque maximiza el valor, aunque su TIR sea menor (diferencias de escala).',
    ],
  },
  {
    id: 'ab-u4-5',
    unit: 4,
    stem: '¿Qué es el índice de rentabilidad y cómo se relaciona con el VPN? ¿Qué indica un valor mayor que 1?',
    keyIdeas: [
      'IR = VP(flujos futuros) / inversión inicial.',
      'IR > 1 equivale a VPN > 0: los flujos descontados superan la inversión.',
      'Útil para comparar proyectos con diferente escala de inversión.',
    ],
  },
];
