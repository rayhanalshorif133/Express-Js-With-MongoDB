
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://rayhan133:rayhan133@cluster0.jymenap.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});



async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        // Send a ping to confirm a successful connection
        const db = client.db("user_info");
        const coll = db.collection("users");
        const cursor = coll.find();
        // iterate code goes here
        await cursor.forEach(console.log);
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}
run().catch(console.dir);



module.exports = { client };
