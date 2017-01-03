beforeEach(function(){

    jasmine.addMatchers({
      toBeBetween: function(a,b){
        return{
        	this.actual >= a && this.actual <= b;
        }   
      }
    });
  });