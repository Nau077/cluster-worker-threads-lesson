const { parentPort } = require("worker_threads");
const calculatePrimes = require("../heavy.calc");

parentPort.on("message", ({ multiplier, iterations }) => {
  const result = calculatePrimes(iterations, multiplier);

  parentPort.postMessage(result);
  process.exit();
});
