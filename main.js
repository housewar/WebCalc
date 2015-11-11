$(document).ready(function(){
  
  function Calculator(){
    var numArr = [];
    var op;
    this.currentNum = 0;
    this.subTotal = 0;
    this.total = 0;
    var fin = false;
    
    Calculator.prototype.addDigit = function(num){
    	numArr.push(num);
    	numArr = Number(numArr.join("")).toString().split("").slice(0,10); //chops off leading zeroes and limits number of digits.
    	this.currentNum = Number(numArr.join(""));
    }
    Calculator.prototype.addDecimal = function(){
    	if (numArr.indexOf(".") === -1){
    		numArr.push(".");
    	}
    }
    Calculator.prototype.clearEntry = function(){
    	numArr = [];
    	this.currentNum = 0;
    }
    Calculator.prototype.setOp = function(operation){
    	op = operation;
    	this.subTotal = this.currentNum;
    	numArr = [];
    }
    Calculator.prototype.result = function(fin){
    	
    	switch (op) {
    		case '+':
    		  this.sum();
    		  break;
    		case '-':
    		  this.diff();
    		  break;
    		case '/':
    		  this.quotient();
    		  break;
    		case '*':
    		  this.product();
    		  break;
    	}
    	
    	if (fin = true) {
    		this.total = this.subTotal;
    		this.currentNum = this.subTotal;
    		this.subTotal = 0;
    		numArr = [];
    	}
    	
    }
    Calculator.prototype.sum = function(){
      this.subTotal += this.currentNum;
    }
    Calculator.prototype.diff = function(){
      this.subTotal -= this.currentNum;
    }
    Calculator.prototype.quotient = function(){
      this.subTotal /= this.currentNum;
    }
    Calculator.prototype.product = function(){
      this.subTotal *= this.currentNum;
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
      case "+":
      case "-":
      case "/":
      case "*":
      	myCalc.setOp(func);
      	$(".operation").text(func);
        break;
      case "=":
        myCalc.result(true);
        $(".display").text(myCalc.total);
        break;
    }
  });
});