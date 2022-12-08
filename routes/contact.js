var express = require('express');
var router = express.Router();
var Contact = require("../models/contact")
/* GET home page. */
router.post('/add', function (req, res, next) {
  console.log("list contact");
  console.log(req.body);
  new Contact({
    FullName: req.body.FullName,
    Phone: req.body.Phone
  }).save(
    (err, newContact) => {
      if (err)
        console.log("Error message : " + err);
      else {
        console.log(newContact);
        res.send(" New contact added " + newContact._id)
      }
    }
  )
});

/* router.get("/", (req, res) => {
  Contact.find((err, data) => {
    if (err)
      console.log("Error message : " + err);
    else {
      res.json(data)
    }
  })
}) */

router.get("/", (req, res) => {
  Contact.find((err, data) => {
    if (err)
      console.log("Error message : " + err);
    else {
      res.render('list', { title: "Liste des contacts", list: data })
    }
  })
})


router.get('/addform', function (req, res, next) {
  res.render('add', { title: 'Add a contact' });
});

router.get('/editform/:id', function (req, res, next) {
  Contact.findById(req.params.id, (err, contact) => {
    res.render('edit', { title: 'Edit a contact', cont: contact });
  })


});

router.post("/edit/:id", (req, res) => {
  Contact.exists({ _id: req.params.id },
    (err, result) => {
      if (result) {
        Contact.updateOne({ _id: req.params.id }, { $set: req.body }, (err, data) => {
          console.log(data);
          res.json(data)
        })
      } else {
        res.json(result)
      }
    }
  )
})


router.get("/delete/:id", (req, res) => {
  Contact.findByIdAndDelete(req.params.id, (err, result) => {
    if (err) {
      console.log("Error message : " + err);
      res.status(404).send("error " + err).end();
    } else {
      console.log(result);
      res.status(200).send("deleted").end();
    }
  })
})

module.exports = router;
