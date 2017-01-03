describe("calulator",function(){
	var calc;
	beforeEach(function(){
		calc = new Calculator();

		jasmine.addMatchers({
	      toBeBetween: function(a,b){
	      	expectedLow = a;
	      	expectedHigh = b
	      	return{
	      		compare: function (actual, expectedLow, expectedHigh) {
	        		return {
	        			pass: actual >= expectedLow && actual <= expectedHigh
	        		}	
	      		}}
	      	}
    	});
	});

	it('should be able to add 1 and 1',function(){
		expect(calc.add(1,1)).toBe(2);
	});

	it('should be able to divide 36 by 6',function(){
		expect(calc.divide(36,6)).toBe(6);
	});

	it('Should be able to divide a rational number', function(){
		expect(calc.divide(1,3)).toBeBetween(0.3,0.34);
	});
});