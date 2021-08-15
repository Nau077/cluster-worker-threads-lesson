const calculatePrimes = require("../heavy.calc");
 
process.on("message", message => {
		console.log('Message to child: ')
		const result = calculatePrimes(500, message )
		process.send(result)
		process.exit() 
	})
