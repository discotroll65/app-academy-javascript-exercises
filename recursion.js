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

var makeChange = function(amount, coins){
  var maxCoin = coins[0];

  if(amount % maxCoin === 0){
    var numCoins = amount / maxCoin;
    var change = [];
    for (var i = 0; i < numCoins; i++){
      change.push(maxCoin);
    }
    return change;
  }else if(amount < maxCoin){
    return makeChange(amount, coins.slice(1, coins.length));
  }
  var numCoins = Math.floor(amount / maxCoin);

  var change = [];
  for (var i = 0; i < numCoins; i++){
    change.push(maxCoin);
  }

  return makeChange(amount-(numCoins * maxCoin), coins.slice(1,coins.length)).concat(change);

  // var bestChange = makeChange(amount-, coins).push(maxCoin);

};

console.log(makeChange(41,[10,7,1]));






  // for(var i = 1; i < coins.length; i++){
  //   if (coins[i] < amount){
  //     var thisChange = makeChange(amount - coins[i], coins).push(coins[i]);
  //     if (thisChange.length < bestChange.length){
  //       bestChange = thisChange;
  //     }
  //   }
  // }
