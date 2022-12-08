var express = require('express');
var router = express.Router();
var os = require("os")
var prod = require("../products.json")

/* GET users listing. */
router.get('/', function(req, res, next) {
  console.log(prod.MACBOOKAIR);
  res.write('respond with a resource '+os.type()+" "+prod.MACBOOKAIR.name);
  next()
},function(req, res, next) {

  //traitement
  res.write('\n respond with a resource 2');
  res.end()
  
});

router.get('/add/:id', function(req, res, next) {
  res.write(' add 1 '+req.params.id);
  if(req.params.id == 0){
    next()
  }else{
    next("route")
  }
  
},function(req, res, next) {

  //traitement
  res.write('\n add 2');
  res.end()
  
});

router.get('/add/:id', function(req, res, next) {
  res.write('\n add 66');
  res.end()
});

module.exports = router;
