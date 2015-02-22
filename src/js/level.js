"use strict";

var APP = APP || {};

APP.level = function (levelNumber) {

	var linearFunc = function(x, offside) {
		return 3 + Math.floor((x + offside) / 3);
	};

	var gridWidth = linearFunc(levelNumber, -1);
	var gridHeight = linearFunc(levelNumber, 1);
	var selectCount = linearFunc(levelNumber, 0);
	var finished = false;
	var levelTimeout = null;

	return {
		getLevelNumber : function() { return levelNumber; },
		finish : function() { finished = true; },
		isFinished : function() { return finished; },

		run : function(runOptions) {
			var self = this;

			var generatedGrid = APP.gridFactory.generateSelectedGrid(gridWidth, gridHeight, selectCount);
			
			var gridToSelect = APP.grid(gridWidth, gridHeight, function(point) {
				if(generatedGrid.isSelected(point) === false) {
					clearTimeout(levelTimeout);
					APP.drawing.blockCurrentGrid();
					runOptions.onLevelFailed(self);
				}

				if(generatedGrid.isEqualTo(gridToSelect)) {
					clearTimeout(levelTimeout);
					runOptions.onLevelSuccess(self);
				}
			});

			var levelTimeoutSec = selectCount * runOptions.gameOptions.CELL_SELECTING_TIME;

			runOptions.onLevelStart(APP.timeFactory.fromSeconds(levelTimeoutSec));

			APP.drawing.drawGrid(generatedGrid, false);

			setTimeout(function() {
				runOptions.onSelectingStart();

				APP.drawing.drawGrid(gridToSelect, true);

				levelTimeout = setTimeout(
					function() {
						APP.drawing.blockCurrentGrid(); 
						runOptions.onLevelFailed(self); 
					}, 
					levelTimeoutSec * 1000);

			}, runOptions.gameOptions.MEMORY_TIME);
		}
	};
};

