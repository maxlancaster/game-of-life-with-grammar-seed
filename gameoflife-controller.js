var Controller = function() {
  // Create the object that we will return.
  var that = Object.create(Controller.prototype);

  // the World object
  var world;

  // Iteration ID of the game. Used for play/pause actions
  var game_iteration_id;

  var fps, fpsInterval, then, now, startTime;

  /**
   * Public method for resetting the world.
   */
  that.resetWorld = function() {
    // create new world
    world = that.createWorld();
    that.pause();
    // remove tiles
    clearFields();
  };

  /**
  * Public method for creating a new world
  * @returns the new World object
  */
  that.createWorld = function() {
    world = World();
    return world;
  };

  /**
  * Public method that adds a piece of life to the world
  */
  that.addLife = function(x,y) {
    world.addLife(x,y);
  };

  /**
  * Public method that removes a piece of life from the world
  */
  that.removeLife = function(x,y) {
    world.removeLife(x,y);
  };

  /**
  *  Public method for pausing execution of the simulation
  */
  that.pause = function() {
    window.cancelAnimationFrame(game_iteration_id);
  };

  /**
  *  Public method for resuming/starting execution of the simulation
  */
  that.play = function() {
    fps = 10;
    fpsInterval = 1000 / fps;
    then = Date.now();
    startTime = then;
    update();
  };

  /**
  * Generate a random board, where each cell has 20% chance of
  * beginning the game alive
  */
  that.randomBoard = function() {
    that.resetWorld();
    var rowIdx = 0;
    var colIdx = 0;
    world.board.forEach(function(row) {
      colIdx = 0;
      row.forEach(function(cell) {
        var random = Math.random();
        if (random >= 0.8) {
          world.addLife(rowIdx, colIdx);
          color_cell(rowIdx, colIdx);
        }
        colIdx++;
      });
      rowIdx++;
    });
  };

  /**
  * Generate a checkerboard style board
  */
  that.checkerBoard = function() {
    that.resetWorld();
    var rowIdx = 0;
    var colIdx = 0;
    world.board.forEach(function(row) {
      colIdx = 0;
      row.forEach(function(cell) {
        if (rowIdx % 2 === 0) {
          if (colIdx % 2 === 0) {
            world.addLife(rowIdx, colIdx);
            color_cell(rowIdx, colIdx);
          }
        } else if (colIdx % 2 !== 0) {
          world.addLife(rowIdx, colIdx);
          color_cell(rowIdx, colIdx);
        }
        colIdx++;
      });
      rowIdx++;
    });
  };

  that.ladderBoard = function() {
    that.resetWorld();
    var rowIdx = 0;
    world.board.forEach(function(row) {
      var colIdx = 0;
      if (rowIdx % 3 === 2) {
        var isHorizontal = true;

      } else {
        var isHorizontal = false;
      }
      row.forEach(function(cell) {
        if (!isHorizontal) {
          if (colIdx % 3 === 0) {
            world.addLife(rowIdx, colIdx);
            color_cell(rowIdx, colIdx);
          }
        } else if (colIdx % 3 !== 0) {
            world.addLife(rowIdx, colIdx);
            color_cell(rowIdx, colIdx);
        }
        colIdx++;
      });
      rowIdx++;
    });
  };

  that.snakeBoard = function() {
    that.resetWorld();
    var rowIdx = 0;
    var offset = -1;
    world.board.forEach(function(row) {
      if (rowIdx % 3 === 0) {
        if (rowIdx+1 < world.board.length) {
          world.addLife(rowIdx, rowIdx);
          color_cell(rowIdx, rowIdx);
          world.addLife(rowIdx, rowIdx + 1);
          color_cell(rowIdx, rowIdx + 1);
          offset+=3;
        }
      } else if (offset < world.board.length) {
        world.addLife(rowIdx, offset);
        color_cell(rowIdx, offset);
      }
      rowIdx++;
    });
  };

  that.crossBoard = function() {
    that.resetWorld();
    var rowIdx = 0;
    world.board.forEach(function(row) {
      var colIdx = 0;
      row.forEach(function(cell) {
      if ((rowIdx % 5 === 0) && (colIdx % 5 === 0)) {
        world.addLife(rowIdx, colIdx);
        color_cell(rowIdx, colIdx);
      } else if (rowIdx % 5 === 1 && (colIdx % 5 === 1 || colIdx % 5 === 4)) {
        world.addLife(rowIdx, colIdx);
        color_cell(rowIdx, colIdx);
      } else if ((rowIdx % 5 === 2 || rowIdx % 5 === 3) && (colIdx % 5 === 2 || colIdx % 5 === 3)) {
        world.addLife(rowIdx, colIdx);
        color_cell(rowIdx, colIdx);
      } else if (rowIdx % 5 === 4 && (colIdx % 5 === 1 || colIdx % 5 === 4)) {
        world.addLife(rowIdx, colIdx);
        color_cell(rowIdx, colIdx);
      }
      colIdx++;
      });
      rowIdx++;
    });
  };

  that.randomComputation = function(rule) {
    if (rule === "rule1") {
      randomComputationRule1();
    } else {
      randomComputationRule2();
    }
  }

  var randomComputationRule1 = function() {
    that.resetWorld();

    //set up initial shape
    world.addLife(25,25);
    color_cell(25,25);

    var current_location = [25,25];
    var num_iterations = 100;
    var edge = world.board.length;

    while (num_iterations > 0) {
      // console.log(current_location);
      var x = current_location[0];
      var y = current_location[1];
      var options = [];
      // lower right
      if ((x+1 < edge) && (y+1 < edge) && (!world.hasLife(x+1, y+1))) {
        options.push("LR");
      }
      // lower left
      if ((x+1 < edge) && (y-1 < edge && y-1 >= 0) && (!world.hasLife(x+1, y-1))) {
        options.push("LL");
      }
      // upper left
      if ((x-1 < edge && x-1 >= 0) && (y-1 < edge && y-1 >= 0) && (!world.hasLife(x-1, y-1))) {
        options.push("UL");
      }
      // upper right
      if ((x-1 < edge && x-1 >= 0) && (y+1 < edge) && (!world.hasLife(x-1, y+1))) {
        options.push("UR");
      }
      // randomly select next location to apply rule
      console.log(options);
      var num_options = options.length;
      if (num_options > 0) {
        // next location exists
        var random_index = Math.floor(Math.random() * (num_options));
        var random_option = options[random_index];

        if (random_option === "LR") {
          world.addLife(x+1, y+1);
          color_cell(x+1, y+1);
          current_location = [x+1, y+1];
        } else if (random_option === "LL") {
          world.addLife(x+1, y-1);
          color_cell(x+1, y-1);
          current_location = [x+1, y-1];
        } else if (random_option === "UL") {
          world.addLife(x-1, y-1);
          color_cell(x-1, y-1);
          current_location = [x-1, y-1];
        } else if (random_option === "UR") {
          world.addLife(x-1, y+1);
          color_cell(x-1, y+1);
          current_location = [x-1, y+1];
        }
        // console.log("options = " + options);
        // console.log("selected = " + random_option);
      } else {
        // next location does not exist
        // break for now, figure out what to do later
        // console.log("got stuck in horizontal");
        // console.log("current location= " + current_location);
        break;
      }
      num_iterations--;
    }
  };

  var randomComputationRule2 = function() {
    that.resetWorld();

    //set up initial shape
    world.addLife(25,24);
    color_cell(25,24);
    world.addLife(25,25);
    color_cell(25,25);

    var current_location = [25,25];
    var num_iterations = 100;
    var isHorizontal = true;
    var edge = world.board.length;

    while (num_iterations > 0) {
      // console.log(current_location);
      var x = current_location[0];
      var y = current_location[1];
      if (isHorizontal) {
        // current shape is horizontal
        var options = [];
        // lower right
        if ((x+1 < edge) && (y+1 < edge) && (x+2 < edge) && (!world.hasLife(x+1, y+1)) && (!world.hasLife(x+2, y+1))) {
          options.push("LR");
        }
        // lower left
        if ((x+1 < edge) && (y-2 < edge && y-2 >= 0) && (x+2 < edge) && (!world.hasLife(x+1, y-2)) && (!world.hasLife(x+2, y-2))) {
          options.push("LL");
        }
        // upper left
        if ((x-1 < edge && x-1 >= 0) && (y-2 < edge && y-2 >= 0) && (x-2 < edge && x-2 >= 0) && (!world.hasLife(x-1, y-2)) && (!world.hasLife(x-2, y-2))) {
          options.push("UL");
        }
        // upper right
        if ((x-1 < edge && x-1 >= 0) && (y+1 < edge) && (x-2 < edge && x-2 >= 0) && (!world.hasLife(x-1, y+1)) && (!world.hasLife(x-2, y+1))) {
          options.push("UR");
        }
        // randomly select next location to apply rule
        var num_options = options.length;
        if (num_options > 0) {
          // next location exists
          var random_index = Math.floor(Math.random() * (num_options));
          var random_option = options[random_index];

          if (random_option === "LR") {
            world.addLife(x+1, y+1);
            color_cell(x+1, y+1);
            world.addLife(x+2, y+1);
            color_cell(x+2, y+1);
            current_location = [x+2, y+1];
          } else if (random_option === "LL") {
            world.addLife(x+1, y-2);
            color_cell(x+1, y-2);
            world.addLife(x+2, y-2);
            color_cell(x+2, y-2);
            current_location = [x+2, y-2];
          } else if (random_option === "UL") {
            world.addLife(x-1, y-2);
            color_cell(x-1, y-2);
            world.addLife(x-2, y-2);
            color_cell(x-2, y-2);
            current_location = [x-1, y-2];
          } else if (random_option === "UR") {
            world.addLife(x-1, y+1);
            color_cell(x-1, y+1);
            world.addLife(x-2, y+1);
            color_cell(x-2, y+1);
            current_location = [x-1, y+1];
          }
          // console.log("options = " + options);
          // console.log("selected = " + random_option);
        } else {
          // next location does not exist
          // break for now, figure out what to do later
          // console.log("got stuck in horizontal");
          // console.log("current location= " + current_location);
          break;
        }
      } else {
        // current shape is vertical
        var options = [];
        // lower right
        if ((x+1 < edge) && (y+1 < edge) && (y+2 < edge) && (!world.hasLife(x+1, y+1)) && (!world.hasLife(x+1, y+2))) {
          options.push("LR");
        }
        // lower left
        if ((x+1 < edge) && (y-1 < edge && y-1 >= 0) && (y-2 < edge && y-2 >= 0) && (!world.hasLife(x+1, y-1)) && (!world.hasLife(x+1, y-2))) {
          options.push("LL");
        }
        // upper left
        if ((x-2 < edge && x-2 >= 0) && (y-2 < edge && y-2 >= 0) && (y-1 < edge && y-1 >= 0) && (!world.hasLife(x-2, y-1)) && (!world.hasLife(x-2, y-2))) {
          options.push("UL");
        }
        // upper right
        if ((x-2 < edge && x-2 >= 0) && (y+1 < edge) && (y+2 < edge && y+2 >= 0) && (!world.hasLife(x-2, y+1)) && (!world.hasLife(x-2, y+2))) {
          options.push("UR");
        }
        // randomly select next location to apply rule
        var num_options = options.length;
        if (num_options > 0) {
          // next location exists
          var random_index = Math.floor(Math.random() * (num_options));
          var random_option = options[random_index];

          if (random_option === "LR") {
            world.addLife(x+1, y+1);
            color_cell(x+1, y+1);
            world.addLife(x+1, y+2);
            color_cell(x+1, y+2);
            current_location = [x+1, y+2];
          } else if (random_option === "LL") {
            world.addLife(x+1, y-1);
            color_cell(x+1, y-1);
            world.addLife(x+1, y-2);
            color_cell(x+1, y-2);
            current_location = [x+1, y-1];
          } else if (random_option === "UL") {
            world.addLife(x-2, y-1);
            color_cell(x-2, y-1);
            world.addLife(x-2, y-2);
            color_cell(x-2, y-2);
            current_location = [x-2, y-1];
          } else if (random_option === "UR") {
            world.addLife(x-2, y+1);
            color_cell(x-2, y+1);
            world.addLife(x-2, y+2);
            color_cell(x-2, y+2);
            current_location = [x-2, y+2];
          }
          // console.log("options = " + options);
          // console.log("selected = " + random_option);
        } else {
          // next location does not exist
          // break for now, figure out what to do later
          // console.log("got stuck in vertical");
          // console.log("current location= " + current_location);
          break;
        }
      }

      isHorizontal = !isHorizontal;
      num_iterations--;
    }
  };

  // helper function for getting the current World object
  var getWorld = function() {
    return world;
  };

  // helper function for clearing the gameboard
  var clearFields = function() {
    var world = getWorld();
    var rowIdx = 0;
    var colIdx = 0;
    world.board.forEach(function(row) {
      colIdx = 0;
      row.forEach(function(cell) {
        uncolor_cell(rowIdx, colIdx);
        colIdx++;
      });
      rowIdx++;
    });
  };

  // helper method for using the current state of the world to rebuild it for
  // the next generation
  var redrawWorld = function() {
    var rowIdx = 0;
    var colIdx = 0;
    world.board.forEach(function(row) {
      colIdx = 0;
      row.forEach(function(cell) {
        if (cell === 1) {  // alive
          color_cell(rowIdx, colIdx);
        } else { // dead
          uncolor_cell(rowIdx, colIdx);
        }
        colIdx++;
      });
      rowIdx++;
    });
  };

  // internal game loop which contains the generational logic of the Game of Life
  var update = function() {
    // logic for updating the world:
    // Any live cell with fewer than two live neighbours dies, as if caused by under-population.
    // Any live cell with two or three live neighbours lives on to the next generation.
    // Any live cell with more than three live neighbours dies, as if by over-population.
    // Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.

    now = Date.now();
    elapsed = now - then;

    // var world = getWorld();
    // var copy_world = jQuery.extend(true, {}, world); // make a copy of the world so we can determine what the next generation
    // // should look like without modifying the current World
    // var rowIdx = 0;
    // var colIdx = 0;
    // copy_world.board.forEach(function(row) {
    //   colIdx = 0;
    //   row.forEach(function(cell) {
    //     if (cell === 1) {  // alive
    //       if (copy_world.neighbors[rowIdx][colIdx] < 2 || copy_world.neighbors[rowIdx][colIdx] > 3){ // cell should die
    //         world.removeLife(rowIdx, colIdx);
    //       }
    //     } else { // dead
    //       if (copy_world.neighbors[rowIdx][colIdx] === 3) { // cell should come back to life
    //         world.addLife(rowIdx, colIdx);
    //       }
    //     }
    //     colIdx++;
    //   });
    //   rowIdx++;
    // });

    // move to the next generation
    game_iteration_id = window.requestAnimationFrame(update);

    if (elapsed > fpsInterval) {
      then = now - (elapsed % fpsInterval);
      var world = getWorld();
      var copy_world = jQuery.extend(true, {}, world); // make a copy of the world so we can determine what the next generation
      // should look like without modifying the current World
      var rowIdx = 0;
      var colIdx = 0;
      copy_world.board.forEach(function(row) {
        colIdx = 0;
        row.forEach(function(cell) {
          if (cell === 1) {  // alive
            if (copy_world.neighbors[rowIdx][colIdx] < 2 || copy_world.neighbors[rowIdx][colIdx] > 3){ // cell should die
              world.removeLife(rowIdx, colIdx);
            }
          } else { // dead
            if (copy_world.neighbors[rowIdx][colIdx] === 3) { // cell should come back to life
              world.addLife(rowIdx, colIdx);
            }
          }
          colIdx++;
        });
        rowIdx++;
      });
      redrawWorld();
    }

  };
  // Freeze object to prevent modification.
  Object.freeze(that);

  return that;
};
