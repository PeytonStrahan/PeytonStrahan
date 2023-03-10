/* global $, sessionStorage */

var amIt = getRandomBetween(0, 2);

var walkerOneScore = 0;
var walkerTwoScore = 0;

function getRandomBetween(min, max) {
  return parseInt(Math.random() * (max - min) + min);
}

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
  
function runProgram(){
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  var FRAME_RATE = 60;
  var FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;
  var KEY = {
    "LEFT": 65,
    "UP": 87,
    "RIGHT": 68,
    "DOWN": 83,
  }

  var KEY2 = {
    "LEFT":37,
    "UP": 38,
    "RIGHT": 39,
    "DOWN": 40,
  }

  // var walker = jQuery('.walker');	// reference to the HTML .walker element
	// var walker2 = jQuery('.walker2');	// reference to the HTML .walker2 element

  document.getElementById("walker").innerHTML = walkerOneScore;
  document.getElementById("walker2").innerHTML = walkerTwoScore;

  walker.style.backgroundColor = 'cyan';
  walker2.style.backgroundColor = 'greenyellow';

	// var boardWidth = board.width();	// the maximum X-Coordinate of the screen
	// var boardHeight = board.height();
  
  // Game Item Objects
  var positionX = 0; // the x-coordinate location for the walker
  var positionY = 0; // the y-coordinate location for the walker
  var speedX = 0; // the speed for the walker along the x-axis
  var speedY = 0; // the speed for the walker along the y-axis

  var positionX2 = 390; // the x-coordinate location for the second walker
  var positionY2 = 390; // the y-coordinate location for the second walker
  var speedX2 = 0; // the speed for the second walker along the x-axis
  var speedY2 = 0; // the speed for the second walker along the y-axis

  // one-time setup
  var interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on('keydown', handleKeyDown);                           // change 'eventType' to the type of event you want to handle
  $(document).on('keyup', handleKeyUp);                           // change 'eventType' to the type of event you want to handle...again

  $(document).on('keydown', handleKeyDown2);                           // change 'eventType' to the type of event you want to handle
  $(document).on('keyup', handleKeyUp2);                           // change 'eventType' to the type of event you want to handle...again

  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame() {
    repositionGameItem();
    redrawGameItem();
    checkForDeath();
  }
  
  /* 
  Called in response to events.
  */
  function handleKeyDown(event) {
    if (event.which === KEY.LEFT) {
      console.log("left pressed");
      speedX = -5;
    }
    else if (event.which === KEY.UP) {
      console.log("up pressed");
      speedY = -5;
    }
    else if (event.which === KEY.RIGHT) {
      console.log("right pressed");
      speedX = 5;
    }
    else if (event.which === KEY.DOWN) {
      console.log("down pressed");
      speedY = 5;
    }
  }

  function handleKeyUp(event) {
    if (event.which === KEY.LEFT) {
      console.log("left unpressed");
      speedX = 0;
    }
    else if (event.which === KEY.UP) {
      console.log("up unpressed");
      speedY = 0;
    }
    else if (event.which === KEY.RIGHT) {
      console.log("right unpressed");
      speedX = 0;
    }
    else if (event.which === KEY.DOWN) {
      console.log("down unpressed");
      speedY = 0;
    }
  }

  function handleKeyDown2(event) {
    if (event.which === KEY2.LEFT) {
      console.log("left pressed");
      speedX2 = -5;
    }
    else if (event.which === KEY2.UP) {
      console.log("up pressed");
      speedY2 = -5;
    }
    else if (event.which === KEY2.RIGHT) {
      console.log("right pressed");
      speedX2 = 5;
    }
    else if (event.which === KEY2.DOWN) {
      console.log("down pressed");
      speedY2 = 5;
    }
  }

  function handleKeyUp2(event) {
    if (event.which === KEY2.LEFT) {
      console.log("left unpressed");
      speedX2 = 0;
    }
    else if (event.which === KEY2.UP) {
      console.log("up unpressed");
      speedY2 = 0;
    }
    else if (event.which === KEY2.RIGHT) {
      console.log("right unpressed");
      speedX2 = 0;
    }
    else if (event.which === KEY2.DOWN) {
      console.log("down unpressed");
      speedY2 = 0;
    }
  }

  if (amIt === 0) {
    setTimeout(walkerOneIsIt, 5000);
  }
  else if (amIt === 1) {
    setTimeout(walkerTwoIsIt, 5000);
  }

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  
  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }

  function repositionGameItem() {
    if (speedX === -5 && positionX <= 0) {
      speedX = 0;
    }
    else if (speedX === 5 && positionX >= 390) {
      speedX = 0;
    }
    if (speedY === -5 && positionY <= 0) {
      speedY = 0;
    }
    else if (speedY === 5 && positionY >= 390) {
      speedY = 0;
    }

    if (speedX2 === -5 && positionX2 <= 0) {
      speedX2 = 0;
    }
    else if (speedX2 === 5 && positionX2 >= 390) {
      speedX2 = 0;
    }
    if (speedY2 === -5 && positionY2 <= 0) {
      speedY2 = 0;
    }
    else if (speedY2 === 5 && positionY2 >= 390) {
      speedY2 = 0;
    }
    positionX += speedX; // update the position of the walker along the x-axis
    positionY += speedY; // update the position of the walker along the y-axis
    positionX2 += speedX2; // update the position of the second walker along the x-axis
    positionY2 += speedY2; // update the position of the second walker along the y-axis
  }

  function redrawGameItem() {
    $("#walker").css("left", positionX);    // draw the walker in the new location, positionX pixels away from the "left"
    $("#walker").css("top", positionY);    // draw the walker in the new location, positionY pixels away from the "top"
    $("#walker2").css("left", positionX2);    // draw the second walker in the new location, positionX pixels away from the "left"
    $("#walker2").css("top", positionY2);    // draw the second walker in the new location, positionY pixels away from the "top"
  }

  function walkerOneIsIt() {
    walker.style.backgroundColor = 'red';
  }

  function walkerTwoIsIt() {
    walker2.style.backgroundColor = 'red';
  }

  function checkForDeath() {
    var a = (positionX + 25) - (positionX2 + 25);
    var b = (positionY - 25) - (positionY2 - 25);

    var c = Math.sqrt( a*a + b*b );
    if (walker.style.backgroundColor === 'red') {
      if (c <= 50) {
        walkerOneScore ++;
        amIt = 1;
        endGame();
        runProgram();
      }
    }
    if (walker2.style.backgroundColor === 'red') {
      if (c <= 50) {
        walkerTwoScore ++;
        amIt = 0;
        endGame();
        runProgram();
      }
    }

  }

  /* function changeWalkerOneText(newText) {
    walker.text = newText;
  }

  function changeWalkerTwoText(newText) {
    walker2.text = newText;
  } */
  
}
