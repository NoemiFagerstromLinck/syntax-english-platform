export type AppRoute =
  | "/dashboard"
  | "/sprint"
  | "/learning-pad"
  | "/competencies"
  | "/sessions"
  | "/interview-lab"
  | "/profile";

export type FaqLink = { label: string; to: AppRoute } | { label: string; href: string };

export type FaqItem = {
  id: string;
  question: string;
  answer: string;
  keywords: string[];
  link?: FaqLink;
};

/** Pre-signup questions, shown on the landing. */
export const publicFaq: FaqItem[] = [
  {
    id: "what",
    question: "¿Qué es dCoder?",
    answer:
      "dCoder es una plataforma para entrenar el inglés que se usa en el trabajo: explicar decisiones, dejar comentarios en un PR y pasar entrevistas técnicas. Se practica en sprints de cinco días, con retos que se parecen a tu día a día.",
    keywords: ["que es", "plataforma", "dcoder", "sirve", "hace"],
    link: { label: "Ver el programa", href: "#programa" },
  },
  {
    id: "sprint",
    question: "¿Cómo funciona un sprint?",
    answer:
      "El lunes eliges un reto, de martes a jueves practicas con ejercicios y flashcards, y el viernes revisas tu avance con feedback 1:1. La semana siguiente empieza un reto nuevo.",
    keywords: ["sprint", "semana", "funciona", "metodologia", "scrum", "planning", "review"],
    link: { label: "Así se ve por dentro", to: "/dashboard" },
  },
  {
    id: "time",
    question: "¿Cuánto tiempo requiere?",
    answer:
      "Entre 20 y 30 minutos al día, cinco días a la semana. En total son unas 2 horas semanales, incluyendo la sesión de review del viernes.",
    keywords: ["tiempo", "horas", "cuanto", "dedicar", "carga", "minutos"],
  },
  {
    id: "level",
    question: "¿Necesito un nivel específico?",
    answer:
      "Empiezas donde estás y avanzas por Entry level, Junior, Mid y Senior según lo que puedes hacer en inglés en situaciones reales. Tu nivel técnico y tu nivel de inglés se miden por separado.",
    keywords: ["nivel", "principiante", "b1", "b2", "ingles", "entry", "junior", "mid", "senior"],
  },
  {
    id: "track",
    question: "¿Es para frontend, backend o full-stack?",
    answer:
      "Para los tres. Los retos y las simulaciones de entrevista se adaptan a tu perfil; puedes practicar el track que necesites sin cambiar de plataforma.",
    keywords: ["frontend", "backend", "fullstack", "full-stack", "stack", "perfil", "rama"],
  },
  {
    id: "live",
    question: "¿Hay clases en vivo?",
    answer:
      "Tienes una sesión 1:1 al cierre de cada sprint para revisar tu trabajo y acordar el siguiente paso. El resto es práctica guiada que puedes hacer a tu ritmo.",
    keywords: ["clases", "vivo", "tutor", "profesor", "sesion", "1:1", "uno a uno"],
  },
  {
    id: "signup",
    question: "¿Cómo me inscribo?",
    answer:
      "Haz clic en Inscríbete y entra a la demo con datos de ejemplo. No necesitas tarjeta ni registro para probarla; puedes recorrer el dashboard completo antes de crear tu cuenta.",
    keywords: ["inscribo", "inscripcion", "registro", "cuenta", "entrar", "empezar", "demo"],
    link: { label: "Entrar a la demo", to: "/dashboard" },
  },
  {
    id: "after",
    question: "¿Qué pasa cuando termino un sprint?",
    answer:
      "Recibes feedback, actualizas tu perfil de competencias y arrancas el siguiente reto con objetivos claros. Tu progreso queda en los niveles Entry level, Junior, Mid y Senior.",
    keywords: ["termino", "despues", "siguiente", "avance", "progreso", "competencias"],
    link: { label: "Ver el perfil de competencias", to: "/competencies" },
  },
];

