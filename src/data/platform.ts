// Datos de ejemplo ficticios para el prototipo de Syntax. Reemplazar por fuentes reales más adelante.
// La interfaz está en español; el material de práctica (frases, respuestas modelo, preguntas de entrevista) se mantiene en inglés.

/** Career ladder used for both technical seniority and English communication. */
export type Level = "Entry level" | "Junior" | "Mid" | "Senior";
export const LEVELS: Level[] = ["Entry level", "Junior", "Mid", "Senior"];

export const student = {
  name: "Mariana Costa",
  initials: "MC",
  role: "Ingeniera Frontend",
  company: "Northwind Labs (ficticia)",
  location: "Lisboa, Portugal",
  timezone: "WET · UTC+0",
  nativeLanguage: "Portugués",
  memberSince: "Marzo de 2026",
  technical: {
    seniority: "Mid" as Level,
    years: 5,
    primaryStack: ["TypeScript", "React", "Next.js", "Tailwind CSS", "Node.js"],
    secondaryStack: ["GraphQL", "PostgreSQL", "Playwright", "AWS Lambda"],
    domains: ["Dashboards fintech", "Sistemas de diseño", "Accesibilidad"],
    history: [
      { period: "2024 — hoy", title: "Ingeniera Frontend", org: "Northwind Labs", note: "Responsable de la interfaz del panel de pagos y de la librería de componentes compartida." },
      { period: "2022 — 2024", title: "Desarrolladora Frontend Junior", org: "Atlas Digital", note: "Creó sitios de marketing y herramientas internas para clientes europeos." },
      { period: "2021 — 2022", title: "Practicante de Desarrollo Web", org: "Porto Tech Hub", note: "Auditorías de accesibilidad y refactorización de componentes." },
    ],
  },
  english: {
    level: "Mid" as Level,
    label: "Trabaja de forma independiente en inglés",
    lastAssessed: "30 de oct. de 2026",
    skills: [
      { skill: "Lectura", level: "Sólido", value: 82 },
      { skill: "Comprensión auditiva", level: "Sólido", value: 74 },
      { skill: "Escritura", level: "En desarrollo", value: 66 },
      { skill: "Expresión oral", level: "En desarrollo", value: 61 },
    ],
  },
  communication: { current: "Junior" as Level, target: "Mid" as Level, progressToNext: 64 },
  objectives: {
    targetRole: "Ingeniera Frontend Senior en un equipo de producto distribuido y de habla inglesa",
    horizon: "12 meses · para nov. de 2027",
    contexts: ["Liderar discusiones técnicas", "Propuestas escritas asíncronas (RFC)", "Demos con equipos multidisciplinarios", "Entrevistas internacionales"],
  },
  preferences: {
    sessionSlot: "Mar. y jue. · 18:00–19:00 WET",
    tutor: "Daniel Okafor",
    accent: "Internacional neutro",
    feedbackStyle: "Directo, con reescrituras modelo",
  },
};

export const currentSprint = {
  code: "Sprint 07",
  title: "Comunicación en code reviews",
  scenario: "Explicar ventajas y desventajas técnicas y expresar desacuerdo de forma constructiva en revisiones de pull requests.",
  start: "16 nov.",
  end: "20 nov. 2026",
  totalDays: 5,
  currentDay: 3,
  progress: 46,
  outcomes: [
    "Escribir comentarios de revisión que distingan los problemas bloqueantes de las sugerencias",
    "Justificar una decisión técnica con un lenguaje claro de causa y efecto",
    "Responder a críticas sin sonar a la defensiva",
  ],
};

export type SprintDayStatus = "done" | "current" | "todo";

