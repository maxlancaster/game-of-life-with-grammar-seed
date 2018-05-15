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
    change_play_button("visible");
    change_pause_button("hidden");
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
    // game_iteration_id = window.requestAnimationFrame(update);
    change_play_button("hidden");
    change_pause_button("visible");
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
  }

  that.snakeBoard = function() {
    that.resetWorld();
    var rowIdx = 0;
    var offset = -1;
    world.board.forEach(function(row) {
      if (rowIdx % 3 === 0) {
        world.addLife(rowIdx, rowIdx);
        color_cell(rowIdx, rowIdx);
        world.addLife(rowIdx, rowIdx + 1);
        color_cell(rowIdx, rowIdx + 1);
        offset+=3;
      } else if (offset < world.board.length) {
        world.addLife(rowIdx, offset);
        color_cell(rowIdx, offset);
      }
      rowIdx++;
    });
  }

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
