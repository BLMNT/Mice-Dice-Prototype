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
    text: "Uma porta misteriosa surge",
    type: "combat",
    options: ["Abrir", "Ignorar"]
  }
];

function getRandomEvent() {
  return events[Math.floor(Math.random() * events.length)];
}