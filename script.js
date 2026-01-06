// BUY BUTTON
document.querySelector(".buy-btn").onclick = () => {
    window.open("https://jup.ag", "_blank");
};

// 🦖 DINO GAME
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let dino = { x: 50, y: 150, w: 30, h: 30, dy: 0, jump: false };
let cactus = { x: 600, y: 150, w: 20, h: 30 };
let gravity = 1.2;
let score = 0;
let running = false;

function update() {
    if (!running) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    dino.y += dino.dy;
    dino.dy += gravity;

    if (dino.y >= 150) {
        dino.y = 150;
        dino.jump = false;
    }

    cactus.x -= 6;
    if (cactus.x < 0) {
        cactus.x = 600;
        score++;
    }

    if (
        dino.x < cactus.x + cactus.w &&
        dino.x + dino.w > cactus.x &&
        dino.y < cactus.y + cactus.h &&
        dino.y + dino.h > cactus.y
    ) {
        running = false;
        alert("Game Over 🦖 Score: " + score);
    }

    ctx.fillStyle = "#00ffa3";
    ctx.fillRect(dino.x, dino.y, dino.w, dino.h);

    ctx.fillStyle = "#f54242";
    ctx.fillRect(cactus.x, cactus.y, cactus.w, cactus.h);

    ctx.fillStyle = "#fff";
    ctx.fillText("Score: " + score, 520, 20);

    requestAnimationFrame(update);
}

document.addEventListener("keydown", e => {
    if (e.code === "Space" && !dino.jump) {
        dino.dy = -15;
        dino.jump = true;
    }
});

canvas.addEventListener("click", () => {
    if (!dino.jump) {
        dino.dy = -15;
        dino.jump = true;
    }
});

document.getElementById("startGame").onclick = () => {
    score = 0;
    cactus.x = 600;
    running = true;
    update();
};