/** Weekly Scrum plan: planning on Monday, review and retrospective on Friday. */
export const sprintPlan: {
  weekLabel: string;
  plannedTime: string;
  focusedTime: string;
  completed: number;
  total: number;
  days: { day: string; date: string; title: string; detail: string; duration: string; status: SprintDayStatus }[];
} = {
  weekLabel: "Week 1 · Learning schedule",
  plannedTime: "2 h 10 min",
  focusedTime: "45 min",
  completed: 2,
  total: 5,
  days: [
    { day: "Mon", date: "16", title: "Sprint planning", detail: "Set the sprint goal and the vocabulary you need.", duration: "20 min", status: "done" },
    { day: "Tue", date: "17", title: "Technical understanding", detail: "Identify blocking issues vs. suggestions in a PR thread.", duration: "25 min", status: "done" },
    { day: "Wed", date: "18", title: "Communication practice", detail: "Rewrite review comments in your own words.", duration: "25 min", status: "current" },
    { day: "Thu", date: "19", title: "Interview preparation", detail: "Rehearse follow-up questions about your decisions.", duration: "30 min", status: "todo" },
    { day: "Fri", date: "20", title: "Sprint review", detail: "1:1 review, feedback and retrospective.", duration: "30 min", status: "todo" },
  ],
};

export const sprintDeliverable = {
  title: "Reescribe tres comentarios reales de PR",
  detail: "Elige tres comentarios de tu último pull request y reescríbelos con intención explícita, evidencia y una alternativa concreta.",
  meta: "Escrito · 3 comentarios · revisión de Daniel",
  due: "Vie., 20 nov.",
};

export type Task = { id: string; title: string; kind: "Video" | "Ejercicio" | "Tarea" | "Lectura"; duration: string; status: "done" | "in-progress" | "todo"; due?: string };

export const sprintTasks: Task[] = [
  { id: "t1", title: "Lenguaje atenuado y cortés en las revisiones", kind: "Video", duration: "9 min", status: "done" },
  { id: "t2", title: "Comentarios bloqueantes vs. no bloqueantes", kind: "Ejercicio", duration: "15 min", status: "in-progress" },
  { id: "t3", title: "Reescribe tres comentarios reales de PR", kind: "Tarea", duration: "30 min", status: "todo", due: "24 nov." },
  { id: "t4", title: "Banco de frases: proponer alternativas", kind: "Lectura", duration: "6 min", status: "todo" },
];

export const materials = [
  { id: "m1", title: "Banco de frases: proponer alternativas", type: "Banco de frases", read: "6 min", summary: "40 frases probadas en el trabajo para sugerir otro enfoque sin desmerecer el trabajo de quien escribió el código." },
  { id: "m2", title: "Conventional Comments, explicado", type: "Guía", read: "8 min", summary: "Etiqueta tu intención — praise, nitpick, issue, suggestion — para que el tono nunca sea ambiguo." },
  { id: "m3", title: "Conectores de causa y efecto para el razonamiento técnico", type: "Gramática en contexto", read: "10 min", summary: "Because, therefore, as a result, which means — y en qué situaciones suena natural cada uno." },
  { id: "m4", title: "Glosario: flujo de revisión y merge", type: "Glosario", read: "5 min", summary: "LGTM, nit, follow-up, stacked PRs, squash and merge, approve with changes." },
  { id: "m5", title: "Caso de estudio: un hilo de revisión que salió mal", type: "Caso de estudio", read: "12 min", summary: "Un hilo comentado de un equipo ficticio, con una versión reescrita y notas del tutor." },
];

export const videoLessons = [
  { id: "v1", title: "Lenguaje atenuado y cortés en las revisiones", duration: "9:12", speaker: "Daniel Okafor", watched: true, chapters: ["Por qué el tono se pierde por escrito", "Verbos modales: could, might, would", "Preguntas en lugar de órdenes", "Práctica de reescritura"] },
  { id: "v2", title: "Cómo expresar desacuerdo con un ingeniero senior", duration: "7:40", speaker: "Priya Raman", watched: false, chapters: ["Reconoce primero", "Aporta evidencia", "Propón un camino a seguir"] },
  { id: "v3", title: "Explicar ventajas y desventajas de rendimiento", duration: "11:05", speaker: "Daniel Okafor", watched: false, chapters: ["Cuantificar el impacto", "Comparativos y superlativos", "Resumir la decisión"] },
  { id: "v4", title: "Responder a comentarios sobre tu propio PR", duration: "6:18", speaker: "Priya Raman", watched: false, chapters: ["Agradecer sin exagerar", "Objetar con cortesía", "Cerrar el ciclo"] },
];

