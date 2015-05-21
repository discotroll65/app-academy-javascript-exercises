Array.prototype.uniq = function(){
  var uniques = [];
  for(var i = 0; i < this.length; i++){
    if( uniques.indexOf(this[i]) === -1){
      uniques.push(this[i]);
    }
  }
  return uniques;
};

var testArray = [1,2,3,3,3,3,45,6,7];

//console.log(testArray.uniq());

Array.prototype.twoSum = function(){
  var sums = [];
  for (var i = 0; i < this.length - 1; i++){
    for (var j = i+1; j < this.length; j++){
      if (this[i] + this[j] === 0){
        sums.push([i,j]);
      }
    }
  }
  return sums;
};

//console.log([-1, 0, 2, -2, 1].twoSum());

Array.prototype.myTranspose = function(){
  var transposed = [];
  var rowNums = this.length;

  for(var i = 0; i< rowNums; i++){
    transposed.push([]);
  }

  for (var row = 0; row < this.length; row++){
    for (var col = 0; col < this[row].length; col++){
      transposed[row][col] = this[col][row];
    }
  }
  return transposed;
};

var transposedArray = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8]
  ];
//console.log(transposedArray.myTranspose());

Array.prototype.myEach = function(cb){
  for(var i = 0; i < this.length; i++){
    cb(this[i]);
  }
  return this;
};

var arr = [1,2,3];

// arr.myEach(function(i){
//   console.log(i);
// });

Array.prototype.myMap = function(cb){
  var mapped = [];

  this.myEach(function(element){
    mapped.push(cb(element));
  });

  return mapped;
};

// var arr = [1,2,3];
// var mapped = arr.myMap(function(i){
//   return (i + 2);
// });
//
// console.log(mapped);

Array.prototype.myInject = function(cb){
  var memo = this[0];
  var i = 0;
  this.myEach(function(element){
    if (i !== 0){
      memo = cb(memo, element);
    }
    i += 1;
  });
  return memo;
};

// var arr = [1,2,3];
// var sum = arr.myInject(function(memo, element){
//   return memo + element;
// });
//
// console.log(sum);

Array.prototype.bubbleSort = function(){
  var sorted = false;
  while (sorted === false){
    sorted = true;
    for (var i = 0; i < this.length - 1; i++){
      if (this[i] > this[i+1]){
        sorted = false;
        var temp = this[i+1];
        this[i+1] = this[i];
        this[i] = temp;
      }
    }
  }
  return this;
};

// arr = [5,3,6,2,1];
// console.log(arr.bubbleSort());

String.prototype.substrings = function(){
  var array = [];

  for(var i = 0; i < this.length - 1; i++ ){
    for(var j= i + 1; j <= this.length; j++){
      array.push(this.substring(i, j));
    }
  }
  return array;
};

// console.log("cat".substrings());
