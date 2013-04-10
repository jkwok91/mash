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
    var number = 5; //Math.ceil(Math.random()*10)+3;
    //console.log(number);
    var all_done = false;
    var all_cats = Object.keys(mash);
    console.log('all_cats',all_cats);
    var pointer = {
        'current_cat': 0,
        'choice_idx': 0
    };
    var cc, ci;
    while (!all_done) {
        var counter = number - 1;
        cc = pointer.current_cat;
        var catchoice = mash[all_cats[cc]];
        ci = pointer.choice_idx;
        console.log('pointer',pointer);
        if (mash[all_cats[cc]].length == 1) {
            console.log(mash[all_cats[cc]]);
            your_life[all_cats[cc]] = mash[all_cats[cc]][0];
            delete mash[all_cats[cc]];
            all_cats.splice(cc, 1);
            console.log('mash updated',mash);
            console.log('all_cats updated',all_cats);
            if (all_cats.length !== 0) {
                pointer.choice_idx = 0;
                pointer.current_cat = moduluz(cc, all_cats.length);
            }
        } else {
            var whats_left = mash[all_cats[cc]].length - ci;
            if (counter < whats_left) {
                pointer.choice_idx += counter;
            } else {
                while (counter >= whats_left) {
                    counter -= whats_left;
                    pointer.current_cat = skip_cat(cc, all_cats.length);
                    cc = pointer.current_cat;
                    pointer.choice_idx = moduluz(counter, mash[all_cats[cc]].length);
                    ci = pointer.choice_idx;
                    whats_left = mash[all_cats[cc]].length;
                }
                catchoice = mash[all_cats[cc]];
                catchoice.splice(ci, 1);
                console.log('mash',mash);
            }
        }
        all_done = Object.keys(mash).length === 0;
    }
    console.log(your_life);
    return your_life;
}

function skip_cat(current_cat, total_cats) {
    return (current_cat + 1) % total_cats;
}

function moduluz(x, y) {
    modded = x % y;
    if (modded < 0) {
        modded += y;
    }
    return modded;
}