export const choiceExercise = {
  context: "El PR de un compañero agrega una nueva librería de fechas. El proyecto ya usa date-fns. Crees que el cambio aumenta el peso del bundle sin un beneficio claro.",
  question: "¿Cuál comentario de revisión es el más profesional y claro?",
  options: [
    { id: "a", text: "Why did you add another date library? We already have date-fns.", feedback: "Es directo, pero la estructura «why did you» puede sonar acusatoria por escrito." },
    { id: "b", text: "issue (non-blocking): We already depend on date-fns, so this would add ~18 kB. Could we use its formatInTimeZone instead? Happy to pair on it.", feedback: "Etiqueta clara de intención, evidencia, una alternativa concreta y una oferta de ayuda. Esta es la respuesta modelo.", correct: true },
    { id: "c", text: "This is wrong, please remove the library.", feedback: "Bloqueante y sin explicación. Quien escribió el código no tiene contexto sobre la decisión." },
    { id: "d", text: "Maybe possibly we could perhaps think about not adding this?", feedback: "Demasiado atenuado. Suavizar en exceso hace que la petición no se entienda." },
  ],
};

export const rewriteExercise = {
  context: "Comentario original en el PR de un compañero:",
  original: "This function is too long and confusing. Split it.",
  modelAnswer:
    "suggestion: This function handles validation, formatting and the API call, which makes it harder to follow. What do you think about extracting validation into its own helper? It would also make the edge cases easier to test.",
};

export const assignments = [
  { id: "a1", title: "Reescribe tres comentarios reales de PR", deliverable: "Escrito · 3 comentarios", due: "20 nov.", status: "Sin empezar", reviewer: "Daniel Okafor" },
  { id: "a2", title: "Graba una explicación de 2 minutos sobre una decisión de diseño", deliverable: "Audio · 2 min", due: "26 nov.", status: "Sin empezar", reviewer: "Daniel Okafor" },
  { id: "a3", title: "Responde a una crítica sobre tu propio PR", deliverable: "Escrito · respuesta en hilo", due: "21 nov.", status: "Entregada", reviewer: "Priya Raman" },
  { id: "a4", title: "Nota de retrospectiva del Sprint 06", deliverable: "Escrito · 150 palabras", due: "15 nov.", status: "Revisada", reviewer: "Daniel Okafor" },
];

export const upcomingSessions = [
  { id: "s1", date: "Vie., 20 nov.", time: "18:00 – 19:00 WET", tutor: "Daniel Okafor", type: "Sprint 07 review & retrospective", focus: "Cierre del sprint: feedback de los comentarios reescritos y objetivos del Sprint 08" },
  { id: "s2", date: "Jue., 26 nov.", time: "18:00 – 18:45 WET", tutor: "Priya Raman", type: "Sprint 08 · ensayo de entrevista", focus: "Ronda conductual de frontend: conflictos y responsabilidad" },
  { id: "s3", date: "Lun., 30 nov.", time: "18:00 – 19:00 WET", tutor: "Daniel Okafor", type: "Sprint 09 planning", focus: "Planificación del siguiente sprint y revisión de objetivos" },
];

export const nextSession = {
  ...upcomingSessions[0]!,
  agenda: [
    "Repasar tus tres comentarios de PR reescritos",
    "Feedback del sprint: claridad, tono y estructura",
    "Retrospectiva: qué funcionó y qué cambiamos en el Sprint 08",
    "Acordar los objetivos del Sprint 08",
  ],
  prep: [
    { id: "p1", label: "Entrega la tarea de reescritura de PR" },
    { id: "p2", label: "Mira «Cómo expresar desacuerdo con un ingeniero senior»" },
    { id: "p3", label: "Anota una decisión del sprint que quieras revisar en la retro" },
  ],
};

