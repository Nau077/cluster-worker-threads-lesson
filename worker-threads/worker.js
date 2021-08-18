const { parentPort } = require("worker_threads");
const calculatePrimes = require("../heavy.calc");

parentPort.on("message", ({iterations, multiplier}) => {
    const result = calculatePrimes(iterations, multiplier);
    parentPort.postMessage(result);
})