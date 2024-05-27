import express from 'express';
import cors from 'cors';
import { MongoClient } from 'mongodb';
import 'dotenv/config';
import { ObjectId } from 'mongodb';
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

app.get('/getattendence', async (req, res) => {
  try {
    const database = client.db('PracticeReact');
    const collection = database.collection('StudentAttendence');
    const items = await collection.find({}).toArray();
    res.json(items);
  } catch (error) {
    res.status(500).send('Error fetching data from the database');
  }
});

app.get('/getleaveform', async (req, res) => {
  try {
    const database = client.db('PracticeReact');
    const collection = database.collection('LeaveRequestDetails');
    const items = await collection.find({}).toArray();
    res.json(items);
  } catch (error) {
    res.status(500).send('Error fetching data from the database');
  }
});

// Post

app.post('/postItems', async (req, res) => {
  try {
    const newItem = req.body;
    console.log(newItem);
    const database = client.db('PracticeReact');
    const collection = database.collection('LoginUsers');
    const result = await collection.insertOne(newItem);
    // console.log(res.status(201).json(result));
    res.send("Registered Successfully!")
  } catch (error) {
    res.status(500).send('Error inserting data into the database');
  }
});


// Post Attendence
app.post('/postattendence', async (req, res) => {
  try {
    const attendanceData = req.body;
    const db = client.db('PracticeReact');
    const result = await db.collection('StudentAttendence').insertMany(attendanceData);
    console.log(`${result.insertedCount} documents inserted`);
    res.status(201).send('Attendance data saved successfully');
  } catch (error) {
    console.error('Error saving attendance data:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Post leave Form
app.post('/postleaveform', async (req, res)=>{
  try{
    const leaveFormData = req.body;
    const database = client.db('PracticeReact');
    const result = await database.collection('LeaveRequestDetails').insertOne(leaveFormData);
    res.status(201).send('Posted Leave Form Successfully!');
  }
  catch(error){
    console.error('Error saving attendance data:', error);
    res.send('Internal Server Error');
  }
})

// Update

app.patch('/updateData/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const db = client.db('PracticeReact');
    const result = await db.collection('LoginUsers').updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData }
    );

    if (result.matchedCount === 0) {
      return res.status(404).send('Data not found');
    }

    res.status(200).send('Data updated successfully');
  } catch (error) {
    res.status(500).send('Error updating data in the database');
  }
});

// app.delete('/deleteData',(request,response)=>{
//   const database = client.db('PracticeReact');
//   database.collection("LoginUsers").deleteOne({
//       id:request.query.id
//   });
//   response.send("Deleted Successfully!")
// });

// Delete
app.delete('/deleteData/:id', async (req, res) => {
  try {
    const { id } = req.params;
    // console.log(req.params);
    const db = client.db('PracticeReact');
    const result = await db.collection('LoginUsers').deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 0) {
      return res.status(404).send('Data not found');
    }
    res.status(200).send('Data deleted successfully');
  } catch (error) {
    res.status(500).send('Error deleting data from the database');
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
