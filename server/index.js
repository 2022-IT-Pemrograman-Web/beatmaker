const express = require("express");
const cors = require("cors");
const { User, Instruments, Musics } = require("./config");
const app = express();
app.use(express.json());
app.use(cors());

// Instrument

app.post("/createInstrument", async (req, res) => {
  await Instruments.add({
    name: req.body.name,
    soundFile: req.body.soundFile,
    color: req.body.color,
  })

  res.send({ msg: "Music Created!" });
});

app.get("/getInstrument/:id", async (req, res) => {
  var docRef = Instruments.doc(req.params.id);

  await docRef.get().then((doc) => {
      if (doc.exists) {
        res.send(doc.data());
      } else {
        res.send(404);
      }
  }).catch((error) => {
      res.send(403);
  });
});

// Music

app.get("/getMusic", async (req, res) => {
  var list = [];
  const snapshot = await Musics.get();

  snapshot.forEach((doc) => {
    list.push({id: doc.id, ...doc.data()});
  })

  res.send(list);
});

app.post("/editMusic/:id", async (req, res) => {
  var docRef = Musics.doc(req.params.id);
  await docRef.set({
    name: req.body.name,
    instruments: req.body.instruments
  })

  res.send({ msg: "Music Edited!" });
});


app.post("/createMusic", async (req, res) => {
  await Musics.add({
    name: req.body.name,
    instruments: req.body.instruments
  })

  res.send({ msg: "Music Created!" });
});

app.post("/deleteMusic/:id", async (req, res) => {
  
  var docRef = Musics.doc(req.params.id);
  
  await docRef.delete().then(() => {
    res.send({ msg: "Deleted" });
  }).catch((error) => {
    console.log("hai, error di sini!");
    res.status(400).send(error);
  });
});

app.listen(process.env.PORT || 8081);
