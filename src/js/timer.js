var APP = APP || {};

APP.timer = function(startTime, onTimeChanged) {
	var timeLeft = startTime;
	var interval = null;

	var isFinished = function(time){
		return time.getSeconds() === 0 && time.getMinutes() === 0;
	}

	return {
		self: this,
		start: function() {
			interval = setInterval(function() {
				if(isFinished(timeLeft)) {
					self.stop();
				}

				timeLeft = timeLeft.substractSecond();
				if(typeof onTimeChanged === typeof Function) {
					onTimeChanged(timeLeft);
				}
			}, 1000);
		},

		stop: function() {
			clearInterval(interval);
		}
	};
}