var gamePattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var userClickedPattern = [];
var level = 0;
var start = false;
// to make sequence
function nextSequence(){
    userClickedPattern = [];

    var ranNum = Math.random(ranNum)*4 ;
    ranNum = Math.floor(ranNum);
    var randomChosenColour = buttonColours[ranNum];
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    level++ ;
    $("h1").text("level "+ level);
}
//whenever any key is pressed for the first time it will call the function nextSequence and by assigning the value of start to true we stop the calling of nextSequence for further key press 
$(document).keypress(function(){
    if(!start){
        nextSequence();
        start = true;
    }
});
// the function cheak whether every biutton that user has clicked is matched with the previous sequence of game or not
function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        console.log("success");
        if(userClickedPattern.length === gamePattern.length){
            setTimeout(function(){
                nextSequence();
            }, 1000);
        }
    }
    else{
        console.log("wrong");
        playSound("wrong");
        $("body").addClass("gameOver");
        setTimeout(function(){
            $("body").removeClass("gameOver");
        }, 200);
        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
    }
    
}
//this function will start the game from the begining
function startOver(){
    start = false;
    level = 0;
    gamePattern = [];

}

// play the sound
function playSound(name){
    var audio = new Audio("sounds/"+name+".mp3");
    audio.play();
}

//add animation to the clicked button
function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColour).removeClass("pressed");
    }, 100);
    
}

// for taking button press as input
$(".btn").click(function(){
    var userChosenColour = this.id ;
    userClickedPattern.push(userChosenColour);
    console.log(gamePattern);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});


