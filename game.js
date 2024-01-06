var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var highscore = 0
// trigger next sequence -----------------
 
function nextSequence() {
  level++;
    if (level > highscore){
    highscore = level;
   }
  userClickedPattern = [];
  $("h1").text("Level " + level);
  $("h3").text("Your highscore: " + highscore)
  var randomNumber = Math.floor(Math.random() * 4);
  randomChosenColor = buttonColors[randomNumber];
 
  var audio = new Audio("sounds/"+randomChosenColor+".mp3");
  gamePattern.push(randomChosenColor);
 
  $("#" + randomChosenColor).fadeOut(50).fadeIn(50);
  audio.play();
  
}
 
// button clicks ----------------
 
$(".btn").click(function(){

  
  var userChosenColor = this.id;
  animatePress(this);
  var buttonSound = new Audio("sounds/"+userChosenColor+".mp3");
  buttonSound.play();
  userClickedPattern.push(userChosenColor);
  checkAnswer(userClickedPattern.lastIndexOf(userChosenColor));
})
 
// button animations -------------
 
function animatePress(currentColor) {
  $(currentColor).addClass("pressed");
 
  setTimeout(function(){
    $(currentColor).removeClass("pressed");
  },50);
}
 
// first time keydown -----------------
 
var pressed = false;
var level = 0;
 
$(document).keydown(function(){
  if(!pressed){
    nextSequence();
    pressed = true;
  }
  $("h2").text("");
})
 
// Check answer
 
function checkAnswer(currentLevel){
  // Check if the LAST button clicked is right
  if(userClickedPattern[currentLevel] == gamePattern[currentLevel]){
    // set a variable to count how many colors the user got right
    var count = 0;
    // loop through the two arrays, and compare if EACH ONE of the values is the same as the other
    for (var i = 0; i < gamePattern.length; i++) {
      if(gamePattern[i] === userClickedPattern[i]){
        // if the two values matche, count + 1
        count++;
      }
    }
    // ONLY if the count is the same number as gamePattern length,
    // (meaning each one of the colors was right) then it's success
    if(count === gamePattern.length){
      console.log("success");
      setTimeout(function(){
          nextSequence();
        }, 1000);
    }
    // otherwise, it's wrong and trigger Game Over
  } else {
    console.log("wrong");
      var wrongAudio = new Audio("sounds/wrong.mp3");
      wrongAudio.play();
      $("body").addClass("game-over");
      setTimeout(function(){
        $("body").removeClass("game-over");
      },200);
      $("h1").text("Game Over");
      $("h2").text("(Press Any Key to Restart)")
      startOver();
  }
}
 
// Reset every variable -------------
 
function startOver(){
  level = 0;
  gamePattern = [];
  pressed = false;
}

