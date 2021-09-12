const express = require("express");
const app = express();
const constants = require("../constants");
const calculatePrimes = require("../heavy.calc");

app.get("/", (_, res) => {
  const startTime = new Date();
  const result = calculatePrimes(constants.ITERATIONS, constants.MULTIPLIER);

  const endTime = new Date();
  res.status(200).send({
    ...result,
    time: endTime.getTime() - startTime.getTime() + "ms"
  });
});

app.get("/testrequest", (req, res) => {
  res.send("I am unblocked now");
});

app.listen(constants.PORT, constants.HOST, () =>
  console.log(
    "listening on port " + constants.PORT + " and host " + constants.HOST
  )
);
