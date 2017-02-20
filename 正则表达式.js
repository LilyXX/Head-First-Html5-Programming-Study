	function getTimeFromString(timeString) {
		var theTime = new Date();
		var time = timeString.match(/(\d+)(?::(\d\d))?\s*(p?)/);
		theTime.setHours( parseInt(time[1]) + (time[3] ? 12 : 0) );
		theTime.setMinutes( parseInt(time[2]) || 0 );
		return theTime.getTime();
	}