///PYTHON_FROM_NODEJS//////////////////////////////////////////////////////////////
//                                                                               //
// This program is heavily inspired by Ref. [1] (see end of file for references  //
// and/or run the file "run.js" in the folder "Python_from_NodeJS")              //
//                                                                               //
///////////////////////////////////////////////////////////////////////////////////
var myArray = [1, 3, -2, 15, 7.1];                          // define some array and log it in console
console.log(myArray);

const {spawn} = require('child_process');                   // "import" child_process [2] and make "spawn" a function
const myCommand = 'python3';
const myArg1 = './Python_from_NodeJS/testscript.py';
const myArg2 = JSON.stringify(myArray);
function run() {                                            // this function runs spawns a child process in the terminal
    return new Promise((resolve, reject) => {               // the "run" function returns a promise and the promise itself is ...
                                                            // ... an "IIFE" [3] function that resolves or rejects the promise
        const process = spawn(myCommand, [myArg1, myArg2]); // spawn: arg 1 = command, arg 2 = list of arguments [4]
        var out;
        process.stdout.on('data', (data) => {               // retrieve and log the output of stdout [5]
            out = data.toString();
            console.log('\nstdout');
            console.log(out);
        });
        var err;
        process.stderr.on('data', (data) => {               // retrieve and log the output of stderr [5]
            err = data.toString();
            console.log('\nstderr');
            console.log(data.toString());
        });
        process.on('exit', (code, signal) => {              // get and log exit code and signal [6, 7, 8]
            console.log('exit');
            console.log(`${code} ${signal}`);
            if (code!=0) {
                reject(new Error(err));                     // reject the promise, throw an error [9], and ...
                return                                      // ... skip the rest of the "run" function if the exit code is nonzero
            }
            try {                                           // if the exit code is zero, try [9] to resolve the promise using the ...
                resolve(out);                               // ... output to stdout
            } catch(e) {                                    // but if that fails, catch the error ...
                reject(e);                                  // ... and reject the promise with the error
            }
        });
    });
}

(async () => {                                              // use an asynchronous "IIFE [3, 10] ...
    try {                                                   // ... that tries ...
        const output = await run();                         // ... to await the resolved promise given by the "run" function
        console.log('\nmain');
        console.log(output);
        var myNewArray = JSON.parse(output);
        for (var i=0; i<myNewArray.length; i++) {
            myNewArray[i] += 1;
        }
        console.log(myNewArray);
        process.exit(0);                                    // tell terminal "everything OK" [7, 8]
    } catch (e) {                                           // catch and log the error if the promise got rejected
        console.log('\nmain');
        console.error('Error during script execution\n', e.stack);
        process.exit(1);                                    // tell terminal "error" [7, 8] and ...
    }                                                       // ... run "echo $?" in terminal right after running the node script
})();
///REFERENCES//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                       //
// [1]  https://codewithhugo.com/integrate-python-ruby-php-shell-with-node-js                                            //
// [2]  https://nodejs.org/api/child_process.html                                                                        //
// [3]  http://benalman.com/news/2010/11/immediately-invoked-function-expression                                         //
// [4]  https://nodejs.org/api/child_process.html#child_process_child_process_spawn_command_args_options                 //
// [5]  https://nodejs.org/api/child_process.html#child_process_child_process                                            //
// [6]  https://nodejs.org/api/child_process.html#child_process_event_exit                                               //
// [7]  https://www.cyberciti.biz/faq/bash-get-exit-code-of-command                                                      //
// [8]  https://tldp.org/LDP/abs/html/exitcodes.html                                                                     //
// [9]  https://stackoverflow.com/questions/24977516/catching-errors-in-javascript-promises-with-a-first-level-try-catch //
// [10] https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Async_await                               //
//                                                                                                                       //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////