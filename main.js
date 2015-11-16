$(document).ready(function(){
  
  function Calculator(){
    var numArr = [];
    this.op = "";
    this.currentNum = 0;
    this.subTotal;
    this.total = 0;
    this.displayNum = "0";
    var fin = false;
    var solve = false;
    var first = true;
    
    Calculator.prototype.addDigit = function(num){
      numArr.push(num);
      if (numArr.indexOf(".") === -1) {
      numArr = Number(numArr.join("")).toString().split("").slice(0,10); //prevents leading zeroes.
      } else { //allows leading zeroes after a decimal
      numArr = numArr.slice(0,10); //limits number of digits.
      }
      this.displayNum = numArr.join("");
      this.currentNum = Number(numArr.join(""));
      solve = true;
    }
    Calculator.prototype.delDigit = function(){
      numArr.pop();
      numArr = Number(numArr.join("")).toString().split("").slice(0,10); //chops off leading zeroes and limits number of digits.
      this.currentNum = Number(numArr.join(""));
      this.displayNum = numArr.join("");
    }
    Calculator.prototype.addDecimal = function(){
      if (numArr.indexOf(".") === -1){
        if (numArr.length === 0){
          numArr.push(0);
          numArr.push(".");
        } else {
        numArr.push(".");
      }
      this.displayNum = numArr.join("");
      }
    }
    Calculator.prototype.clearEntry = function(){
      numArr = [];
      this.currentNum = 0;
      this.displayNum = "0";
    }
    Calculator.prototype.allClear = function(){
      numArr = [];
      this.op = "";
      this.currentNum = 0;
      this.displayNum = "0";
      this.subTotal = 0;
      this.total = 0;
      first = true;
    }
    Calculator.prototype.setOp = function(operation){
      this.result(false);
      this.op = operation;
      solve = false;
      numArr = [];
      this.currentNum = 0;
      this.displayNum = "0";
    }
    Calculator.prototype.result = function(fin){
      if (first) {
        first = false;
        this.subTotal = this.currentNum;
      } else if (solve === true ){
        switch (this.op) {
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
        case '%':
          this.percent();
          break;
        }
      }
      
      if (fin === true) {
        this.op = "";
        this.total = this.subTotal;
        this.currentNum = this.subTotal;
        this.subTotal = 0;
        first = true;
        numArr = [];
      }
      
    }
    Calculator.prototype.sum = function(){
      this.subTotal += this.currentNum;
      this.subTotal = Number(this.subTotal.toFixed(9));
    }
    Calculator.prototype.diff = function(){
      this.subTotal -= this.currentNum;
      this.subTotal = Number(this.subTotal.toFixed(9));
    }
    Calculator.prototype.quotient = function(){
      this.subTotal /= this.currentNum;
      this.subTotal = Number(this.subTotal.toFixed(9));
    }
    Calculator.prototype.product = function(){
      console.log(this.subTotal);
      console.log(this.currentNum);
      this.subTotal *= this.currentNum;
      this.subTotal = Number(this.subTotal.toFixed(9));
    }
    Calculator.prototype.percent = function(){
      console.log((this.subTotal)*(this.currentNum/100));
      this.subTotal *= this.currentNum / 100;
      this.subTotal = Number(this.subTotal.toFixed(9));
      console.log(this.subTotal);
      this.currentNum = this.subTotal;
    }
    Calculator.prototype.sqr2 = function(){
      this.subTotal = Math.sqrt(this.currentNum);
      this.subTotal = Number(this.subTotal.toFixed(9));
      this.currentNum = this.subTotal;
      numArr = [];
    }
  }
  
  var myCalc = new Calculator;
  var func;
  $(".lowerDisplay").text("");
  
  $(".btn-container .digit").on("click",function(){
    myCalc.addDigit($(this).attr('value'));
    $(".lowerDisplay").text(myCalc.op + myCalc.displayNum);
  });
  $(".btn-container .function").on("click",function(){
    func = $(this).attr('value');
    
    switch (func) {
      case ".":
        myCalc.addDecimal();
          if (Math.floor(myCalc.currentNum) === myCalc.currentNum){
            $(".lowerDisplay").text(myCalc.op + myCalc.displayNum);
          }
        break;
      case "CE":
        myCalc.clearEntry();
        $(".lowerDisplay").text("");
        break;
      case "AC":
        $(".lowerDisplay").text("");
        myCalc.allClear();
        $(".upperDisplay").text("");
        break;
      case "<":
        myCalc.delDigit();
        $(".lowerDisplay").text(myCalc.op + myCalc.displayNum);
        break;
      case "+":
      case "-":
      case "/":
      case "*":
        myCalc.setOp(func);
        if (myCalc.subTotal != 0){
          $(".upperDisplay").text(myCalc.subTotal);
        }
        $(".lowerDisplay").text(func);
        break;
     case "%":
        myCalc.setOp(func);
        if (myCalc.subTotal != 0){
          $(".upperDisplay").text(myCalc.subTotal);
        }
        $(".lowerDisplay").text(func);
        break;

     case "sqr2":
        myCalc.sqr2();
        if (myCalc.subTotal != 0){
          $(".upperDisplay").text(myCalc.subTotal);
        }
        $(".lowerDisplay").text(myCalc.op);
        break;

      case "=":
        $(".lowerDisplay").text("");
        myCalc.result(true);
        $(".upperDisplay").text(myCalc.total);
        break;
    }
  });
});