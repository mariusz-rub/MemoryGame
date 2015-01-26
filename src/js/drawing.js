var APP = APP || {};

APP.drawing = function () {
	var CELL_EDGE = 60;
	
	var createCell = function createCell (isSelected, onSelect) {
		var $cell = $('<div></div>');
		$cell.addClass(isSelected ? 'selectedCell' : 'cell');
		$cell.width(CELL_EDGE);
		$cell.height(CELL_EDGE);

		$cell.click(function () {
			var wasSelected = $(this).attr('class') === 'selectedCell';
			$(this).attr('class', wasSelected ? 'cell' : 'selectedCell');
			onSelect(!wasSelected);
		});

		return $cell;
	};

	var createOnSelectFunc = function createOnSelectFunc(point, grid) {
		return function (select) { 
			grid.select(point, select); 
		};
	}

	return {
		drawGrid : function drawGrid (grid) {
			var $container = $('#container');

			$container.empty();
			
			$container.width(CELL_EDGE * grid.getX());
			$container.height(CELL_EDGE * grid.getY());
			
			for(var rowNumber=0; rowNumber < grid.getY(); rowNumber++){
				var $row = $("<div></div>");
				$row.addClass("row");
				$container.append($row);

				for(var colNumber=0; colNumber < grid.getX(); colNumber++) {
					var point = APP.point(colNumber, rowNumber);
					$row.append(
						createCell(
							grid.isSelected(point), 
							createOnSelectFunc(point, grid)));
				}
			}
		},
		clear : function() {
			$('#container').empty();
		}
	};
}();