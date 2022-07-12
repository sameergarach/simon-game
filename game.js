// alert("Game on");

//array of button colors
var buttonColors = ["red", "blue", "green", "yellow"];

// game pattern
var gamePattern = [];

//user pattern
var userClickedPattern = [];

//keeping track if game started or not, so we call nextSequence() on the first keydown
var started = false;

//user level and start at level 0
var level = 0;

//detect when a keyboard key has been pressed, when that happens for the first time, call nextSequence()
$(document).keydown(function() {
  if (started === false) {

    //change heading to user progress
    $("h1").text("Level " + level);
    nextSequence();
    started = true;
  }
});

//Detect when a button is clicked and trigger a handler function
$(".btn").click(function() {

  //store the id of the button that got clicked
  var userChosenColor = $(this).attr("id");

  //Add user's click to user's click pattern
  userClickedPattern.push(userChosenColor);
  //calling function to play sound
  playSound(userChosenColor);
  //calling function to animate
  animatePress(userChosenColor);
  //call function to check most recent answer
  checkAnswer(userClickedPattern.length - 1);
});

// check the user's answers against the game pattern
function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    console.log("Success");
    //If the user got the most recent answer right, then check that they have finished their sequence
    if (userClickedPattern.length === gamePattern.length) {

      //call nextSequence() for the start of the next level
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    console.log("wrong");
    // play wrong audio sound
    playSound("wrong");
    //animation for wrong answer
    $("body").addClass("game-over");

    // remove class after 100 milliseconds
    setTimeout(function() {
      $("body").removeClass("game-over");

    }, 200);

    //change heading to restart the game
    $("h1").text("Game Over, Press Any Key to Restart");

    //calling the function to start over the game
    startOver();


  }
}
//reset variable values to their levels at start of game
function startOver(){
  started = false;
  level = 0;
  gamePattern = [];
}

function nextSequence() {

  //once nextSequence() is triggered, reset the userClickedPattern to an empty array ready for the next level.
  userClickedPattern = [];
  //changing level to reflect user's progress
  level++;
  //changing heading to reflect user's progress
  $("h1").text("Level " + level);


  // game selects random color and adds to game pattern
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  // Animation
  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

  //Calling function to play sound
  playSound(randomChosenColor);

}


// adding sounds to user clicks and the game's pattern
function playSound(name) {

  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

// adding animation to user clicks
function animatePress(currentColor) {
  // add class, class is styled in CSS stylesheet
  $("#" + currentColor).addClass("pressed");

  // remove class after 100 milliseconds
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");

  }, 100);
}
