"use strict";

var APP = APP || {};

APP.point = function (x, y) {
	return {
		X : x,
		Y : y,
		isEqualTo : function(otherPoint) {
			return otherPoint.X === this.X && otherPoint.Y == this.Y;
		}
	};
};

APP.grid = function (x, y, onSelectCellFunc) {
	var _cells = new Array(x),
		i, j;

	for(i = 0; i < x; i++) {
		_cells[i] = new Array(y);
		for(j = 0; j < y; j++){
			_cells[i][j] = 0;
		}
	}

	var isFunction = function(func) {
		return typeof func === typeof Function;
	};

	return {
		getX : function getX () {
			return x;
		},
		getY : function getY () {
			return y;
		},
		getCellsCount : function getCelllsCount () {
			return x * y;
		},
		getSelectedCellsCount : function getSelectedCellsCount () {
			var count = 0;

			for(i = 0; i < x; i++) {
				for(j = 0; j < y; j++){
					if(_cells[i][j] === 1) {
						count++;
					}
				}
			}

			return count;
		},
		isSelected : function isSelected (point) {
			return _cells[point.X][point.Y] === 1;
		},
		select : function select (point, selectPoint) {
			_cells[point.X][point.Y] = selectPoint ? 1 : 0;
			
			if(isFunction(onSelectCellFunc)){
				onSelectCellFunc(point, selectPoint);
			}

			return this;
		},
		isEqualTo : function isEqualTo (grid) {
			if(x != grid.getX() || y != grid.getY()){
				return false;
			}

			for(var i=0; i < x; i++) {
				for(var j=0; j < y; j++) {
					var point = APP.point(i,j);
					
					if(grid.isSelected(point) != this.isSelected(point)) {
						return false;
					}
				}
			}

			return true;
		}
	};
};

APP.gridFactory = function() {
	var getRandomPoint = function getRandomPoint (gridWidth, gridHeight) {
		return APP.point(
			Math.floor(Math.random() * (gridWidth)),
			Math.floor(Math.random() * (gridHeight)));
	};

	return {
		generateSelectedGrid : function generateSelectedGrid (x, y, selectedCellsCount) {
			var grid = APP.grid(x, y);

			if(grid.getCellsCount() < selectedCellsCount) {
				selectedCellsCount = grid.getCellsCount();
			}

			while(selectedCellsCount > 0){
				var point = getRandomPoint(x, y);

				if(!grid.isSelected(point)) {
					grid.select(point, true);
					selectedCellsCount--;
				}
			}

			return grid;
		}
	};
}();