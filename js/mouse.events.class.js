(function(window) {
	window.CalculatorMouseEvents = {
		registerEvents: function (argument) {
			$('.num').off().click(function (e) {
				let numberString = e.target.dataset.num;
				window.Calculator.addToNumberString(numberString);
			});
			$('.ops').off().click(function (e) {
				let opType = e.target.dataset.ops;
				window.Calculator.setOperand(opType);
			});
			$('.clear').off().click(function (e) {
				window.Calculator.clearCalculator();
			});
			$('.equals').off().click(function (e) {
				window.Calculator.equals();
			});
			$('.reset').off().click(function (e) {
				$('.reset').removeClass('show');
				$('.warning').text("Don't divide by zero");
				$('.calculator').removeClass('broken');
			});
		},
	}
})(window);