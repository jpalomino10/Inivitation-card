const functions = require("firebase-functions");
const admin = require("firebase-admin");
const express = require("express");
const cors = require("cors");
var serviceAccount = require("./credentials.json");
const app = express();

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://tcdoc-30c70.firebaseio.com",
});

const db = admin.firestore();

// Automatically allow cross-origin requests
app.use(cors({ origin: true }));

app.get("/api/contacts/:contact_id", (req, res) => {
  (async () => {
    try {
      const doc = db.collection("contacts").doc(req.params.contact_id);
      const item = await doc.get();
      const response = item.data();
      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).send(error);
    }
  })();
});

app.put("/api/contacts/answer/:contact_id", (req, res) => {
  (async () => {
    try {
      const doc = db.collection("contacts").doc(req.params.contact_id);
      await doc.update({
        asistence: req.body.asistence,
        description: req.body.description,
      });

      return res.status(200).json();
    } catch (error) {
      return res.status(500).send(error);
    }
  })();
});

exports.app = functions.https.onRequest(app);
