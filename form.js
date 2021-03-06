$(window).load(function() {
//bind the event handlers to buttons
  $('button#category').attr('onClick','newCat()');
  $('button#future').attr('onClick','showResults()');
});

function newCat() {
//event handler for clicking on add detail
  var mForm = $('div#details');
  var thisCategory = $('<div></div>');
  thisCategory.appendTo(mForm);
  $('<input class="category" type="text" onkeyup="catChange(this)"/>').appendTo(thisCategory);
  $('<button type="button" id="add-choice" onClick="addChoice(this)">Add Choice</button>').appendTo(thisCategory).hide();
  $('<button type="button" id="remove-cat" onClick="removeCat(this)">Remove Category</button>').appendTo(thisCategory);
}

function catChange(e){
  var categoryName = $(e).val();
  var addChoicesButton = $(e).parent().children('#add-choice');
  if (categoryName != '') {
    addChoicesButton.show();
  }
  else {
    addChoicesButton.hide();
  }
}

function removeCat(e) {
  console.log('removed');
  var categoryName = $(e).parent().children('input.category').val();
  $(e).parent().remove();
}

function addChoice(e) {
  var currentBox = $(e).parent();
  var choiceBox = $('<div class="choice" />');
  choiceBox.appendTo(currentBox);
  $('<input type="text" />').appendTo(choiceBox);
  $('<a href="#" onClick="removeChoice(this)">[-]</a>').appendTo(choiceBox);
}

function removeChoice(e) {
  //remove the div (and its contents) that encloses this removeChoice anchor
  var parenttt = $(e).parent().remove();
}

function playGame() {
  var mash = makeMash();
  if (mash) {
     return play(mash);
  }
}

function makeMash(){
//ensure none of the categories are blank
//gets all of the cats, then all of their respective choices
//for each div in div#details, get the child that is an input#category. get that value.  that is the catName/mash key
//then get $('div.choice input') <--each of those is a choice. stick that in the array that is the value for the mashkey 
//builds the mash
  var flag = true;
  var mash = {'live':['m','a','s','h']}
  $('div#details > div').each(function() {
    var categoryName = $(this).find('input.category').val();
    if (!mash.hasOwnProperty(categoryName)) {
      mash[categoryName] = [];
    }
    //console.log(categoryName);
    var currentCat = mash[categoryName];
    var choices = $(this).find('div.choice input');
    //console.log(choices.length);
    if (choices.length <= 1) {
       alert('You must put at least 2 choices per category');
       flag = false;
    }
    else {
        choices.each(function() {
           //console.log('choice',$(this).val());
           currentCat.push($(this).val());
        });
    }
  });
  var result = flag ? mash : flag;
  return result;
}

function showResults() {
  var resultzBox = $('div#results');
  resultzBox.html('');
  var yourLife = playGame();
  for (var cat in yourLife) {
    resultzBox.append('<p>'+cat+' : '+yourLife[cat]+'</p>');
  }
}
