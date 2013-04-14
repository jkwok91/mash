/**
var mash = {
    'live': ['m', 'a', 's', 'h'],
    'car': ['toyota', 'dump truck', 'jeep', 'ferrari'],
    'num of kidz': ['100', '3', '0', '50', '1']
};
**/

function play(mash) {
    console.log('playing now hello');
    var your_life = {};
    var number = Math.ceil(Math.random()*10)+3;
    console.log(number);
    var all_done = false;
    var all_cats = Object.keys(mash);
    console.log('all_cats',all_cats);
    var pointer = {
        'current_cat': 0,
        'choice_idx': 0
    };
    var cc, ci;
    var counter = number - 1;
    while (!all_done) {
        cc = pointer.current_cat; //sets up current infos
        ci = pointer.choice_idx;
        var catchoice = mash[all_cats[cc]];
        var rem = catchoice.length - ci;
        //console.log('pointer',pointer);
        if (counter < rem) {
            pointer.choice_idx += counter;
            mash[all_cats[cc]].splice(pointer.choice_idx, 1); //elimination
            //check if ready for your_life
            if (mash[all_cats[cc]].length == 1) {
                your_life[all_cats[cc]] = mash[all_cats[cc]][0];
                delete mash[all_cats[cc]];
                all_cats.splice(cc, 1);
                if (all_cats.length !== 0) {
                    pointer.choice_idx = 0;
                    pointer.current_cat = moduluz(cc, all_cats.length);
                }
            } 
            counter = number - 1; //restore default
        } else { //(counter >= rem)
            counter -= rem;
            pointer.current_cat = skip_cat(cc, all_cats.length);
            pointer.choice_idx = 0;
        }
        console.log(mash);
        all_done = Object.keys(mash).length === 0;
        console.log(all_done);
    }
    return your_life;
}

function skip_cat(current_cat, total_cats) {
    return (current_cat + 1) % total_cats;
}

function moduluz(x, y) {
    console.log(x,'%',y,' is');
    modded = x % y;
    if (modded < 0) {
        modded += y;
    }
    console.log(modded);
    return modded;
}
