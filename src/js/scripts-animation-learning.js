import { startAnimation as startBallAnimation } from '../js/animations/basic_acceleration.js';

const canvas = document.getElementById("animationCanvas");
const ctx = canvas.getContext("2d");
var currentAnimationType = "Basic Acceleration";

// Events Listener
window.addEventListener('resize', onResize);
document.getElementById('animationType').addEventListener('change', function(event) {
  const selVal = event.target.value;

  if (selVal != currentAnimationType) {
    currentAnimationType = selVal;
  }

  start();

});

function start() {
  if (currentAnimationType === "Basic Acceleration") {
    startBallAnimation();
  } 
  else {
    // alert("Animation for " + currentAnimationType + " is not available yet");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
}

function onResize() {
  start();
}

// Initial Start
start();




