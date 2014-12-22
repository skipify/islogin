islogin
=======
[中文](https://github.com/skipify/islogin/blob/master/README-CN.md)    

This is an Express middleware, is mainly used to check whether the user login
# Install
	npm install islogin    
# Usage
	*Notice: in the lib use req.logined || req.session.logined to verify,
			If you need to custom, please use a custom validator*  

## In app.js
	
	Use before the start of the route, here is the batch set all need to check the URL list, support for regular expressions


	app.use(islogin({pattern:[/\/test\/*?/,'/home/index','/user/add'],redirect:'/'}));

	app.use(islogin({pattern:[/\/test\/*?/,'/home/index','/user/add'],tip:true}));

	app.use(islogin(['/test/xx']));

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
The First Param:
## object
	options     
	`redirect` string redirect url 
	`tip`      object/bool for API-type
	`pattern`  array  for checked URLs support for regular expressions
	`verify`   function CustomValidator，in the lib return req.logined || req.session.logined for pass
			 you can define you own function to verify pass or not 
	`isback`   bool if true(default)  you can use req.session.backUrl get this page url


## string
	Jump in the URL, passing type string arguments apply only when validation fails to jump 
	and should have the file to verify the road (redirect)

## Boolean
	API-TYPE tip，if false ,send {islogin:false} (tip => true/false)
## Function
	define you own function to verify pass or not，true for pass ,flase for reject (verify)
## Array
	for checked URLs support for regular expressions (pattern)

	* req.session.backUrl get the url*

The Second Param (default false)

false : Match the URL must pass validation
True :  Matching urls do not need to be verified,But don't match the URL must be verified.Its For Manage Sysyem,only one page or a little pages need verify;