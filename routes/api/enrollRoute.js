let enrollmodel = require("../../models/Enrollment");
let coursemodel = require("../../models/Course");
let usermodel = require("../../models/User");
let express = require("express");
let router = express.Router();

router.get("/enrollments", (req, res, next) => {
  enrollmodel
    .find()
    .populate({ path: "student", model: "users" })
    .populate({ path: "course", model: "courses", select: "courseName" })

    .exec(function(err, results) {
      if (err) {
        return next(err);
      }
      if (results) {
        return res.json(results);
      }
    });
});

router.get("/enrollmentbystudent", (req, res) => {
  enrollmodel
    .find({
      student: req.query.id
    })
    .populate({ path: "course", model: "courses" })
    .then(doc => {
      res.json(doc);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.get("/checkenrollment", (req, res) => {
  enrollmodel
    .findOne({
      student: req.query.id,
      course: req.query.courseid
    })
    .populate({ path: "course", model: "courses", select: "courseName" })
    .then(doc => {
      res.json(doc);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.post("/enroll/add", (req, res) => {
  if (!req.body) {
    return res.status(400).send("request body is missing");
  }
  usermodel.find({ email: req.body.student }, function(error, cat) {
    if (!error && cat) {
      console.log(cat);
      req.body.student = cat[0]._id;
    }
    coursemodel.find({ courseName: req.body.course }, function(error, cat) {
      if (!error && cat) {
        console.log(cat);
        req.body.course = cat[0]._id;
      }

      let model = new enrollmodel(req.body);
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
  });
});

router.post("/enrollbystudent/add", (req, res) => {
  //req.body
  if (!req.body) {
    return res.status(400).send("request body is missing");
  }

  let model = new enrollmodel(req.body);
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

router.delete("/enrollment", (req, res) => {
  //var decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY)

  enrollmodel
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
