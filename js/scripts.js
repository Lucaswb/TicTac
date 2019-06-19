var squareSize = 300 //line this up with grid dimensions
var topOffSet = 10;
var leftOffSet = 10;
var gridGap = 10;
var turnCounter = 0;
var board;

//ONLOAD
board = makeBoard();

function clicked(event){
  var x = event.clientX;
  var y = event.clientY;
  console.log(x, y);
  // console.log(" x: " + x + "y: " + y);
  var square = getSquare(x,y);
  if(square){
    if (!($(".box" + square).hasClass("xPic")) && !($(".box" + square).hasClass("oPic"))){
      if(turnCounter % 2 === 0){
        $(".box" + square).addClass("xPic");
        board[square] = 1;
      } else { // turnCounter is not % 2 === 0
        $(".box" + square).addClass("oPic");
        board[square] = -1;
      }
      turnCounter++;
      var draw = checkDraw(board);
      if (draw){
        console.log("it was a draw")
        resetBoard();
      }
      var winner = checkIfWinner(board);
      if (winner){
        console.log(winner);
        resetBoard();
        // setTimeout(function(){
        //   alert("there was a winner");
        // }, 1000);
      }
    }
    console.log(square);
    console.log(board.toString());
  };
};


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
  board = makeBoard();
  boardViewReset();
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
