import { resetBall, ballAnimationUpdate } from '../js/animations/basic_acceleration.js';

var currentAnimationType = "Basic Acceleration";
var timeOutFunctionId;
var animation = undefined;

// Events Listener
window.addEventListener('resize', onResize);
document.getElementById('animationType').addEventListener('change', function(event) {
  const selVal = event.target.value;

  if (selVal != currentAnimationType) {
    currentAnimationType = selVal;
  }

  refresh();

});

// Resize canvas & Animate
function onResize() {

    // clearTimeOut() resets the setTimeOut() timer
    // due to this the function in setTimeout() is 
    // fired after we are done resizing
    clearTimeout(timeOutFunctionId);
  
    // setTimeout returns the numeric ID which is used by
    // clearTimeOut to reset the timer
    timeOutFunctionId = setTimeout(refresh, 500);
}

function refresh() {
 
  const content = document.getElementById("content");
  const contentInfo = content.getBoundingClientRect();
  canvas.width = contentInfo.width;
  canvas.height = contentInfo.height; 

  ctx.clearRect(0, 0, canvas.width, canvas.height);
   
  if (animation !== undefined) {
    window.cancelAnimationFrame(animation);
  }

  if (currentAnimationType === "Basic Acceleration") {
    resetBall();    
    animation = ballAnimationUpdate(animation);
  } 
  else {
    alert("Animation for " + currentAnimationType + " is not available yet");
  }
}

// Start Here
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
refresh(); // Initial resize



