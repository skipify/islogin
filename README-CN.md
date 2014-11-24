islogin
=======

这是一个Express的中间件，主要用于检查用户是否登陆

# 使用方式

## app.js中使用，使用在路由开始之前，这里是批量设置所有的需要检查的URL名单，支持正则表达式

	app.use(islogin({pattern:[/\/test\/*?/,'/home/index','/user/add'],redirect:'/'}));

	app.use(islogin({pattern:[/\/test\/*?/,'/home/index','/user/add'],tip:true}));

## 路由文件中使用
	如在 routes/index.js中使用

	var express = require('express');
	var islogin = require('islogin');
	var router = express.Router();


	/* GET home page. */
	router.get('/', function(req, res) {
		console.log('hello');
	 	res.end('/');
	})
	.get('/test/a',islogin,function(req,res){ //需要检查登陆
		res.end(req.url);
	})
	.get('/test/home',islogin({tip:true}),function(req,res){
		res.end('JSON提示形式')
	})
	.get('/test/index',islogin('/login'),function(req,res){
		res.end('URL跳转形式');
	})

#OPTIONS

## string
	跳转的URL，传递string类型参数时仅适用于验证失败跳转且应该在路有文件中验证
## object
	可配置选项  
	redirect string 跳转的URL，验证失败时跳转
	tip      object/bool 适用于API型的跳转
	pattern  array  需要验证的URL名单支持正则表达式
