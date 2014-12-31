//用户组权限
var privs = {
	 	'g1' : [
	 		'/test','/test/1','/test/aaa',
	 	]


	 }

function priv(req,res){
	 var islogin = req.logined || req.session.logined,
	 		url  = req.originalUrl || req.url;
	 if(!islogin){
	 	return false;
	 }
	 var group = req.session.userInfo.group;
	 var pattern = privs.['g'+group]
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

function check(url){
	 var pattern = privs.['g'+group]
	if(!pattern){
		return false;
	}
	var ispass = false;
	for(var i in pattern){
		var item = pattern[i];
		if(typeof item === 'string'){
			if(item == url){
				return true;
			}
		}else{
			if(item.test(url)){
				return true;
			}
		}

	}
	return ispass;
}