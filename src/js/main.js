var APP = APP || {};

APP.gameOptions = {
	MEMORY_TIME: 3000, //ms
	CELL_SELECTING_TIME: 1000 //ms
};

APP.levelSuccess = function(finishedLevel) {
	// show success
	//alert("success");

	setTimeout(function() {
		var newLevel = APP.level(finishedLevel.getLevelNumber() + 1);
	
		APP.setLevel(newLevel.getLevelNumber());
	
		newLevel.run({
			onLevelSuccess: APP.levelSuccess, 
			onLevelFailed : APP.levelFailed,
			gameOptions : APP.gameOptions
		});
	
	}, 100);
}

APP.levelFailed = function(finishedLevel) {
	// show failed
	// show summary with congratulation achived level and start again button
	alert("fail");
}

APP.setLevel = function(levelNumber) {
	$('#levelNumber').text(levelNumber);
	$('#containerHeader').show();
}

$(function(){
	$("#start").click(function () {		

		var startLevelNumber = 1;
		APP.setLevel(startLevelNumber);

		APP.level(startLevelNumber).run({
			onLevelSuccess: APP.levelSuccess, 
			onLevelFailed : APP.levelFailed,
			gameOptions: APP.gameOptions
		});
	});
});