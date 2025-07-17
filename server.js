const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

const { MongoClient, ServerApiVersion } = require('mongodb');

const credentials = '/Users/andrewseifert/.ssh/lifecycles-x509.pem'

const client = new MongoClient('mongodb+srv://digidesign-lifecycles.vovfdli.mongodb.net/?authSource=%24external&authMechanism=MONGODB-X509&retryWrites=true&w=majority&appName=digidesign-lifecycles', {
    tlsCertificateKeyFile: credentials,
    serverApi: ServerApiVersion.v1
});

// Serve static files (your Mithril frontend)
app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/data', async (req, res) => {
    try {
        await client.connect();
        const db = client.db("lifecycles");
        const collection = db.collection("red-hat-products");
        const data = await collection.find({}).limit(10).toArray();
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});
