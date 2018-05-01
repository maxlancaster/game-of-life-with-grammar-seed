
/**
 * Create a World object. A World contains a Game of Life board.
 * @constructor
 */
World = function() {
	var that = Object.create(World.prototype);
	that.size = 100;

	// useful helper function to construct a new, empty board
	var construct_board = function() {
		var board = [];
		for (var i = 0; i < that.size; i++) {
			board[i] = [];
			for(var j = 0; j < that.size; j++){
				board[i][j] = 0;
			}
		}
		return board;
	}

	that.board = construct_board(); //stores information about which cells have life
	that.neighbors = construct_board(); //stores information about the number of alive cells adjacent to each cell

	/**
   	* Update the world's board and neighbors object at a given point.
   	* @param x the x-coordinate of the world to be updated.
   	* @param y the y-coordinate of the world to be updated.
   	* @param addOrRemove either either -1 for a removal, or +1 for an addition of life
   */
	var updateLife = function(x, y, addOrRemove) {
		if (addOrRemove === 1) {
			// populate the board with life
			that.board[x][y] = 1;
		} else {
			// populate the board with death
			that.board[x][y] = 0;
		}

		// rebuild the neighbors fields for the given (x,y) point
		var adjacents = [[x-1,y-1], [x-1,y], [x-1, y+1], [x+1, y+1], [x+1, y], [x+1, y-1], [x, y-1], [x, y+1]];
		adjacents = adjacents.filter(function(tuple) {
			var first = tuple[0];
			var second = tuple[1];
			return (first >= 0 && first < that.size && second >= 0 && second < that.size);
		}).forEach(function(tuple) {
			var first = tuple[0];
			var second = tuple[1];
			if (addOrRemove === 1) {
				that.neighbors[first][second] += 1;
			} else if (that.neighbors[first][second] >= 0) {
				that.neighbors[first][second] -= 1;
			}
		});
	}

	/**
   	* Public method for adding life to the world.
   	* @param x the x-coordinate of the world in which life will be added.
   	* @param y the y-coordinate of the world in which life will be added.
   */
	that.addLife = function(x, y) {
		updateLife(x,y,1);
	};

	/**
   	* Public method for removing life from the world.
   	* @param x the x-coordinate of the world in which life will be removed.
   	* @param y the y-coordinate of the world in which life will be removed.
   */
	that.removeLife = function(x, y) {
		updateLife(x,y,-1);
	};

	/**
   	* Public method for resetting the game
   */
	that.reset = function() {
		that.board = construct_board();
	};

	// freeze object to prevent modification. resetting the game requires creating a new World object
	Object.freeze(that);
	return that;
}