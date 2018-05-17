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
        var cell = row.insertCell(j);
        cell.className = "GOLtd"
      }
    }

    $("#select_computation").hide();
    $("#rule1_presets").hide();
    $("#rule2_presets").hide();
    $("#OR").hide();
    $("#manual_edits").hide();
    // $("#click_play").hide();

    var rule;

    // handler function for when a user clicks on a cell in the world
    var tdClickHandler = function(e) {
      var row = $(this).parent().children().index($(this));
      var col = $(this).parent().parent().children().index($(this).parent());

      if ($(this).css('backgroundColor') === 'rgb(255, 255, 255)') {
        // cell was white, change to black and add a life to the world
        $(this).css('backgroundColor', 'green');
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
      playPauseClickHandler("Pause");
    };

    // handler function for the play button
    var playPauseClickHandler = function(playOrPause) {
      if (playOrPause === "Pause") {
        $("#playPause").html("Play");
        controller.pause();
      } else if (playOrPause === "Play") {
        $("#playPause").html("Pause");
        controller.play();
      } else if ($("#playPause").text() === "Play") {
        $("#playPause").html("Pause");
        controller.play();
      } else {
        $("#playPause").html("Play");
        controller.pause();
      }
    };

    // handler function for the checker board button
    var checkerBoardClickHandler = function(e) {
      $("#crosses_background").css('border', 'none');
      $("#checker_background").css('border', "solid 2px lightgreen");
      $("#manual_edits").show();
      playPauseClickHandler("Pause");
      controller.checkerBoard();
    };

    // handler function for the cross button
    var crossClickHandler = function(e) {
      $("#checker_background").css('border', 'none');
      $("#crosses_background").css('border', "solid 2px lightgreen");
      $("#manual_edits").show();
      playPauseClickHandler("Pause");
      controller.crossBoard();
    }

    // handler function for the ladder button
    var ladderClickHandler = function(e) {
      $("#snake_background").css('border', 'none');
      $("#ladder_background").css('border', "solid 2px lightgreen");
      $("#manual_edits").show();
      playPauseClickHandler("Pause");
      controller.ladderBoard();
    }

    // handler function for the snake button
    var snakeClickHandler = function(e) {
      $("#ladder_background").css('border', 'none');
      $("#snake_background").css('border', "solid 2px lightgreen");
      $("#manual_edits").show();
      playPauseClickHandler("Pause");
      controller.snakeBoard();
    }

     // handler function for the random rule 1 button
    var randomComputationClickHandler = function(e) {
      $("#checker_background").css('backgroundColor', 'white');
      $("#crosses_background").css('backgroundColor', 'white');
      $("#ladder_background").css('backgroundColor', 'white');
      $("#snake_background").css('backgroundColor', 'white');
      $("#manual_edits").show();
      playPauseClickHandler("Pause");
      controller.randomComputation(rule);
    }

    // handler function for the rule 1 button
    var rule1ClickHandler = function(e) {
      $("#rule2").css('border', 'none');
      $("#rule1").css('border', "solid 2px lightgreen");
      // $("#rule2_highlight").css('backgroundColor', 'white');
      // $("#rule1_highlight").css('backgroundColor', 'lightgreen');
      $("#select_computation").show();
      if (rule === "rule2") {
        $("#checker_background").css('backgroundColor', 'white');
        $("#crosses_background").css('backgroundColor', 'white');
      }
      $("#rule2_presets").hide();
      $("#rule1_presets").show();
      $("#OR").show();
      playPauseClickHandler("Pause");
      rule = "rule1";
    }

    // handler function for the rule 2 button
    var rule2ClickHandler = function(e) {
      $("#rule1").css('border', 'none');
      $("#rule2").css('border', "solid 2px lightgreen");
      // $("#rule1_highlight").css('backgroundColor', 'white');
      // $("#rule2_highlight").css('backgroundColor', 'lightgreen');
      $("#select_computation").show();
      if (rule === "rule1") {
        $("#ladder_background").css('backgroundColor', 'white');
        $("#snake_background").css('backgroundColor', 'white');
      }
      $("#rule1_presets").hide();
      $("#rule2_presets").show();
      $("#OR").show();
      playPauseClickHandler("Pause");
      rule = "rule2";
    }

    // register event handlers
    // game and control buttons
    $('.GOLtd').click(tdClickHandler);
    $("#playPause").click(playPauseClickHandler);
    $("#reset").click(resetClickHandler);

    // preset computations
    $("#checker").click(checkerBoardClickHandler);
    $("#ladder").click(ladderClickHandler);
    $("#snake").click(snakeClickHandler);
    $("#crosses").click(crossClickHandler);

    // random computation
    $("#random_computation").click(randomComputationClickHandler);

    // rules
    $("#rule1").click(rule1ClickHandler);
    $("#rule2").click(rule2ClickHandler);

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

  // install the widget
  GameOfLife_install(world);
})