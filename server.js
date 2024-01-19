import express from "express";
import mongoose from "mongoose";
import Messages from './dbMessages.js';

// app cofig
const app = express();
const port = process.env.PORT || 9000

// midleware
app.use(express.json())

// DB Confg
const connectionUrl = `mongodb+srv://creedracer111:ylP5rnbcCxjnfsDQ@cluster0.krzbde9.mongodb.net/whatsappdb?retryWrites=true&w=majority`;

await mongoose.connect(connectionUrl),{
   useCreateIndex: true,
   useNewUrlParser: true,
   useUnifiedTopology: true,
};


// ???


// api routes
app.get('/',(req, res) => {
   res.status(200).send("Server Working Well")
})

app.get('/messages/sync', (req, res) => {
   Messages.find((err, data) => {
      if (err) {
         res.status(500).send(err);
      } else {
         res.status(200).send(data);
      }
   });
})

 app.post('/messages/new', (req, res) => {
   const dbMessage = req.body;

   Messages.create(dbMessage, (err, data) => {
      if (err) {
         res.status(500).send(err);
      } else {
         res.status(200).send(data);
      }
   });
})


// listen
app.listen(port, () => console.log(`Server working on port ${port}.`));