export const pastReviews = [
  {
    id: "r6",
    sprint: "Sprint 06",
    title: "Actualizaciones de estado asíncronas",
    date: "13 nov. 2026",
    tutor: "Daniel Okafor",
    summary:
      "Tus actualizaciones escritas ahora son concisas y están bien estructuradas. La principal oportunidad es señalar los riesgos desde el inicio: los bloqueos todavía aparecen al final en lugar de en la primera línea.",
    strengths: ["Estructura BLUF clara en la mayoría de las actualizaciones", "Uso correcto del past continuous para trabajo en curso", "Buen vocabulario para alcance y estimaciones"],
    focus: ["Empezar con riesgos y bloqueos", "Variar el inicio de las oraciones — evitar empezar siempre con «I»", "Usar correctamente «by» y «until» con fechas límite"],
    scores: [
      { label: "Claridad", value: 4 },
      { label: "Estructura", value: 4 },
      { label: "Precisión", value: 3 },
      { label: "Registro", value: 3 },
      { label: "Fluidez", value: 3 },
    ],
    objectives: [
      { text: "Abrir cada actualización de estado con los bloqueos o «No blockers»", status: "Logrado" },
      { text: "Escribir un resumen semanal en inglés para tu manager", status: "En curso" },
    ],
  },
  {
    id: "r5",
    sprint: "Sprint 05",
    title: "Reuniones diarias (stand-ups)",
    date: "30 oct. 2026",
    tutor: "Daniel Okafor",
    summary:
      "Hablas con seguridad sobre tu propio trabajo. Cuando te hacen preguntas de seguimiento tiendes a explicar de más; practica dar primero la respuesta corta y luego ofrecer detalles.",
    strengths: ["Presentación segura de ayer / hoy / bloqueos", "Uso natural de «I'm currently working on…»"],
    focus: ["Primero la respuesta corta, el detalle si lo piden", "Conectores al enumerar tareas", "Sonidos consonánticos finales en verbos en pasado"],
    scores: [
      { label: "Claridad", value: 3 },
      { label: "Estructura", value: 3 },
      { label: "Precisión", value: 3 },
      { label: "Registro", value: 4 },
      { label: "Fluidez", value: 3 },
    ],
    objectives: [
      { text: "Mantener las actualizaciones del stand-up por debajo de 60 segundos", status: "Logrado" },
      { text: "Hacer una pregunta aclaratoria en cada reunión", status: "Logrado" },
    ],
  },
  {
    id: "r4",
    sprint: "Sprint 04",
    title: "Explicar bugs e incidentes",
    date: "16 oct. 2026",
    tutor: "Priya Raman",
    summary:
      "Gran precisión técnica. Tus explicaciones de incidentes mejoraron al adoptar una estructura de línea de tiempo. Cuida la coherencia de los tiempos verbales al pasar de lo que ocurrió a lo que vas a cambiar.",
    strengths: ["Vocabulario técnico preciso", "Narración del incidente basada en una línea de tiempo"],
    focus: ["Coherencia de tiempos: past simple vs. present perfect", "Voz pasiva para un tono neutral y sin culpas"],
    scores: [
      { label: "Claridad", value: 4 },
      { label: "Estructura", value: 3 },
      { label: "Precisión", value: 2 },
      { label: "Registro", value: 3 },
      { label: "Fluidez", value: 3 },
    ],
    objectives: [{ text: "Redactar un borrador de post-mortem sin culpas", status: "Logrado" }],
  },
];

export const learningObjectives = [
  { id: "o1", text: "Conducir una discusión técnica de 15 minutos en inglés sin recurrir a notas", axis: "Expresión oral", target: "Dic. 2026", progress: 55 },
  { id: "o2", text: "Escribir comentarios de revisión siempre claros en intención y prioridad", axis: "Escritura", target: "Nov. 2026", progress: 70 },
  { id: "o3", text: "Explicar decisiones de arquitectura a personas no técnicas", axis: "Stakeholders", target: "Ene. 2027", progress: 30 },
  { id: "o4", text: "Superar con confianza un proceso completo de entrevistas frontend en inglés", axis: "Entrevistas", target: "Mar. 2027", progress: 22 },
];

export type Domain = {
  id: string;
  name: string;
  level: number; // índice en LEVELS alcanzado actualmente (0-3)
  progress: number; // % hacia el siguiente nivel
  descriptors: Record<Level, string[]>;
  evidence: string[];
};

