'use strict';
var myArray_parsed = JSON.parse(process.argv[2]);
var mySquaredArray = myArray_parsed;
for (var i=0; i<mySquaredArray.length; i++) {
    mySquaredArray[i] = myArray_parsed[i]**2;
}
var mySquaredArray_json = JSON.stringify(mySquaredArray);
console.log(mySquaredArray_json);