import express from "express";
import mongoose from "mongoose";
import Messages from './dbMessages.js';
import Pusher from "pusher";

// app cofig
const app = express();
const port = process.env.PORT || 9000

const pusher = new Pusher({
   appId: "1743307",
   key: "422488018a7574a0b5a3",
   secret: "b755e7cc16bbd6152cf6",
   cluster: "ap2",
   useTLS: true,
 });

// midleware
app.use(express.json())

// DB Confg
const connectionUrl = `mongodb+srv://creedracer111:ylP5rnbcCxjnfsDQ@cluster0.krzbde9.mongodb.net/whatsappdb?retryWrites=true&w=majority`;

await mongoose.connect(connectionUrl),{
   useCreateIndex: true,
   useNewUrlParser: true,
   useUnifiedTopology: true,
};

const db = mongoose.connection;

db.once("open", () => {
   console.log("DB Connected.");

   const msgCollection = db.collection("messagecontents");
   const changeStream = msgCollection.watch();

   changeStream.on("change", (change) => {
      console.log("Achange occured.", change);

      if (change.operationType === 'insert') {
         const messageDetails =change.fullDocument;
         pusher.trigger('messages', 'inserted', {
            name: messageDetails.user,
            message: messageDetails.message
         });
      } else {
         console.log("Error! triggering Pusher")
      }
   })
})

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