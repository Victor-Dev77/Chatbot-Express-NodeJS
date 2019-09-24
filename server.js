const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const express = require('express')
const app = express()
const port = process.env.PORT || 3000

app.use(express.json());

(async function() {
  // Connection URL
  const url = 'mongodb://localhost:27017/chat-bot';
  // Database Name
  const dbName = 'chat-bot';
  const client = new MongoClient(url, { useNewUrlParser: true });

  try {
    // Use connect method to connect to the Server
   // await client.connect();
   // console.log("Connected correctly to server");

    //const db = client.db(dbName);

    // Get the collection
   // const col = db.collection('messages');
    
    /*let r = await col.insertOne({ date: new Date() });
    assert.equal(1, r.insertedCount);

    const docs = await col.find({}).toArray();
    console.log(docs);
	*/
	app.get('/messages/all', async function (req, res) { 
		try {
			await client.connect();
			const db = client.db(dbName);
			const col = db.collection('messages');
			let docs = await col.find({}).toArray();
			console.log(docs);
			if (docs.length == 0) {
				let items = 
				[
  					{
    					from: 'user',
    					msg: 'demain',
  					},
  					{
    					from: 'bot',
    					msg: 'Demain: Mercredi',
  					}
				];
				let r = await col.insertMany(items);
				assert.equal(2, r.insertedCount);
				res.send(items);
			}
			else {
				res.send(docs);
			}
			client.close();
		} catch (err) {
			res.send(err.message);
		}
		
	});

  } catch (err) {
    console.log(err.stack);
  }

 // client.close();
})();


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

app.get('/hello', (req, res) => {
	let name = req.query.country;
	console.log(name)
	if (name != undefined && name != "") {
		res.send("Bonjour, " + name)
	} else {
		res.send("Quel est votre nom ?")
	}
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))