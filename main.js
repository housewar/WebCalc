$(document).ready(function(){
  
  function Calculator(){
    var numArr = [];
    this.currentNum;
    
    Calculator.prototype.addDigit = function(num){
    	numArr.push(num);
    	numArr = Number(numArr.join("")).toString().split("").slice(0,10); //chops off leading zeroes and limits number of digits.
    	this.currentNum = Number(numArr.join(""));
    }
    Calculator.prototype.addDecimal = function(num){
    	if (numArr.indexOf(".") === -1){
    		numArr.push(".");
    	}
    }
    Calculator.prototype.clearEntry = function(num){
    	numArr = [];
    	this.currentNum = 0;
    }
  }
  
  var myCalc = new Calculator;
  var func;
  $(".display").text(0);
  
  $(".btn-container .digit").on("click",function(){
    myCalc.addDigit($(this).attr('value'));
    $(".display").text(myCalc.currentNum);
  });
  $(".btn-container .function").on("click",function(){
    func = $(this).attr('value');
    
    switch (func) {
      case ".":
        myCalc.addDecimal();
          if (Math.floor(myCalc.currentNum) === myCalc.currentNum){
            $(".display").text(myCalc.currentNum + ".");
          }
      break;
      case "CE":
      	myCalc.clearEntry();
      	$(".display").text(0);
      break;
    }
    
    
  });
});