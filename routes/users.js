var express = require('express');
var router = express.Router();
var path = require('path');
/* GET users listing. */
router.get('/', function(req, res, next) {

	res.sendFile(path.join(__dirname,'../public/html/','ssr解析.html'))

});

router.get('/register',function(req,res,next){
 res.sendFile(path.join(__dirname,'../public/html/','register.html'))
})
var MongoClient = require('mongodb').MongoClient
var url = "mongodb://localhost:27017"



module.exports = router;