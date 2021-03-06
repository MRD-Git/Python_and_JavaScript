///////////////////////////////////////////////////////////////////////////
//                                                                       //
// https://codewithhugo.com/integrate-python-ruby-php-shell-with-node-js //
//                                                                       //
///////////////////////////////////////////////////////////////////////////
const {spawn} = require('child_process');
const logOutput = (name) => (message) => console.log(`[${name}] ${message}`);
function run() {
    return new Promise((resolve, reject) => {
        const process = spawn('python', ['./script.py', 'my', 'args']);
        const out = [];
        process.stdout.on(
            'data',
            (data) => {
                out.push(data.toString());
                logOutput('stdout')(data);
            });
        const err = [];
        process.stderr.on(
            'data',
            (data) => {
                err.push(data.toString());
                logOutput('stderr')(data);
            });
        process.on('exit', (code, signal) => {
            logOutput('exit')(`${code} (${signal})`);
            if (code !== 0) {
                reject(new Error(err.join('\n')));
                return
            }
            try {
                resolve(JSON.parse(out[0]));
            } catch(e) {
                reject(e);
            }
        });
    });
}
(async () => {
    try {
        const output = await run();
        logOutput('main')(output.message);
        process.exit(0);
    } catch (e) {
        console.error('Error during script execution ', e.stack);
        process.exit(1);
    }
})();