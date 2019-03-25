import flyd from './src/flyd';
import { P, S, PS } from './src/patchinko';

var conditions = {
    initialState: {
        conditions: {
            precipitations: false,
            sky: "Sunny"
        }
    },
    actions: function (update) {
        return {
            togglePrecipitations: function (value) {
                update({ conditions: PS({ precipitations: value }) });
            },
            changeSky: function (value) {
                update({ conditions: PS({ sky: value }) });
            }
        };
    }
};

var convert = function (value, to) {
    return Math.round(
        (to === "C") ? ((value - 32) / 9 * 5) : (value * 9 / 5 + 32)
    );
};

var temperature = {
    initialState: {
        temperature: {
            value: 22,
            units: "C"
        }
    },
    actions: function (update) {
        return {
            increment: function (amount) {
                update({ temperature: PS({ value: S(x => x + amount) }) });
            },
            changeUnits: function () {
                update({
                    temperature: S(state => {
                        var value = state.value;
                        var newUnits = state.units === "C" ? "F" : "C";
                        var newValue = convert(value, newUnits);
                        state.value = newValue;
                        state.units = newUnits;
                        return state;
                    })
                });
            }
        };
    }
};

var app = {
    initialState: P({},
        conditions.initialState,
        temperature.initialState
    ),
    actions: function (update) {
        return P({},
            conditions.actions(update),
            temperature.actions(update)
        );
    }
};

var update = flyd.stream();
var states = flyd.scan(P, app.initialState, update);

var actions = app.actions(update);
// states.map(function (state) {
//     document.write("<pre>" + JSON.stringify(state, null, 2) + "</pre>");
// });

states.map((state) => {
    console.log(JSON.stringify(state));
    var elKpi = document.getElementById('kpi');
    elKpi.innerHTML = JSON.stringify(state, null, 2);
});