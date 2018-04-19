var express = require('express');
var router = express.Router();
var path = require('path');
/* GET users listing. */
router.get('/', function(req, res, next) {
	res.sendFile(path.join(__dirname,'../public/html/','client.html'))

});
router.post('/checkUser', function(req, res, next) {
  console.log("post数据")
   console.log(req.body)
   MongoClient.connect(url, function(err, db) {
	if (err) throw err
	console.log("数据库已创建");
	var ssrDb = db.db("test")
	ssrDb.collection("user").find(req.body).toArray(function(eer, result) {
      if (err) throw err
    if (result.length==0) { res.send("{success:true}")}
	else{ res.send("{success:false}")  }
		   db.close()
	});
		});
});
router.post('/', function(req, res, next) {
	console.log(req.body)
	MongoClient.connect(url, function(err, db) {
	if (err) throw err
	console.log("数据库已创建");
	var ssrDb = db.db("test")
	ssrDb.collection("user").find(req.body).toArray(function(eer, result) {
		if (err) throw err
		console.log(result);
	    if (result.length==0) {
		ssrDb.collection("user").insertOne(req.body,function(err,result){
			if (err) throw err
		   console.log("插入成功")
		   res.send("注册成功!")	
		   db.close()	
		});
	}else{
        res.send("该用户名已注册!")	
		db.close()
	}
		
	});


});
});

var MongoClient = require('mongodb').MongoClient
var url = "mongodb://localhost:27017"

module.exports = router;