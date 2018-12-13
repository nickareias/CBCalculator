////// the goal of this is to be able to use this as a calculator
/*
It should be able to add, subtract, multiply, and divide. The clear button should work as well. You do not need to touch the css or the html, this should be a JS solution!!!
*/
(function(window) {
	window.Calculator = {
		oldNum: null,
		newNum: null,
		operand: null,
		enteringNumber: false,
		numberString: '',
		isDecimal: false,
		isLastButtonEquals: false,
		decimalSignificantDigits: 0,
		clearCalculator: function () {
			this.oldNum = null;
			this.newNum = null;
			this.operand = null;
			this.numberString = '';
			this.isDecimal = false;
			this.decimalSignificantDigits = 0;
			window.CalculatorUI.updateViewer(0);
			this.isLastButtonEquals = false;
		},
		setOldNum: function (num) {
			this.oldNum = num;
		},
		addToNumberString: function (digit) {
			// if last button was equals and user types digits in:
			// reset the calculator for a new calculation
			if (this.isLastButtonEquals) {
				this.clearCalculator();
			}

			// handle decimals
			if (digit === '.' && !this.isDecimal) {
				this.numberString += digit;
				this.isDecimal = true;
			} else if (digit !== '.') {
				this.numberString += digit;
			}
			// set significant digits
			if (this.isDecimal) {
				let decimal = this.numberString.split('.')[1];
				if (decimal) {
					// only set significant digits if current input is more significant digits than previous
					if (decimal.length > this.decimalSignificantDigits) {
						this.decimalSignificantDigits = decimal.length;
					}
				}
			}

			if (!this.enteringNumber) {
				// if first time inputing new number, switch current newNum to oldNum
				// and start updating newNum with new numberstring
				this.enteringNumber = true;
				this.setNewNum(this.numberString);
			} else {
				// if still inputing number, just update newNum
				this.newNum = this.numberString;
			}
			window.CalculatorUI.updateViewer(this.numberString);
		},
		resetNumberString: function () {
			this.enteringNumber = false;
			this.numberString = '';
			this.isDecimal = false;
		},
		setNewNum: function (num) {
			this.oldNum = this.newNum;
			this.newNum = num;
		},
		setOperand: function (operand) {
			if (this.numberString !== '') {
				this.resetNumberString();
				if (this.oldNum !== null) {
					this.setNewNum(this.computeAnswer());
					window.CalculatorUI.updateViewer(this.newNum);
				}
			}
			this.operand = operand;
			this.isLastButtonEquals = false
		},
		equals: function () {
			if (this.oldNum) {
				let answer = this.computeAnswer();
				if (answer !== null) {
					// if user is entering a new number, replace old number when user hits equals
					if (this.enteringNumber) {
						this.setNewNum(answer);
					} else { 
						// otherwise, just update new number with the result of computation
						// keeping old number for repeating computations
						this.newNum = answer;
					}
					this.resetNumberString();
					window.CalculatorUI.updateViewer(this.newNum)
				}
				this.isLastButtonEquals = true;
			}
		},
		computeAnswer: function () {
			let answer = null;
			let firstNum = this.oldNum;
			let secondNum = this.newNum;
			// if user is repeatedly hitting equals to repeat last operation, old and new num must be switched
			// It is only necessary for subtraction and division, but it doesn't change the result when done for addition and multiplication
			if (this.isLastButtonEquals) {
				firstNum = this.newNum;
				secondNum = this.oldNum;
			}
			if (this.operand === 'divide' && parseFloat(secondNum) === 0.0) {
				$('.warning').text('Told you not to...');
				$('.reset').addClass('show');
				$('.calculator').addClass('broken');
			} else {
				window.CalculatorComputations.compute(this.operand, firstNum, secondNum, (result) => {
					answer = parseFloat(result).toFixed(this.decimalSignificantDigits);
				});
			}
			return answer;
		}
	}
})(window);
