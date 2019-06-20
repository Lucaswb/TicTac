var squareSize = 200 //line this up with grid dimensions
var topOffSet = 50;
var leftOffSet =  parseFloat($(window).width())*.25; //line this up with grid dimensions
var gridGap = 10;
var gameBoard;
var menuShowing = true;
var opponentType;
//ONLOAD
var array1exception = [0,0,0,1,0,-1,0,1,0,0];
var array2exception = [0,1,0,1,0,-1,0,0,0,1];
gameBoard = new Board();
gameBoard.activation = false;
function clicked(event){
  squareSize = 200 //line this up with grid dimensions
  topOffSet = 50;
  leftOffSet =  parseFloat($(window).width())*.25; //line this up with grid dimensions
  gridGap = 10;
  console.log("turn coutner" + gameBoard.turnCounter)
  // console.log(gameBoard.boardArray.toString()
  if (gameBoard.activation === false) {
    console.log("the game is not running")
    return false;
  } else {
    //AI IS MOVING first NOT DOING ANYTHING
    if(gameBoard.opponentType === "ai" && (gameBoard.turnCounter + 1) === gameBoard.turn) {
      console.log("WAIT FOR AI TO MOVE")
      //PLAYER X CAN MOVE
    } else {
      var x = event.clientX;
      var y = event.clientY;
      console.log(x, y);
      // console.log(" x: " + x + "y: " + y);
      var square = getSquare(x,y);
      if(square){
        if (!($(".box" + square).hasClass("xPic")) && !($(".box" + square).hasClass("oPic"))){
          // if (gameBoard.opponentType === "ai" && gameBoard.turnCounter % 2 === gameBoard.turn)
          if (gameBoard.turnCounter % 2 === 0){
            $(".box" + square).addClass("xPic");
            gameBoard.boardArray[square] = 1;
            gameBoard.turnCounter++;
          } else { // turnCounter is not % 2 === 0
            $(".box" + square).addClass("oPic");
            gameBoard.boardArray[square] = -1;
            gameBoard.turnCounter++;
          }

          var winner = checkIfWinner(gameBoard.boardArray);
          var draw = checkDraw(gameBoard.boardArray);
          if (winner){
            console.log(winner);
            $(".win").text("PLAYER " + (((gameBoard.turnCounter +1) % 2)+1) + " WAS THE WINNER!");
            gameBoard.activation = false
          } else if (draw){
            console.log("it was a draw")
            $(".win").text("IT WAS A DRAW!");
            gameBoard.activation = false
          }
        }
      }
      //AI MOVE
      if(gameBoard.activation && gameBoard.opponentType === "ai" && gameBoard.turnCounter % 2 != gameBoard.turn){
        setTimeout(function(){
          // aiMoveRandom(gameBoard);
          if (gameBoard.difficulty === "1"){
            aiMoveRandom(gameBoard);
          }
          else if (gameBoard.difficulty === "2"){
            aiMoveHard(gameBoard);

          } else {
            aiImpossible(gameBoard);
            console.log("turn coutner" + gameBoard.turnCounter)
          }
        }, 1000);
      }
    };
  }
};

