var a = [
         { 'choices': ['M','A','S','H'] }
        ,{ 'choices': [1,2,3] }
        ,{ 'choices': ['adsf','sdf','df','f'] } ];
mashMe(a);

function mashMe(arr) {
  // initialize
  var allTheChoices = getNumElements(arr);
  var finalArr;
  var number = Math.ceil(Math.random()*allTheChoices);
  var currentPos = {cat: 0, choice: 0};

  console.log(number);

  while (arr.length > 0) {
    // begin counting
    var categoryChoices = categoryAt(currentPos, arr);
    while (categoryChoices.length-currentPos.choice < number) {
      number -= (categoryChoices.length-currentPos.choice);
      currentPos = reset(currentPos, arr);
      categoryChoices = categoryAt(currentPos, arr);
    }
    currentPos.choice += number; // this is the one to be eliminated
    // make sure it's valid with this handy dandy console.log statement
    //console.log(categoryChoices[currentPos.choice]);

    /* ELIMINATION!!! */
    var expunged = arr[currentPos.cat]['choices'].splice(currentPos.choice,1);
    //console.log("GUESS YOU CAN'T DO",expunged);

    /* SET COUNTER */
    categoryChoices = categoryAt(currentPos, arr);
    if (currentPos.choice > categoryChoices.length) {
      if (categoryChoices.length === 1) {
        // remove entire category and put this data into a global UR LYFE variable
        finalArr.push(arr.splice(currentPos.cat,1));
      }
      currentPos = reset(currentPos,arr);
    }
    //console.log(currentPos);
  }
  return finalArr;
}

function categoryAt(pointer, arr) {
  return arr[pointer.cat]['choices'];
}

function reset(pointer, arr) {
  return {cat:(pointer.cat+1)%(arr.length),choice:0};
}


function getNumElements(aNestedArr) {
  var total = 0;
  for (idx in aNestedArr) {
    total += aNestedArr[idx]['choices'].length;
  }
  return total;
}
