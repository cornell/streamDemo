'use strict';

import flyd from './src/flyd.js';
// import {P, S, PS, D} from './src/patchinko';

var temperatureService = {

    increment : function (state, amount){
        state.value += amount;
        return state;
    },
    decrement : function (state, amount){
        state.value -= amount;
        return state;
    },
    changeUnits : function (state) {
        
        var value = state.value;
        var newUnits = state.units === "C" ? "F" : "C";
        var newValue = temperatureService.convert(value, newUnits);
        state.value = newValue;
        state.units = newUnits;

        return state;
    },
    convert: function (value, to) {
        return Math.round(
            (to === "C") ? ((value - 32) / 9 * 5) : (value * 9 / 5 + 32)
        );
    }
}

var meteo = {    
    model: {
        value: 22,
        units: 'C'
    },
    actions: function (update) {
        return {
            increment: (amount) => {
                update((state) => temperatureService.increment(state, amount))
            },
            changeUnits: function () {
                update((state) => temperatureService.changeUnits(state))
            }
        };
    }
};

var update = flyd.stream();
var states = flyd.scan(function (state, patch) {
    return patch(state);
}, meteo.model, update);

states.map((state) => {
    console.log(JSON.stringify(state));
    var elKpi = document.getElementById('kpi');
    elKpi.innerHTML = JSON.stringify(state);
});

var actions = meteo.actions(update);
actions.increment(1);
actions.changeUnits();