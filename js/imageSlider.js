define(["jquery", "underscore"],
function($,        _) {
	var trackIntervals = [];
	var $slides;
	var currentIntervalId;
	var idCount = 0;
	
	var trackingInfo = function(id, interval, $currentSlide) {
		return {
			id : id,
			interval : interval,
			$currentSlide : $currentSlide
		};
	};
	
	var getInfoById = function(id) {
		return _.find(trackIntervals, function(trackingData) {
			return trackingData.id === id;
		});
	};
	
	var cycleSlides = function(delay) {
		var $start;
		$.each($slides, function(i) {
			if(i > 0) {
				$(this).hide();
			} else {
				transitionSlide($($slides[0]));
			}
		});
		
		var currentIntervalId = "id" + idCount;
		idCount++; 
		trackIntervals.push(trackingInfo(currentIntervalId, startInterval(delay, currentIntervalId), $slides[0]));
	};
	
	var startInterval = function(delay, id) {
		var bookEnd = $slides.size() - 1;
		var startPos = 0, nextPos = startPos + 1 > bookEnd ? 0 : startPos + 1;
		console.log("starting...");
		return setInterval(function(){
			var next = $($slides[nextPos])
			, previous = $($slides[startPos]);
			
			console.log({next : next, previous : previous});
			
			transitionSlide(next, previous);
			getInfoById(id).$currentSlide = next;
			
			startPos = nextPos;
			nextPos = startPos + 1 > bookEnd ? 0 : startPos + 1;
		}, delay);
	};
	
	var transitionSlide = function($finish, $start) {
		var result;
		
		if($start) {
			result = $start.hide();
		}
		
		if($finish) {
			result = $finish.show();
		}
		
		return result;
	};
	
	var start = function(container, delay) {
		
		if(!$slides) {
			var $container = $(container);
			$slides = $container.find("li");
		}
		
		cycleSlides(delay);
	};
	
	var stop = function() {
		_.each(trackIntervals, function(data) {
			if(data.id !== currentIntervalId) {
				clearInterval(data.interval);
				data.$currentSlide.hide();
				trackIntervals.splice(data, 1);
			}
			
		});
	};
	
	
	return {
		start : start,
		stop : stop,
	};
});