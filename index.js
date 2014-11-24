/*
	a Express middleware
	Used to check whether the current access url has already logged in
	Support two use methods and processing type
*/

module.exports = function(opts){

	if(typeof opts === 'string'){
		opts = {redirect:opts};
	}
		opts = opts || {};
	var url  = opts.redirect || '/login',//login url
		tip  = opts.tip      || null; //json格式的提示
	//批量设置方式
	var pattern = opts.pattern || null;
	if(Object.prototype.toString.call(opts.pattern) === '[object Array]')
	{
		req.session = req.session || {};
		return function(req,res,next){
			var curl  = req.originalUrl || req.url,
				curls = curl.split('?'),
				path  = curls.shift(),
				match = false;

				if(!path){
					next();
					return ;
				}
				for(var i=0;i<pattern.length;i++){	
					var item = pattern[i];
					if(Object.prototype.toString.call(item) === '[object RegExp]'){
						if(item.test(path)){
							match = true;
							break;
						}
					}else{
						if(item.substr(0,1) != '/'){
							item = '/' + item;
						}
						if(item === path){
							match = true;
							break;
						}
					}
				}
				if(match && !req.logined && !req.session.logined){
					if(tip){
						if(Object.prototype.toString.call(tip) === '[object Object]'){
							return res.json(tip);
						}else{
							return res.json({islogin:false});
						}
					}
					return res.redirect(url);
				}
				match = false;
				next();
		}
	} else{
		return function(req,res,next){
			req.session = req.session || {};
			var isback  = opts.isback === undefined ? true : opts.isback; //是否需要返回原来的操作页面，默认为true
		  	if(isback){
		  		req.session.backUrl = req.originalUrl || req.url;
		  	}
		  	if(!req.logined && !req.session.logined) {
		  		//json格式的提示，用于API
				if(tip){
					if(Object.prototype.toString.call(tip) === '[object Object]'){
						return res.json(tip);
					}else{
						return res.json({islogin:false});
					}
				}
				//直接跳转
		  		return res.redirect(url);
		  	}
		    next();
		}
	}
}