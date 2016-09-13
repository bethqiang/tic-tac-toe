$(document).ready(function() {

  // initialize variables
  // human = either x or o, whatever the player picks
  // ai = either x or o, whatever the player doesn't pick
  var human, ai;

  // each of these corresponds to a cell in the game table
  var c00, c01, c02, c10, c11, c12, c20, c21, c22;

  // to keep track of whose turn it is
  var turn = 0;

  // player picks x or o
  $("#x").click(function() {
    human = "X";
    ai = "O";
    $("#choice").fadeOut();
    $("#board").fadeTo("slow",1);
  });
  $("#o").click(function() {
    human = "O";
    ai = "X";
    $("#choice").fadeOut();
    $("#board").fadeTo("slow",1);
  });

  //all squares should be empty
  //clears the board
  function clearBoard() {
    c00 = $("#c00").text("");
    c01 = $("#c01").text("");
    c02 = $("#c02").text("");
    c10 = $("#c10").text("");
    c11 = $("#c11").text("");
    c12 = $("#c12").text("");
    c20 = $("#c20").text("");
    c21 = $("#c21").text("");
    c22 = $("#c22").text("");
    turn = 0;
  }

  //when "New game" button is pressed, clear the board
  $("#new-game").click(function() {
    clearBoard();
    $("#final-screen").hide();
    $("#choice").fadeTo("slow",1);
  });

  // The player clicks a square. If the square is empty, an x is placed in that square. If the square is not empty, have the human pick a different square.
  $("td").click(function() {
    if (turn === 0) {
      if ($(this).text() === "") {
        $(this).text(human);
        checkSquareValues();
        checkBoardState();
        turn = 1;
        aiMove();
        checkSquareValues();
        checkBoardState();
      } else {
        alert("There is already a move on that square. Please pick a different square.");
      }
    }
  }); //end box click function

  // The ai puts its token in an empty square based on some of the prioritized rules from https://en.wikipedia.org/wiki/Tic-tac-toe#Strategy:
  // 1. If there is a chance to win, go there.
  // 2. If there is a chance to block, go there.
  // 3. Empty center.
  // 4. If the opponent is in the corner, the play in the opposite corner.
  // 5. Empty corner.
  // 6. Empty side.
  function aiMove() {
    // case 1: if there is a chance to win
    if (c00 === "" && ((c01 === ai && c02 === ai) || (c10 === ai && c20 === ai) || (c11 === ai && c22 === ai))) {
      $("#c00").text(ai);
      turn = 0;
    }
    else if (c01 === "" && ((c00 === ai && c02 === ai) || (c11 === ai && c21 === ai))) {
      $("#c01").text(ai);
      turn = 0;
    }
    else if (c02 === "" && ((c00 === ai && c01 === ai) || (c12 === ai && c22 === ai) || (c11 === ai && c20 === ai))) {
      $("#c02").text(ai);
      turn = 0;
    }
    else if (c10 === "" && ((c00 === ai && c20 === ai) || (c11 === ai && c12 === ai))) {
      $("#c10").text(ai);
      turn = 0;
    }
    else if (c11 === "" && ((c10 === ai && c12 === ai) || (c00 === ai && c22 === ai) || (c02 === ai && c20 === ai))) {
      $("#c11").text(ai);
      turn = 0;
    }
    else if (c12 === "" && ((c10 === ai && c11 === ai) || (c02 === ai && c22 === ai))) {
      $("#c12").text(ai);
      turn = 0;
    }
    else if (c20 === "" && ((c21 === ai && c22 === ai) || (c00 === ai && c10 === ai) || (c02 === ai && c11 === ai))) {
      $("#c20").text(ai);
      turn = 0;
    }
    else if (c21 === "" && ((c20 === ai && c22 === ai) || (c01 === ai && c11 === ai))) {
      $("#c21").text(ai);
      turn = 0;
    }
    else if (c22 === "" && ((c20 === ai && c21 === ai) || (c02 === ai && c12 === ai) || (c00 === ai && c11 === ai))) {
      $("#c22").text(ai);
      turn = 0;
    }
    // case 2: if there is a chance to block
    else if (c00 === "" && ((c01 === human && c02 === human) || (c10 === human && c20 === human) || (c11 === human && c22 === human))) {
      $("#c00").text(ai);
      turn = 0;
    }
    else if (c01 === "" && ((c00 === human && c02 === human) || (c11 === human && c21 === human))) {
      $("#c01").text(ai);
      turn = 0;
    }
    else if (c02 === "" && ((c00 === human && c01 === human) || (c12 === human && c22 === human) || (c11 === human && c20 === human))) {
      $("#c02").text(ai);
      turn = 0;
    }
    else if (c10 === "" && ((c00 === human && c20 === human) || (c11 === human && c12 === human))) {
      $("#c10").text(ai);
      turn = 0;
    }
    else if (c11 === "" && ((c10 === human && c12 === human) || (c00 === human && c22 === human) || (c02 === human && c20 === human))) {
      $("#c11").text(ai);
      turn = 0;
    }
    else if (c12 === "" && ((c10 === human && c11 === human) || (c02 === human && c22 === human))) {
      $("#c12").text(ai);
      turn = 0;
    }
    else if (c20 === "" && ((c21 === human && c22 === human) || (c00 === human && c10 === human) || (c02 === human && c11 === human))) {
      $("#c20").text(ai);
      turn = 0;
    }
    else if (c21 === "" && ((c20 === human && c22 === human) || (c01 === human && c11 === human))) {
      $("#c21").text(ai);
      turn = 0;
    }
    else if (c22 === "" && ((c20 === human && c21 === human) || (c02 === human && c12 === human) || (c00 === human && c11 === human))) {
      $("#c22").text(ai);
      turn = 0;
    }
    // case 3: center
    else if (c11 === "") {
      $("#c11").text(ai);
      turn = 0;
    }
    // case 4: opposite corner
    else if (c00 === "" && (c02 === human  || c20 === human)) {
      $("#c00").text(ai);
      turn = 0;
    }
    else if (c02 === "" && (c00 === human  || c22 === human)) {
      $("#c02").text(ai);
      turn = 0;
    }
    else if (c22 === "" && (c02 === human  || c20 === human)) {
      $("#c22").text(ai);
      turn = 0;
    }
    else if (c20 === "" && (c00 === human  || c22 === human)) {
      $("#c20").text(ai);
      turn = 0;
    }
    // case 5: corner
    else if (c00 === "") {
      $("#c00").text(ai);
      turn = 0;
    }
    else if (c02 === "") {
      $("#c02").text(ai);
      turn = 0;
    }
    else if (c20 === "") {
      $("#c20").text(ai);
      turn = 0;
    }
    else if (c22 === "") {
      $("#c22").text(ai);
      turn = 0;
    }
    // case 6: empty side
    else if (c01 === "") {
      $("#c01").text(ai);
      turn = 0;
    }
    else if (c12 === "") {
      $("#c12").text(ai);
      turn = 0;
    }
    else if (c21 === "") {
      $("#c21").text(ai);
      turn = 0;
    }
    else if (c10 === "") {
      $("#c10").text(ai);
      turn = 0;
    }
  }

  // The program checks what is in each box after each move.
  function checkSquareValues() {
    c00 = $("#c00").html();
    c01 = $("#c01").html();
    c02 = $("#c02").html();
    c10 = $("#c10").html();
    c11 = $("#c11").html();
    c12 = $("#c12").html();
    c20 = $("#c20").html();
    c21 = $("#c21").html();
    c22 = $("#c22").html();
  }

  // The program should check the state: keep playing, someone won, or a draw.
  function checkBoardState() {
    // human wins
    if ((c00 === c01 && c00 === c02 && (c00 === human)) || //first row
      (c10 === c11 && c10 === c12 && (c10 === human)) || //second row
      (c20 === c21 && c20 === c22 && (c20 === human)) || //third row
      (c00 === c10 && c00 === c20 && (c00 === human)) || //first column
      (c01 === c11 && c01 === c21 && (c01 === human)) || //second column
      (c02 === c12 && c02 === c22 && (c02 === human)) || //third column
      (c00 === c11 && c00 === c22 && (c00 === human)) || //diagonal 1
      (c02 === c11 && c02 === c20 && (c02 === human)) //diagonal 2
    ) {
      $("#board").fadeOut("slow");
      $("#winner").text("You win!");
      $("#final-screen").fadeTo("slow",1);
    }
    // ai wins
    else if ((c00 === c01 && c00 === c02 && (c00 === ai)) || //first row
      (c10 === c11 && c10 === c12 && (c10 === ai)) || //second row
      (c20 === c21 && c20 === c22 && (c20 === ai)) || //third row
      (c00 === c10 && c00 === c20 && (c00 === ai)) || //first column
      (c01 === c11 && c01 === c21 && (c01 === ai)) || //second column
      (c02 === c12 && c02 === c22 && (c02 === ai)) || //third column
      (c00 === c11 && c00 === c22 && (c00 === ai)) || //diagonal 1
      (c02 === c11 && c02 === c20 && (c02 === ai)) //diagonal 2
    ) {
      $("#board").fadeOut("slow");
      $("#winner").text("Computer wins!");
      $("#final-screen").fadeTo("slow",1);
    }
    // tie
    else if (c00 && c01 && c02 && c10 && c11 && c12 && c20 && c21 && c22) {
      $("#board").fadeOut("slow");
      $("#winner").text("It's a tie!");
      $("#final-screen").fadeTo("slow",1);
    }
  }

}); //end ready function
