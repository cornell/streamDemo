var Person = function (state) {

    this.Name = 'Mazurais';

    Person.prototype.increment = function (amount) {
        state.age += amount;
        return state;
    },
    Person.prototype.decrement = function (amount) {
        state.age -= amount;
        return state;
    },
    Person.prototype.toString = function(){
        return console.log(state.prenom + ': ' + state.age);
    }
};

var Person1 = function (state) {

    return {
        increment: function (amount) {
            state.age += amount;
            return state;
        },
        decrement: function (amount) {
            state.age -= amount;
            return state;
        },
        toString: function(){
            return console.log(state.prenom + ': ' + state.age);
        }
    }    
};

var person2 = {

    state: '',

    init: function(state){
        this.state = state;
    },

    increment: function (amount) {
        state.age += amount;
        return state;
    },
    decrement: function (amount) {
        state.age -= amount;
        return state;
    },
    toString: function(){
        return console.log(state.prenom + ': ' + state.age);
    }
};

var seb = {
    prenom: 'sébastien',
    age:43
}

var amandine = {
    prenom: 'amandine',
    age:'33'
}

var p1 = new Person(seb);
p1.increment(1);
p1.toString();
console.dir(p1);
console.log(p1 instanceof Person);

var p2 = new Person1(seb);
p2.increment(1);
p2.toString();
console.dir(p2);
console.log(p1 instanceof Person1);

var p3 = Object.create(person2);
p3.increment(1);
p3.toString();
console.dir(p3);
console.log(p3 instanceof person2);