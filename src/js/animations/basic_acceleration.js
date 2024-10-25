
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
// var animation = undefined;

const ballRadius = 50;
const ball = {
    x: 0 + ballRadius,
    y: 0 + ballRadius,
    radius: ballRadius,
    color: "#00FF00",
    dx: 2, // Velocity in x direction
    dy: 2  // Velocity in y direction
  };

export function drawBall(ctx) {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fillStyle = ball.color;
    ctx.fill();
    ctx.closePath();
}

export function resetBall() {
    ball.x = 0 + ballRadius;
    ball.y = 0 + ballRadius;
}

export function ballAnimationUpdate(animation) {

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall(ctx); // Draw the ball
  
    // Update ball position
    ball.x += ball.dx;
    ball.y += ball.dy;
  
    // Check for wall collisions
    if (ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0) {
      ball.dx = -ball.dx;
    }
    if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
      ball.dy = -ball.dy;
    }
  
    // // Request the next frame
    // // if (animation === undefined) {
    animation = requestAnimationFrame(ballAnimationUpdate); 
    // //}
    return animation;
}
  