export const competencyDomains: Domain[] = [
  {
    id: "meetings",
    name: "Reuniones y stand-ups",
    level: 2,
    progress: 20,
    descriptors: {
      "Entry level": ["Da una actualización de estado básica cuando se le pide", "Entiende preguntas sencillas sobre sus tareas"],
      Junior: ["Presenta una actualización estructurada de ayer / hoy / bloqueos", "Pide aclaraciones con cortesía"],
      Mid: ["Mantiene las actualizaciones concisas y responde directamente a las preguntas", "Plantea riesgos de forma proactiva en grupo"],
      Senior: ["Facilita reuniones y orienta la discusión hacia decisiones", "Resume acuerdos y responsables al final"],
    },
    evidence: ["Revisión del Sprint 05 — juego de roles de stand-up", "Stand-up grabado, 28 oct."],
  },
  {
    id: "async",
    name: "Comunicación escrita asíncrona",
    level: 2,
    progress: 45,
    descriptors: {
      "Entry level": ["Escribe mensajes cortos con errores frecuentes", "Depende de traductores para textos largos"],
      Junior: ["Escribe mensajes de estado y tickets claros", "Usa un registro cortés y consistente"],
      Mid: ["Estructura las actualizaciones con el mensaje clave primero", "Adapta la extensión y el detalle a la audiencia"],
      Senior: ["Escribe RFC y propuestas persuasivas", "Impulsa decisiones de forma asíncrona entre zonas horarias"],
    },
    evidence: ["Evaluación del Sprint 06 — claridad 4/5", "Borradores de resúmenes semanales"],
  },
  {
    id: "review",
    name: "Revisión de código",
    level: 1,
    progress: 64,
    descriptors: {
      "Entry level": ["Aprueba o pide cambios con comentarios mínimos"],
      Junior: ["Deja comentarios específicos en líneas de código", "Agradece a quienes revisan y reconoce sus comentarios"],
      Mid: ["Distingue los problemas bloqueantes de las sugerencias", "Justifica sus pedidos con evidencia y ofrece alternativas"],
      Senior: ["Hace mentoría a través de la revisión, enseñando en lugar de corregir", "Resuelve desacuerdos y documenta las decisiones"],
    },
    evidence: ["Sprint 07 en curso", "Respuesta a una crítica — entregada"],
  },
  {
    id: "explain",
    name: "Explicación técnica",
    level: 1,
    progress: 50,
    descriptors: {
      "Entry level": ["Nombra tecnologías y describe funciones básicas"],
      Junior: ["Explica paso a paso cómo funciona su propio código"],
      Mid: ["Explica por qué eligió una solución, con sus ventajas y desventajas", "Usa analogías con oyentes menos técnicos"],
      Senior: ["Explica la arquitectura del sistema y sus implicaciones a largo plazo", "Ajusta la profundidad en tiempo real según la audiencia"],
    },
    evidence: ["Explicación del incidente del Sprint 04", "Laboratorio de entrevistas — análisis de renderizado en React"],
  },
  {
    id: "stakeholders",
    name: "Comunicación con stakeholders",
    level: 1,
    progress: 15,
    descriptors: {
      "Entry level": ["Entiende los pedidos de los product managers"],
      Junior: ["Confirma requisitos y hace preguntas básicas de alcance"],
      Mid: ["Negocia alcance y plazos con diplomacia", "Traduce el riesgo técnico a impacto de negocio"],
      Senior: ["Influye en las decisiones del roadmap", "Gestiona expectativas con la alta dirección"],
    },
    evidence: ["Planificado para el Sprint 09"],
  },
  {
    id: "interviews",
    name: "Entrevistas y conversaciones de carrera",
    level: 1,
    progress: 30,
    descriptors: {
      "Entry level": ["Se presenta y habla de su trayectoria con preparación previa"],
      Junior: ["Responde preguntas conductuales comunes con ejemplos"],
      Mid: ["Usa la estructura STAR con fluidez y maneja preguntas de seguimiento", "Piensa en voz alta con claridad en rondas técnicas"],
      Senior: ["Lidera la conversación y negocia ofertas con seguridad"],
    },
    evidence: ["Laboratorio de entrevistas — 3 simulaciones completadas"],
  },
];

