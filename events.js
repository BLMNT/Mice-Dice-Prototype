const events = [
  {
    text: "Um inimigo aparece!",
    type: "combat",
    options: ["Atacar", "Defender"]
  },
  {
    text: "Você encontra comida",
    type: "heal",
    options: ["Comer", "Guardar"]
  },
  {
    text: "Uma porta misteriosa",
    type: "combat",
    options: ["Abrir", "Ignorar"]
  },
  {
    text: "Um caminho divide-se",
    type: "combat",
    options: ["Esquerda", "Direita"]
  }
];

let lastEvent = null;

function getRandomEvent() {
  let e;

  do {
    e = events[Math.floor(Math.random() * events.length)];
  } while (e === lastEvent && events.length > 1);

  lastEvent = e;

  return e;
}