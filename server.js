const express = require('express')
const app = express()
const port = process.env.PORT || 3000

app.use(express.json());

app.get('/', (req, res) => res.send('Hello World!'))

app.post('/chat', (req, res) => {
	if (req.body.msg == "ville") {
		console.log("Nous sommes à Paris")
		res.send("Nous sommes à Paris")
	}
	else if (req.body.msg == "meteo") {
		console.log("Il fait beau")
		res.send("Il fait beau")
	}
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))