export const pathway = [
  { level: "Entry level" as Level, status: "complete", period: "Mar. — may. 2026", focus: "Inglés cotidiano en el trabajo, presentaciones, actualizaciones de estado básicas" },
  { level: "Junior" as Level, status: "current", period: "Jun. 2026 — hoy", focus: "Actualizaciones estructuradas, redacción de tickets, bases de code review, explicación de incidentes" },
  { level: "Mid" as Level, status: "next", period: "Est. feb. 2027", focus: "Ventajas y desventajas técnicas, facilitación, negociación con stakeholders, fluidez en entrevistas" },
  { level: "Senior" as Level, status: "future", period: "Est. 4.º trim. 2027", focus: "RFC, influir en decisiones, mentoría, presencia de liderazgo" },
];

export type Track = "frontend" | "backend" | "fullstack";

export const interviewTracks: Record<Track, { label: string; description: string; simulations: Simulation[] }> = {
  frontend: {
    label: "Frontend",
    description: "React, rendimiento en el navegador, accesibilidad y arquitectura de interfaces.",
    simulations: [
      {
        id: "fe-behavioural",
        title: "Ronda conductual: conflicto en un code review",
        format: "Conductual",
        duration: "25 min",
        interviewer: "Engineering Manager, empresa de producto",
        languageFocus: "Estructura STAR, tiempos verbales narrativos en pasado",
        questions: [
          "Tell me about a time you disagreed with a teammate's approach in a code review. What happened?",
          "How did you make sure the conversation stayed productive?",
          "Looking back, what would you do differently?",
        ],
        phrases: ["The situation was that…", "What I proposed instead was…", "In hindsight, I would have…", "The outcome was…"],
      },
      {
        id: "fe-deep",
        title: "Análisis técnico: renderizado en React",
        format: "Técnica",
        duration: "35 min",
        interviewer: "Senior Frontend Engineer",
        languageFocus: "Explicar procesos, causa y efecto",
        questions: [
          "Walk me through what happens when state changes in a React component.",
          "When would you reach for memoisation, and when is it counter-productive?",
          "How would you diagnose a slow list that re-renders on every keystroke?",
        ],
        phrases: ["First… then… as a result…", "This triggers…", "The trade-off here is…", "I'd start by profiling…"],
      },
      {
        id: "fe-design",
        title: "Diseño de sistemas: centro de notificaciones en tiempo real",
        format: "Diseño de sistemas",
        duration: "45 min",
        interviewer: "Staff Engineer",
        languageFocus: "Preguntas aclaratorias, pensar en voz alta",
        questions: [
          "Design the frontend for a notification centre that updates in real time.",
          "How would you handle offline users and missed events?",
          "What would you measure to know the feature is working well?",
        ],
        phrases: ["Before I start, can I clarify…", "Let me think out loud for a moment…", "One option would be… another would be…", "I'd prioritise… because…"],
      },
    ],
  },
  backend: {
    label: "Backend",
    description: "APIs, modelado de datos, confiabilidad y sistemas distribuidos.",
    simulations: [
      {
        id: "be-api",
        title: "Diseño de API: servicio de webhooks de pagos",
        format: "Técnica",
        duration: "35 min",
        interviewer: "Senior Backend Engineer",
        languageFocus: "Describir contratos y casos límite",
        questions: [
          "Design an endpoint that receives payment webhooks from a provider.",
          "How do you guarantee idempotency?",
          "What happens when your database is temporarily unavailable?",
        ],
        phrases: ["The contract would look like…", "To guarantee that…, we could…", "In the failure case…", "That depends on whether…"],
      },
      {
        id: "be-incident",
        title: "Ronda conductual: hacerse cargo de un incidente en producción",
        format: "Conductual",
        duration: "25 min",
        interviewer: "Engineering Manager",
        languageFocus: "Lenguaje sin culpas, voz pasiva",
        questions: [
          "Describe a production incident you were involved in.",
          "How did you communicate with stakeholders during the incident?",
          "What changed in your team's process afterwards?",
        ],
        phrases: ["The issue was detected when…", "We immediately…", "Stakeholders were kept informed by…", "As a follow-up, we introduced…"],
      },
    ],
  },
  fullstack: {
    label: "Full-stack",
    description: "Funcionalidades de punta a punta, visión de producto y decisiones entre capas.",
    simulations: [
      {
        id: "fs-feature",
        title: "Ronda de producto: lanzar una funcionalidad de punta a punta",
        format: "Producto y técnica",
        duration: "40 min",
        interviewer: "Head of Engineering, startup",
        languageFocus: "Definir alcance, priorizar, justificar decisiones",
        questions: [
          "Walk me through a feature you built from database to UI.",
          "Which trade-offs did you make to ship on time?",
          "How did you collaborate with design and product?",
        ],
        phrases: ["The goal of the feature was…", "We decided to cut… in order to…", "On the backend side…", "I worked closely with…"],
      },
      {
        id: "fs-pair",
        title: "Programación en pareja: depurar un bug en el checkout",
        format: "Código en vivo",
        duration: "30 min",
        interviewer: "Senior Full-stack Engineer",
        languageFocus: "Narrar acciones, pedir pistas",
        questions: [
          "The total price is wrong for some users. How would you start investigating?",
          "You've found a race condition. Explain it to me.",
          "How would you write a test that prevents this regression?",
        ],
        phrases: ["I'm going to check… first", "My hypothesis is that…", "Could you give me a hint on…?", "This test would assert that…"],
      },
    ],
  },
};

