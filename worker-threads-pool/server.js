const express = require("express");
const app = express();
const { StaticPool } = require("node-worker-threads-pool");
const numCPUs = require("os").cpus().length;
const constants = require("../constants");

const start = function startServer() {
  const filePath = "./worker.js";
  const pool = new StaticPool({
    size: numCPUs,
    task: filePath,
    workerData: {}
  });

  app.get("/", async (req, res) => {
    try {
      const startTime = new Date();
      const message = {
        multiplier: constants.MULTIPLIER,
        iterations: constants.ITERATIONS
      };

      const result = await pool.exec(message);
      const endTime = new Date();

      res.status(200).send({
        message: result,
        time: endTime.getTime() - startTime.getTime() + "ms"
      });
    } catch (e) {
      console.log(e);
      process.exit(0);
    }
  });

  app.get("/testrequest", (req, res) => {
    res.send("I am unblocked now");
  });

  app.listen(constants.PORT, constants.HOST, () =>
    console.log(
      `listening on port ${constants.PORT}, on host ${constants.HOST}`
    )
  );
};

start();
