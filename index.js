/*
	a Express middleware
	Used to check whether the current access url has already logged in
	Support two use methods and processing type
*/

module.exports = function(opts,reject){

	reject = reject || false;
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
		opts.redirect   = opts.redirect || '/login',//login url
		opts.tip        = opts.tip      || false;
	var pattern = opts.pattern || null;
		verify  = opts.verify  || function(req,res){
			return req.logined || req.session.logined;
		},
		this.opts = opts,
		that      = this; //json tip
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

				if(!reject)
				{
					if(match && !verify.call(that,req,res)){
						if(opts.tip){
							if(Object.prototype.toString.call(opts.tip) === '[object Object]'){
								return res.json(opts.tip);
							}else{
								return res.json({islogin:false});
							}
						}
						return res.redirect(opts.redirect);
					}
				}else{
					//reverse ,match for no valid
					if(!match && !verify.call(that,req,res)){
						if(opts.tip){
							if(Object.prototype.toString.call(opts.tip) === '[object Object]'){
								return res.json(opts.tip);
							}else{
								return res.json({islogin:false});
							}
						}
						return res.redirect(opts.redirect);
					}
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
		  	if(!verify.call(that,req,res)) {
		  		//json格式的提示，用于API
				if(opts.tip){
					if(Object.prototype.toString.call(opts.tip) === '[object Object]'){
						return res.json(opts.tip);
					}else{
						return res.json({islogin:false});
					}
				}
				//直接跳转
		  		return res.redirect(opts.redirect);
		  	}
		    next();
		}
	}
}