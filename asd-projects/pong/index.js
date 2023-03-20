/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()

function runProgram() {
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  const FRAME_RATE = 60;
  const FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;

  var KEY = {
    //"LEFT": 65,
    "UP": 87,
    "UP2": 38,
    //"RIGHT": 68,
    "DOWN": 83,
    "DOWN2": 40,
  }
  // Game Item Objects
/*
  var leftPaddle = {};
  leftPaddle.x = 0;
  leftPaddle.y = 100;
  leftPaddle.width = 200;
  leftPaddle.height = 200;
  leftPaddle.speedX = 1;
  leftPaddle.speedY = 1;
  leftPaddle.id = "#leftPaddle";

  var rightPaddle = {};
  rightPaddle.x = 0;
  rightPaddle.y = 100;
  rightPaddle.width = 200;
  rightPaddle.height = 200;
  rightPaddle.speedX = 1;
  rightPaddle.speedY = 1;
  rightPaddle.id = "#rightPaddle";

  var ball = {};
  ball.x = 0;
  ball.y = 100;
  ball.width = 200;
  ball.height = 200;
  ball.speedX = 1;
  ball.speedY = 1;
  ball.id = "#ball";
*/
  // Initialization
var leftPaddle = GameItem("#leftPaddle", 0, 0);
var rightPaddle = GameItem("#rightPaddle", 0, 0);
//var ball = GameItem("#ball", 0, 0);

// Factory Function
function GameItem(id, speedX, speedY) {
  var gameItem = {};
  gameItem.id = id;
  gameItem.x = parseFloat($(id).css("left"));
  gameItem.y = parseFloat($(id).css("top"));
  gameItem.width = $(id).width();
  gameItem.height = $(id).height();
  gameItem.speedX = speedX;
  gameItem.speedY = speedY;
  return gameItem;
}

  // one-time setup
  let interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on('keydown', handleKeyDown);                           // change 'eventType' to the type of event you want to handle
  $(document).on('keyup', handleKeyUp);                           // change 'eventType' to the type of event you want to handle...again

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
    //checkForDeath();

  }

  /* 
  Called in response to events.
  */
  function handleKeyDown(event) {
    if (event.which === KEY.UP) {
      console.log("leftPaddle UP pressed");
      leftPaddle.gameItem.speedY = -5;
    }
    else if (event.which === KEY.UP2) {
      console.log("rightPaddle UP pressed");
      rightPaddle.gameItem.speedY = -5;
    }
    else if (event.which === KEY.DOWN) {
      console.log("leftPaddle DOWN pressed");
      leftPaddle.gameItem.speedY = 5;
    }
    else if (event.which === KEY.DOWN2) {
      console.log("rightPaddle DOWN pressed");
      rightPaddle.gameItem.speedY = 5;
    }
  }

  function handleKeyUp(event) {
    if (event.which === KEY.UP) {
      console.log("leftPaddle UP unpressed");
      leftPaddle.gameItem.speedY = 0;
    }
    else if (event.which === KEY.UP2) {
      console.log("rightPaddle UP unpressed");
      rightPaddle.gameItem.speedY = 0;
    }
    else if (event.which === KEY.DOWN) {
      console.log("leftPaddle DOWN unpressed");
      leftPaddle.gameItem.speedY = 0;
    }
    else if (event.which === KEY.DOWN2) {
      console.log("rightPaddle DOWN unpressed");
      rightPaddle.gameItem.speedY = 0;
    }
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
  /*  if (speedX === -5 && positionX <= 0) {
      speedX = 0;
    }
    else if (speedX === 5 && positionX >= 390) {
      speedX = 0;
    } */
    if (leftPaddle.gameItem.speedY === -5 && leftPaddle.gameItem.y <= 0) {
      leftPaddle.gameItem.speedY = 0;
    }
    else if (leftPaddle.gameItem.speedY === 5 && leftPaddle.gameItem.y >= 390) {
      leftPaddle.gameItem.speedY = 0;
    }

  /*  if (speedX2 === -5 && positionX2 <= 0) {
      speedX2 = 0;
    }
    else if (speedX2 === 5 && positionX2 >= 390) {
      speedX2 = 0;
    } */
    if (rightPaddle.gameItem.speedY === -5 && rightPaddle.gameItem.y <= 0) {
      rightPaddle.gameItem.speedY = 0;
    }
    else if (rightPaddle.gameItem.speedY === 5 && rightPaddle.gameItem.y >= 390) {
      rightPaddle.gameItem.speedY = 0;
    }
   // positionX += speedX; // update the position of the walker along the x-axis
   leftPaddle.gameItem.y += leftPaddle.gameItem.speedY; // update the position of the left paddle along the y-axis
   // positionX2 += speedX2; // update the position of the second walker along the x-axis
   rightPaddle.gameItem.y += rightPaddle.gameItem.speedY; // update the position of the right paddle along the y-axis
  }

  function redrawGameItem() {
    $("#leftPaddle").css("left", leftPaddle.gameItem.x);    // draw the walker in the new location, positionX pixels away from the "left"
    $("#leftPaddle").css("top", leftPaddle.gameItem.y);    // draw the walker in the new location, positionY pixels away from the "top"
    $("#rightPaddle").css("left", rightPaddle.gameItem.x);    // draw the second walker in the new location, positionX pixels away from the "left"
    $("#rightPaddle").css("top", rightPaddle.gameItem.y);    // draw the second walker in the new location, positionY pixels away from the "top"
  }

/*
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
*/


}
