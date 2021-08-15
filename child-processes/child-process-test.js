const calculatePrimes = require("../heavy.calc");
 
process.on("message", message => {
		console.log('Message to child: ')
		const result = calculatePrimes(50, message )
		process.send(result)
		process.exit() 
	})
