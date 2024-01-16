// app.js
import express from 'express';
import ejs from 'ejs';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

import dotenv from 'dotenv'; 
dotenv.config({ path: 'process.env' });

import User from './Models/MainModel.js'; // Import the MainModel
import mainRoutes from './routes/mainRoutes.js'; 

const app = express();
const port = process.env.PORT || 8000; 

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.locals.school = "Westridge";

mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });

app.use(express.json());

app.use('/', mainRoutes);
console.log(process.env.PORT);
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
