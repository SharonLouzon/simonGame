//2.3. At the top of the game.js file, create a new array called buttonColours and set it to hold the sequence "red", "blue", "green", "yellow" .
var buttonColours = ["red", "blue", "green", "yellow"];

//2.5. At the top of the game.js file, create a new empty array called gamePattern.
var gamePattern = [];

//4.3. At the top of the game.js file, create a new empty array with the name userClickedPattern.
var userClickedPattern = [];

//7.2. Create a new variable called level and start at level 0.
var level=0;
//You'll need a way to keep track of whether if the game has started or not, so you only call nextSequence() on the first keypress.
var started = false;

$( document ).keydown(function() { //possible insted of document write "boddy"
  if (!started) {//for the first time
    $("#level-title").text("Level "+level );
    nextSequence();
    started = true;
  }
});

//4.1. Use jQuery to detect when any of the buttons are clicked and trigger a handler function.
$(".btn").click(function() {

  //4.2. Inside the handler, create a new variable called userChosenColour to store the id of the button that got clicked.
  var userChosenColour = $(this).attr("id");

  //4.4. Add the contents of the variable userChosenColour created in step 2 to the end of this new userClickedPattern
  userClickedPattern.push(userChosenColour);

  //  console.log(userClickedPattern);

  //5.1. In the same way we played sound in nextSequence() , when a user clicks on a button, the corresponding sound should be played.
  playSound(userChosenColour);

  //6
  animatePress(userChosenColour);

  //8.2. Call checkAnswer() after a user has clicked and chosen their answer, passing in the index of the last answer in the user's sequence.
  checkAnswer(userClickedPattern.length-1);//return the index of the last answer user pressed.
});

//8.1. Create a new function called checkAnswer(), it should take one input with the name currentIndex
function checkAnswer(currentIndex) {//currentIndex is the last answer that have been pressed

    //8.3. Write an if statement inside checkAnswer() to check if the most recent user answer is the same as the game pattern. If so then log "success", otherwise log "wrong".
    if (gamePattern[currentIndex] === userClickedPattern[currentIndex]) {

      console.log("success");

      //8.4. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
      if (userClickedPattern.length === gamePattern.length){

        //8.5. Call nextSequence() after a 1000 millisecond delay.
        setTimeout(function () {
          nextSequence();
        }, 1000);

      }

    } else {

      console.log("wrong");

      //9.1. In the sounds folder, there is a sound called wrong.mp3, play this sound if the user got one of the answers wrong.
      playSound("wrong");

      //9.2. In the styles.css file, there is a class called "game-over", apply this class to the body of the website when the user gets one of the answers wrong and then remove it after 200 milliseconds.
      $("body").addClass("game-over");

      var delayInMilliseconds = 200; //200 milisecond
      setTimeout(function() {
        //your code to be executed after 200 milisecond
        $("body").removeClass("game-over");
      }, delayInMilliseconds);

      //9.3. Change the h1 title to say "Game Over, Press Any Key to Restart" if the user got the answer wrong.
      $("#level-title").text("Game Over, Press Any Key to Restart");

      //10.2. Call startOver() if the user gets the sequence wrong.
      startOver();
    }

}

//2.1. Inside game.js create a new function called nextSequence()
function nextSequence() {

  //8.6. Once nextSequence() is triggered, reset the userClickedPattern to an empty array ready for the next level.
  userClickedPattern = [];

  //7.4. Inside nextSequence(), increase the level by 1 every time nextSequence() is called.
  level++;

  //7.5. Inside nextSequence(), update the h1 with this change in the value of level.
  $("#level-title").text("Level " + level);

  //2.2. Inside the new function generate a new random number between 0 and 3, and store it in a variable called randomNumber
  var randomNumber = Math.floor(Math.random() * 4);

  //2.4. Create a new variable called randomChosenColour and use the randomNumber from step 2 to select a random colour from the buttonColours array.
  var randomChosenColour = buttonColours[randomNumber];

  //2.6. Add the new randomChosenColour generated in step 4 to the end of the gamePattern.
  gamePattern.push(randomChosenColour);

  //3.1. Use jQuery to select the button with the same id as the randomChosenColour
  //3.2. Use Google/Stackoverflow to figure out how you can use jQuery to animate a flash to the button selected in step 1.
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  //3.3. Use Google/Stackoverflow to figure out how you can use Javascript to play the sound for the button colour selected in step 1.
  //5.4. Refactor the code in playSound() so that it will work for both playing sound in nextSequence() and when the user clicks a button.
  playSound(randomChosenColour);
}

//5.2. Create a new function called playSound() that takes a single input parameter called name.
function playSound(name) {
  //5.3. Take the code we used to play sound in the nextSequence() function and add it to playSound().
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

//6.1. Create a new function called animatePress(), it should take a single input parameter called currentColour.
function animatePress(currentColour) {

//6.2. Use jQuery to add this pressed class to the button that gets clicked inside animatePress().
  $("#"+currentColour).addClass("pressed");

  var delayInMilliseconds = 100; //100 milisecond
  //6.3. use Google/Stackoverflow to figure out how you can use Javascript to remove the pressed class after a 100 milliseconds.
  setTimeout(function() {
    //your code to be executed after 100 milisecond
    $("#"+currentColour).removeClass("pressed");
  }, delayInMilliseconds);
}

//10.1. Create a new function called startOver().
function startOver() {

  //10.3. Inside this function, you'll need to reset the values of level, gamePattern and started variables.
  level = 0;
  gamePattern = [];
  started = false;
}
