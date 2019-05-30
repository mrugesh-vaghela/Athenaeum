const async = require('async');

/**
 * This function will wait for the seconds passed
 * @param {*} seconds 
 */
let waitForSeconds = (seconds) => {
    return new Promise((resolve, reject) => {
        try {
            setTimeout(() => {
                console.log('Waited for ', seconds, 'seconds');
                return resolve(seconds);
            }, seconds * 1000)
        } catch (error) {
            return reject(error);
        }

    });
}

/**
 * Mixture of async await and typical style of calling then and using callabck
 */
async.waterfall([
    (cb) => {
        // typical style without async await
        waitForSeconds(2).then((value) => {
            return cb(null, value);
        });
    },
    async (first) => {
        // using asyn await
        let value = await waitForSeconds(3);
        return [first, value]
    }
], (error, results) => {
    if (error) {
        console.trace('Catched error=>', error);
        process.exit(1);
    } else {
        console.log('Results', results);
    }
})