import express from "express";
import mongoose from "mongoose";
import Messages from './dbMessages.js';

// app cofig
const app = express();
const port = process.env.PORT || 9000

// midleware


// DB Confg
const connectionUrl = `mongodb+srv://creedracer111:ylP5rnbcCxjnfsDQ@cluster0.krzbde9.mongodb.net/whatsappdb?retryWrites=true&w=majority`;

mongoose.connect(connectionUrl),{
   useCreateIndex: true,
   useNewUrlParser: true,
   useUnifiedTopology: true,
};


// ???


// api routes
app.get('/',(req, res) => {
   res.status(200).send("Server Working Well")
})

app.post('/messages/new',(req,res) => {
   const dbMessage = req.body
   
   Messages.create((dbMessage) => {
      res.status(201).send(data)
 }).catch((err) => {
   res.status(500).send(err)
 })
})


// listen
app.listen(port, () => console.log(`Server working on port ${port}.`));