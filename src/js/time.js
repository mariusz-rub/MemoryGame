"use strict";

var APP = APP || {};

APP.time = function(minutes, seconds) {
	var min = minutes;
	var sec = seconds;

	return {
		getMinutes : function() { return min; },
		getSeconds : function() { return sec; },
		substractSecond : function() {
			if(sec === 0) {
				if(min > 0) {
					min = min - 1;
					sec = 59;
				}
			} else {
				sec = sec - 1;
			}
	
			return this;
		}
	};
};

APP.timeFactory = function() {
	return {
		fromSeconds : function(seconds) {
			var min = Math.floor(seconds / 60);
			var sec = seconds % 60;

			return APP.time(min, sec);
		}
	};
}();