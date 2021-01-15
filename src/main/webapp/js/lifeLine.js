/**
 * 标段生命周期js
 * @author xj
 */

//组装渲染的数据组
function buildStepsData(arr){
	var result=[];
	/*
	result=[{
			      		seq:1,
			      		id:"seq_1",
			    		status:"is-finished",
			      		title:"1",
			      		list:[ {item} ],
			      		content:"<div>buttons</div>"
			      	} ]
	*/
	var existId=[];
	arr.forEach(function(item){
	if(existId.indexOf(item.seq)==-1){
		//不存在该seq，则创建新的obj
		result.push({
				seq:item.seq,
		     	id:"seq_"+item.seq,
		    	status:item.status?item.status:"is-finish",
		      	//title:item.seq,
		       	title:"",
		       	list:[item],
		       	content:buildButtonDom(item)
			})
			existId.push(item.seq)
		}else{
			//已存在该seq对象，则找到该对象，嵌入item数据
			for(var i=0;i<result.length;i++){
				if(result[i].seq==item.seq){
					(result[i].list).push(item);
					result[i].content+=buildButtonDom(item);
				}
			}
		}
	})
	//对数组进行排序
	result=result.sort(function(a,b){
		return a.seq-b.seq;
	})
	return result;
}
		
		
//组装渲染中button按钮的dom字符串
function buildButtonDom(item){
		/**
		item={
			"moduleCode": "tender",
			"configId": "config1",
			"moduleName": "立项",
			"id": "00001",
			"moduleId": "0001",
			"seq": 1
		}
		*/
		var str="<div><button id='module_"+item.id+"' class='lifeLineBtn'   data-moduleCode='"+item.moduleCode+"'  data-configId='"+item.configId+"' data-moduleId='"+item.moduleId+"'>"
					+item.moduleName
						+"</button></div>";
		return str
}
 
/**
 * 根据步骤设置，绑定按钮的点击事件
 * @param steps
 */
function bindBtnEvent(steps){
	steps.forEach(function(item){
		switch(item.renderType){
			case "open": bindOpenEvent(item);break;	//layer弹窗
			case "div": bindDivEvent(item);break;		//加载原始tab页面
			case "window": bindWindowEvent(item);break;	//跳转新页面
			case "tab": bindTabEvent(item);break;	//加载tab 
		}
	})
}

/**
 * 绑定按钮点击弹窗
 * @param item
 */
function bindOpenEvent(item){
	$("[data-modulecode='"+item.moduleCode+"']").unbind().click(function(){
		layer.open({
			icon:16,
			type:2,
			title:'详细信息',
			maxmin:true,
			closeBtn:1,
			btn: ['关闭'],
			bt1:function(index){
					layer.close();
			},		
			area:['80%','90%'],
			fixed: false,		 //不固定
			content: item.url
		})
	})
}

/**
 * 绑定按钮点击加载div
 * @param item
 */
function bindDivEvent(item){
	$("[data-modulecode='"+item.moduleCode+"']").unbind().click(function(){
		LoadAjaxContent(item.url);
	})
}

/**
 * 绑定按钮点击加载tab
 * @param item
 */
function bindTabEvent(item){
	$("[data-modulecode='"+item.moduleCode+"']").unbind().click(function(){
		var rootTab='<div id="tabs" class="ui-tabs ui-widget ui-widget-content ui-corner-all"><ul class="ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all" role="tablist"></ul></div>'
		$("#ajax-content").html(rootTab);
		initTabs("tabs");
		if(isExsitTab(item.tabId)){
			closeTab(item.tabId);
		}
		addTab(item.tabId, item.tabName, item.url, item.paraData, item.extraData);
	})
}

/**
 * 绑定按钮点击跳转新页面
 * @param item
 */
function bindWindowEvent(item){
	$("[data-modulecode='"+item.moduleCode+"']").unbind().click(function(){
		window.open(item.url);
	})
}


