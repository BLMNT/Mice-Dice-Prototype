const baseEvents = [
  {
    text: "Um rato selvagem aparece!",
    type: "combat",
    options: [
      { label: "Atacar", effect: "damage" },
      { label: "Fugir", effect: "none" }
    ]
  },
  {
    text: "Você encontrou um queijo no chão.",
    type: "heal",
    options: [
      { label: "Comer", effect: "heal" },
      { label: "Largar", effect: "none" }
    ]
  },
  {
    text: "Um corredor escuro à frente.",
    type: "combat",
    options: [
      { label: "Avançar", effect: "damage" },
      { label: "Recuar", effect: "none" }
    ]
  },
  {
    text: "Uma fonte de energia misteriosa.",
    type: "heal",
    options: [
      { label: "Beber", effect: "heal" },
      { label: "Ignorar", effect: "none" }
    ]
  },
  {
    text: "Um inimigo raquítico te observa.",
    type: "combat",
    options: [
      { label: "Atacar", effect: "damage" },
      { label: "Fugir", effect: "none" }
    ]
  },
  {
    text: "Um baú fedorento aparece.",
    type: "heal",
    options: [
      { label: "Abrir", effect: "heal" },
      { label: "Ignorar", effect: "none" }
    ]
  },
  {
    text: "O chão treme à sua volta.",
    type: "combat",
    options: [
      { label: "Correr", effect: "damage" },
      { label: "Firmar", effect: "none" }
    ]
  },
  {
    text: "Você encontra queijos curativos.",
    type: "heal",
    options: [
      { label: "Comer", effect: "heal" },
      { label: "Largar", effect: "none" }
    ]
  },
  {
    text: "Você ouve um som estranho no escuro.",
    type: "combat",
    options: [
      { label: "Investigar", effect: "damage" },
      { label: "Evitar", effect: "none" }
    ]
  },
  {
    text: "Uma toca segura parece surgir.",
    type: "heal",
    options: [
      { label: "Descansar", effect: "heal" },
      { label: "Seguir", effect: "none" }
    ]
  }
];

let eventQueue = [];
let lastEvent = null;

function buildQueue() {
  eventQueue = [];

  baseEvents.forEach(ev => {
    eventQueue.push({ ...ev });
    eventQueue.push({ ...ev });
  });

  shuffle(eventQueue);
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function getRandomEvent() {
  if (eventQueue.length === 0) buildQueue();

  let next = eventQueue.shift();

  if (lastEvent && next.text === lastEvent.text) {
    eventQueue.push(next);
    next = eventQueue.shift();
  }

  lastEvent = next;
  return next;
}

buildQueue();
