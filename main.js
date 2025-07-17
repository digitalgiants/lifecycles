
const { MongoClient, ServerApiVersion } = require('mongodb');

const credentials = '/Users/andrewseifert/.ssh/lifecycles-x509.pem'

const client = new MongoClient('mongodb+srv://digidesign-lifecycles.vovfdli.mongodb.net/?authSource=%24external&authMechanism=MONGODB-X509&retryWrites=true&w=majority&appName=digidesign-lifecycles', {
    tlsCertificateKeyFile: credentials,
    serverApi: ServerApiVersion.v1
});

async function run() {
    try {
        await client.connect();
        console.log('Connected to MongoDB');
        const database = client.db("digidesign-lifecycles");
        const collection = database.collection("lifecycles");
        const docCount = await collection.countDocuments({});
        console.log(docCount);
        // perform actions using client
    } catch (err) {
        console.log("Error connecting to MongoDB");
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}

run().catch(console.dir);
