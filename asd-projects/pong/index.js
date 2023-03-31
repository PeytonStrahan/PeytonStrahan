/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()

function runProgram() {
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  const FRAME_RATE = 60;
  const FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;
  const BOARD_WIDTH = $("#board").width();
  const BOARD_HEIGHT = $("#board").height();

  p1ScoreValue = 0;
  p2ScoreValue = 0;

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
var leftPaddle = GameItems("#leftPaddle", 0, 0);
var rightPaddle = GameItems("#rightPaddle", 0, 0);
var ball = GameItems("#ball", 0, 0);

// Factory Function
function GameItems(id, speedX, speedY) {
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

  startBall();

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
    checkForEnd();
    moveObject(ball);
    wallCollision(ball);

  }

  /* 
  Called in response to events.
  */
  function handleKeyDown(event) {
    if (event.which === KEY.UP) {
      console.log("leftPaddle UP pressed");
      leftPaddle.speedY = -5;
    }
    else if (event.which === KEY.UP2) {
      console.log("rightPaddle UP pressed");
      rightPaddle.speedY = -5;
    }
    else if (event.which === KEY.DOWN) {
      console.log("leftPaddle DOWN pressed");
      leftPaddle.speedY = 5;
    }
    else if (event.which === KEY.DOWN2) {
      console.log("rightPaddle DOWN pressed");
      rightPaddle.speedY = 5;
    }
  }

  function handleKeyUp(event) {
    if (event.which === KEY.UP) {
      console.log("leftPaddle UP unpressed");
      leftPaddle.speedY = 0;
    }
    else if (event.which === KEY.UP2) {
      console.log("rightPaddle UP unpressed");
      rightPaddle.speedY = 0;
    }
    else if (event.which === KEY.DOWN) {
      console.log("leftPaddle DOWN unpressed");
      leftPaddle.speedY = 0;
    }
    else if (event.which === KEY.DOWN2) {
      console.log("rightPaddle DOWN unpressed");
      rightPaddle.speedY = 0;
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

  function startBall(){
    var randomNum = (Math.random() * 3 + 2) * (Math.random() > 0.5 ? -1 : 1);
    ball.x = 310;
    ball.y = 160;
    ball.speedX = randomNum;
    ball.speedY = randomNum;
  }

  function moveObject(movingObject){
    movingObject.x = movingObject.x + movingObject.speedX;
    movingObject.y = movingObject.y + movingObject.speedY;
    $("movingObject.id").css("left", movingObject.x);
    $("movingObject.id").css("top", movingObject.y);
  }

  function wallCollision (collidingObject){
    if (doCollide(ball, leftPaddle)) {
      // bounce ball off paddle Left
      ball.speedX = ball.speedX * -1;
    }
    else if (doCollide(ball, rightPaddle)) {
      // bounce ball off paddle Right
      ball.speedX = ball.speedX * -1;
    }
    if (collidingObject.x <= 0) {
      //collidingObject.speedX = collidingObject.speedX * -1;
      p2ScoreValue ++;
      $("#player2Score").text(p2ScoreValue);
      startBall();
    }
    else if (collidingObject.x >= BOARD_WIDTH - collidingObject.width) {
      //collidingObject.speedX = collidingObject.speedX * -1;
      p1ScoreValue ++;
      $("#player1Score").text(p1ScoreValue);
      startBall();
    } 
    if (collidingObject.y <= 0) {
      collidingObject.speedY = collidingObject.speedY * -1;
    }
    else if (collidingObject.y >= BOARD_HEIGHT - collidingObject.width) {
      collidingObject.speedY = collidingObject.speedY * -1;
    }
    //collidingObject.x += collidingObject.speedX;
    //collidingObject.y += collidingObject.speedY;
  }

  function doCollide(obj1, obj2) {
    if(obj1.x < obj2.x + obj2.width && obj1.x + obj1.width > obj2.x && obj1.y < obj2.y + obj2.height && obj1.y + obj1.height > obj2.y){
      return true;
    }
    else{
      return false;
    }
    // return false if the objects do not collide
    // return true if the objects do collide
  }

  function repositionGameItem() {
  /*  if (speedX === -5 && positionX <= 0) {
      speedX = 0;
    }
    else if (speedX === 5 && positionX >= 390) {
      speedX = 0;
    } */
    if (leftPaddle.speedY === -5 && leftPaddle.y <= 0) {
      leftPaddle.speedY = 0;
    }
    else if (leftPaddle.speedY === 5 && leftPaddle.y >= 260) {
      leftPaddle.speedY = 0;
    }

  /*  if (speedX2 === -5 && positionX2 <= 0) {
      speedX2 = 0;
    }
    else if (speedX2 === 5 && positionX2 >= 390) {
      speedX2 = 0;
    } */
    if (rightPaddle.speedY === -5 && rightPaddle.y <= 0) {
      rightPaddle.speedY = 0;
    }
    else if (rightPaddle.speedY === 5 && rightPaddle.y >= 260) {
      rightPaddle.speedY = 0;
    }
   // positionX += speedX; // update the position of the walker along the x-axis
   leftPaddle.y += leftPaddle.speedY; // update the position of the left paddle along the y-axis
   // positionX2 += speedX2; // update the position of the second walker along the x-axis
   rightPaddle.y += rightPaddle.speedY; // update the position of the right paddle along the y-axis
  }

  function redrawGameItem() {
    $("#leftPaddle").css("left", leftPaddle.x);    // draw the walker in the new location, positionX pixels away from the "left"
    $("#leftPaddle").css("top", leftPaddle.y);    // draw the walker in the new location, positionY pixels away from the "top"
    $("#rightPaddle").css("left", rightPaddle.x);    // draw the second walker in the new location, positionX pixels away from the "left"
    $("#rightPaddle").css("top", rightPaddle.y);    // draw the second walker in the new location, positionY pixels away from the "top"
    $("#ball").css("left", ball.x);
    $("#ball").css("top", ball.y);
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
  function checkForEnd(){
    if (p1ScoreValue >= 11){
      alert("Player 1 wins!");
      endGame();
    }
    else if (p2ScoreValue >= 11){
      alert("Player 2 wins!");
      endGame();
    }
  }

}
