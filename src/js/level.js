var APP = APP || {};

APP.level = function (levelNumber) {

	var linearFunc = function(x, offside) {
		return 3 + Math.floor((x + offside) / 3);
	}

	var gridWidth = linearFunc(levelNumber, -1);
	var gridHeight = linearFunc(levelNumber, 1);
	var selectCount = linearFunc(levelNumber, 0);
	var finished = false;

	return {
		getLevelNumber : function() { return levelNumber; },
		finish : function() { finished = true; },
		isFinished : function() { return finished; },

		run : function(runOptions) {
			var self = this;

			var generatedGrid = APP.gridFactory.generateSelectedGrid(gridWidth, gridHeight, selectCount);
			
			var gridToSelect = APP.grid(gridWidth, gridHeight, function(point, isSelected) {
				if(generatedGrid.isSelected(point) === false) {
					runOptions.onLevelFailed(self);
				}

				if(generatedGrid.isEqualTo(gridToSelect)) {
					self.finish();
					runOptions.onLevelSuccess(self);
				}
			});

			var levelTimeoutSec = selectCount * runOptions.gameOptions.CELL_SELECTING_TIME;

			runOptions.onLevelStart(APP.timeFactory.fromSeconds(levelTimeoutSec));

			APP.drawing.drawGrid(generatedGrid);

			// todo: block selecting

			setTimeout(function() {
				runOptions.onSelectingStart();

				APP.drawing.drawGrid(gridToSelect);

				setTimeout(function() {
					if(self.isFinished() === false) {
						runOptions.onLevelFailed(self);
					}
				}, levelTimeoutSec * 1000);

			}, runOptions.gameOptions.MEMORY_TIME);
		}
	};
}
