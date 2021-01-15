/*
 * 作者：肖佳
 * 用于所有详情页面的js扩展
 */
function dynamicLoading(options){
	var _options={
			btnDomId:"",
			htmlDomId:"",
			url:"",
			data:"",
			needHtml:true,
			successCb:function(){},
			errorCb:function(){},
	}
	_options=$.extend(_options,options);
	
	$(_options.btnDomId).unbind().click(function(){
		$.ajax({
			url : _options.url,
			data:_options.data,
			type:"post",
			success : function(data){
				if(_options.needHtml){
					$(_options.htmlDomId).html(data);
				}
				if(typeof _options.successCb=="function"){
					(_options.successCb)(data);
				}
				
			},error: function (jqXHR, textStatus, errorThrown) {
				if(jqXHR.status==404 ||  jqXHR.status==403 ){
					alert('访问地址错误，['+url+']不存在，状态码：'+jqXHR.statusText+',错误信息：'+errorThrown);
				}else if(jqXHR.status==500){
					alert('服务端错误，状态码：'+jqXHR.statusText+'，抛错信息：'+errorThrown);
				}else{
					alert('加载页面错误，状态码：'+jqXHR.statusText+'，抛错信息：'+errorThrown);
				}
				if(typeof _options.errorCb=="function"){
					(_options.errorCb)(textStatus);
				}
			},
		});	
	});
}

	