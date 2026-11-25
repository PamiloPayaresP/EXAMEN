export type Topic = [term: string, definition: string, scenario: string, objective: string];
export type Calculation = [prompt: string, correct: string, optionB: string, optionC: string, optionD: string];
export interface Formula { name: string; display: string; tokens: string[]; }
export interface CodeQuestion {
  prompt: string;
  snippet: string;
  choices: string[];
  correct: string;
  explanation: string;
}
export interface Subject {
  name: string;
  description: string;
  topics: Topic[];
  calculations?: Record<number, Calculation>;
  formulas?: Record<number, Formula>;
  codeQuestions?: Record<number, CodeQuestion>;
}

export const subjects: Subject[] = [
      {
        name: "Administración y Emprendimiento",
        description: "Innovación, gestión empresarial, mercadeo, investigación de mercados y emprendimiento de software.",
        topics: [
          ["Emprendimiento", "Proceso de identificar una oportunidad, organizar recursos y crear valor asumiendo riesgos calculados.", "Una persona detecta una necesidad local, valida la idea y crea una solución sostenible.", "transformar oportunidades en una propuesta de valor viable"],
          ["Innovación", "Implementar una idea nueva o significativamente mejorada que genere valor para usuarios u organizaciones.", "Una empresa rediseña su servicio para reducir tiempos y resolver una necesidad real.", "llevar una idea mejorada a la práctica y producir valor"],
          ["Design Thinking", "Enfoque centrado en las personas que comprende necesidades, define problemas, idea, prototipa y prueba.", "Un equipo entrevista usuarios, formula el problema, crea prototipos y recoge comentarios.", "comprender a los usuarios antes de probar soluciones"],
          ["Lluvia de ideas", "Técnica para generar muchas ideas antes de evaluarlas, promoviendo participación y creatividad.", "El equipo propone opciones libremente y las clasifica después, sin juzgarlas al inicio.", "generar alternativas diversas en una sesión creativa"],
          ["SCAMPER", "Técnica creativa que guía mejoras mediante Sustituir, Combinar, Adaptar, Modificar, Poner en otros usos, Eliminar y Reordenar.", "El equipo explora si puede combinar funciones y eliminar pasos de un producto.", "transformar un producto existente con preguntas orientadoras"],
          ["Investigación de mercados", "Proceso sistemático de definir el problema, recopilar y analizar datos para apoyar decisiones comerciales.", "Antes de lanzar una aplicación, se estudian necesidades, competidores y disposición de pago.", "reducir incertidumbre sobre clientes y mercado con datos"],
          ["Segmentación de mercado", "División del mercado en grupos con características, necesidades o comportamientos similares.", "Una plataforma separa sus usuarios por tamaño de empresa y necesidades de gestión.", "agrupar clientes para adaptar la oferta"],
          ["Mezcla de mercadeo (4P)", "Producto, precio, plaza y promoción: variables coordinadas para llevar una oferta al mercado.", "Una empresa decide qué ofrecer, cuánto cobrar, dónde vender y cómo comunicarlo.", "coordinar producto, precio, distribución y promoción"],
          ["Propuesta de valor", "Beneficio concreto que explica a qué cliente se sirve, qué necesidad se resuelve y por qué la oferta es distinta.", "Una app promete reducir en la mitad el tiempo de programación de citas para clínicas.", "comunicar el beneficio diferencial para un cliente definido"],
          ["Modelo de negocio", "Lógica de cómo una organización crea, entrega y captura valor, incluyendo clientes, ingresos y costos.", "Un servicio define sus segmentos, canales, suscripción, actividades y estructura de costos.", "explicar cómo la empresa crea valor y obtiene ingresos"],
          ["Producto mínimo viable (MVP)", "Versión mínima que permite probar una hipótesis de valor con usuarios y aprender con recursos limitados.", "El equipo lanza una función básica a un grupo pequeño antes de ampliar el producto.", "validar una hipótesis con una versión inicial de bajo costo"],
          ["Análisis DOFA", "Herramienta que organiza fortalezas y debilidades internas, así como oportunidades y amenazas externas.", "Una empresa identifica su equipo experto, falta de capital, mercado creciente y nuevo competidor.", "relacionar factores internos y externos para orientar estrategias"],
          ["Factibilidad del proyecto", "Evaluación de viabilidad técnica, económica, operativa y de mercado antes de comprometer recursos.", "Se verifica que haya tecnología disponible, presupuesto, usuarios y capacidad de operación.", "determinar si una iniciativa puede ejecutarse y sostenerse"],
          ["Comercio electrónico", "Compra, venta o intercambio de bienes y servicios mediante redes y plataformas digitales.", "Un negocio recibe pedidos y pagos por su sitio web y coordina entregas.", "comercializar productos y servicios usando canales digitales"],
          ["Planeación administrativa", "Definir objetivos y cursos de acción, anticipar recursos y establecer cómo medir resultados.", "La dirección establece metas trimestrales, responsables, presupuesto e indicadores.", "establecer objetivos y acciones antes de ejecutar"],
          ["Organización empresarial", "Coordinar tareas, recursos, responsabilidades y relaciones de autoridad para lograr objetivos.", "Una empresa asigna funciones y define a quién reporta cada área.", "estructurar cargos y recursos para realizar el trabajo"],
          ["Liderazgo emprendedor", "Capacidad de orientar, motivar y coordinar personas para avanzar hacia una visión compartida.", "La fundadora escucha al equipo, explica prioridades y elimina obstáculos.", "movilizar al equipo hacia objetivos comunes"],
          ["Mejora continua", "Ciclo repetido de medir procesos, identificar oportunidades, aplicar cambios y verificar resultados.", "Tras revisar errores de entrega, el equipo modifica el flujo y vuelve a medirlos.", "mejorar procesos gradualmente con evidencia"],
          ["Punto de equilibrio", "Nivel de ventas en el que los ingresos totales igualan los costos totales y no hay utilidad ni pérdida.", "El negocio quiere saber cuántas licencias debe vender para cubrir sus costos.", "identificar el nivel de ventas que cubre los costos"],
          ["Retorno sobre la inversión (ROI)", "Indicador que compara el beneficio neto de una inversión con los recursos que se destinaron a ella.", "La gerencia compara la ganancia obtenida con el capital invertido.", "evaluar el beneficio obtenido frente a los recursos invertidos"]
        ],
      },
      {
        name: "Arquitectura de Software",
        description: "Requerimientos, estilos, atributos de calidad, documentación y evaluación de arquitecturas.",
        topics: [
          ["Arquitectura de software", "Estructuras fundamentales de un sistema, sus elementos, relaciones y principios que guían su evolución.", "Antes de programar, el equipo acuerda componentes, dependencias e interfaces principales.", "definir estructuras y decisiones que guían el sistema"],
          ["Requerimiento funcional", "Descripción de un servicio, comportamiento o tarea que el sistema debe ofrecer.", "El sistema debe permitir que un cliente consulte el estado de su pedido.", "especificar qué servicio o comportamiento brinda el sistema"],
          ["Atributo de calidad", "Propiedad medible o evaluable que expresa cómo debe comportarse el sistema, como seguridad o rendimiento.", "El equipo establece que una consulta debe responder en menos de dos segundos.", "describir una cualidad del sistema con criterios evaluables"],
          ["Interesado (stakeholder)", "Persona, grupo u organización que afecta o recibe impacto de las decisiones del sistema.", "Usuarios, operaciones y cumplimiento revisan prioridades y restricciones.", "identificar a quienes influyen o son afectados por la arquitectura"],
          ["Usabilidad", "Grado en que usuarios específicos pueden lograr objetivos con efectividad, eficiencia y satisfacción.", "En una prueba, usuarios completan tareas con pocos errores y sin capacitación extensa.", "facilitar el uso efectivo y satisfactorio del sistema"],
          ["Rendimiento", "Capacidad del sistema para responder y procesar carga dentro de límites de tiempo y recursos.", "Una plataforma mantiene tiempos de respuesta acordados durante el pico de solicitudes.", "controlar tiempos de respuesta y consumo de recursos"],
          ["Disponibilidad", "Proporción del tiempo en que un sistema está operativo y accesible.", "Un servicio incorpora redundancia para reducir interrupciones.", "mantener el servicio accesible durante el tiempo requerido"],
          ["Modificabilidad", "Facilidad y costo de cambiar el sistema para corregirlo, adaptarlo o añadir capacidades.", "Un cambio en impuestos puede hacerse en un módulo aislado sin rehacer toda la aplicación.", "contener el impacto y costo de los cambios"],
          ["Arquitectura en capas", "Estilo que separa responsabilidades en niveles y limita dependencias entre ellos.", "Presentación, lógica de negocio y acceso a datos se organizan en capas diferenciadas.", "separar responsabilidades mediante niveles definidos"],
          ["Microservicios", "Estilo que organiza capacidades en servicios pequeños, desplegables y comunicados mediante contratos.", "El equipo despliega facturación sin publicar de nuevo el catálogo completo.", "aislar capacidades para que evolucionen y desplieguen de forma independiente"],
          ["Arquitectura dirigida por eventos", "Estilo donde productores y consumidores intercambian eventos para comunicar cambios de estado.", "Al confirmarse una compra, otros servicios reaccionan al evento sin acoplarse directamente.", "desacoplar componentes mediante publicación y consumo de eventos"],
          ["MVC", "Patrón que separa modelo de datos y lógica, vista de presentación y controlador de interacción.", "Una aplicación divide el estado del dominio, la interfaz y el manejo de acciones.", "separar modelo, presentación y control de interacción"],
          ["Cohesión", "Grado en que las responsabilidades de un módulo están relacionadas y enfocadas en un propósito.", "Un módulo de pagos contiene funciones relacionadas exclusivamente con cobros.", "mantener responsabilidades relacionadas dentro de un módulo"],
          ["Acoplamiento", "Grado de dependencia entre módulos; reducirlo limita el efecto de cambios entre componentes.", "Un módulo usa una interfaz estable en vez de depender de detalles internos de otro.", "minimizar dependencias rígidas entre componentes"],
          ["Conector arquitectónico", "Mecanismo de interacción entre componentes, como llamada, mensaje, evento o flujo de datos.", "Dos servicios se comunican mediante mensajes con un contrato acordado.", "describir cómo interactúan los componentes"],
          ["Vista arquitectónica", "Representación de un sistema desde la perspectiva de intereses concretos de sus participantes.", "Una vista de despliegue muestra nodos, procesos y asignaciones físicas.", "comunicar una estructura pertinente a un grupo de interesados"],
          ["Vista física o de despliegue", "Representa la asignación del software a infraestructura, nodos y conexiones de ejecución.", "El diagrama muestra servidores, contenedores, zonas y enlaces de red.", "explicar dónde se ejecutan los elementos del sistema"],
          ["Documentación de arquitectura", "Registro claro de vistas, elementos, relaciones, decisiones, restricciones y justificaciones.", "Un nuevo equipo necesita comprender decisiones y consecuencias sin depender de memoria oral.", "facilitar comunicación, comprensión y evolución del sistema"],
          ["ADD (Attribute-Driven Design)", "Método iterativo que deriva la arquitectura de los requerimientos de calidad y restricciones priorizados.", "El diseño prioriza seguridad y rendimiento y selecciona tácticas para responder a esos escenarios.", "diseñar arquitectura guiándose por atributos de calidad"],
          ["ATAM", "Método para analizar compensaciones, riesgos y sensibilidad de decisiones frente a atributos de calidad.", "Los interesados comparan alternativas y descubren que una mejora de rendimiento aumenta el costo.", "evaluar riesgos y equilibrios entre atributos de calidad"]
        ],
      },
      {
        name: "Seguridad de Software",
        description: "Principios de seguridad, redes, desarrollo seguro, pruebas y mitigación de vulnerabilidades.",
        topics: [
          ["Confidencialidad, integridad y disponibilidad", "La tríada CIA protege la información contra divulgación, alteración y falta de acceso no autorizadas.", "Una solución cifra datos, detecta cambios indebidos y mantiene copias recuperables.", "proteger datos, mantener su exactitud y asegurar el acceso"],
          ["Autenticación", "Verificación de la identidad declarada por una persona, dispositivo o servicio.", "El sistema valida la identidad antes de iniciar una sesión.", "confirmar quién solicita acceso"],
          ["Autorización", "Determinación de las acciones y recursos permitidos a una identidad ya autenticada.", "Después de iniciar sesión, un usuario solo puede consultar sus propios registros.", "definir qué puede hacer cada identidad"],
          ["Mínimo privilegio", "Conceder únicamente los permisos necesarios para realizar las tareas autorizadas.", "Una cuenta de servicio no recibe permisos de administrador si solo lee datos.", "reducir permisos al mínimo requerido"],
          ["Autenticación multifactor", "Uso de dos o más factores distintos, como conocimiento, posesión o inherencia, para verificar identidad.", "Además de una contraseña, el acceso solicita una clave temporal del dispositivo.", "añadir factores independientes a la verificación de identidad"],
          ["Hash de contraseñas con sal", "Almacenar verificadores mediante una función lenta y adaptativa con sal única, no texto plano ni cifrado reversible.", "La base guarda hashes salados y usa un algoritmo diseñado para contraseñas.", "dificultar la recuperación masiva de contraseñas filtradas"],
          ["TLS", "Protocolo que protege comunicaciones en tránsito mediante cifrado y mecanismos de autenticación e integridad.", "Un navegador establece una conexión HTTPS autenticada para enviar datos.", "proteger la comunicación entre cliente y servidor"],
          ["Consultas parametrizadas", "Separar datos de entrada y estructura SQL para que los valores no se interpreten como instrucciones.", "El repositorio envía una consulta fija y pasa los valores como parámetros.", "mitigar inyección SQL al tratar entradas como datos"],
          ["Cross-Site Scripting (XSS)", "Vulnerabilidad donde contenido no confiable se ejecuta en el navegador de otros usuarios.", "Una aplicación muestra comentarios sin codificarlos según el contexto.", "evitar que datos no confiables se ejecuten como contenido activo"],
          ["Cross-Site Request Forgery (CSRF)", "Ataque que induce al navegador autenticado de una víctima a enviar una acción no deseada.", "Una acción sensible carece de token impredecible y controles de origen.", "verificar que las acciones sensibles fueron iniciadas intencionalmente"],
          ["Control de intentos", "Límite de frecuencia, demoras progresivas y monitoreo reducen abuso automatizado de autenticación.", "Tras varios intentos fallidos, el sistema aplica límites y alertas proporcionadas.", "reducir intentos automatizados sin bloquear usuarios legítimos"],
          ["Defensa en profundidad", "Uso de controles complementarios en varias capas para que una falla no comprometa por sí sola el sistema.", "La aplicación combina validación, permisos, monitoreo, segmentación y copias seguras.", "evitar depender de un único control de seguridad"],
          ["OWASP", "Comunidad abierta que publica recursos y guías para mejorar la seguridad de aplicaciones.", "El equipo consulta recomendaciones reconocidas para revisar riesgos web.", "apoyar el desarrollo seguro con recursos comunitarios"],
          ["Análisis estático (SAST)", "Examen automatizado del código o artefactos sin ejecutar la aplicación.", "El pipeline revisa el código fuente antes de desplegarlo.", "buscar patrones de riesgo analizando el código sin ejecutarlo"],
          ["Análisis dinámico (DAST)", "Evaluación de una aplicación en ejecución desde su interfaz observable, dentro de un alcance autorizado.", "En un entorno de prueba, el equipo revisa respuestas de la aplicación desplegada.", "evaluar el comportamiento de una aplicación en ejecución"],
          ["Validación de entrada", "Comprobar tipo, formato, longitud y rango de los datos conforme a reglas esperadas.", "Un formulario acepta fechas válidas y rechaza valores fuera de rango.", "rechazar o normalizar entradas que incumplen el contrato"],
          ["Copias de seguridad", "Copias verificadas y protegidas que permiten restaurar datos tras pérdida o incidente.", "La organización prueba restauraciones y mantiene copias aisladas del entorno principal.", "recuperar información y servicios tras una pérdida"],
          ["Gestión de parches", "Proceso de priorizar, probar y aplicar actualizaciones que corrigen defectos y vulnerabilidades.", "El responsable evalúa una actualización, la prueba y programa su instalación.", "reducir exposición mediante actualizaciones controladas"],
          ["Riesgo esperado (ALE)", "Estimación de la pérdida que podría acumularse durante un año por una amenaza y su frecuencia.", "Se estima la pérdida por evento y cuántas veces podría ocurrir al año.", "estimar el impacto anual de un riesgo para priorizar controles"],
          ["Tiempo de vida (TTL) de IP", "Campo que limita el número de saltos de un paquete para evitar que circule indefinidamente.", "Cada router reduce el TTL al reenviar el paquete.", "limitar los saltos de un paquete en la red"]
        ],
      },
      {
        name: "Sistemas de Información Gerencial",
        description: "SIG, sistemas de apoyo a decisiones, inteligencia de negocios, infraestructura y gestión de datos.",
        topics: [
          ["Sistema de Información Gerencial (SIG)", "Sistema integrado que transforma datos en información útil para apoyar operaciones, control y decisiones gerenciales.", "Una gerencia consulta informes de ventas, inventario y tendencias para planear.", "convertir datos organizacionales en información útil para decisiones"],
          ["Dato e información", "Un dato es un hecho registrado; la información son datos procesados y contextualizados para un propósito.", "Una lista de cifras se resume por región y periodo para explicar resultados.", "dar contexto y significado a datos para apoyar una decisión"],
          ["Sistema de procesamiento de transacciones (TPS)", "Registra y procesa operaciones rutinarias, detalladas y repetitivas de la organización.", "El sistema registra cada venta, pago y actualización de inventario.", "capturar las transacciones diarias del negocio"],
          ["Sistema de información gerencial (MIS)", "Produce informes periódicos y resumidos que apoyan el seguimiento y control de la gerencia.", "Un jefe recibe un resumen semanal de ventas reales frente al presupuesto.", "entregar informes organizados para monitoreo gerencial"],
          ["Sistema de apoyo a decisiones (DSS)", "Combina datos y modelos para apoyar decisiones semiestructuradas y comparar alternativas.", "Un analista modifica supuestos de demanda para comparar escenarios.", "analizar alternativas con datos y modelos"],
          ["Sistema de información ejecutiva (EIS)", "Presenta indicadores y tendencias resumidas para apoyar decisiones estratégicas de alta dirección.", "La dirección consulta un tablero con metas, excepciones y tendencias.", "ofrecer una visión estratégica resumida a ejecutivos"],
          ["Sistema de apoyo a decisiones grupales (GDSS)", "Facilita colaboración, generación de ideas y evaluación estructurada de decisiones de un grupo.", "Varios directivos aportan opciones y votan sobre prioridades en una sesión compartida.", "mejorar decisiones colaborativas de un grupo"],
          ["ETL", "Proceso de extraer datos de fuentes, transformarlos y cargarlos en un destino analítico.", "Datos de ventas se limpian y estandarizan antes de cargarlos al almacén.", "preparar datos de varias fuentes para su análisis"],
          ["Inteligencia de negocios (BI)", "Prácticas y herramientas para analizar datos y comunicar hallazgos que apoyan decisiones.", "El equipo crea tableros para identificar cambios en ventas y clientes.", "convertir datos en análisis e indicadores accionables"],
          ["Almacén de datos", "Repositorio integrado, histórico y orientado al análisis de información de distintas fuentes.", "La organización consulta años de operaciones sin sobrecargar sus sistemas transaccionales.", "analizar datos históricos integrados de varias áreas"],
          ["Calidad de datos", "Adecuación de los datos a su uso, considerando exactitud, completitud, consistencia y oportunidad.", "Se corrigen duplicados y campos faltantes antes de preparar informes.", "asegurar que los datos sean confiables para el propósito"],
          ["Indicador clave de desempeño (KPI)", "Medida cuantificable vinculada a un objetivo que permite evaluar progreso o resultado.", "El área mide el porcentaje de pedidos entregados a tiempo frente a su meta.", "medir el avance hacia un objetivo definido"],
          ["Retroalimentación gerencial", "Uso de resultados y mediciones para ajustar decisiones, procesos y acciones futuras.", "Tras observar retrasos, el área cambia la planificación y vuelve a medir.", "usar resultados para corregir y mejorar decisiones"],
          ["CRM", "Gestión de relaciones con clientes para organizar interacciones, oportunidades, ventas y servicio.", "El equipo registra contactos y solicitudes para dar seguimiento coherente.", "coordinar la relación y atención de clientes"],
          ["ERP", "Sistema integrado que coordina procesos y datos de áreas como finanzas, compras e inventario.", "Una transacción actualiza inventario y contabilidad dentro de procesos conectados.", "integrar procesos empresariales y compartir datos comunes"],
          ["Infraestructura de TI", "Conjunto de hardware, software, redes, datos y servicios que sostienen los sistemas de información.", "Se planifican servidores, conectividad, almacenamiento y soporte para un SIG.", "proveer la base tecnológica y operativa de los sistemas"],
          ["Decisión estructurada", "Decisión rutinaria y repetible que puede seguir reglas o procedimientos definidos.", "El sistema reordena inventario cuando una cantidad cae bajo un umbral establecido.", "resolver situaciones repetitivas con reglas conocidas"],
          ["Decisión no estructurada", "Decisión novedosa o compleja que requiere juicio, experiencia y análisis de información.", "La dirección evalúa entrar a un mercado nuevo sin una regla única establecida.", "combinar análisis y criterio ante situaciones no rutinarias"],
          ["Productividad", "Relación entre productos o resultados obtenidos y recursos empleados en un periodo.", "El área compara unidades procesadas con horas de trabajo utilizadas.", "relacionar resultados obtenidos con recursos utilizados"],
          ["Retorno de un SIG", "Indicador que compara los beneficios netos atribuibles a un sistema con los recursos invertidos en él.", "La organización compara ahorros verificables con el costo de implantar una plataforma.", "evaluar los beneficios obtenidos frente a los recursos invertidos"]
        ],
      },
      {
        name: "Ingeniería Económica",
        description: "Interés, equivalencia del dinero en el tiempo, evaluación de alternativas, costos y rentabilidad.",
        topics: [
          ["Interés simple", "El interés se calcula solo sobre el capital inicial: I = P × i × n.", "Un préstamo no capitaliza intereses y se calcula sobre el principal original.", "calcular intereses sin capitalizarlos en periodos posteriores"],
          ["Interés compuesto", "Cada periodo el interés se suma al capital: F = P(1 + i)^n.", "Un depósito reinvierte los intereses al cierre de cada periodo.", "considerar intereses ganados sobre intereses anteriores"],
          ["Valor presente (pago único)", "Equivalente actual de un monto futuro: P = F / (1 + i)^n.", "Se descuenta un pago esperado para compararlo con dinero disponible hoy.", "descontar un flujo futuro a una fecha de referencia"],
          ["Valor futuro (pago único)", "Monto equivalente en el futuro: F = P(1 + i)^n.", "Se proyecta cuánto acumulará hoy una inversión con tasa periódica constante.", "capitalizar una suma presente durante varios periodos"],
          ["Anualidad vencida: valor presente", "Para pagos iguales al final de cada periodo: P = A[1 − (1+i)^−n] / i.", "Se comparan cuotas mensuales uniformes pagadas al final de cada mes.", "convertir una serie uniforme de pagos en su equivalente presente"],
          ["Anualidad vencida: valor futuro", "Para pagos iguales al final del periodo: F = A[(1+i)^n − 1] / i.", "Se calcula el saldo que acumulan depósitos uniformes al final de cada periodo.", "acumular una serie uniforme de pagos"],
          ["Tasa nominal y periódica", "La tasa periódica se obtiene dividiendo la tasa nominal anual por el número de capitalizaciones anuales: i = j/m.", "Una tasa nominal anual se capitaliza mensualmente.", "convertir una tasa nominal anual a tasa por periodo"],
          ["Tasa efectiva anual", "Con tasa nominal j capitalizable m veces: i efectiva = (1 + j/m)^m − 1.", "Se comparan dos ofertas con distintas frecuencias de capitalización.", "hallar el rendimiento anual que incorpora capitalización"],
          ["Tasa real e inflación", "Aproximación: tasa real ≈ tasa nominal − inflación; exacta: (1+i)/(1+f) − 1.", "Se quiere expresar el rendimiento descontando el aumento general de precios.", "separar el rendimiento nominal del efecto de inflación"],
          ["Valor Presente Neto (VPN)", "VPN = suma de flujos netos descontados − inversión inicial; acepta valor positivo bajo los supuestos.", "Se descuenta cada flujo de un proyecto y se resta el desembolso inicial.", "medir el valor creado en dinero de hoy por una alternativa"],
          ["Tasa Interna de Retorno (TIR)", "Tasa que hace que el VPN de los flujos de una inversión sea cero.", "Se busca la tasa que iguala el valor presente de ingresos y egresos del proyecto.", "encontrar la tasa de equilibrio del VPN"],
          ["Periodo de recuperación simple", "Tiempo requerido para que los flujos acumulados igualen la inversión inicial, sin descuento.", "La gerencia estima cuándo los ingresos acumulados recuperan el desembolso.", "estimar cuánto tarda en recuperarse el capital inicial"],
          ["Relación beneficio-costo", "Cociente entre valor presente de beneficios y valor presente de costos; una razón mayor que uno indica beneficios superiores.", "Se comparan beneficios descontados con costos descontados usando una misma base.", "comparar beneficios y costos en valor presente"],
          ["Depreciación lineal", "Cargo periódico uniforme: (costo inicial − valor residual) / vida útil.", "Un equipo pierde valor contable de manera uniforme durante su vida estimada.", "asignar el costo depreciable en partes iguales por periodo"],
          ["Costo de oportunidad", "Valor de la mejor alternativa sacrificada al elegir una opción.", "Al usar un local propio para el proyecto se renuncia al alquiler que podría recibirse.", "considerar el beneficio de la mejor opción no elegida"],
          ["Costo de capital", "Rendimiento mínimo requerido que refleja el costo de financiar una inversión y su riesgo.", "Un proyecto debe superar la tasa mínima definida por las fuentes de financiación.", "establecer el rendimiento mínimo para evaluar una inversión"],
          ["Gradiente aritmético", "Serie de flujos que aumenta o disminuye en una cantidad monetaria constante por periodo.", "Los costos de mantenimiento suben $100 cada año.", "modelar cambios periódicos de igual magnitud monetaria"],
          ["Amortización de préstamo", "Distribución de pagos periódicos entre intereses del saldo y reducción del principal.", "Cada cuota cancela intereses del saldo y abona la parte restante al capital.", "describir cómo se paga una deuda durante el tiempo"],
          ["Punto de equilibrio", "Cantidad donde ingresos igualan costos; Q = costos fijos / (precio unitario − costo variable unitario).", "Una empresa estima cuántas unidades debe vender antes de obtener utilidad.", "hallar el volumen que cubre costos fijos y variables"],
          ["Análisis incremental", "Comparación de alternativas basada en diferencias de costos y beneficios relevantes.", "Se decide entre dos equipos comparando únicamente los flujos que cambian.", "evaluar diferencias económicas entre opciones excluyentes"]
        ],
        calculations: {
          0: ["Capital $1.000.000, tasa simple 12% anual, 2 años. ¿Cuánto interés se causa?", "240000", "120000", "254400", "2240000"],
          1: ["Capital $1.000.000, 10% anual compuesto durante 2 años. ¿Valor futuro?", "$1.210.000", "$1.200.000", "$1.100.000", "$1.020.000"],
          2: ["Valor futuro $1.210.000 en 2 años, tasa 10% anual. ¿Valor presente?", "$1.000.000", "$1.100.000", "$1.210.000", "$900.000"],
          3: ["Se invierten $500.000 al 8% compuesto anual durante 3 años. ¿Valor futuro aproximado?", "$629.856", "$620.000", "$540.000", "$648.000"],
          4: ["Pagos de $100.000 al final de cada año por 2 años, tasa 10%. ¿Valor presente aproximado?", "$173.554", "$200.000", "$190.000", "$165.289"],
          5: ["Se depositan $100.000 al final de cada año por 2 años al 10%. ¿Valor futuro?", "$210.000", "$220.000", "$200.000", "$121.000"],
          6: ["Tasa nominal anual 12% capitalizable mensualmente. ¿Tasa periódica mensual?", "1%", "12%", "0,12%", "6%"],
          7: ["Tasa nominal 12% capitalizable mensualmente. ¿Tasa efectiva anual aproximada?", "12,68%", "12,00%", "13,00%", "1,00%"],
          8: ["Tasa nominal 10% e inflación 4%. ¿Tasa real exacta aproximada?", "5,77%", "6,00%", "14,00%", "4,00%"],
          9: ["Inversión inicial $1.000.000; entradas $600.000 al final de cada año por 2 años; i=10%. ¿VPN aproximado?", "$41.322", "$200.000", "$0", "$100.000"],
          10: ["Flujos: −$100.000 hoy y +$110.000 en un año. ¿TIR?", "10%", "11%", "5%", "0%"],
          11: ["Inversión $900.000; entradas uniformes $300.000 por año. ¿Recuperación simple?", "3 años", "2 años", "4 años", "0,33 años"],
          12: ["VP de beneficios $1.200.000; VP de costos $1.000.000. ¿Relación B/C?", "1,2", "0,83", "2,2", "200"],
          13: ["Equipo $1.000.000, residual $100.000, vida 3 años. ¿Depreciación anual lineal?", "$300.000", "$333.333", "$900.000", "$100.000"],
          14: ["Se usa un espacio propio que podría alquilarse por $800.000 al mes. ¿Costo de oportunidad mensual?", "$800.000", "$0", "$1.600.000", "$400.000"],
          15: ["Una inversión de $2.000.000 produce $240.000 anuales. ¿Rendimiento anual sobre el capital?", "12%", "8,3%", "24%", "120%"],
          16: ["Un gradiente inicia con $100 en el año 1 y aumenta $20 cada año. ¿Flujo del año 4?", "$160", "$140", "$180", "$80"],
          17: ["Cuota $500.000; interés del periodo $120.000. ¿Abono al principal?", "$380.000", "$620.000", "$120.000", "$500.000"],
          18: ["Costos fijos $600.000; precio $20.000; costo variable $12.000. ¿Punto de equilibrio?", "75 unidades", "60 unidades", "100 unidades", "50 unidades"],
          19: ["Alternativa A cuesta $1.000.000; B cuesta $1.150.000 y ahorra $200.000. ¿Ahorro incremental neto de B?", "$50.000", "$200.000", "$150.000", "$350.000"]
        },
        formulas: {
          0: { name: "Interés simple", display: "I = P × i × n", tokens: ["I", "=", "P", "×", "i", "×", "n"] },
          1: { name: "Interés compuesto", display: "F = P × (1 + i)ⁿ", tokens: ["F", "=", "P", "×", "(", "1", "+", "i", ")", "^", "n"] },
          2: { name: "Valor presente", display: "P = F ÷ (1 + i)ⁿ", tokens: ["P", "=", "F", "÷", "(", "1", "+", "i", ")", "^", "n"] },
          3: { name: "Valor futuro", display: "F = P × (1 + i)ⁿ", tokens: ["F", "=", "P", "×", "(", "1", "+", "i", ")", "^", "n"] },
          4: { name: "Anualidad vencida · valor presente", display: "P = A × [1 − (1 + i)⁻ⁿ] ÷ i", tokens: ["P", "=", "A", "×", "[1", "−", "(", "1", "+", "i", ")", "^", "−n", "]", "÷", "i"] },
          5: { name: "Anualidad vencida · valor futuro", display: "F = A × [(1 + i)ⁿ − 1] ÷ i", tokens: ["F", "=", "A", "×", "[(", "1", "+", "i", ")", "^", "n", "−", "1]", "÷", "i"] },
          6: { name: "Tasa periódica", display: "i = j ÷ m", tokens: ["i", "=", "j", "÷", "m"] },
          7: { name: "Tasa efectiva anual", display: "iₑ = (1 + j ÷ m)ᵐ − 1", tokens: ["ie", "=", "(", "1", "+", "j", "÷", "m", ")", "^", "m", "−", "1"] },
          8: { name: "Tasa real", display: "iᵣ = (1 + i) ÷ (1 + f) − 1", tokens: ["ir", "=", "(", "1", "+", "i", ")", "÷", "(", "1", "+", "f", ")", "−", "1"] },
          9: { name: "Valor Presente Neto", display: "VPN = Σ [FCₜ ÷ (1 + i)ᵗ] − I₀", tokens: ["VPN", "=", "Σ", "[FCt", "÷", "(", "1", "+", "i", ")", "^", "t]", "−", "I0"] },
          10: { name: "Tasa Interna de Retorno", display: "VPN(i = TIR) = 0", tokens: ["VPN", "(", "i", "=", "TIR", ")", "=", "0"] },
          11: { name: "Recuperación simple", display: "Periodo = inversión inicial ÷ flujo anual", tokens: ["Periodo", "=", "inversión", "÷", "flujo anual"] },
          12: { name: "Relación beneficio-costo", display: "B/C = VP beneficios ÷ VP costos", tokens: ["B/C", "=", "VP beneficios", "÷", "VP costos"] },
          13: { name: "Depreciación lineal", display: "D = (C − VR) ÷ n", tokens: ["D", "=", "(", "C", "−", "VR", ")", "÷", "n"] },
          14: { name: "Costo de oportunidad", display: "Costo = valor de la mejor alternativa no elegida", tokens: ["Costo", "=", "valor", "de", "la", "mejor", "alternativa", "no elegida"] },
          15: { name: "Rendimiento sobre capital", display: "Rendimiento = beneficio anual ÷ capital × 100%", tokens: ["Rendimiento", "=", "beneficio anual", "÷", "capital", "×", "100%"] },
          16: { name: "Gradiente aritmético", display: "Aₜ = A₁ + (t − 1) × G", tokens: ["At", "=", "A1", "+", "(", "t", "−", "1", ")", "×", "G"] },
          17: { name: "Abono a capital", display: "Abono = cuota − interés del periodo", tokens: ["Abono", "=", "cuota", "−", "interés"] },
          18: { name: "Punto de equilibrio", display: "Qₑ = CF ÷ (P − CVᵤ)", tokens: ["Qe", "=", "CF", "÷", "(", "P", "−", "CVu", ")"] },
          19: { name: "Análisis incremental", display: "Beneficio incremental neto = ahorro adicional − costo adicional", tokens: ["Beneficio neto", "=", "ahorro adicional", "−", "costo adicional"] }
        }
      },
      {
        name: "Programación distribuida",
        description: "Procesamiento asíncrono y funciones distribuidas para Workly: colas, workers, eventos, reintentos y consistencia.",
        topics: [
          ["Sistema distribuido", "Conjunto de procesos en equipos distintos que se comunican por una red y coordinan para ofrecer un servicio.", "La API de Workly recibe solicitudes mientras otros servicios procesan notificaciones y reportes.", "coordinar componentes independientes que se comunican por red"],
          ["Cola de tareas", "Estructura que almacena trabajos pendientes para que consumidores los procesen de forma asíncrona.", "La API agrega el envío de un correo a la cola y responde sin esperar a que el correo salga.", "desacoplar la recepción de una tarea de su ejecución"],
          ["Worker", "Proceso consumidor que obtiene trabajos de una cola y ejecuta la lógica asociada.", "Varios procesos de fondo toman tareas de notificación disponibles.", "procesar trabajos en segundo plano desde una cola"],
          ["Productor y consumidor", "El productor publica mensajes y el consumidor los recibe y procesa, sin requerir una llamada directa entre ambos.", "El servicio de tareas publica un evento y el servicio de reportes lo consume.", "separar quien genera un mensaje de quien lo procesa"],
          ["Procesamiento asíncrono", "Ejecución que permite continuar sin esperar la finalización inmediata de una operación lenta o remota.", "La interfaz confirma que una solicitud fue aceptada mientras un worker prepara el informe.", "evitar bloquear una petición mientras se completa una tarea de fondo"],
          ["Concurrencia", "Ejecución de varias tareas en periodos solapados, con coordinación cuando comparten recursos.", "Workers procesan tareas diferentes al mismo tiempo para aumentar el rendimiento.", "procesar varios trabajos simultáneamente sin conflictos"],
          ["Reintento con espera", "Repetición limitada de una operación transitoria, normalmente con demoras crecientes entre intentos.", "Si un proveedor de correo no responde, Workly reintenta después de una pausa.", "recuperarse de fallas temporales sin reintentar indefinidamente"],
          ["Idempotencia", "Propiedad por la que repetir la misma operación produce el mismo efecto final que ejecutarla una vez.", "Una solicitud de creación repetida tras un timeout no debe duplicar el mismo registro.", "evitar efectos duplicados cuando una operación se reenvía"],
          ["Entrega al menos una vez", "Garantía en la que un mensaje puede procesarse una o más veces, por lo que el consumidor debe tolerar duplicados.", "Una cola vuelve a entregar un trabajo si no recibió confirmación del worker.", "aceptar reentregas y diseñar el consumidor de forma idempotente"],
          ["Confirmación de mensaje (ack)", "Señal del consumidor de que terminó correctamente un trabajo y que puede retirarse de la cola.", "El worker confirma el trabajo solo después de guardar el resultado.", "indicar a la cola que el trabajo se procesó exitosamente"],
          ["Timeout", "Límite de tiempo para esperar una operación antes de considerarla fallida o cancelar la espera.", "Una llamada a un servicio remoto deja de esperar después de un plazo configurado.", "evitar que una operación remota espere indefinidamente"],
          ["Circuit breaker", "Mecanismo que detiene temporalmente llamadas a un servicio que falla repetidamente y permite probar su recuperación más tarde.", "Workly pausa llamadas a un proveedor caído para evitar saturarlo y liberar recursos.", "contener fallas repetidas de un servicio dependiente"],
          ["Partición de datos", "División de un conjunto de datos entre nodos para distribuir almacenamiento y carga.", "Los registros se asignan a particiones según el identificador de usuario.", "distribuir los datos y el trabajo entre varios nodos"],
          ["Replicación", "Mantenimiento de copias de datos en varios nodos para mejorar disponibilidad o lectura.", "Un servicio conserva réplicas para continuar leyendo si un nodo deja de responder.", "mantener copias de datos en distintos nodos"],
          ["Consistencia eventual", "Modelo en el que réplicas pueden diferir temporalmente pero convergen si dejan de llegar actualizaciones.", "Un cambio de perfil aparece en una réplica secundaria unos instantes después.", "entender que copias distribuidas pueden actualizarse con retraso"],
          ["Evento de dominio", "Registro de un hecho relevante que ya ocurrió y que otros componentes pueden consumir.", "Al completarse una tarea, el servicio publica `TaskCompleted` para actualizar notificaciones.", "comunicar un cambio ocurrido sin acoplar directamente servicios"],
          ["Dead-letter queue", "Cola de aislamiento para mensajes que agotaron los intentos de procesamiento o no pueden completarse.", "Un trabajo inválido se mueve a una cola de revisión en vez de bloquear la cola principal.", "separar trabajos fallidos para inspeccionarlos y recuperarlos"],
          ["Orden de mensajes", "Propiedad que determina si los mensajes se procesan en el mismo orden en que se publicaron.", "Las actualizaciones de una misma tarea deben conservar su secuencia aunque haya varios workers.", "preservar la secuencia cuando el flujo de negocio lo requiere"],
          ["Observabilidad distribuida", "Uso conjunto de logs, métricas y trazas para entender el comportamiento de operaciones entre servicios.", "Una traza enlaza la solicitud de la API con el trabajo de cola y la llamada del worker.", "diagnosticar el recorrido y desempeño de una operación entre servicios"],
          ["Consistencia e idempotencia en operaciones", "Diseño que controla escrituras repetidas y fallidas para mantener resultados confiables ante reintentos.", "Un identificador de operación permite detectar si una reserva ya fue creada.", "preservar resultados correctos ante reenvíos y fallas de red"]
        ],
        codeQuestions: {
          0: {
            prompt: "En este ejemplo didáctico de Workly, ¿qué responsabilidad tiene `enqueueTask`?",
            snippet: "async function enqueueTask(task) {\n  return queue.add('workly-task', task);\n}",
            choices: ["Guardar la tarea en una cola para procesarla después", "Ejecutar la tarea en el navegador antes de responder", "Eliminar todas las tareas pendientes", "Esperar hasta que un worker termine el trabajo"],
            correct: "Guardar la tarea en una cola para procesarla después",
            explanation: "`queue.add` publica el trabajo en la cola. La ejecución queda desacoplada y puede realizarla un worker."
          },
          1: {
            prompt: "¿Qué hace el worker al ejecutar `processNext`?",
            snippet: "async function processNext() {\n  const job = await queue.take();\n  await sendWorklyNotification(job.data);\n  await job.ack();\n}",
            choices: ["Obtiene un trabajo, procesa la notificación y confirma su éxito", "Crea una cola nueva por cada notificación", "Reintenta el mismo trabajo indefinidamente", "Confirma el trabajo antes de procesarlo"],
            correct: "Obtiene un trabajo, procesa la notificación y confirma su éxito",
            explanation: "`take` obtiene un trabajo; luego se procesa y `ack` confirma que terminó correctamente."
          },
          2: {
            prompt: "¿Qué ventaja busca `Promise.all` en este fragmento?",
            snippet: "const [profile, tasks] = await Promise.all([\n  getWorklyProfile(userId),\n  getWorklyTasks(userId),\n]);",
            choices: ["Solicitar el perfil y las tareas en paralelo y esperar ambos resultados", "Ejecutar primero el perfil y luego las tareas obligatoriamente", "Cancelar las dos solicitudes si una tarda más de un segundo", "Guardar ambas respuestas en una cola persistente"],
            correct: "Solicitar el perfil y las tareas en paralelo y esperar ambos resultados",
            explanation: "Las dos promesas independientes se inician juntas; `Promise.all` continúa cuando ambas se resuelven y falla si alguna rechaza."
          },
          3: {
            prompt: "¿Para qué sirve la demora creciente de `retry`?",
            snippet: "async function retry(job, attempt) {\n  const delayMs = 1000 * 2 ** attempt;\n  await wait(delayMs);\n  return queue.add('workly-task', job);\n}",
            choices: ["Esperar progresivamente antes de volver a encolar una tarea fallida", "Aumentar el número de workers en cada intento", "Marcar la tarea como completada sin ejecutarla", "Reducir el tiempo de espera en cada reintento"],
            correct: "Esperar progresivamente antes de volver a encolar una tarea fallida",
            explanation: "El retraso exponencial espacia los reintentos, lo que ayuda a no sobrecargar un servicio que presenta una falla temporal."
          },
          4: {
            prompt: "¿Qué evita el uso de `operationId` en esta función?",
            snippet: "async function createWorklyTask(input, operationId) {\n  return db.insertOrGetByUniqueKey(\n    { ...input, operationId },\n    'operationId',\n  );\n}",
            choices: ["Crear duplicados si la misma solicitud se reenvía", "Que dos usuarios consulten tareas al mismo tiempo", "Que la base de datos almacene el identificador", "La necesidad de validar los datos de entrada"],
            correct: "Crear duplicados si la misma solicitud se reenvía",
            explanation: "La operación atómica inserta una sola vez por `operationId` y devuelve el registro existente si llega una solicitud repetida. La base de datos debe aplicar una restricción única sobre esa clave."
          },
          5: {
            prompt: "¿Qué efecto tiene `concurrency: 5` en la configuración del worker?",
            snippet: "const worker = createWorker('workly-tasks', handleTask, {\n  concurrency: 5,\n});",
            choices: ["Permite procesar hasta cinco trabajos concurrentemente en ese worker", "Repite cada trabajo cinco veces", "Crea cinco colas independientes", "Espera cinco segundos antes de procesar cada trabajo"],
            correct: "Permite procesar hasta cinco trabajos concurrentemente en ese worker",
            explanation: "La concurrencia limita cuántos trabajos maneja simultáneamente esa instancia del worker; no implica que cada trabajo se repita."
          },
          6: {
            prompt: "¿Qué sucede cuando se agotan los intentos configurados?",
            snippet: "if (job.attemptsMade >= job.maxAttempts) {\n  await deadLetterQueue.add('failed-workly-task', job.data);\n  return;\n}",
            choices: ["El trabajo se envía a una cola de fallos para su inspección", "Se confirma como exitoso aunque haya fallado", "Se vuelve a procesar sin límite en la cola principal", "Se elimina también el historial de intentos"],
            correct: "El trabajo se envía a una cola de fallos para su inspección",
            explanation: "Una dead-letter queue aísla los trabajos que no pudieron completarse tras sus reintentos para permitir diagnóstico o recuperación."
          },
          7: {
            prompt: "¿Por qué se publica `TaskCompleted` después de guardar el resultado?",
            snippet: "const result = await runWorklyTask(job.data);\nawait results.save(job.id, result);\nawait events.publish({ type: 'TaskCompleted', taskId: job.id });",
            choices: ["Para notificar a otros componentes que la tarea terminó y su resultado ya fue guardado", "Para pedirle a otro servicio que ejecute la tarea dos veces", "Para borrar la tarea de la base de datos", "Para bloquear a los consumidores de eventos"],
            correct: "Para notificar a otros componentes que la tarea terminó y su resultado ya fue guardado",
            explanation: "El evento comunica un hecho ocurrido. Publicarlo después de persistir el resultado evita anunciar como finalizado un trabajo aún no guardado."
          },
          8: {
            prompt: "¿Qué patrón de resiliencia representa este control?",
            snippet: "if (circuit.isOpen()) {\n  throw new Error('Workly provider temporarily unavailable');\n}\nreturn circuit.call(() => provider.request(data));",
            choices: ["Circuit breaker: evita llamar temporalmente a un servicio que falla", "Worker: toma y confirma trabajos de una cola", "Partición: divide un conjunto de datos", "Replicación: crea copias de datos"],
            correct: "Circuit breaker: evita llamar temporalmente a un servicio que falla",
            explanation: "Cuando el circuito está abierto, se rechazan llamadas de inmediato para contener fallas y dar oportunidad de recuperación al servicio dependiente."
          },
          9: {
            prompt: "¿Qué aporta `Promise.allSettled` frente a `Promise.all` en este caso?",
            snippet: "const outcomes = await Promise.allSettled([\n  syncWorklyProfile(userId),\n  syncWorklyCalendar(userId),\n]);",
            choices: ["Devuelve el resultado de cada sincronización aunque alguna haya fallado", "Detiene la segunda sincronización si la primera falla", "Garantiza que ambas operaciones se guarden en una transacción", "Reintenta automáticamente las sincronizaciones fallidas"],
            correct: "Devuelve el resultado de cada sincronización aunque alguna haya fallado",
            explanation: "`Promise.allSettled` espera todas las promesas y reporta por separado si cada una se cumplió o rechazó; no hace reintentos ni crea una transacción."
          }
        }
      }
    ];
