const express = require("express")
const app = express()
const { fork } = require("child_process")
const MESSAGE_NUMBER = 3000000

app.get("/", (req, res, next) => {
  const childProcess = fork("child-process-test.js")  
  childProcess.send(MESSAGE_NUMBER)
  const startTime = new Date()

  childProcess.on("message", message => {
    const endTime = new Date()
    res.status(200).send({
	  ...message,
      time: endTime.getTime() - startTime.getTime() + "ms",
    });
  })
})

app.get("/testrequest", (req, res) => {
  res.send("I am unblocked now")
})

app.listen(3636, () => console.log("listening on port 3636"))

 