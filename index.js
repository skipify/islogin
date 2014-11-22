/*
	a Express middleware
*/

module.exports = function(opts){

	if(typeof opts === 'string'){
		opts = {redirect:opts};
	}
	opts = opts || {};
	var url = opts.redirect || '/login';

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