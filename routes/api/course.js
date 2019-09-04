// let path=require('path');
let coursemodel = require("../../models/Course");
let usermodel = require("../../models/User");
let catmodel = require("../../models/Category");
let express = require("express");
let router = express.Router();

router.post("/course/add", (req, res) => {
  //req.body
  if (!req.body) {
    return res.status(400).json("request body is missing");
  }
  console.log(req.body);
  // let model=new coursemodel(req.body)
  // function(err, model){
  //     if(!err, model){
  catmodel.find({ categoryName: req.body.category }, function(error, cat) {
    if (!error && cat) {
      console.log("Cat printed" + cat);
      req.body.category = cat[0]._id;
    }
    console.log("Instructor Id" + req.body.instructor);
    const model = new coursemodel(req.body);
    model
      .save()
      .then(doc => {
        if (!doc || doc.length === 0) {
          return res.status(500).send(doc);
        }
        res.status(200).json(doc);
        console.log("Doc Printed" + doc);
        console.log("Model Printed" + model);
      })
      .catch(err => {
        res.status(500).json(err);
      });
  });
});

router.get("/courses", (req, res, next) => {
  //var decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY)

  coursemodel
    .find()
    .populate({ path: "category", model: "category" })
    .populate({ path: "instructor", model: "users" })

    .exec(function(err, results) {
      if (err) {
        return next(err);
      }
      if (results) {
        return res.json(results);
      }
    });
});

router.get("/course", (req, res) => {
  //var decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY)

  coursemodel
    .findOne({
      _id: req.query.id
    })

    .then(doc => {
      res.json(doc);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

//get courses by instructor id
router.get("/coursebyinstructor", (req, res) => {
  //var decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY)

  coursemodel
    .find({
      instructor: req.query.id
    })

    .then(doc => {
      res.json(doc);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.put("/course/", (req, res) => {
  //var decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY)

  coursemodel
    .findOneAndUpdate(
      {
        _id: req.query.id
      },
      req.body,
      {
        new: true
      }
    )
    .then(doc => {
      res.json(doc);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.delete("/course", (req, res) => {
  //var decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY)

  coursemodel
    .findOneAndRemove({
      _id: req.query.id
    })
    .then(doc => {
      res.json(doc);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

module.exports = router;
