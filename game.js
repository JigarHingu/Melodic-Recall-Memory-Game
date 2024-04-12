var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;
var highestLevel = 0;
var highestScorer = "";

// Function to handle keypress event
function keypressHandler(event) {
  // If the game is over and the key pressed is the space key
  if (!started && event.key === " ") {
    $(".note").hide(); // Hide the note
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
    // Hide the space button
    $("#start-button").hide();
  } else if (started) { // If the game has started
    // Handle keypress based on the pressed key
    switch (event.key.toUpperCase()) {
      case "W":
        $("#" + buttonColours[2]).click();
        break;
      case "E":
        $("#" + buttonColours[0]).click();
        break;
      case "J":
        $("#" + buttonColours[3]).click();
        break;
      case "K":
        $("#" + buttonColours[1]).click();
        break;
    }
  }
}

// Event listener for the start button
$("#start-button").click(function () {
  if (!started) {
    $(".note").hide(); // Hide the note
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
    // Hide the start button
    $("#start-button").hide();
  }
});

$(".btn").click(function () {
  if (started) {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length - 1);
  }
});

// Keypress event listener
$(document).keypress(keypressHandler);

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press Any Key to Restart");

    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    // Show the space button after game over
    $("#start-button").show();

    startOver();
  }
}

function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  playSound(randomChosenColour);
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
