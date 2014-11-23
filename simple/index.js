var express = require('express');
var islogin = require('islogin');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res) {
	console.log('hello');
 	res.end('/');
})
.get('/test/a',islogin,function(req,res){
	res.end(req.url);
})