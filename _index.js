/*
import flyd from './src/flyd.js';

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

window.actions = actions;*/

/*
import flyd from './src/flyd';

var temperature = {
    initialState: {
        temperature: {
            value: 22,
            units: 'C'
        }
    },
    actions: function(update){
        return {
            increment: function(amount) {
              update(function(state) {
                state.temperature.value += amount;
                return state;
              });
            }
        }
    }
}

var update = flyd.stream();

var states = flyd.scan(function(state, patch){
    return patch(state);
}, temperature.initialState, update)

window.actions = temperature.actions(update);


states.map((state) => {
    // console.log(JSON.stringify(state));
    var elKpi = document.getElementById('kpi');
    elKpi.innerHTML = JSON.stringify(state);
});

 window.actions = actions;
 */

import {P, S, PS, D} from './src/patchinko';
import { setTimeout } from 'timers';
import O from './src/constant';
import I from './src/immutable';

var target = {
    air:   { value: 22, units: "C" },
    water: { value: 29, units: "F" },
    comfortable: false,
    invalid: true
  };
console.dir(target);
setTimeout(() => {

    // P(target, {water: { value: 84}});
    //P(target, {comfortable: S(x => !x) });
    // P(target, {air: PS({ value: 20})})
    //P(target, {invalid: D})
    
    // O(target, {water: { value: 84, units: "F" }});
    // O(target, {comfortable: O(x => !x)})
    // O(target, {air: O({value: 20})})
    // O(target, {comfortable: O(s => !s)})

    // console.dir(target);

    // var dest = I(target, {water: { value: 84, units: "F" }});
    // var dest = I(target, {comfortable: S(x => !x) });
    // var dest = I(target, {air: I({value: 20})})
    // console.dir(dest);
    // console.dir(dest.comfortable);
}, 100);


// window.target = target;
// window.P = P;
// window.S = S;
// window.PS = PS;
// window.D = D;