function Board(opponentType, difficulty, turn){
  if (opponentType === "ai" && turn === 1){
    this.turn = 1;
  } else {
    this.turn = 0;
  }
  this.turnCounter = 0;
  console.log(this.turnCounter)
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
function aiImpossible(boardInput){
  if (boardInput.turn===1){
    if (boardInput.turnCounter===0){
      if (gameBoard.turn===0) {
        boardInput.boardArray[3]=-1;
        $(".box" + 3).addClass("oPic");
        boardInput.turnCounter++;
      } else {
        boardInput.boardArray[3]=1;
        $(".box" + 3).addClass("xPic");
        boardInput.turnCounter++;
      }
    } else if (boardInput.turnCounter === 2){
      var playerMove = findPlayerFirstMove(boardInput);
      var aiMove;
      switch (playerMove) {
        case 1:
        aiMove=7
        break;
        case 2:
        aiMove= 5;
        break;
        case 4:
        aiMove= 5;
        break;
        case 5:
        aiMove= 7;
        break;
        case 6:
        aiMove= 5;
        break;
        case 7:
        aiMove= 9;
        break;
        case 8:
        aiMove= 5;
        break;
        case 9:
        aiMove= 7;
        break;
        default:
      }
      if (gameBoard.turn===0) {
        boardInput.boardArray[aiMove]=-1;
        $(".box" + aiMove).addClass("oPic");
        boardInput.turnCounter++;
      } else {
        boardInput.boardArray[aiMove]=1;
        $(".box" + aiMove).addClass("xPic");
        boardInput.turnCounter++;
      }
    } else {
      aiMoveHard(boardInput);
    }
  } else {
    // debugger;
    var playerMove = findPlayerFirstMove(boardInput);
    var aiMove;
    if(boardInput.boardArray.toString() === array1exception.toString() || boardInput.boardArray.toString() === array2exception.toString()){
      if (gameBoard.turn===0) {
        boardInput.boardArray[4]=-1;
        $(".box" + 4).addClass("oPic");
        boardInput.turnCounter++;
      } else {
        boardInput.boardArray[4]=1;
        $(".box" + 4).addClass("xPic");
        boardInput.turnCounter++;
      }
    } else if(playerMove != 5 && boardInput.turnCounter === 1){
      if (gameBoard.turn===0) {
        boardInput.boardArray[5]=-1;
        $(".box" + 5).addClass("oPic");
        boardInput.turnCounter++;
      } else {
        boardInput.boardArray[5]=1;
        $(".box" + 5).addClass("xPic");
        boardInput.turnCounter++;
      }
    } else {
      aiMoveHard(boardInput);
    }
  }
}

//takes in board, returns which board square was set to 1 by player
function findPlayerFirstMove(boardInput){
  for (var i = 0; i <= 9; i++){
    if (boardInput.turn === 0){
      if (boardInput.boardArray[i] === 1){
        return i;
      }
    } else {
      if (boardInput.boardArray[i] === -1){
        return i;
      }
    }
  }
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
function startNewGame(opponentType, difficulty, turn){
  gameBoard = new Board(opponentType, difficulty, turn)
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

function checkIfAdvantage(boardInput, turn){
  for (var i=0; i<=6; i+=3){
    var win1 = boardInput[i+1]+boardInput[i+2]+boardInput[i+3]
    if (win1 === 2){
      return 1;
    } else if (win1 === -2) {
      return 2;
    } else {
    }
  }
  for (var i=1; i<=3; i+=1){
    var win2 = boardInput[i]+boardInput[i+3]+boardInput[i+6];
    if (win2 === 2){
      return 1;
    } else if (win2 === -2) {
      return 2;
    } else {
    }
  }
  var win3 = boardInput[1]+boardInput[5]+boardInput[9];
  if (win3 === 2){
    return 1;
  } else if (win3 === -2) {
    return 2;
  } else {
  }

  var win4 = boardInput[3]+boardInput[5]+boardInput[7];
  if (win4 === 2){
    return 1;
  } else if (win4 === -2) {
    return 2;
  } else {
  }
}
// Attempt to create a hard AI
// testBoard = new Board("ai","2","1");
// var testBoard1 = [0,1,1,0,-1,-1,0,1,-1]
//
// function aiMoveHard(boardInput, turnCounter, turn) {
//   var sums = [0];
//   var num = 1;
//   for (var i = 1, i <= 3, i+=1);
//     sum.push(boardInput[i]+boardInput[i+1]+boardInput[i+2])
//   }
//   for (var i = 1, i <= 7, i+=3);
//     sum.push(boardInput[i]+boardInput[i+1]+boardInput[i+2])
//   sum.push(boardInput[1]+boardInput[5]+boardInput[9])
//   sum.push(boardInput[3]+boardInput[5]+boardInput[7])
// )
// function

$(document).ready(function(){
  // alert("hi")
  $("#resetButton").click(function(event){
    event.preventDefault();
    resetBoard();
    gameBoard.activation = true;
    if(gameBoard.opponentType === "ai" && (gameBoard.turnCounter + 1) === gameBoard.turn) {
      console.log("WAIT FOR AI TO MOVE")
      setTimeout(function(){
        // aiMoveRandom(gameBoard);
        if (gameBoard.difficulty === "1"){
          aiMoveRandom(gameBoard);
        }
        else if (gameBoard.difficulty === "2"){
          aiMoveHard(gameBoard);
        } else {
          aiImpossible(gameBoard);
          console.log("TURN COUNTER" + boardInput.turnCounter)
        }
      }, 1000);
    }
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
    var turn = parseInt($("#playerTurn").val());
    startNewGame(opponentType, difficulty, turn);
    if(gameBoard.opponentType === "ai" && (gameBoard.turnCounter + 1) === gameBoard.turn) {
      console.log("WAIT FOR AI TO MOVE")
      setTimeout(function(){
        // aiMoveRandom(gameBoard);
        if (gameBoard.difficulty === "1"){
          aiMoveRandom(gameBoard);
        }
        else if (gameBoard.difficulty === "2"){
          aiMoveHard(gameBoard);

        } else {
          aiImpossible(gameBoard);
          console.log("TURN COUNTER:" + gameBoard.turnCounter);
        }
      }, 1000);
    }
  });
});
function aiMoveRandom(boardInput){
  var ran = Math.floor((Math.random()*9)+1);
  if (!boardInput.boardArray[ran]){
    if (gameBoard.turn===0) {
      boardInput.boardArray[ran]=-1;
      $(".box" + ran).addClass("oPic");
      boardInput.turnCounter++;
    } else {
      boardInput.boardArray[ran]=1;
      $(".box" + ran).addClass("xPic");
      boardInput.turnCounter++;
    }
    //CHECK GAME OVER
    var winner = checkIfWinner(gameBoard.boardArray);
    var draw = checkDraw(gameBoard.boardArray);
    if (winner){
      console.log(winner);
      gameBoard.activation = false
      $(".win").text("YOU GOT BEAT BY THE AI!");
    } else if (draw){
      console.log("it was a draw")
      gameBoard.activation = false
      $(".win").text("The game was a draw!");
    }
  } else {
    aiMoveRandom(boardInput);
  }
}

function aiMoveHard(boardInput){
  //if we have three in a makeTwoInRow/
  var reverseTurn;
  if(gameBoard.turn === 0){
    reverseTurn = 1;
  } else {
    reverseTurn = 0;
  }
  var newSquareWeWin = makeThreeInRow(boardInput, (reverseTurn));
  var newSquareTheyWouldWin = makeThreeInRow(boardInput, (boardInput.turn));
  var newSquareAdvantage = makeTwoInRow(boardInput, (reverseTurn));
  var newSquareTheirAdv = makeThreeInRow(boardInput, (boardInput.turn));
  if (newSquareWeWin){

    if (gameBoard.turn===0) {
      boardInput.boardArray[newSquareWeWin]=-1;
      $(".box" + newSquareWeWin).addClass("oPic");
      boardInput.turnCounter++;
    } else {
      boardInput.boardArray[newSquareWeWin]=1;
      $(".box" + newSquareWeWin).addClass("xPic");
      boardInput.turnCounter++;
    }
  } else if(newSquareTheyWouldWin){
    if (gameBoard.turn===0) {
      boardInput.boardArray[newSquareTheyWouldWin]=-1;
      $(".box" + newSquareTheyWouldWin).addClass("oPic");
      boardInput.turnCounter++;
    } else {
      boardInput.boardArray[newSquareTheyWouldWin]=1;
      $(".box" + newSquareTheyWouldWin).addClass("xPic");
      boardInput.turnCounter++;
    }
  } else if (newSquareAdvantage){
    if (gameBoard.turn===0) {
      boardInput.boardArray[newSquareAdvantage]=-1;
      $(".box" + newSquareAdvantage).addClass("oPic");
      boardInput.turnCounter++;
    } else {
      boardInput.boardArray[newSquareAdvantage]=1;
      $(".box" + newSquareAdvantage).addClass("xPic");
      boardInput.turnCounter++;
    }
  } else if (newSquareTheirAdv){
    if (gameBoard.turn===0) {
      boardInput.boardArray[newSquareTheirAdv]=-1;
      $(".box" + newSquareTheirAdv).addClass("oPic");
      boardInput.turnCounter++;
    } else {
      boardInput.boardArray[newSquareTheirAdv]=1;
      $(".box" + newSquareTheirAdv).addClass("xPic");
      boardInput.turnCounter++;
    }
  } else {
    aiMoveRandom(boardInput);
  }
  //END OF AI TURN CHECK IF WINNER
  var winner = checkIfWinner(gameBoard.boardArray);
  var draw = checkDraw(gameBoard.boardArray);
  if (winner){
    console.log(winner);
    gameBoard.activation = false
    $(".win").text("YOU GOT BEAT BY THE AI!");
  } else if (draw){
    console.log("it was a draw")
    gameBoard.activation = false
    $(".win").text("The game was a draw!");
  }
  //if they have three then block
}

//takes in x or o for who it is checking, if there is a win condition, returns that square, else returns nothing
function makeThreeInRow(board, turn){
  for(var i = 1; i <= 9; i++){
    var boardClone = board.boardArray.slice(0);
    if(board.boardArray[i] === 0){
      if (turn === 0){
        //CHECKING
        boardClone[i] = 1;
        if (checkIfWinner(boardClone)){
          return i;
        }
      } else {
        boardClone[i] = -1;
        if (checkIfWinner(boardClone)){
          return i;
        }
      }
    }
  }
  return false;
}


//takes in x or o for who it is checking, returns square to make two in a row
function makeTwoInRow(board, turn){
  for(var i = 1; i <= 9; i++){
    var boardClone = board.boardArray.slice(0);
    if(board.boardArray[i] === 0){
      if (turn === 0){
        //CHECKING
        boardClone[i] = 1;
        if (checkIfAdvantage(boardClone)){
          return i;
        }
      } else {
        boardClone[i] = -1;
        if (checkIfAdvantage(boardClone)){
          return i;
        }
      }
    }
  }
  return false;
}

//FINAL WINNING MOVE AGAINST AI ENDED IN DRAW
//offset counter by 1 for ai going first
//change dropdown text to option selected
//fadIn and slideUP are not working properly for menuform
//card colors sections
//opponent type is global
//change global variables from aiMove
//make ai move just return new square and do move manually

//can seem like its working if its deleting stuff but maybe is reloading page because not prevent default
