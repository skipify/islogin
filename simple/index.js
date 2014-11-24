var express = require('express');
var islogin = require('islogin');
var router = express.Router();


/* GET home page. */
.get('/test/a',islogin(),function(req,res){
	res.end('common');
})
.get('/test/home',islogin({tip:{islogin:false,msg:'Access Denied'}}),function(req,res){
	res.end('JSON');
})
.get('/test/home2',islogin(true),function(req,res){
	res.end('JSON2');
})
.get('/test/home3',islogin({tip:true}),function(req,res){
	res.end('JSON3');
})
 .get('/test/index',islogin('/login'),function(req,res){
	res.end('URL redirect');
})
.get('/test/diy',islogin(function(req,res){return req.uname == 'jobs'}),function(req,res){
	res.end('diy verify');
})