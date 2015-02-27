/*
var a = [ {
            'name': 'live'
           ,'choices': ['M','A','S','H']
          }, {
            'name': 'car'
           ,'choices': ['toyota', 'dump truck', 'jeep', 'ferrari']
          }, {
            'name': 'numkids'
           ,'choices': ['100', '3', '0', '50', '1'] } ];
play(a);
*/

function getNumElements(arr) {
  var total = 0;
  for (idx in arr) {
    total += arr[idx]['choices'].length;
  }
  return total;
}

function play(arr) {
  var allChoices = getNumElements(arr);
  var randomNumber = Math.ceil(Math.random()*allChoices);

  // initialize state
  var current = {cat:0,choice:0,array:arr,life:[]};
  var counter;

  // count through array
  while (current.array.length > 0) {
    // here there will be an elimination
    counter = randomNumber-1;
    while (current.array[current.cat].choices.length - current.choice <= counter) {
      // we must update the counter
      counter -= (current.array[current.cat].choices.length-current.choice);
      // as well as move to the next category and choice
      current.cat = (current.cat+1)%(current.array.length);
      current.choice = 0;
    }
    // eliminate something within this category
    current.choice += counter;
    var removed = current.array[current.cat].choices.splice(current.choice,1);
    console.log("you removed:",removed);
    // after elimination, clean up
    if (current.array[current.cat].choices.length === 1) {
      var finalCat = current.array.splice(current.cat,1);
      current.life.push(finalCat[0]);
      current.cat = current.cat%(current.array.length);
      current.choice = 0; // now in a different category than ended
    } else if (current.array[current.cat].choices.length < current.choice) {
      current.cat = (current.cat+1)%(current.array.length);
      current.choice = 0;
    }
  }
  console.log("DONE");
  console.log(current.life);
  return current.life;
}
