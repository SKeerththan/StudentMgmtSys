var MongoClient = require("mongodb").MongoClient;
const bodyParser = require("body-parser");
const express = require("express");
const cors= require('cors');
const app = express();
app.use(cors());
app.use(bodyParser.json());


app.listen(9000, () => {
  console.log("Server started on port 9000...");
});

var url = "mongodb://127.0.0.1:27017/";

MongoClient.connect(url, function (err, db) {
  if (err) throw err;

  //Insert a Student
  app.post("/api/student", (req, res) => {
    var dbo = db.db("StudentHub");
    var myobj = {
      SID: req.body.SID,
      FirstName: req.body.FirstName,
      LastName: req.body.LastName,
      Email: req.body.Email,
      NearCity: req.body.NearCity,
      Course: req.body.Course,
      Guardian: req.body.Guardian,
      Subjects: req.body.Subjects,
    };
    dbo.collection("Students").insertOne(myobj, (err, result) => {
      if (err) throw err;

      res.send(apiResponse(myobj));

      console.log("Data inserted");
      console.log(result);
      // res.write("Data inserted \n" + result);
      //db.close();
    });
  });

  //Get all Student
  app.get("/api/student", (req, res) => {
    var dbo = db.db("StudentHub");
    dbo
      .collection("Students")
      .find({})
      .toArray(function (err, result) {
        if (err) throw err;
        console.log(result);

        res.send(apiResponse(result));

        // db.close();
      });
  });

  // Find Students Email by SID
  app.get("/api/email/sid/:sid", (req, res) => {
    var dbo = db.db("StudentHub");
    dbo
      .collection("Students")
      .find({ SID: req.params.sid }, { projection: { Email: 1 } })
      .toArray(function (err, result) {
        if (err) throw err;
        // console.log(result);
        res.send(apiResponse(result));
        // db.close();F
      });
  });

  // Find by SID
  app.get("/api/sid/:sid", (req, res) => {
    var dbo = db.db("StudentHub");
    dbo
      .collection("Students")
      .find({ SID: req.params.sid })
      .toArray(function (err, result) {
        if (err) throw err;
        // console.log(result);
        res.send(apiResponse(result));
        // db.close();F
      });
  });

  //Find by First Name
  app.get("/api/fname/:fname", (req, res) => {
    var dbo = db.db("StudentHub");
    dbo
      .collection("Students")
      .find({ FirstName: req.params.fname })
      .toArray(function (err, result) {
        if (err) throw err;
        // console.log(result);
        res.send(apiResponse(result));
        // db.close();
      });
  });

  //Find by Last Name
  app.get("/api/lname/:lname", (req, res) => {
    var dbo = db.db("StudentHub");
    dbo
      .collection("Students")
      .find({ LastName: req.params.lname })
      .toArray(function (err, result) {
        if (err) throw err;
        // console.log(result);
        res.send(apiResponse(result));
        // db.close();
      });
  });

  //Find by Near City
  app.get("/api/city/:city", (req, res) => {
    var dbo = db.db("StudentHub");
    dbo
      .collection("Students")
      .find({ NearCity: req.params.city })
      .toArray(function (err, result) {
        if (err) throw err;
        // console.log(result);
        res.send(apiResponse(result));
        // db.close();
      });
  });

  //Find by Guardian
  app.get("/api/guard/:guard", (req, res) => {
    var dbo = db.db("StudentHub");
    dbo
      .collection("Students")
      .find({ Guardian: req.params.guard })
      .toArray(function (err, result) {
        if (err) throw err;
        // console.log(result);
        res.send(apiResponse(result));
        // db.close();
      });
  });

  //Find by Course
  app.get("/api/course/:course", (req, res) => {
    var dbo = db.db("StudentHub");
    dbo
      .collection("Students")
      .find({ Course: req.params.course })
      .toArray(function (err, result) {
        if (err) throw err;
        // console.log(result);
        res.send(apiResponse(result));
        // db.close();
      });
  });

  //Delete Movie by SID
  app.delete("/api/delete/:sid", (req, res) => {
    var dbo = db.db("StudentHub");
    dbo
      .collection("Students")
      .deleteOne({ SID: req.params.sid }, function (err, obj) {
        if (err) throw err;
        res.send(apiResponse(obj));
      });
  });

  // //Update Movie by SID
  app.put("/api/update/sid/:sid", (req, res) => {
    var dbo = db.db("StudentHub");
    var myquery = { SID: req.params.sid };
    var newvalues = {
      $set: {
        SID: req.body.SID,
        FirstName: req.body.FirstName,
        LastName: req.body.LastName,
        Email: req.body.Email,
        NearCity: req.body.NearCity,
        Course: req.body.Course,
        Guardian: req.body.Guardian,
        Subjects: req.body.Subjects,
      },
    };
    dbo
      .collection("Students")
      .updateMany(myquery, newvalues, function (err, obj) {
        if (err) throw err;
        res.send(apiResponse(obj));
        // db.close();
      });
  });

  // //Update Movie by First Name
  app.put("/api/update/fname/:fname", (req, res) => {
    var dbo = db.db("StudentHub");
    var myquery = { FirstName: req.params.fname };
    var newvalues = {
      $set: {
        SID: req.body.SID,
        FirstName: req.body.FirstName,
        LastName: req.body.LastName,
        Email: req.body.Email,
        NearCity: req.body.NearCity,
        Course: req.body.Course,
        Guardian: req.body.Guardian,
        Subjects: req.body.Subjects,
      },
    };
    dbo
      .collection("Students")
      .updateMany(myquery, newvalues, function (err, obj) {
        if (err) throw err;
        res.send(apiResponse(obj));
        // db.close();
      });
  });

  function apiResponse(results) {
    return JSON.stringify({ status: 200, error: null, response: results });
  }
});
