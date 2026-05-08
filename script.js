const bike = document.getElementById("bike");
const dialogBox = document.getElementById("dialogBox");
const flower = document.getElementById("flower");

let x = -150;
let speed = 2;
let phase = "enter";

// 🎬 نمایش دیالوگ به صورت ترتیبی (خیلی مهم)
function startDialog() {

  const lines = [
    "سلام؛ خانم قنبریان!؟",
    "مثل اینکه یه آقای عاشق‌پیشه خیلی دلتنگتون بود...",
    "این گل رو داد بیارم براتون و بگم: 🌹",
    "پویا خیلی دوست دارههههههه ❤️"
  ];

  let i = 0;

  function showNext() {
    if (i >= lines.length) {

      setTimeout(() => {
        dialogBox.style.opacity = 0;
        showFlower();   // ⭐ اینجا گل میاد
      }, 1200);

      return;
    }

    dialogBox.innerText = lines[i];
    dialogBox.style.opacity = 1;

    i++;

    setTimeout(() => {
      dialogBox.style.opacity = 0;

      setTimeout(showNext, 600);

    }, 2500);
  }

  showNext();
}

// 🎬 انیمیشن موتور
function animate() {

  if (phase === "enter") {
    x += speed;
    bike.style.left = x + "px";

    if (x > window.innerWidth / 2 - 100) {
      phase = "stop";

      shakeScreen(4, 400);

      setTimeout(() => {
        startDialog();
      }, 800);
    }
  }

  requestAnimationFrame(animate);
}

const rainContainer = document.getElementById("rain");

function createRainLayer(count, speed, opacity) {
  for (let i = 0; i < count; i++) {
    let drop = document.createElement("div");
    drop.classList.add("drop");

    drop.style.left = Math.random() * window.innerWidth + "px";
    drop.style.animationDuration = speed + Math.random() + "s";
    drop.style.opacity = opacity;

    rainContainer.appendChild(drop);
  }
}

// دور (آروم)
createRainLayer(50, 1.2, 0.3);

// نزدیک (تندتر و واضح‌تر)
createRainLayer(40, 0.6, 0.7);

animate();

const bgm = document.getElementById("bgm");

function startMusic() {
  bgm.volume = 0.6; // صدای ملایم عاشقانه 😄
  bgm.play().catch(() => {
    console.log("Music blocked until user interaction");
  });
}

// اولین تعامل کاربر = شروع موزیک
document.body.addEventListener("click", startMusic, { once: true });

function showFlower() {

  setTimeout(() => {
    flower.style.transform = "translateX(-50%) scale(1)";
  }, 800);

  setTimeout(() => {
    moveToFlower();
  }, 2000);
}

function moveToFlower() {

  let targetX = window.innerWidth / 2 - 50;

  function move() {
    x += 2;
    bike.style.left = x + "px";

    if (x < targetX) {
      requestAnimationFrame(move);
    } else {
      showFinalPause();
    }
  }

  move();
}

function showFinalPause() {

  setTimeout(() => {
    flower.style.transform = "translateX(-50%) scale(0)";
    startHeartEnding();
  }, 2000);
}

function startHeartEnding() {

  // 1. کاراکتر بره سمت خروج
  let exitX = window.innerWidth + 200;

  function exitMove() {
    x += 4;
    bike.style.left = x + "px";

    if (x < exitX) {
      requestAnimationFrame(exitMove);
    } else {
      showHeart();
    }
  }

  exitMove();
}

const heart = document.getElementById("heart");

function showHeart() {

  // قلب ظاهر میشه
  heart.style.opacity = 1;
  heart.style.transform = "translate(-50%, -50%) scale(1)";

  setTimeout(() => {
    showFinalText();
  }, 2000);
}

const finalText = document.getElementById("finalText");

function showFinalText() {

  finalText.innerHTML = `
    Best Love's For Kim<br>
    From Poy<br><br>
    Kimpoy Life 🌟💕
  `;

  finalText.style.opacity = 1;
}

function shakeScreen(intensity = 5, duration = 300) {
  const scene = document.getElementById("scene");

  let start = Date.now();

  function shake() {
    let elapsed = Date.now() - start;

    if (elapsed < duration) {
      let x = (Math.random() - 0.5) * intensity;
      let y = (Math.random() - 0.5) * intensity;

      scene.style.transform = `translate(${x}px, ${y}px)`;
      requestAnimationFrame(shake);
    } else {
      scene.style.transform = "translate(0,0)";
    }
  }

  shake();
}

window.onload = () => {
  document.getElementById("scene").style.opacity = 1;
};

