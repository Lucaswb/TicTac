var squareSize = 200; //line this up with grid dimensions
var topOffSet = 50;
var leftOffSet =  100; //line this up with grid dimensions
var gridGap = 10;
var gameBoard;
var menuShowing = true;
//ONLOAD
var array1exception = [0,0,0,1,0,-1,0,1,0,0];
var array2exception = [0,1,0,1,0,-1,0,0,0,1];
gameBoard = new Board();
gameBoard.activation = false;
function clicked(event){

  console.log("turn coutner" + gameBoard.turnCounter)
  var x = event.clientX;
  var y = event.clientY;
  console.log(x, y);
  // console.log(gameBoard.boardArray.toString()
  gameBoard.whenClicked(x,y);
};

Board.prototype.whenClicked = function(xInput,yInput){
  if (this.activation === false) {
    console.log("the game is not running")
    return false;
  } else {
    //AI IS MOVING first NOT DOING ANYTHING
    if(this.opponentType === "ai" && (this.turnCounter + 1) === this.turn) {
      console.log("WAIT FOR AI TO MOVE")
      //PLAYER X CAN MOVE
    } else {
      gameBoard.squareSize = 200 //line this up with grid dimensions
      gameBoard.topOffSet = 50;
      gameBoard.leftOffSet = 100; //line this up with grid dimensions
      gameBoard.gridGap = 10;
      var square = getSquare(xInput,yInput);
      if(square){
        if (!($(".box" + square).hasClass("xPic")) && !($(".box" + square).hasClass("oPic"))){
          // if (this.opponentType === "ai" && this.turnCounter % 2 === this.turn)
          if (this.turnCounter % 2 === 0){
            $(".box" + square).addClass("xPic");
            this.boardArray[square] = 1;
            this.turnCounter++;
          } else { // turnCounter is not % 2 === 0
            $(".box" + square).addClass("oPic");
            this.boardArray[square] = -1;
            this.turnCounter++;
          }

          var winner = checkIfWinner(this.boardArray);
          var draw = checkDraw(this.boardArray);
          if (winner){
            console.log(winner);
            $(".win").text("PLAYER " + (((this.turnCounter +1) % 2)+1) + " WAS THE WINNER!");
            this.activation = false
          } else if (draw){
            console.log("it was a draw")
            $(".win").text("IT WAS A DRAW!");
            this.activation = false
          }
        }
      }
      //AI MOVE
      if(this.activation && this.opponentType === "ai" && this.turnCounter % 2 != this.turn){
        setTimeout(function(){
          // aiMoveRandom(this);
          this.aiMove();
          //USING BIND FUNCTION TO BE ABLE TO USE THIS IN SETTIMEOUT
        }.bind(this), 1000);
      }
    };
  }
}

