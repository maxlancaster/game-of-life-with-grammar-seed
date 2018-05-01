# proj2-mlancast
Recreating John Conway's Game of Life in the browser with HTML, CSS, &amp; Javascript.

##(a) Concerns
	1. storing and maintaining necessary information about the game
	2. updating the information upon user input, or as the game runs
	3. reading the information about the game, and redisplaying the board

	(1) is entirely contained in the model (gameoflife-model.js)
	(2) is handled by the controller: the controller is activated when a user clicks on a game cell, 
	any of the control buttons, or a preset board. the controller udpates the model accordingly.
	(3) on every timestep, after the next generation's information has been computed, the controller 
	grabs this information from the model, and delivers it to the view for a correct end-user experience.

##(b) Modules and Dependences
	**Model** - gameoflife-model.js
	**View** - main.js
	**Controller** - gameoflife-controller.js

	The model stores all of the necessary information to accurately simulate the Game of Life. 
	This information includes which game cells are alive, which are dead, and how many living 
	neighbors each cell has. User input (clicking on a cell to bring it to life) is propagated 
	from the view through the controller, to the model where it's updated. Similarly, the controller 
	reads from the model on every game iteration to redisplay the board with the current state. 
	All of the event handlers (for clicking a cell, button, or preset board) are assigned in the view. 
	The view also contains a useful method called GameOfLife_install which searches for a table with 
	id="board" in the DOM, and injects the widget. Ideally, I would maybe move the data concerning the 
	preset boards into the model and out of the controller. This way, when a user selects a preset board, 
	the controller grabs the correct information from the model and delivers it to the view.

##(c) Functionals
	Functionals are used in many places throughout the system. Perhaps my favorite instance is the 
	user of a filter() to discard adjacent cells that are off the game board. Also, forEach functionals 
	are used on every interation of the game to update the model and redraw the view.

##(d) Design
	Unfortunately, due to time constraints, I don't think I was able to add the creative flare that 
	I usually like to add to my work. If I had more time, perhaps I'd like to implement a way for users
	to drag and drop certain patterns into the world, or maybe implement dragging on the board to select 
	cells more easily.