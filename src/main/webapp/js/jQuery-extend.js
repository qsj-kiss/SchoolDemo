/*(function ($) {
	$.fn.extend({
    	extendSerialize:function(exceptArr){
    		//组装数组exceptArr
    		var _exceptArr=[];
    		if(typeof exceptArr =="string"){_exceptArr.push(exceptArr)}
    		if(exceptArr instanceof Array){_exceptArr=_exceptArr.concat(exceptArr)}
    		//获取表单所有数据
    		var dataArr=this.serializeArray();
    		//var dataArr=jQuery.serializeArray();
    		var _this=this;
    		//通过正则来进行转码
    		//console.log(_exceptArr)
    		dataArr.forEach(function(item,index,arr){
    			if(_exceptArr.indexOf(item.name)==-1){
    				item.value=_this.htmlEncodeByRegExp(item.value)
    			}else{
    				console.log(item.name+"未进行转码");
    			}
    		});
    		return jQuery.param(dataArr);
    	},
    	htmlEncodeByRegExp:function (str){  
    	    var s = "";
    	    if(str.length == 0) return "";
    	    s = str.replace(/&/g,"&amp;");
    	    s = s.replace(/</g,"&lt;");
    	    s = s.replace(/>/g,"&gt;");
    	    //s = s.replace(/ /g,"&nbsp;");
    	    s = s.replace(/\'/g,"&#39;");
    	    s = s.replace(/\"/g,"&quot;");
    	    return s;  
    	 },
    	serialize: function(exceptArr) {
    		//return jQuery.param( this.serializeArray() );
    		return this.extendSerialize(exceptArr);
    	},
    	
    });
})(jQuery);*/

//阻止表单中input回车键提交表单
function preventKeyDownDefault(event) {
    //var event=window.event;
    if (event.keyCode == 13 && event.target.nodeName.toLowerCase() != "textarea") {
        event.preventDefault();
    }
}