function Board(opponentType, difficulty, turn, squareSize, topOffSet, leftOffSet, gridGap){
  this.squareSize = squareSize; //line this up with grid dimensions
  this.topOffSet = topOffSet;
  this.leftOffSet = leftOffSet; //line this up with grid dimensions
  this.gridGap = gridGap;
  this.squareSize; //line this up with grid dimensions
  this.topOffSet;
  this.leftOffSet; //line this up with grid dimensions
  this.gridGap;
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

Board.prototype.boardResize = function(squareSize, topOffSet, leftOffSet, gridGap){
  this.squareSize = squareSize; //line this up with grid dimensions
  this.topOffSet = topOffSet;
  this.leftOffSet = leftOffSet; //line this up with grid dimensions
  this.gridGap = gridGap;
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



//TAKES IN GLOBAL VARIABLES
function startNewGame(opponentType, difficulty, turn){
  gameBoard = new Board(opponentType, difficulty, turn, squareSize, topOffSet, leftOffSet, gridGap);
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

Board.prototype.resetBoard = function(){
  this.activation = true;
  this.boardReset();
  this.turnCounter = 0;
  boardViewReset();
  $(".win").text("");
}

$(document).ready(function(){
  $("#resetButton").click(function(event){
    event.preventDefault();
    gameBoard.resetBoard();
    if(gameBoard.opponentType === "ai" && (gameBoard.turnCounter + 1) === gameBoard.turn) {
      console.log("WAIT FOR AI TO MOVE")
      setTimeout(function(){
        gameBoard.aiMove();
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
      setTimeout(function(){
      gameBoard.aiMove();
      }, 1000);
    }
  });
});

Board.prototype.aiMove = function(){

  if (this.difficulty === "3") {
    this.aiImpossible();
  } else if (this.difficulty === "2"){
    this.aiMoveHard();
  } else { //for difficulty 1
    this.aiMoveRandom();
  }
}
Board.prototype.aiMoveRandom = function (){
  var ran = Math.floor((Math.random()*9)+1);
  if (!this.boardArray[ran]){
    if (this.turn===0) {
      this.boardArray[ran]=-1;
      $(".box" + ran).addClass("oPic");
      this.turnCounter++;
    } else {
      this.boardArray[ran]=1;
      $(".box" + ran).addClass("xPic");
      this.turnCounter++;
    }
    //CHECK GAME OVER
    var winner = checkIfWinner(this.boardArray);
    var draw = checkDraw(this.boardArray);
    if (winner){
      console.log(winner);
      this.activation = false
      $(".win").text("YOU GOT BEAT BY THE AI!");
    } else if (draw){
      console.log("it was a draw")
      this.activation = false
      $(".win").text("The game was a draw!");
    }
  } else {
    this.aiMoveRandom();
  }
}

Board.prototype.aiMoveHard = function(){
  var reverseTurn;
  if(this.turn === 0){
    reverseTurn = 1;
  } else {
    reverseTurn = 0;
  }
  var newSquareWeWin = makeThreeInRow(this, (reverseTurn));
  var newSquareTheyWouldWin = makeThreeInRow(this, (this.turn));
  var newSquareAdvantage = makeTwoInRow(this, (reverseTurn));
  var newSquareTheirAdv = makeThreeInRow(this, (this.turn));
  if (newSquareWeWin){

    if (this.turn===0) {
      this.boardArray[newSquareWeWin]=-1;
      $(".box" + newSquareWeWin).addClass("oPic");
      this.turnCounter++;
    } else {
      this.boardArray[newSquareWeWin]=1;
      $(".box" + newSquareWeWin).addClass("xPic");
      this.turnCounter++;
    }
  } else if(newSquareTheyWouldWin){
    if (this.turn===0) {
      this.boardArray[newSquareTheyWouldWin]=-1;
      $(".box" + newSquareTheyWouldWin).addClass("oPic");
      this.turnCounter++;
    } else {
      this.boardArray[newSquareTheyWouldWin]=1;
      $(".box" + newSquareTheyWouldWin).addClass("xPic");
      this.turnCounter++;
    }
  } else if (newSquareAdvantage){
    if (this.turn===0) {
      this.boardArray[newSquareAdvantage]=-1;
      $(".box" + newSquareAdvantage).addClass("oPic");
      this.turnCounter++;
    } else {
      this.boardArray[newSquareAdvantage]=1;
      $(".box" + newSquareAdvantage).addClass("xPic");
      this.turnCounter++;
    }
  } else if (newSquareTheirAdv){
    if (this.turn===0) {
      this.boardArray[newSquareTheirAdv]=-1;
      $(".box" + newSquareTheirAdv).addClass("oPic");
      this.turnCounter++;
    } else {
      this.boardArray[newSquareTheirAdv]=1;
      $(".box" + newSquareTheirAdv).addClass("xPic");
      this.turnCounter++;
    }
  } else {
    this.aiMoveRandom();
  }
  //END OF AI TURN CHECK IF WINNER
  var winner = checkIfWinner(this.boardArray);
  var draw = checkDraw(this.boardArray);
  if (winner){
    console.log(winner);
    this.activation = false
    $(".win").text("YOU GOT BEAT BY THE AI!");
  } else if (draw){
    console.log("it was a draw")
    this.activation = false
    $(".win").text("The game was a draw!");
  }
  //if they have three then block
}

Board.prototype.aiImpossible = function(){
  if (this.turn===1){
    if (this.turnCounter===0){
      if (this.turn===0) {
        this.boardArray[3]=-1;
        $(".box" + 3).addClass("oPic");
        this.turnCounter++;
      } else {
        this.boardArray[3]=1;
        $(".box" + 3).addClass("xPic");
        this.turnCounter++;
      }
    } else if (this.turnCounter === 2){
      var playerMove = findPlayerFirstMove(this);
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
      if (this.turn===0) {
        this.boardArray[aiMove]=-1;
        $(".box" + aiMove).addClass("oPic");
        this.turnCounter++;
      } else {
        this.boardArray[aiMove]=1;
        $(".box" + aiMove).addClass("xPic");
        this.turnCounter++;
      }
    } else {
      this.aiMoveHard();
    }
  } else {
    // debugger;
    var playerMove = findPlayerFirstMove(this);
    var aiMove;
    if(this.boardArray.toString() === array1exception.toString() || this.boardArray.toString() === array2exception.toString()){
      if (this.turn===0) {
        this.boardArray[4]=-1;
        $(".box" + 4).addClass("oPic");
        this.turnCounter++;
      } else {
        this.boardArray[4]=1;
        $(".box" + 4).addClass("xPic");
        this.turnCounter++;
      }

    } else if (playerMove === 5 && this.turnCounter === 1){
      if (this.turn===0) {
        this.boardArray[7]=-1;
        $(".box" + 7).addClass("oPic");
        this.turnCounter++;
      } else {
        this.boardArray[7]=1;
        $(".box" + 7).addClass("xPic");
        this.turnCounter++;
      }
    } else if(playerMove != 5 && this.turnCounter === 1){
      this.updateBoard(5);
      if(turn === 0){
        $(".box" + nextMove).addClass("oPic");
      } else {
        $(".box" + nextMove).addClass("xPic");
      }
    } else {
      this.aiMoveHard();
    }
  }
}

Board.prototype.updateBoard = function(nextMove){
  if (this.turn===0) {
    this.boardArray[nextMove]=-1;
    this.turnCounter++;
  } else {
    this.boardArray[nextMove]=1;
    this.turnCounter++;
  }
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

//AI not seeing TRAP IF WE GO MIDDLE have AI automatically go to corner
//FIX NOT DEACTIVING CLICK WHEN AI IS GOING

//FACTOR OUT VIEW LOGIC FROM BOARD AI AND HAVE IT RETURN THE BOARD ARRAY SO THE VIEW CAN UPDATE
