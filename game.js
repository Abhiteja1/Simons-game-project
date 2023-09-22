var buttonColors = ["red","green","blue","yellow"];
var gamePattern = [];
var userClickedPattern =[];
var started=false;
var level =0;

$(".btn").on("click",function(){
    var userChoosenColor = $(this).attr("id");
    userClickedPattern.push(userChoosenColor);
    playSounds(userChoosenColor);
    animatePress(userChoosenColor);
    checkAnswer(userClickedPattern.length-1);

});

function playSounds(name){
var colorSound = new Audio("sounds/"+name+".mp3");
colorSound.play();
}

function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed")
    },100);
}

$(document).keypress(function(){
    if(!started)
    {
        $("#level-title").text("level "+ level);
        nextSequence();
        started=true;
    }
});

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
        console.log("Success");
        
        if(gamePattern.length===userClickedPattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    } else{
        console.log("Wrong");
        playSounds("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over")
        },200);
        $("#level-title").text("Game Over, Press any key to Restart.");
        startOver();
    }
}

function nextSequence(){
    userClickedPattern=[];
    level++;
    $("#level-title").text("level "+level);
    var randomNumber = Math.floor(Math.random()*4);
    var randomChoosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChoosenColor);
    $("#"+randomChoosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    var sound = new Audio("sounds/"+randomChoosenColor+".mp3");
    sound.play();   
}

function startOver(){
    level=0;
    gamePattern=[];
    started=false;
}