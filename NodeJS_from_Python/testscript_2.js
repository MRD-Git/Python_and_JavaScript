'use strict';
function sayHello(name) {
    console.log("Hello " + name);
}
sayHello(process.argv[2]);
// ES6 funktioniert auch
var argument1 = [process.argv[2]];
argument1.map(({length}) => console.log(length));