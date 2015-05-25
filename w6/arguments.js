function sum(){
  var args = Array.prototype.slice.call(arguments);
  return args.reduce(function(memo, el) {return memo + el; }, 0 );
}

Function.prototype.myBind = function(context){
  var args = Array.prototype.slice.call(arguments, 1);
  var that = this;
  return function (){
    args = args.concat(Array.prototype.slice.call(arguments));
    return that.apply(context, args);
  };
};


function curriedSum(numArgs) {
  var numbers = [];
  function _curriedSum(num) {
    numbers.push(num);
    if (numbers.length === numArgs) {
      return sum.apply(null, numbers);
    } else {
      return _curriedSum;
    }
  }
  return _curriedSum;
}

Function.prototype.curry = function (numArgs) {
  var args = [];
  var that = this;
  function innerCurry() {
    var innerArgs = Array.prototype.slice.call(arguments);
    args = args.concat(innerArgs);
    if (args.length === numArgs) {
      return that.apply(that, args);
    } else {
      return innerCurry;
    }
  }
  return innerCurry;
};
