(function(window) {
	
	window.CalculatorUI = {
		updateViewer: function (val) {
			// if number is too long for display, convert it to exponential
			if (val.length > 14) {
				val = parseFloat(val).toExponential(8);
			}
			$('.viewer').text(val);
		}
	}
})(window);