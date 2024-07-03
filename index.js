const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const cors = require('cors');

const authRouter = require('./routes/auth'); 
const postRouter = require('./routes/post');

const connectDB = async () => {
    try {
        await mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.yiqvhhs.mongodb.net/mydatabase?retryWrites=true&w=majority&appName=Cluster0`);
        console.log('MongoDB connected');
    } catch (error) {
        console.error(error.message);
        process.exit(1);
    }
};

connectDB();

const app = express();

app.use(express.json()); // Added this line to parse JSON request bodies
app.use(cors())
app.use('/api/auth', authRouter); 

app.use('/api/posts', postRouter); 

const PORT = process.env.PORT || 5000; // Using port from environment variables

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
