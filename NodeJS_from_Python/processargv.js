// https://stackabuse.com/command-line-arguments-in-node-js
// pass arguments as follows
// $ node processargv.js tom jack 43
'use strict';
for (let j = 0; j < process.argv.length; j++) {
    console.log(j + ' -> ' + (process.argv[j]));
}