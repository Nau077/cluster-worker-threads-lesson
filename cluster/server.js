const cluster = require('cluster');
const calculatePrimes = require("../heavy.calc");
const numCPUs = require('os').cpus().length;
const express = require("express")
const app = express()
const constants = require("../constants")

const start = async function startServer() {
    // Cluster
    if (cluster.isMaster) {
        console.log(`Master ${process.pid} is running.`);

        // Run cluster.fork based on numCPUs
        for (let i = 1; i < numCPUs; i += 1) {
            cluster.fork();
        }

        cluster.on('exit', (worker, code, signal) => {
            console.log(`A worker with ID ${worker.process.pid} died.`);
        })
    } else {
		app.get("/", (req, res) => {
			const startTime = new Date()
			const result = calculatePrimes(constants.ITERATIONS, constants.MULTIPLIER)
			const endTime = new Date()

			res.status(200).send({
				message: result,
				time: endTime.getTime() - startTime.getTime() + "ms"
			  })
		})

        app.get("/testrequest", (req, res) => {
			res.send("I am unblocked now")
		  })

     
        app.listen(constants.PORT, constants.HOST, () => {
            console.log(`Node.js express server running on port: ${constants.PORT}, host ${constants.HOST}`);
        })
    }
}

start();