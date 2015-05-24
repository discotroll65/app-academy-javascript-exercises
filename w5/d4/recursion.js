var exponent1 = function(base, exponent){
  if(exponent === 0){
    return 1;
  }else{
    return base * exponent1(base, exponent - 1);
  }
};

// console.log(exponent1(2,3));

var exponent2 = function(base, exponent){
  if(exponent === 0){
    return 1;
  }else if (exponent === 1){
    return base;
  }else if (exponent % 2 === 0){
    return exponent2(base, exponent / 2) *  exponent2(base, exponent / 2);
  }else {
    return base * (exponent2(base, (exponent - 1) / 2)) * (exponent2(base, (exponent - 1) / 2));
  }
};

// console.log(exponent2(2,3));

var nFibs = function(numFibs){
  if(numFibs === 1){
    return [0];
  }else if (numFibs ===2){
    return [0,1];
  }else{
    var lastResult = nFibs(numFibs -1);
    return lastResult.concat(
        [lastResult[lastResult.length - 1] + lastResult[lastResult.length - 2]]
      );
  }
};

// console.log(nFibs(8));

var bSearch = function(arr, target){
  if (arr.length === 0){
    return null;
  }
  var midpoint = Math.floor(arr.length / 2);
  // debugger;
  if (arr[midpoint] === target){
    return midpoint;
  } else if ( target < arr[midpoint]){
    return bSearch(arr.slice(0,midpoint), target);
  } else {
    return midpoint + 1 + bSearch(arr.slice(midpoint + 1, arr.length), target);
  }

};

var arr = [1,2,3,7,8,9];
// console.log(bSearch(arr,7));

var makeChange = function(amount, coins, changeHistory){
  var numCoins, change, i, thisChange, bestChange, testChange, remainder;
  var maxCoin = coins[0];
  if (amount % maxCoin === 0) {
    numCoins = amount / maxCoin;
    change = [];
    for (i = 0; i < numCoins; i++) {
      change.push(maxCoin);
    }
    changeHistory[amount] = change
    return change;
  } else if (amount < maxCoin){
    return makeChange(amount, coins.slice(1, coins.length), changeHistory);
  }
  numCoins = Math.floor(amount / maxCoin);

  remainder = amount - (maxCoin);
  if (!changeHistory[remainder] ){
    thisChange = makeChange(remainder, coins, changeHistory);
    changeHistory[remainder] = thisChange.slice(0);
  }else{
    thisChange = changeHistory[remainder];
  }


  thisChange.push(maxCoin);
  bestChange = thisChange;

  for (i = 1; i < coins.length; i++) {
    if (coins[i] < amount) {

      remainder = amount - (coins[i]);
      if (!changeHistory[remainder] ){
        testChange = makeChange(remainder, coins, changeHistory);
        changeHistory[remainder] = testChange.slice(0);
      }else{
        testChange = changeHistory[remainder];
      }
      testChange.push(coins[i]);

      if (testChange.length < bestChange.length) {
        bestChange = testChange;
      }
    }
  }


  changeHistory[amount] = bestChange;
  return bestChange;

};

 console.log(makeChange(242,[7,3,1], {}));



Array.prototype.mergeSort = function(){
  var midPoint, leftHalf, rightHalf;

  if (this.length === 1) {
    return this;
  }

  midPoint = Math.floor(this.length / 2);
  leftHalf = this.slice(0, midPoint);
  rightHalf = this.slice(midPoint, this.length);
  return this.mergeFunction(leftHalf.mergeSort(), rightHalf.mergeSort());
};

Array.prototype.mergeFunction = function(left, right) {
  var mergedArray = [];
  while (left.length > 0 && right.length > 0) {
    if (left[0] > right[0]) {
      mergedArray.push(right.shift());
    }else if (left[0] < right[0]){
      mergedArray.push(left.shift());
    }else{
      mergedArray.push(left.shift());
      mergedArray.push(right.shift());
    }
  }
  mergedArray = mergedArray.concat(left);
  mergedArray = mergedArray.concat(right);

  return mergedArray;
};

// console.log([2,1,3,4,2].mergeSort());

Array.prototype.subsets = function(){
  if (this.length === 0) {
    return [[]];
  }
  var lastElement, subsetsArray, poppedArray, nextSubsetEl;

  lastElement = this.slice(-1)[0];
  poppedArray = this.slice(0, this.length - 1);
  subsetsArray = poppedArray.subsets();

  subsetsArray.forEach(function(element){
    nextSubsetEl = element.slice(0);
    nextSubsetEl.push(lastElement);
    subsetsArray[subsetsArray.length] = nextSubsetEl;
  });

  return subsetsArray;
};

// var subsets = [1,2,3].subsets();
// subsets.forEach(function(element){
//   console.log("[");
//   element.forEach(function(innerEl){
//     console.log(innerEl);
//   });
//   console.log("]");
// });






//
