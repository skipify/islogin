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
		return function(req,res.next){
			var curl = req.originalUrl || req.url,
				curls = curl.split('?'),
				path  = curls.pop(),
				ispass = false;
				if(!path){
					next();
				}
				for(var i=0;i<pattern.length;i++){	
					var item = pattern[i];
					if(Object.prototype.toString.call(item) === '[object RegExp]'){
						if(item.test(path)){
							ispass = true;
							break;
						}
					}else{
						if(item === path){
							ispass = true;
							break;
						}
					}
				}

				if(!ispass){
					return res.redirect(url);
				}
				ispass = false;
				next();
		}
	} else{
		return function(req,res,next){

			var isback = opts.isback === undefined ? true : opts.isback; //是否需要返回原来的操作页面，默认为true
		  	if(isback){
		  		req.session.backUrl = req.originalUrl || req.url;
		  	}
		  	if(!req.logined && !req.session.logined) {
		  		return res.redirect(url);
		  	}
		    next();
		}
	}


}