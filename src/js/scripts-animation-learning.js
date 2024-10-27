import { startAnimation as startBallAnimation, stopAnimation as stopBallAnimation } from '../js/animations/basic_acceleration.js';

const canvas = document.getElementById("animationCanvas");
const ctx = canvas.getContext("2d");
let currentAnimationType = "Basic Acceleration";
let prevAnimationType = undefined;

// Events Listener
window.addEventListener('resize', onResize);
document.getElementById('animationType').addEventListener('change', function(event) {
  const selVal = event.target.value;

  if (selVal != currentAnimationType) {
    prevAnimationType = currentAnimationType;
    currentAnimationType = selVal;
  }

  start();

});

function start() {
  if (currentAnimationType === "Basic Acceleration") {
    startBallAnimation();
  } 
  else {

    if (prevAnimationType === "Basic Acceleration")
      stopBallAnimation();
  }
}

function onResize() {
  start();
}

// Initial Start
start();