(function ($) {
    $.extend({
        preventKeyDownDefault: function (event) {
            //var event=window.event;
            if (event.keyCode == 13 && event.target.nodeName.toLowerCase() != "textarea") {
                event.preventDefault();
            }
        },
        //是否包含敏感字符
        validateSpecialCharacter: function (str) {
            var result = str.search(/&|<|>|\"|\'|\/>|\.|\?/g) > -1;	//是否包含敏感字符
            return {
                result: result,
                msg: "请勿输入包含</>&\.\"'等特殊字符"
            }
        },
        //validateSpecialCharacterHint:"请勿输入包含\<\/\>\&\.\"\'等特殊字符",
        validateSpecialCharacterHint: "请勿输入&amp;&lt;/&gt;&#39;&quot;.?等特殊字符",

        errDealFunc: [
            {
                msgCode: "AUTH0001",
                //匹配错误码后的处理方法
                func: function (result, userSetting) {
                    layer.open({
                        type: 2,
                        shade: false,
                        title: "请输入您的密码进行身份验证",
                        shadeClose: true,
                        content: "/acct/getPassword",
                        area: ['500px', '300px'],
                        btn: ["确定", "取消"]
                        , yes: function (index1, layero) {
                            //获取账号密码
                            var iframeWin = window[layero.find('iframe')[0]['name']];
                            var info = iframeWin.getInfo();
                            console.log(info);
                            if (info != null) {
                                //二次鉴权
                                $.ajax({
                                    url: "/acct/secondAuth/",
                                    data: info,
                                    method: "post",
                                    success: function (authResult) {
                                        //校验密码成功
                                        if ((authResult.returnCode).toLowerCase() == "success") {
                                            //获取secondAuthToken继续上传数据
                                            userSetting.data.secondAuthToken = authResult.obj.secondAuthToken;
                                            $.ajaxX(userSetting)
                                        } else {
                                            //校验密码失败
                                            layer.alert(authResult.msg, {
                                                icon: 0,
                                                title: "操作失败",
                                                btn: ['关闭'],
                                            }, function (index2) {
                                                layer.close(index2);
                                            });
                                        }
                                    }
                                })
                            } else {
                                //阻止关闭layer TODO 给出提示
                                return false;
                            }
                        }
                        , btn2: function (index1, layero) {
                            layer.closeAll();
                        }
                    })
                },
            },
        ],
        //扩展ajax,提供给所有业务模块公共使用，包含默认错误处理配置
        ajaxX: function (userSetting) {
            /**
             * userSetting = {
             *    url:"",
             *    method:"post",
             *    data:{},
             *    needErrDeal:true,		    //是否需要特定错误匹配处理
             *    errDealFunc:[]            //特定错误处理
             *    needSuccessAlert:true,	//是否需要成功alert事件
             *    needFailAlert:true,	    //是否需要错误alert事件
             *    successCb：function(result,userSetting){}  //返回数据为success的处理回调函数
             *    failCb：function(result,userSetting){}     //返回数据为fail的通用处理回调函数
             * }
             */
                //特定错误处理配置
            var errDealFunc = $.errDealFunc;
            if (userSetting.errDealFunc != undefined) {
                //TODO 实现特定错误码的自定义覆盖
            }
            //默认设置
            var setting = {
                url: userSetting.url,
                method: userSetting.method,
                data: userSetting.data,
                needErrDeal: userSetting.needErrDeal != undefined ? userSetting.needErrDeal : true,		//是否需要特定错误匹配处理
                needSuccessAlert: userSetting.needSuccessAlert != undefined ? userSetting.needSuccessAlert : true,	//是否需要成功alert事件
                needFailAlert: userSetting.needFailAlert != undefined ? userSetting.needFailAlert : true,	//是否需要错误alert事件
                success: function (result) {
                    //返回正确的处理方式
                    if ((result.returnCode).toLowerCase() == 'success') {
                        if (setting.needSuccessAlert) {
                            layer.alert(result.msg, {
                                icon: 1,
                                title: "系统提示",
                                btn: ['关闭'],
                            }, function (index) {
                                layer.close(index);
                            });
                        }
                        if (typeof userSetting.successCb == "function") {  	//TODO
                            (userSetting.successCb)(result, userSetting);
                        }
                    } else {
                        //返回错误的处理方式
                        //对所有错误处理配置进行匹配
                        var specialErr = false;
                        if (setting.needErrDeal) {
                            try {
                                for (var i = 0; i < errDealFunc.length; i++) {
                                    var item = errDealFunc[i];
                                    if ((result.msgCode).toLocaleLowerCase() == (item.msgCode).toLocaleLowerCase()) {
                                        (item.func(result, userSetting));
                                        specialErr = true;
                                        break;
                                    }
                                }
                            } catch (e) {
                                console.log("对所有错误处理配置进行匹配失败：" + e);
                            }
                        }
                        if (!specialErr) {
                            //默认错误处理方法
                            if (setting.needFailAlert) {
                                layer.alert(result.msg, {
                                    icon: 0,
                                    title: "操作失败",
                                    btn: ['关闭'],
                                }, function (index) {
                                    layer.close(index);
                                });
                            }
                            //错误统一回调函数
                            if (typeof userSetting.failCb == "function") {  	//TODO
                                (userSetting.failCb)(result, userSetting);
                            }
                        }
                    }
                    ;
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    if (jqXHR.status == 404 || jqXHR.status == 403) {
                        alert('访问地址错误，[' + url + ']不存在，状态码：' + jqXHR.statusText + ',错误信息：' + errorThrown);
                    } else if (jqXHR.status == 500) {
                        alert('服务端错误，状态码：' + jqXHR.statusText + '，抛错信息：' + errorThrown);
                    } else {
                        alert('加载页面错误，状态码：' + jqXHR.statusText + '，抛错信息：' + errorThrown);
                    }
                },
                complete: function (XMLHttpRequest, status) {
                },
            };
            //调用ajax
            $.ajax(setting)
        }
    });
})(jQuery);
