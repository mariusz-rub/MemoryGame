"use strict";

var APP = APP || {};

APP.drawing = function () {
	var CELL_EDGE = 60;
	
	var createCell = function createCell (isSelected) {
		var cell = $("<div></div>");
		cell.addClass(isSelected ? "selectedCell" : "cell");
		cell.width(CELL_EDGE);
		cell.height(CELL_EDGE);

		return cell;
	};

	var setCellClick = function setCellClick(cell, onClick) {
		cell.click(function () {
			var wasSelected = $(this).attr("class") === "selectedCell";
			$(this).attr("class", wasSelected ? "cell" : "selectedCell");
			onClick(!wasSelected);
		});
	};

	var createOnSelectFunc = function createOnSelectFunc(point, grid) {
		return function (select) { 
			grid.select(point, select); 
		};
	};

	return {
		drawGrid : function drawGrid (grid, isClickable) {
			var $container = $("#container");

			$container.empty();
			
			for(var rowNumber=0; rowNumber < grid.getY(); rowNumber++){
				var row = $("<div></div>");
				row.addClass("row");
				$container.append(row);

				for(var colNumber=0; colNumber < grid.getX(); colNumber++) {
					var point = APP.point(colNumber, rowNumber);
					var cell = createCell(grid.isSelected(point));
					if(isClickable) {
						setCellClick(cell, createOnSelectFunc(point, grid));
					}

					row.append(cell);
				}
			}
		},
		clear : function() {
			$("#container").empty();
		},
		blockCurrentGrid : function() {
			$(".cell").off("click");
			$(".selectedCell").off("click");
		}
	};
}();