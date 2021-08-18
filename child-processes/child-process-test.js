const calculatePrimes = require("../heavy.calc");
 
process.on("message", ({multiplier, iterations}) => {
		console.log('Message to child: ')

		const result = calculatePrimes(iterations, multiplier )
		process.send(result)
		process.exit() 
	})
