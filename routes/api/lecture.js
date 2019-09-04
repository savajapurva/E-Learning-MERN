const express = require("express");
const router = express.Router();
const coursemodel = require("../../models/Course.js");
// const fileUpload = require('express-fileupload');
//mongoose
const mongoose = require("mongoose");
var multer = require("multer");
let lecturemodel = require("../../models/Lecture.js");

/*Get videos*/
router.get("/lectures", function(req, res) {
  lecturemodel
    .find({
      course: req.query.id
    })
    .populate({ path: "course", model: "courses", select: "courseDescription" })
    .then(doc => {
      // res.setHeader('Access-Control-Expose-Headers', 'Content-Range');
      //res.setHeader('Content-Range', 'users 0-5/5');
      res.json(doc);
      // console.log("populated doc:" + doc);
    })
    .catch(err => {
      res.status(500).json(err);
    });
  // res.send('this is get route upload');
  // res.render('index', {title: 'Upload file'});
});

/* POST videos*/
router.post("/lectures/localupload", function(req, res) {
  // res.send('this is post route upload');
  //  console.log(req.files.file);

  coursemodel.find({ courseName: req.body.course }, function(error, cat) {
    if (!error && cat) {
      //console.log(cat)
      req.body.course = cat[0]._id;
    }
    console.log(req.files);
    if (req.files != undefined) {
      let imagefile = req.files.file;
      imagefile.mv(`Client/public/assets/${req.files.file.name}`);
      if (imagefile) {
        req.body.videoLink = "/assets/" + imagefile.name;
      }
    } else {
      console.log(req.body.videoLink);
      //req.body.videoLink=req.body.youtubelink;
    }
    const upload = new lecturemodel(req.body).save();
    res.send("this is post route upload");
    // res.redirect('back');
  });
});

router.post("/lectures/youtubeupload", (req, res) => {
  //req.body
  if (!req.body) {
    return res.status(400).send("request body is missing");
  }

  let model = new lecturemodel(req.body);
  model
    .save()
    .then(doc => {
      if (!doc || doc.length === 0) {
        return res.status(500).send(doc);
      }
      res.status(200).send(doc);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

module.exports = router;
