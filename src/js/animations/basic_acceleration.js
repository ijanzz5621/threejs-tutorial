
const canvas = document.getElementById("animationCanvas");
const ctx = canvas.getContext("2d");

let animationId;
let ball = {
  x: 50,
  y: 50,
  radius: 50,
  dx: 4,
  dy: 4,
  color: 'dodgerblue'
};

// Set ball to the initial position
export function resetBallPosition() {
  ball.x = canvas.width / 2;
  ball.y = canvas.height / 2;
}

// Animate the ball on the canvas
export function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw the ball
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
  ctx.fillStyle = ball.color;
  ctx.fill();
  ctx.closePath();

  // Move the ball
  ball.x += ball.dx;
  ball.y += ball.dy;

  // Bounce off the walls
  if (ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0) {
      ball.dx *= -1;
  }
  if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
      ball.dy *= -1;
  }

  // Request the next frame
  animationId = requestAnimationFrame(animate);
}
  
export function startAnimation() {
  cancelAnimationFrame(animationId);
  resizeCanvas();
  animate();
}

function resizeCanvas() {
  const content = document.getElementById("content");
  const contentInfo = content.getBoundingClientRect();
  canvas.width = contentInfo.width;
  canvas.height = contentInfo.height; 

  resetBallPosition();
}