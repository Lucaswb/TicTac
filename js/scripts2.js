var squareSize = 300 //line this up with grid dimensions
var topOffSet = 10;
var leftOffSet = 10;
var gridGap = 10;
var turnCounter;
var gameBoard;
var menuShowing = true;
var opponentType;
//ONLOAD

gameBoard = new Board();
gameBoard.activation = false;
function clicked(event){
  // console.log(gameBoard.boardArray.toString()

  if (gameBoard.activation === false) {
    console.log("the game is not running")
    return false;
  } else {
    //AI IS MOVING
    if(gameBoard.opponentType === "ai" && gameBoard.turnCounter % 2 != 0){
      console.log("WAIT FOR AI TO MOVE")
      //PLAYER CAN MOVE
    } else {
      var x = event.clientX;
      var y = event.clientY;
      console.log(x, y);
      // console.log(" x: " + x + "y: " + y);
      var square = getSquare(x,y);
      if(square){
        if (!($(".box" + square).hasClass("xPic")) && !($(".box" + square).hasClass("oPic"))){
          if(gameBoard.turnCounter % 2 === 0){
            $(".box" + square).addClass("xPic");
            gameBoard.boardArray[square] = 1;
          } else { // turnCounter is not % 2 === 0
            $(".box" + square).addClass("oPic");
            gameBoard.boardArray[square] = -1;
          }
          gameBoard.turnCounter++;
          var winner = checkIfWinner(gameBoard.boardArray);
          if (winner){
            console.log(winner);
            $(".win").text("PLAYER [" + ((gameBoard.turnCounter % 2) + 1) + "]WAS THE WINNER!");
            gameBoard.activation = false
          }
          var draw = checkDraw(gameBoard.boardArray);
          if (draw){
            console.log("it was a draw")
            $(".win").text("IT WAS A DRAW!");
            gameBoard.activation = false
          }
        }
      }

      //AI MOVE
      if(gameBoard.activation && gameBoard.opponentType === "ai" && gameBoard.turnCounter % 2 != 0){
         setTimeout(function(){
           aiMove(gameBoard);
         }, 1000);
      }
    };
  }
};

function Board(opponentType, difficulty){
  this.turnCounter = 0;
  this.boardArray = makeBoard();
  this.activation = true;
  this.opponentType = opponentType;
  if(opponentType === "ai"){
    this.difficulty = difficulty;
  }
}

Board.prototype.boardReset = function(){
  for(var i = 0; i < this.boardArray.length; i++){
    this.boardArray[i] = 0;
  }
}

document.addEventListener("click", clicked);

function getSquare(x, y){
  // debugger;
  for(var i = 0; i < 3; i++){
    for (var j = 0; j < 3; j++){
      if (x>(squareSize+gridGap) * i +leftOffSet && x <= (squareSize+gridGap) * i + (squareSize) + leftOffSet){
        if (y>(squareSize+gridGap)* j + topOffSet && y <= (squareSize+gridGap) * j + squareSize + topOffSet){
          return i * 3 + j + 1;
        }
      }
    }
  }
  return false;
}

function makeBoard(){
  var newBoard = []
  for(var i = 0; i < 10; i++){
    newBoard.push(0);
  }
  return newBoard;
}

function boardViewReset(){
  for(var i = 1; i < 10; i++){
    $(".box" + i).removeClass("xPic");
    $(".box" + i).removeClass("oPic");
  }
}

function resetBoard(){
  gameBoard.boardReset();
  gameBoard.turnCounter = 0;
  boardViewReset();
  $(".win").text("");
}

//TAKES IN GLOBAL VARIABLES
function startNewGame(opponentType, difficulty){
  gameBoard = new Board(opponentType, difficulty)
}

function checkDraw(boardInput){
  for (var i = 1; i<=9; i++){
    if (boardInput[i]===0){
      return false
    }
  }
  return true
}

function checkIfWinner(boardInput){
  for (var i=0; i<=6; i+=3){
    var win1 = boardInput[i+1]+boardInput[i+2]+boardInput[i+3]
    if (win1 === 3){
      return 1;
    } else if (win1 === -3) {
      return 2;
    } else {
    }
  }
  for (var i=1; i<=3; i+=1){
    var win2 = boardInput[i]+boardInput[i+3]+boardInput[i+6];
    if (win2 === 3){
      return 1;
    } else if (win2 === -3) {
      return 2;
    } else {
    }
  }
  var win3 = boardInput[1]+boardInput[5]+boardInput[9];
  if (win3 === 3){
    return 1;
  } else if (win3 === -3) {
    return 2;
  } else {
  }

  var win4 = boardInput[3]+boardInput[5]+boardInput[7];
  if (win4 === 3){
    return 1;
  } else if (win4 === -3) {
    return 2;
  } else {
  }
}

$(document).ready(function(){
  // alert("hi")
  $("#resetButton").click(function(event){
    event.preventDefault();
    resetBoard();
    gameBoard.activation = true;
  });

  //menu toggle
  $("#menuButton").click(function(event){
    event.preventDefault();
    console.log("this function ran")
    if (menuShowing){
      console.log(menuShowing)
      $(".menu").hide();
      // console.log(menuShowing)
      menuShowing = false;
      gameBoard.activation = true;
    } else {
      $(".menu").show();
      menuShowing = true;
      gameBoard.activation = false;
    }
  });
  $("#aiButton").click(function(){
    $("select.form-control").show();
    opponentType= "ai"
  })
  $("#pvpButton").click(function(){
    $("select.form-control").hide();
    opponentType= "pvp"
  })

  //START GAME
  $("form.menuForm").submit(function(event){
    event.preventDefault();
    resetBoard();
    $(".menu").hide();
    menuShowing = false;
    gameBoard.activation = true;
    var difficulty = $("#difficultyLevel").val();
    startNewGame(opponentType, difficulty);
  });
});

function aiMove(boardInput){
  var ran = Math.floor((Math.random()*9)+1);
  if (!boardInput.boardArray[ran]){
    boardInput.boardArray[ran]=-1;
    $(".box" + ran).addClass("oPic");
    boardInput.turnCounter++;

    //CHECK GAME OVER
    var winner = checkIfWinner(gameBoard.boardArray);
    if (winner){
      console.log(winner);
      gameBoard.activation = false
      $(".win").text("YOU GOT BEAT BY THE AI!");
    }
    var draw = checkDraw(gameBoard.boardArray);
    if (draw){
      console.log("it was a draw")
      gameBoard.activation = false

    }
  } else {
    aiMove(boardInput);
  }
  // $(".box" + square).addClass("xPic");
  // gameBoard.boardArray[airmove] = 1;

  // $(".box" + square).addClass("oPic");
  // gameBoard.boardArray[aimove] = -1;
}

//FINAL WINNING MOVE AGAINST AI ENDED IN DRAW
//offset counter by 1 for ai going first
//change dropdown text to option selected
//fadIn and slideUP are not working properly for menuform
//card colors sections
//opponent type is global
//change global variables from aiMove

//can seem like its working if its deleting stuff but maybe is reloading page because not prevent default
