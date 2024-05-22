import express from 'express';
import cors from 'cors';
import { MongoClient } from 'mongodb';
import 'dotenv/config'
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 

const mongoUri = process.env.MONGODB_URI;

const client = new MongoClient(mongoUri);

async function connectToDatabase() {
  try {
    await client.connect();
    console.log('Connected to MongoDB Atlas');
  } catch (error) {
    console.error('Error connecting to MongoDB Atlas:', error);
    process.exit(1);
  }
}

connectToDatabase();

app.get('/', (req, res) => {
  res.send('Welcome to my Express server with MongoDB Atlas using MongoClient!');
});

app.get('/items', async (req, res) => {
  try {
    const database = client.db('PracticeReact');
    const collection = database.collection('LoginUsers');
    const items = await collection.find({}).toArray();
    res.json(items);
  } catch (error) {
    res.status(500).send('Error fetching data from the database');
  }
});

app.get('/adminItem', async (req, res) => {
  try {
    const database = client.db('PracticeReact');
    const collection = database.collection('AdminUser');
    const items = await collection.find({}).toArray();
    res.json(items);
  } catch (error) {
    res.status(500).send('Error fetching data from the database');
  }
});

app.post('/postItems', async (req, res) => {
  try {
    const newItem = req.body;
    console.log(newItem);
    const database = client.db('PracticeReact');
    const collection = database.collection('LoginUsers');
    const result = await collection.insertOne(newItem);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).send('Error inserting data into the database');
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
