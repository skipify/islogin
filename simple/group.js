//用户组权限
function(req,res){
	 var islogin = req.logined || req.session.logined,
	 		url  = req.originalUrl || req.url;
	 if(!islogin){
	 	return false;
	 }
	 var group = req.session.userInfo.group;
	 var regexp= {
	 	'g1' : [
	 		'/test','/test/1','/test/aaa',
	 	]


	 }
	 var pattern = regexp.['g'+group]
	if(!pattern){
		return false;
	}

	//匹配
	var ispass = false;
	pattern.forEach(function(item){
		if(typeof item === 'string'){
			if(item == url){
				ispass = true;
			}
		}else{
			if(item.test(url)){
				ispass = true;
			}
		}
	});
	return ispass;
}