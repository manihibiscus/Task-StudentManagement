import express from 'express';
import cors from 'cors';
import { MongoClient } from 'mongodb';
import 'dotenv/config';
import { ObjectId } from 'mongodb';
import twilio from 'twilio';
import bodyParser from 'body-parser';
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

//SMS - Send

app.use(bodyParser.json());

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const fromNumber = process.env.TWILIO_PHONE_NUMBER;
const cli = twilio(accountSid, authToken);

app.post('/send-sms', (req, res) => {
    const { to, message } = req.body;
    cli.messages.create({
        body: message,
        from: fromNumber,
        to: to
    })
    .then(message => res.status(200).send({ success: true, messageSid: message.sid }))
    .catch(err => {
        console.error('Error sending SMS:', err); // Log the error details
        res.status(500).send({ success: false, error: err.message });
    });
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

//Get Student Registration

app.get('/getstudentregistration', async (req, res) => {
  try {
    const database = client.db('PracticeReact');
    const collection = database.collection('StudentRegistration');
    const items = await collection.find({}).toArray();
    res.json(items);
  } catch (error) {
    res.status(500).send('Error fetching data from the database');
  }
});

app.get('/getMarkDetails', async (req, res) => {
  try {
    const database = client.db('PracticeReact');
    const collection = database.collection('MarkDetails');
    const items = await collection.find({}).toArray();
    res.json(items);
  } catch (error) {
    res.status(500).send('Error fetching data from the database');
  }
});
// Post----------------

app.post('/postItems', async (req, res) => {
  try {
    const newItem = req.body;
    console.log(newItem);
    const database = client.db('PracticeReact');
    const collection = database.collection('LoginUsers');
    const result = await collection.insertOne(newItem);
    // console.log(res.status(201).json(result));
    res.send("Login Added Successfully!")
  } catch (error) {
    res.status(500).send('Error inserting data into the database');
  }
});


// Post Mark
app.post('/postmark', async (req, res) => {
  try {
    const newItem = req.body;
    console.log(newItem);
    const database = client.db('PracticeReact');
    const collection = database.collection('MarkDetails');
    const result = await collection.insertOne(newItem);
    // console.log(res.status(201).json(result));
    res.send("Mark Posted Successfully!")
  } catch (error) {
    res.status(500).send('Error inserting data into the database');
  }
});

// Post Student Registration
app.post('/poststudentregistration', async (req, res) => {
  try {
    const studenRegDet = req.body;
    console.log(studenRegDet);
    const database = client.db('PracticeReact');
    const collection = database.collection('StudentRegistration');
    const result = await collection.insertOne(studenRegDet);
    // console.log(res.status(201).json(result));
    res.send("Student Registered Successfully!")
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
    const result = await db.collection('StudentRegistration').updateOne(
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

app.patch('/updateleavedetails/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updateStatus = req.body;

    const db = client.db('PracticeReact');
    const result = await db.collection('LeaveRequestDetails').updateOne(
      { _id: new ObjectId(id) },
      { $set: updateStatus }
    );

    if (result.matchedCount === 0) {
      return res.status(404).send('Data not found');
    }

    res.status(200).send('Leave Status Updated successfully');
  } catch (error) {
    res.status(500).send('Error updating data in the database');
  }
});

// Update Attendence
app.patch('/updateattendence/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updateAttendence = req.body;

    const db = client.db('PracticeReact');
    const result = await db.collection('StudentAttendence').updateOne(
      { _id: new ObjectId(id) },
      { $set: updateAttendence }
    );

    if (result.matchedCount === 0) {
      return res.status(404).send('Data not found');
    }

    res.status(200).send('Attendence Updated successfully');
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
    const result = await db.collection('StudentRegistration').deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 0) {
      return res.status(404).send('Data not found');
    }
    res.status(200).send('Data deleted successfully');
  } catch (error) {
    res.status(500).send('Error deleting data from the database');
  }
});


// var nodemailer = require('nodemailer');
import nodemailer from 'nodemailer';
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'manikandansidhuraj2001@gmail.com',
    pass: 'nsbe fopo aavo ohee'
  }
});

app.post('/sendmail', async (req, res)=>{

  const { reqStuName, reqStuEmail, reqStuSubject, reqStuContent, mailTO } = req.body;
  var mailOptions = {
    from: reqStuEmail,
    to: mailTO,
    subject: `${reqStuSubject} - ${reqStuName}`,
    text: reqStuContent
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
      res.send("Sent Successfully");
    }
  });
})


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