export type Simulation = {
  id: string;
  title: string;
  format: string;
  duration: string;
  interviewer: string;
  languageFocus: string;
  questions: string[];
  phrases: string[];
};

export const interviewHistory = [
  { id: "h1", title: "Análisis técnico: renderizado en React", track: "Frontend", date: "12 nov.", technical: 4, communication: 3 },
  { id: "h2", title: "Ronda conductual: conflicto en un code review", track: "Frontend", date: "3 nov.", technical: 4, communication: 3 },
  { id: "h3", title: "Ronda de producto: lanzar una funcionalidad de punta a punta", track: "Full-stack", date: "22 oct.", technical: 3, communication: 2 },
];

/** Written practice: explain real code in English instead of solving it. */
export const learningPad = {
  label: "Learning pad · JavaScript",
  language: "JavaScript",
  intro: "Read the fragment and explain it in your own words. You already know how to code; this trains the explanation.",
  code: `const activeUsers = users.filter(
  user => user.isActive
);`,
  question: "What does this code do, and why would you use filter instead of map?",
  placeholder: "This code creates a new array…",
  reference:
    "It builds a new array containing only the users whose isActive flag is true. filter is the right choice because we want a subset of the original array; map would transform every user and return the same number of items, which changes the meaning of the result.",
  note: "Language practice only. It does not replace your tutor's assessment.",
};

export type Flashcard = {
  term: string;
  conceptual: string;
  contextual: string;
  productive: string;
  interview: string;
};

/** Active recall deck: concept, workplace context, production and interview follow-up. */
export const flashcards: Flashcard[] = [
  {
    term: "Scalability",
    conceptual: "How well a system keeps working when users, data or traffic grow.",
    contextual: "Used when discussing growth, capacity planning and architecture trade-offs.",
    productive: "Our API is not scalable under peak traffic because every request hits the same database.",
    interview: "How would you make a web application more scalable?",
  },
  {
    term: "Idempotency",
    conceptual: "An operation that produces the same result whether it runs once or many times.",
    contextual: "Comes up in payments, webhooks and retry logic.",
    productive: "The endpoint is idempotent because duplicate requests are ignored through an idempotency key.",
    interview: "How do you guarantee that a payment webhook is processed only once?",
  },
  {
    term: "Race condition",
    conceptual: "A bug where the outcome depends on the unpredictable order of concurrent operations.",
    contextual: "Used when debugging totals, inventory or shared state under load.",
    productive: "We had a race condition because two requests updated the same record at the same time.",
    interview: "Tell me about a bug caused by concurrency. How did you fix it?",
  },
  {
    term: "Technical debt",
    conceptual: "The future cost of shipping a quick solution instead of the cleaner one.",
    contextual: "Used in estimations, refactor proposals and roadmap conversations.",
    productive: "We are paying technical debt on the billing module, which slows down every new feature.",
    interview: "How do you decide when to pay down technical debt?",
  },
];
