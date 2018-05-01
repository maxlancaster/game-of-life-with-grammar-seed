$(function() {

  var controller = Controller();

  // Instantiate the world and populate it with no life
  var world = controller.createWorld();

/**
 * Install a Game Of Life Widget. A Game Of Life is a user
 * interface for playing and creating simulations of John Conway's Game Of Life.
 *
 * @param {GOL_model} the World object to use as a model for the
 *        data being displayed and edited by this Game of Life widget.
 */
  GameOfLife_install = function(GOL_model) {

    //create the table element for the world
    var table = document.getElementById("board");
    for (var i = 0; i < GOL_model.size; i++) {
      var row = table.insertRow(i);
      for (var j = 0; j < GOL_model.size; j++) {
        row.insertCell(j);
      }
    }

    // handler function for when a user clicks on a cell in the world
    var tdClickHandler = function(e) {
      var row = $(this).parent().children().index($(this));
      var col = $(this).parent().parent().children().index($(this).parent());

      if ($(this).css('backgroundColor') === 'rgb(255, 255, 255)') {
        // cell was white, change to black and add a life to the world
        $(this).css('backgroundColor', 'black');
        controller.addLife(col,row);
      } else {
        // cell was black, change to white and remove a life from the world
        $(this).css('backgroundColor', 'white');
        controller.removeLife(col,row);
      }

    };

    // handler function for the reset button
    var resetClickHandler = function(e) {
      controller.resetWorld();
    };

    // handler function for the play button
    var playClickHandler = function(e) {
      controller.play();
    };

    // handler function for the pause button
    var pauseClickHandler = function(e) {
      controller.pause();
    };

    // handler function for the random board button
    var randomBoardClickHandler = function(e) {
      controller.randomBoard();
    };

    // handler function for the checker board button
    var checkerBoardClickHandler = function(e) {
      controller.checkerBoard();
    };

    // handler function for the pulsar board button
    var pulsarBoardClickHandler = function(e) {
      controller.pulsarBoard();
    };

    //register event handlers
    $('td').click(tdClickHandler);
    $("#reset").click(resetClickHandler);
    $("#play").click(playClickHandler);
    $("#pause").click(pauseClickHandler);
    $("#random").click(randomBoardClickHandler);
    $("#checker").click(checkerBoardClickHandler);
    $("#pulsar").click(pulsarBoardClickHandler);

  };

  // helper method that takes as input the (x,y) coords of a cell in the table
  // to be colored
  color_cell = function(x, y) {
    var table = document.getElementById("board");
    var td = table.rows[x].cells[y];
    td.removeAttribute("style");
    td.className = "alive";

  };

  // helper method that takes as input the (x,y) coords of a cell in the table
  // to be uncolored
  uncolor_cell = function(x, y) {
    var table = document.getElementById("board");
    var td = table.rows[x].cells[y];
    td.removeAttribute("style");
    td.className = "dead";
  };

  // helper method that takes as input the value that the play button should
  // take as it's style.visibility field. expects showOrHide to be either 
  // 'hidden' or 'visible'
  change_play_button = function(showOrHide) {
    document.getElementById("play").style.visibility = showOrHide;
  };

  // helper method that takes as input the value that the pause button should
  // take as it's style.visibility field. expects showOrHide to be either 
  // 'hidden' or 'visible'
  change_pause_button = function(showOrHide) {
    document.getElementById("pause").style.visibility = showOrHide;
  };

  // install the widget
  GameOfLife_install(world);
  change_pause_button("hidden");

})