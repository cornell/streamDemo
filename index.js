// import flyd from './src/flyd.js';
/*
var update = flyd.stream();

var timesTen = update.map((value)=> value*10);

var plusTwo = timesTen.map((value)=> value+2);

plusTwo.map((value)=> console.log(value));

update(1);
update(2);

var otherStream = flyd.scan((latest, next)=>latest + next, 0, update);
update(5);
*/

var app = {
    initialState: {
        value: 0
    },
    actions: function(update){
        return {
            increment: () => update(1),
            decrement: () => update(-1)
        }
    }
}

var update = flyd.stream();
var states = flyd.scan((state, increment) => {
    state.value = state.value + increment;
    return state;
}, app.initialState, update);

var actions = app.actions(update);
states.map((state) => {
    // console.log(JSON.stringify(state));
    var elKpi = document.getElementById('kpi');
    elKpi.innerHTML = JSON.stringify(state);
});

// window.actions = actions;