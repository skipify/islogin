/*
	a Express middleware
	Used to check whether the current access url has already logged in
	Support two use methods and processing type
*/

module.exports = function(opts){

	//for redirect url
	if(typeof opts === 'string'){
		opts = {redirect:opts};
	}
	//for is API-TIP
	if(typeof opts === 'boolean')
	{
		opts = {tip:opts};
	}
	//for a Verify
	if(typeof opts === 'function')
	{
		opts = {verify:opts};
	}
	//for a match pattern
	if(Object.prototype.toString.call(opts) === '[object Array]')
	{
		opts = {pattern:opts};
	}

		opts = opts || {};
	var url  = opts.redirect || '/login',//login url
		tip  = opts.tip      || false,
		pattern = opts.pattern || null;
		verify = opts.verify || function(req,res){
			return req.logined || req.session.logined;
		}; //json tip
	if(Object.prototype.toString.call(opts.pattern) === '[object Array]')
	{
		return function(req,res,next){
				req.session = req.session || {};
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
				if(match && !verify.call(null,req,res)){
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
			var isback  = opts.isback === undefined ? true : opts.isback; // for back url？ default true
		  	if(isback){
		  		req.session.backUrl = req.originalUrl || req.url;
		  	}
		  	if(!verify.call(null,req,res)) {
		  		console.log('xxx');
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