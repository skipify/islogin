islogin
=======

This is an Express middleware, is mainly used to check whether the user login

# Usage

## app.js,Use before the start of the route, here is the batch set all need to check the URL list, support for regular expressions


	app.use(islogin({pattern:[/\/test\/*?/,'/home/index','/user/add'],redirect:'/'}));

	app.use(islogin({pattern:[/\/test\/*?/,'/home/index','/user/add'],tip:true}));

## In the routing file to use

	eg. routes/index.js

	var express = require('express');
	var islogin = require('islogin');
	var router = express.Router();


	/* GET home page. */
	router.get('/', function(req, res) {
		console.log('hello');
	 	res.end('/');
	})
	.get('/test/a',islogin,function(req,res){ //check login
		res.end(req.url);
	})
	.get('/test/home',islogin({tip:true}),function(req,res){
		res.end('JSON')
	})
	.get('/test/index',islogin('/login'),function(req,res){
		res.end('URL redirect');
	})

#OPTIONS

## string
	Jump in the URL, passing type string arguments apply only when validation fails to jump and should have the file to verify the road

## object
	options     
	redirect string redirect url 
	tip      object/bool for API-type
	pattern  array  for checked URLs support for regular expressions
