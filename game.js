console.log("GAME OK");

let activeTimeouts = [];

let gameOver = false;
let isRolling = false;

let player = {
  hp: 10,
  maxHp: 10
};

let progress = 0;
let currentEvent = null;

/* 🎲 dado */
function rollDice() {
  return Math.floor(Math.random() * 20) + 1;
}

/* 🚀 start */
function startGame() {
  activeTimeouts.forEach(clearTimeout);
  activeTimeouts = [];

  player.hp = 10;
  progress = 0;

  gameOver = false;
  isRolling = false;

  currentEvent = null;

  /* 🔥 RESET VISUAL GARANTIDO */
  document.getElementById("game").style.display = "block";
  document.getElementById("start-screen").style.display = "none";
  document.getElementById("end-screen").style.display = "none";

  setDice("...");

  newEvent();
  updateHUD();
}

/* 🎮 evento */
function newEvent() {
  if (gameOver) return;

  currentEvent = getRandomEvent();

  document.getElementById("event-box").innerText = currentEvent.text;

  renderOptions();
  setDice("...");
  updateHUD();
}

/* ⚔️ botões */
function renderOptions() {
  const container = document.getElementById("buttons");

  if (!container || !currentEvent) return;

  container.innerHTML = "";

  currentEvent.options.forEach(opt => {
    const btn = document.createElement("button");
    btn.innerText = opt.label;
    btn.onclick = () => choose(opt.effect);
    container.appendChild(btn);
  });
}

/* 🧠 escolha */
function choose(effect) {
  if (gameOver || isRolling) return;

  isRolling = true;

  setDice("...");
  animateDiceRoll();

  const t1 = setTimeout(() => {

    const roll = rollDice();
    setDice(roll);

    resolveEvent(effect);

    progress++;
    updateHUD();

    if (player.hp <= 0) {
      return endGame("💀 Você morreu!");
    }

    if (progress >= 20) {
      return endGame("🏆 Vitória!");
    }

    const t2 = setTimeout(() => {
      isRolling = false;
      newEvent();
    }, 900);

    activeTimeouts.push(t2);

  }, 500);

  activeTimeouts.push(t1);
}

/* ⚔️ lógica de efeito */
function resolveEvent(effect) {

  const value = Math.floor(Math.random() * 5) + 1;

  if (effect === "damage") {
    player.hp -= value;
  }

  if (effect === "heal") {
    player.hp += value;
  }

  if (player.hp > player.maxHp) player.hp = player.maxHp;
  if (player.hp < 0) player.hp = 0;
}

/* 📊 HUD */
function updateHUD() {
  document.getElementById("hp").innerText = player.hp;
  document.getElementById("progress").innerText = progress;
}

/* 🏁 fim */
function endGame(text) {
  gameOver = true;
  isRolling = false;

  activeTimeouts.forEach(clearTimeout);
  activeTimeouts = [];

  document.getElementById("game").style.display = "none";
  document.getElementById("end-screen").style.display = "flex";
  document.getElementById("end-text").innerText = text;
}

/* 🔁 restart */
function restartGame() {
  startGame();
}

/* 🚪 exit */
function exitGame() {
  location.reload();
}

/* 🎲 UI */
function setDice(value) {
  document.getElementById("dice-result").innerText = value;
}

/* 🎲 animação */
function animateDiceRoll() {
  const dice = document.getElementById("dice");

  dice.classList.add("roll");

  setTimeout(() => {
    dice.classList.remove("roll");
  }, 400);
}
