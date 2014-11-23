/*
	a Express middleware
*/

module.exports = function(opts){

	if(typeof opts === 'string'){
		opts = {redirect:opts};
	}
	opts = opts || {};
	var url = opts.redirect || '/login';//login url
	//批量设置方式
	var pattern = opts.pattern || null;
	if(Object.prototype.toString.call(opts.pattern) === '[object Array]')
	{
		return function(req,res,next){
			var curl = req.originalUrl || req.url,
				curls = curl.split('?'),
				path  = curls.shift(),
				match = false;
					console.log(path);

				if(!path){
					next();
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
				if(match && !req.logined && (!req.session || !req.session.logined)){
					return res.redirect(url);
				}
				match = false;
				next();
		}
	} else{
		return function(req,res,next){

			var isback = opts.isback === undefined ? true : opts.isback; //是否需要返回原来的操作页面，默认为true
		  	if(isback){
		  		req.session.backUrl = req.originalUrl || req.url;
		  	}
		  	if(!req.logined && (!req.session || !req.session.logined)) {
		  		return res.redirect(url);
		  	}
		    next();
		}
	}


}