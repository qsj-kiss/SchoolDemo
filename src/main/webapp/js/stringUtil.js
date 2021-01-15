/**
	自定义字符串处理工具Js方法
	@author James,25708164@qq.com;
	@date  2016-11-15
 */

	/**
	 * 判断a是否为空，一般用于输入校验
	 * 2019-02-27，王杨重写
	 */
	// jQuery.isNull = function(a){
	// 	if(a.replace(/(^s*)|(s*$)/g, "").length ==0){
	// 		return true;
	// 	}
	// 	return false;
	// };
	jQuery.isNull = function(a){
		if(a==null || a=="" || a == undefined){
			return true;
		}
		return false;
	};

	//是否为数字
	jQuery.isNumber = function(a){
		if(/^\+?[0-9][0-9]*$/.test(a)){
			return true;
		}
		return false;
	};

	//验证是否为整数或最多2位小数的，多用于价格验证
	//修改：XR，20180301，小数点设为只能输入半角的。
	jQuery.isRealNumber=function(a){
		if(/^[0-9]+(\.[0-9]{0,2})?$/.test(a)){
			return true;
		}
		return false;
	};

	//是否为URI格式
	jQuery.isURI=function(a){
		var reg = /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&amp;:/~\+#]*[\w\-\@?^=%&amp;/~\+#])?/ ;
		if(reg.test(a)){
			return true;
		}
		return false;
	};

	//是否为手机号码
	/**
	 * 以 1开头
	 * 第二位是 3、4、5、7、8
	 * 后面任意0-9位数字
	 * 必须为11位
	 * 	 * 2020年11月4日 zhouyanjin 修改
	 * 1.支持 160，190 开头手机号
	 * 2.添加为空校验 为空时返回传入值isNull
	 */
	jQuery.isMobilePhone=function(a,isNull){
		if($.isNull(a)){
			return isNull;
		}
		if(/^1(3|4|5|6|7|8|9)\d{9}$/.test(a)){
			return true;
		}
		return false;
	};

	// 判断是否只有数字或英文
	jQuery.isNumberOrEn=function(a){
		if(/^[A-Za-z0-9]+$/.test(a)){
			return true;
		}
		return false;
	};
	jQuery.randomString=function randomstring(L){
		var s= '';
		var randomchar=function(){
		 var n= Math.floor(Math.random()*62);
		 if(n<10) return n; //1-10
		 if(n<36) return String.fromCharCode(n+55); //A-Z
		 return String.fromCharCode(n+61); //a-z
		}
		while(s.length< L) s+= randomchar();
		return s;
  };
	//校验手机号 支持199开头手机号码 isNull是为空时的返回值
	//zhouyanjin 2020年10月9日
	jQuery.checkPhone = function checkPhone (value,isNull) {
		var isMobile=/^[1][3,4,5,6,7,8,9][0-9]{9}$/;//验证手机号
		var p1 = /^[0][1-9]{2,3}-{0,1}[0-9]{7,8}$/; // 验证带区号的
		var p2 = /[1-9]{1}[0-9]{6,8}$/;     // 验证没有区号的
		//为空时判断
		if($.isNull(value)){
			return isNull;
		}
		if(value.length<9){
			if(p2.test(value)){
				return true;
			}
		}else{
			if(isMobile.test(value)){
				return true;
			}else if(p1.test(value)){
				return true;
			}
		}
		return false;
	}
	//校验中文 支持199开头手机号码 isNull是为空时的返回值
	//zhouyanjin 2020年11月5日
	jQuery.checkCN = function checkCN (value,isNull) {
		var id = /[\u4E00-\u9FA5]/g;
		//为空时判断
		if($.isNull(value)){
			return isNull;
		}
		if (id.test(value)) {
			return false;
		} else {
			return true;
		}
		return false;
	}
	//校验特殊字符 isNull是为空时的返回值
	//zhouyanjin 2020年11月5日
	jQuery.checkSpecial = function checkSpecial (value,isNull) {
		var id = /[!#@#%^&+_=~`\-*:;"',.$@/\\()<>{}[\] ]/g;
		//为空时判断
		if ($.isNull(value)){
			return isNull;
		}
		if (id.test(value)) {
			return false;
		} else {
			return true;
		}
		return false;
	}

	
	
	
