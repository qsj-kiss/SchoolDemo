/*
 * 作者：肖佳
 * 使用对象属性，避免污染全局函数
 */
var judgeBrowser={
		isIE:function(){
			 if (!!window.ActiveXObject || "ActiveXObject" in window)
				  return true;
				  else
				  return false;
		},
		judgeIEVersion:function(failCallback){
			 var userAgent = navigator.userAgent;
			    if (this.isIE()) {
			        var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
			        var version=0;
			        if(reIE.test(userAgent)){//ie10以下版本
			        	version= Number(navigator.userAgent.match(reIE)[1]);
			        }else{					//ie11
			        	version=11;
			        }
			        if(version>9){
			        	return true;
			        }else{
			        	var failHint="当前IE浏览器版本过低，请更新到10及以上版本";
			        	if(typeof failCallback =="function"){
			        		failCallback(failHint);
			        	}else{
			        		alert(failHint);
			        	}
			        	return false;
			        }
			    }else{
			    	var failHint="该功能仅支持IE浏览器，请更换IE10及以上版本的IE浏览器";
			    	if(typeof failCallback =="function"){
		        		failCallback(failHint);
		        	}else{
		        		alert(failHint);
		        	}
			    	return false;
			    }
		}
};

	