/** In-product questions, shown on every app page. */
export const appFaq: FaqItem[] = [
  {
    id: "current-sprint",
    question: "¿Cómo funciona el sprint actual?",
    answer:
      "Cada sprint dura cinco días: planning el lunes, práctica de martes a jueves y review el viernes. En el dashboard ves el día en que estás, el reto y las métricas de avance.",
    keywords: ["sprint", "actual", "semana", "planning", "review", "dia", "progreso"],
    link: { label: "Ir al dashboard", to: "/dashboard" },
  },
  {
    id: "writing",
    question: "¿Dónde practico la escritura?",
    answer:
      "En el Learning Pad. Lees un fragmento de código, lo explicas en inglés y comparas tu respuesta con una versión de referencia. No se trata de escribir código, sino de explicarlo.",
    keywords: ["escritura", "escribir", "practicar", "learning", "pad", "codigo", "explicar"],
    link: { label: "Abrir Learning Pad", to: "/learning-pad" },
  },
  {
    id: "flashcards",
    question: "¿Qué son las flashcards?",
    answer:
      "Son tarjetas de recall para fijar conceptos técnicos. Intentas explicar el término, revelas la respuesta y la calificas para programar el próximo repaso.",
    keywords: ["flashcards", "tarjetas", "recall", "memorizar", "repaso", "conceptos"],
    link: { label: "Practicar flashcards", to: "/learning-pad" },
  },
  {
    id: "session",
    question: "¿Cómo preparo mi sesión 1:1?",
    answer:
      "En Tutor Sessions tienes la agenda de la próxima sesión y una lista de preparación. Marca los pasos y llega con una entrega o una duda concreta para aprovechar el tiempo.",
    keywords: ["sesion", "preparar", "tutor", "1:1", "agenda", "review", "manana"],
    link: { label: "Ver Tutor Sessions", to: "/sessions" },
  },
  {
    id: "level-up",
    question: "¿Cómo subo de nivel?",
    answer:
      "Tu nivel de comunicación sube cuando demuestras los descriptores del siguiente nivel en tus retos y sesiones. En Competency Profile ves qué te falta en cada dominio.",
    keywords: ["subir", "nivel", "avanzar", "competencia", "dominio", "descriptor"],
    link: { label: "Ver Competency Profile", to: "/competencies" },
  },
  {
    id: "progress",
    question: "¿Dónde veo mi progreso?",
    answer:
      "En el dashboard ves el sprint, las tareas completadas y el tiempo de foco. En Student Profile están tu nivel técnico, tu inglés y tu objetivo profesional.",
    keywords: ["progreso", "avance", "perfil", "metricas", "tiempo", "tareas"],
    link: { label: "Ver mi perfil", to: "/profile" },
  },
  {
    id: "retry",
    question: "¿Puedo repetir un ejercicio?",
    answer:
      "Sí. Puedes volver al sprint y repetir un ejercicio, o simular de nuevo una entrevista completa desde Interview Lab. Las simulaciones no se bloquean al terminarlas.",
    keywords: ["repetir", "volver", "ejercicio", "entrevista", "simulacion", "practicar"],
    link: { label: "Ir a Interview Lab", to: "/interview-lab" },
  },
  {
    id: "lessons",
    question: "¿Dónde están las lecciones del sprint?",
    answer:
      "En Sprint Workspace. Ahí tienes las video lessons, los ejercicios, las assignments y los materiales del sprint, todo en el mismo lugar.",
    keywords: ["lecciones", "modulos", "modulo", "videos", "materiales", "workspace", "contenido"],
    link: { label: "Abrir Sprint Workspace", to: "/sprint" },
  },
  {
    id: "assignments",
    question: "¿Cómo entrego una tarea?",
    answer:
      "Entra a Sprint Workspace y abre la pestaña Assignments. Revisa el entregable, envíalo y tu tutor lo comentará en la sesión 1:1 del viernes.",
    keywords: ["tarea", "entregar", "entrega", "assignment", "deber", "subir"],
    link: { label: "Ver mis tareas", to: "/sprint" },
  },
  {
    id: "theme",
    question: "¿Cómo cambio entre los temas?",
    answer:
      "Usa el interruptor al final del menú lateral para cambiar entre Obsidian (oscuro) y Paper (blanco y negro). La elección se guarda en este navegador.",
    keywords: ["tema", "colores", "oscuro", "claro", "paper", "obsidian", "cambiar"],
  },
];
