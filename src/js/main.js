"use strict";

var APP = APP || {};

APP.gameOptions = {
	MEMORY_TIME: 3000, //ms
	CELL_SELECTING_TIME: 1 //sec
};

APP.formatNum = function(number) {
	var numStr = number.toString();
	if(numStr.length < 2) {
		numStr = "0" + numStr;
	}

	return numStr;
};

APP.setTimer = function(timeLeft) {
	$("#timeLeft").text(APP.formatNum(timeLeft.getMinutes()) + ":" + APP.formatNum(timeLeft.getSeconds()));
	
	if($("#time").is(":visible") === false) {
		$("#time").show();	
	}
};

APP.levelStart = function(levelTimeout) {
	APP.setTimer(levelTimeout);
	APP.currentTimer = APP.timer(levelTimeout, APP.setTimer);
};

APP.currentTimer = null;

APP.stopTimer = function() {
	APP.currentTimer.stop();
	APP.setTimer(APP.time(0, 0));
};

APP.selectingStart = function() {
	APP.currentTimer.start();
};

APP.levelSuccess = function(finishedLevel) {
	// show success
	//alert("success");

	APP.stopTimer();

	setTimeout(function() {
		APP.runLevel(finishedLevel.getLevelNumber() + 1);
	}, 100);
};

APP.levelFailed = function(finishedLevel) {
	// show failed
	// show summary with congratulation achived level and start again button
	APP.stopTimer();

	$(".startAgainPanel").show();
};

APP.setLevel = function(levelNumber) {
	$("#levelNumber").text(levelNumber);
	$("#containerHeader").show();
};

APP.runLevel = function(levelNumber) {
	APP.setLevel(levelNumber);

	APP.level(levelNumber).run({
		onLevelStart: APP.levelStart,
		onSelectingStart: APP.selectingStart,
		onLevelSuccess: APP.levelSuccess, 
		onLevelFailed : APP.levelFailed,
		gameOptions: APP.gameOptions
	});
};

$(function(){
	$("#start").click(function () {
		$(".startPanel").hide();
		APP.runLevel(1);
	});

	$("#startAgain").click(function() {
		$(".startAgainPanel").hide();
		APP.runLevel(1);
	});
});