/**
 * 渲染步骤条
 */
function renderSteps(dom,options,data){
	/*
	 * [
	 * 		{
	 * 			id:""
	 * 			status:"is-finish",
	 * 			title:"",
	 * 			content:"",
	 * 		}
	 * ]
	 * */
	var html='';
	
	html+='<div class="flow-steps flow-steps-horizontal is-horizontal" >';
	
	for(var i=0;i<data.length;i++){
		var item=data[i];
		html+=' <div class="flow-step '+item.status+' " id="'+item.id+'">'
		html+='<div class="flow-step_header">'
		if(i!=data.length-1){
				html+='<div class="flow-step_line"></div>';
		}
		html+='<div class="flow-step_icon is-none"></div></div>';
		html+='<div class="flow-step_main">';
		html+='<div class="flow-step_box">';
		html+='<div class="flow-step_title">';
		html+='<div class="flow-step_titleName">'+item.title+'</div>';
		html+='</div>';
		html+='<div class="flow-step_content">';
		html+=item.content;
		html+='</div>';
		html+='</div>';
		html+='</div>';
		html+='</div>';
	}
	
	html+="</div>";
	$(dom).html(html);
}

/**
 * ajax请求通用方法
 * @param url
 * @param data
 * @param successCb
 * @param failCb
 * @param cbType 0成功失败alert（默认） 1无成功alert 2无失败alert 3无所有alert
 */
function ajaxData(url,data,successCb,failCb,cbType){
$.ajax({
	url:url,
	type:"post",
	data:data,
	success:function(result){
		if ( (result.returnCode).toLowerCase() == 'success') {	
			if(cbType!=1&&cbType!=3){
				layer.alert(result.msg,{
					icon:1,
					title:"系统提示",
					btn: ['关闭'] ,
				},function(index){
				   	layer.close(index);
				});
			}
			if(typeof successCb =="function"){
				successCb(result);
			}
		} else {
			if(cbType!=2&&cbType!=3){
				layer.alert(result.msg,{
					icon:0,
					title:"操作失败",
					btn: ['关闭'] ,
				},function(index){
				   	layer.close(index);
				});
			}
			if(typeof failCb =="function"){
				failCb(result);
			}
		};
	}
})
}

/**
 * 加载页面的请求方法
 * @param url
 */
function LoadAjaxContent(url,area){
	try{
		$('.preloader').show();
		$.ajax({
			mimeType: 'text/html; charset=utf-8', // ! Need set mimeType only when run from local file
			url: url,
			type: 'GET',
			success: function(data) {
				try{
					var d = jQuery.parseJSON(data);
					//console.debug(d);
					if(d.msgCode=='err0004'){
						layer.alert(d.msg,{
							title:'错误提示',
							icon:0,
							yes:function(){
								location='/user/logout';
							}
						});
					}else{
						layer.alert(d.msg,{
							title:'错误提示',
							icon:0
						});
					}
				}catch(e){
					if(area!=undefined){
						$("#"+area).html(data)
					}else{
						$('#ajax-content').html(data);
					}
				}
				$('.preloader').hide();
			},
			error: function (jqXHR, textStatus, errorThrown) {
				var msg = "";
				switch(jqXHR.status){
					case 404:
						msg ="没有找到"+url+"此页面";
					break;
					case 500:
						msg =url+"加载时运行错误";
					break;
				}
				layer.alert(jqXHR.status+"："+msg,{
					title:'<font color="red">错误提示</font>',
					icon:0
				});
			},
			dataType: "html",
			async: false
		});
	}catch(e){
		console.error(e)
		$('.preloader').hide();
		alert('系统提示：页面加载错误，操作失败！');
	}
}

function loadingPage(){
	index_LoadingPage = layer.load(2, {
		  shade: [0.1,'#fff'] //0.1透明度的白色背景
		});
}

function closeLoadingPage(){
	layer.close(index_LoadingPage);
}