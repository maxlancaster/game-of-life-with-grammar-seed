(function() {
  mocha.setup("bdd");
  var assert = chai.assert;

  describe("Game of Life", function() {
    // begin tests for reset method
    describe("reset", function() {
      it("reset world", function() {
        var world = World();
        world.reset();
        var board = world.board;

        for (var i = 0; i < world.size; i++){
          for (var j = 0; j < world.size; j++) {
            assert.equal(board.length, world.size);
            assert.equal(board[i].length, world.size);
            assert.equal(board[i][j], 0);
          }
        }
      });
    });
    describe("addLife", function() {
      it("add life to the world", function() {
        var world = World();
        world.addLife(10,10);
        
        assert.equal(world.board[10][10], 1);
        var adjacents = [[10-1,10-1], [10-1,10], [10-1, 10+1], [10+1, 10+1], [10+1, 10], [10+1, 10-1], [10, 10-1], [10, 10+1]];
        adjacents = adjacents.filter(function(tuple) {
          var first = tuple[0];
          var second = tuple[1];
          return (first >= 0 && first < world.size && second >= 0 && second < world.size);
        }).forEach(function(tuple) {
          var first = tuple[0];
          var second = tuple[1];
          assert.equal(world.neighbors[first][second], 1);
        });
      });
      it("add life to the world, check board", function() {
        var world = World();
        world.addLife(50,50);
        
        assert.equal(world.board[50][50], 1);
      });
      it("add life to the world, check neighbors", function() {
        var world = World();
        world.addLife(50,50);

        var adjacents = [[50-1,50-1], [50-1,50], [50-1, 50+1], [50+1, 50+1], [50+1, 50], [50+1, 50-1], [50, 50-1], [50, 50+1]];
        adjacents = adjacents.filter(function(tuple) {
          var first = tuple[0];
          var second = tuple[1];
          return (first >= 0 && first < world.size && second >= 0 && second < world.size);
        }).forEach(function(tuple) {
          var first = tuple[0];
          var second = tuple[1];
          assert.equal(world.neighbors[first][second], 1);
        });
      });
      it("add life to the world's boundary", function() {
        var world = World();
        world.addLife(0,0);

        assert.equal(world.board[0][0], 1);
        var adjacents = [[0+1,0], [0,+1], [0+1, 0+1]];
        adjacents.forEach(function(tuple) {
          var first = tuple[0];
          var second = tuple[1];
          assert.equal(world.neighbors[first][second], 1);
        });
      });
    });
    describe("removeLife", function() {
      it("remove life from the world", function() {
        var world = World();
        world.addLife(10,10);
        world.removeLife(10,10);

        assert.equal(world.board[10][10], 0);
        var adjacents = [[10-1,10-1], [10-1,10], [10-1, 10+1], [10+1, 10+1], [10+1, 10], [10+1, 10-1], [10, 10-1], [10, 10+1]];
        adjacents = adjacents.filter(function(tuple) {
          var first = tuple[0];
          var second = tuple[1];
          return (first >= 0 && first < world.size && second >= 0 && second < world.size);
        }).forEach(function(tuple) {
          var first = tuple[0];
          var second = tuple[1];
          assert.equal(world.neighbors[first][second], 0);
        });
      });
      it("remove life from the world, check board", function() {
        var world = World();
        world.addLife(10,10);
        world.removeLife(10,10);

        assert.equal(world.board[10][10], 0);
      });
      it("remove life from the world, check neighbors", function() {
        var world = World();
        world.addLife(50,50);
        world.removeLife(50,50);

        var adjacents = [[50-1,50-1], [50-1,50], [50-1, 50+1], [50+1, 50+1], [50+1, 50], [50+1, 50-1], [50, 50-1], [50, 50+1]];
        adjacents = adjacents.filter(function(tuple) {
          var first = tuple[0];
          var second = tuple[1];
          return (first >= 0 && first < world.size && second >= 0 && second < world.size);
        }).forEach(function(tuple) {
          var first = tuple[0];
          var second = tuple[1];
          assert.equal(world.neighbors[first][second], 0);
        });
      });
      it("remove life from the world's boundary", function() {
        var world = World();
        world.addLife(0,0);
        world.removeLife(0,0);

        assert.equal(world.board[0][0], 0);
        var adjacents = [[0+1,0], [0,+1], [0+1, 0+1]];
        adjacents.forEach(function(tuple) {
          var first = tuple[0];
          var second = tuple[1];
          assert.equal(world.neighbors[first][second], 0);
        });;
      });
    });
  });

  mocha.run();
})()