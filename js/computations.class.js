(function(window) {
	window.CalculatorComputations = {
		compute: function (type,numOne,numTwo,callback) {
			/// I have filled in one of the switch cases, fill out the rest.
			/// you must use callbacks to trigger the change in UI elements
			switch (type) {
				case 'plus':
					this.add(numOne,numTwo,callback);
					break;
				case 'minus':
					this.subtract(numOne,numTwo,callback);
					break;
				case 'divide':
					this.divide(numOne,numTwo,callback);
					break;
				case 'times':
					this.times(numOne,numTwo,callback);
					break;
			}
		},
		add: function (numOne,numTwo,callback) {
			if (typeof callback === 'undefined') callback = null;
			if (callback !== null) {
				var added = parseFloat(numOne) + parseFloat(numTwo);
				callback(added);
			}
		},
		subtract: function (numOne,numTwo,callback) {
			if (typeof callback === 'undefined') callback = null;
			if (callback !== null) {
				var subtracted = parseFloat(numOne) - parseFloat(numTwo);
				callback(subtracted);
			}
		},
		divide: function (numOne,numTwo,callback) {
			if (typeof callback === 'undefined') callback = null;
			if (callback !== null) {
				if (numTwo === 0) {
					console.log('division by 0');
					callback(null);
				} else {
					var divided = parseFloat(numOne) / parseFloat(numTwo);
					callback(divided);
				}
			}
		},
		times: function (numOne,numTwo,callback) {
			if (typeof callback === 'undefined') callback = null;
			if (callback !== null) {
				var multiplied = parseFloat(numOne) * parseFloat(numTwo);
				callback(multiplied);
			}
		}
	}
})(window);