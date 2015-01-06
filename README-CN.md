islogin
=======

[English](https://github.com/skipify/islogin/blob/master/README.md)    

这是一个Express的中间件，主要用于检查用户是否登陆

# 安装
	npm install islogin    
# 使用方式
	*注意系统内部默认使用 req.logined || req.session.logined 进行验证，如果需要自定义请使用自定义验证器*

## app.js中使用
	使用在路由开始之前，这里是批量设置所有的需要检查的URL名单，支持正则表达式

	app.use(islogin({pattern:[/\/test\/*?/,'/home/index','/user/add'],redirect:'/'}));

	app.use(islogin({pattern:[/\/test\/*?/,'/home/index','/user/add'],tip:true}));

	app.use(islogin(['/test/xx']));

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
	/*
		//同上
	.get('/test/home',islogin(true),function(req,res){
		res.end('JSON提示形式')
	})
	 */
	.get('/test/index',islogin('/login'),function(req,res){
		res.end('URL跳转形式');
	})
	.get('/test/diy',islogin(function(req,res){return req.uname == 'jobs'}),function(req,res){
		res.end('自定义验证')
	})

#OPTIONS
islogin() 可以接受两个参数
第一个参数：

## object
	可配置选项  
	`redirect` string 跳转的URL，验证失败时跳转
	`tip`      object/bool 适用于API型的跳转
	`pattern`  array  需要验证的URL名单支持正则表达式
	`verify`   function 自定义的验证器，内部默认验证为 req.logined || req.session.logined 表示通过
			 如果需要自定义的验证器请自行书写 ，再自定义的验证方法里面可以动态的改变 配置项中 tip redirect的值
	`isback`   bool 是否保存当前访问的URL
## String
	跳转的URL，传递string类型参数时仅适用于验证失败跳转且应该在路有文件中验证 同 redirect
## Boolean
	API类型的提示，此时如果验证失败会输出 {islogin:false} 同 tip => true/false
## Function
	直接指定一个自定义的验证器，返回true表示验证成功，返回flase表示没有通过验证 同verify
## Array
	直接指定一个需要验证的URL的匹配器 同pattern

	* req.session.backUrl 可以获取原来的URL*

第二个参数：
默认为false,表示，匹配的URL内容需要经过验证，验证失败则跳往redirect的页面

为true时表示，匹配的URL内容不需要经过验证，不匹配的需要验证，这种情况通常用于后台登陆仅仅只有登录页面不要验证
			其他页面都需要，此时在app.js中设置 app.use(islogin({pattern:["/login"],redirect:"/login"},true));

可以实现权限组的管理，参考 group.js实例
