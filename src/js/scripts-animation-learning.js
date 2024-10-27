import { startAnimation as startBallAnimation, stopAnimation as stopBallAnimation } from '../js/animations/basic_acceleration.js';

const canvas = document.getElementById("animationCanvas");
const ctx = canvas.getContext("2d");
var currentAnimationType = "Basic Acceleration";
let animationId = undefined;

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
    animationId = startBallAnimation();
  } 
  else {
    stopBallAnimation();
  }
}

function onResize() {
  start();
}

// Initial Start
start();




