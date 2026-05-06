console.log("GAME OK");

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
  document.getElementById("start-screen").style.display = "none";
  document.getElementById("end-screen").style.display = "none";
  document.getElementById("game").style.display = "block";

  player.hp = 10;
  progress = 0;
  gameOver = false;

  newEvent();
  updateHUD();
}

/* 🎮 evento */
function newEvent() {
  if (gameOver) return;

  currentEvent = getRandomEvent();

  document.getElementById("event-box").innerText = currentEvent.text;

  renderOptions();
  updateHUD();

  setDice("...");
}

/* ⚔️ botões */
function renderOptions() {
  const container = document.getElementById("buttons");
  container.innerHTML = "";

  currentEvent.options.forEach(opt => {
    const btn = document.createElement("button");
    btn.innerText = opt;
    btn.onclick = () => choose(opt);
    container.appendChild(btn);
  });
}

/* 🧠 escolha */
function choose(option) {
  if (gameOver || isRolling) return;

  isRolling = true;

  setDice("...");

  animateDiceRoll();

  setTimeout(() => {

    const roll = rollDice();

    setDice(roll);

    resolveEvent(roll, option);

    progress++;
    updateHUD();

    if (player.hp <= 0) {
      return endGame("💀 Você morreu!");
    }

    if (progress >= 20) {
      return endGame("🏆 Vitória!");
    }

    setTimeout(() => {
      isRolling = false;
      newEvent();
    }, 1200);

  }, 500);
}

/* ⚔️ lógica */
function resolveEvent(roll, option) {

  let type =
    roll <= 6 ? "low" :
    roll <= 13 ? "mid" :
    "high";

  let damage = 0;

  if (currentEvent.type === "combat") {
    if (type === "low") damage = 2;
    if (type === "mid") damage = 1;
  }

  if (currentEvent.type === "heal") {
    if (type === "high") player.hp += 3;
    if (type === "mid") player.hp += 1;
  }

  player.hp -= damage;

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

/* 🎲 UI DO DADO */
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