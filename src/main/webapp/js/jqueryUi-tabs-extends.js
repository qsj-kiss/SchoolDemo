/**
	基于Jquery UI  tabs的扩展方法，
	适用于JQuery Ui 1.10.x 以上版本
	@author James,25708164@qq.com;
	@date  2016-11-22
 */

	var tabs;							//tabs全局变量
	var tabCounter = 0;		//tabs 总标签数
	
    /**
		动态增加tab标签
		labelName  标签名称
		要显示的Html内容  
	**/
	function addTab(id,labelName,url,paraData,extraData) {
		//$('.preloader').show();
		loadingPage();
		if($.isEmptyObject(paraData)){
			paraData = {"tabId":id};
		}
		if(!$.isEmptyObject(extraData)){
			paraData = $.extend({},paraData,extraData)
		}
		
		//var ajaxLoadPage = null;
		try{
			$.ajax({
				mimeType: 'text/html; charset=utf-8', 			// ! Need set mimeType only when run from local file
				url: url,
				type: 'POST',
				data:paraData,												//此ID传入到后台，由后台赋值给新打开的tab中对应tabId，以实现多个tab打开的关闭功能
				timeout:15000,
				dataType: "html",
				success: function(data) {
					try{
						var d = jQuery.parseJSON(data);
						if(d.returnCode=='err0004'){
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
						if(data==null){
							layer.alert('加载页面失败',{
								title:'错误提示',
								icon:0
							});
						}else{
							var liId = "li_"+id;
							if($('#'+id).length>0){			//tab 已经存在，直接切换
								//console.debug('已经存在');
								var idx = $('#tabs a[href="#'+id+'"]').parent().index();		//通过id，进行切换
								tabs.tabs( "option", "active", idx );
							}else{
								//var  li = "<li id='"+liId+"'><a href='#"+id+"'>"+labelName+"</a> <span class='ui-icon ui-icon-close' role='presentation'>关闭标签</span></li>";
								var  li = "<li id='"+liId+"'><a href='#"+id+"'>"+labelName+"</a><i class='fa fa-close tab-close-btn' aria-hidden='true' data-liId="+id+"></i></li>";
//								var liCount = tabs.find( ".ui-tabs-nav" ).find("li").size();
								//console.debug(liCount);
								tabs.find( ".ui-tabs-nav" ).append( li );
								tabs.append( "<div id='" + id + "'>" + data + "</div>" );
								tabs.tabs( "refresh" );
								tabCounter++;
								activeTab(id);
								$("#"+liId+" .tab-close-btn").unbind().click(function(e){
									closeTab($(this).attr("data-liId"));
								})
								//$( "#tabs" ).tabs( "option", "active", liCount);						//通过tab 索引进行切换
							}
						}
					}
				},
				error: function (jqXHR, textStatus, errorThrown) {
					errMsg = errorThrown;
					errStatus(url,jqXHR,errorThrown);
				},
				complete:function(XMLHttpRequest,status){
					//$('.preloader').hide();
					closeLoadingPage();
					if(status=='timeout'){
						if(ajaxLoadPage!=null){
							XMLHttpRequest.abort();
						}
						
						layer.alert('请求超时',{
							title:'系统提示',
							icon:0
						});
					}
				},
			});
		}catch(e){
			console.debug(e);
			//$('.preloader').hide();
			closeLoadingPage();
			alert('系统提示：页面加载错误，操作失败！');
			closeTab(id);
			//location.reload();
		}
	
	}
	
	//重新加载Tab
	function reloadTab(tabId,url){
		//$('.preloader').show();
		loadingPage();
		$.ajax({
			mimeType: 'text/html; charset=utf-8',
			url: url,
			type: 'GET',
			data:{"tabId":tabId},
			success: function(data) {
				try{
					var d = jQuery.parseJSON(data);
					if(d.returnCode=='err0004'){
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
					$('#'+tabId).empty();
					$('#'+tabId).html(data);
					activeTab(tabId);				//切换到重载的tab
					 //$('.preloader').hide();
					closeLoadingPage();
				}
			},
			error: function (jqXHR, textStatus, errorThrown) {
				errStatus(url,jqXHR,errorThrown);
			},
			complete:function(){
				//$('.preloader').hide();
				closeLoadingPage();
			},
			dataType: "html",
		});
	}
	
	//根据ID激活标签
	function activeTab(tabId){
		var idx = $('#tabs a[href="#'+tabId+'"]').parent().index();			//通过id，进行切换
		tabs.tabs( "option", "active", idx );
	}

	//根据tabId，关闭tab
	function closeTab(tabId){
		var liId = "li_"+tabId;
		$('#'+liId).remove();
        $('#'+tabId).empty();
		$("#"+liId.substring(liId.lastIndexOf('_')+1)).remove();
		tabCounter--;
		$('#tabs').tabs( "refresh" );
	}
	
	//判断tab是否已经存在
	function isExsitTab(tabId){
		tabObj = $('#li_'+tabId);
		if(tabObj.length>0){
			return true;
		}else{
			return false;
		}
	}
	

	//新增按钮绑定事件 
	function addBtnBindEvent(btnId,tabId,tabName,ajaxUrl,paras){
		if($("#"+btnId).length>0){
			$("#"+btnId).unbind().click(function() {
				//缓存当前按钮对象 modified by huangxiong 2019年5月8日17点25分
				var _self = this;
				try {
                    _self.disabled=true;
                    //增加对edit的Tab页面互斥的判断
                    //【原因：新增/修改页面同时存在时，有很多全局变量污染导致功能错误】
                    //【作者：肖佳】
                    if(isExsitTab("edit")){
                        closeTab("edit")
                    }
                    /*if(!isExsitTab(tabId)){
                        addTab(tabId,tabName,encodeURI(ajaxUrl),paras);
                    }else{
                        activeTab(tabId);
                    }*/
                    //多层tab使得3级tab没法关联1级（如标段-评标结果-新增评标记录），所以add页面都会重新加载，而不是激活之前的页面
                    if(isExsitTab(tabId)){
                        closeTab(tabId);
                    }
                    addTab(tabId,tabName,encodeURI(ajaxUrl),paras);
                    setTimeout(function () {
                        _self.disabled=false;
                    },500)
                }catch (e) {
					console.error(e)
                    setTimeout(function () {
                        _self.disabled=false;
                    },500)
                }
			});
		}else{
			console.debug(btnId+" is not exist");
		}
	}
	
	//新增按钮绑定事件   会传递后台选中的数据id
	function addBtnBindEventWithSelect(btnId,tabId,datatableObj,tabName,ajaxUrl,paras){
		if($("#"+btnId).length>0){
			$("#"+btnId).unbind().click(function() {
				var selectedRow = datatableObj.rows('.selected').data();
				
				//增加对edit的Tab页面互斥的判断  
				if(isExsitTab("edit")){
					closeTab("edit")
				}
				
				if(!isExsitTab(tabId)){
					if(selectedRow.length==0){
						addTab(tabId,tabName,encodeURI(ajaxUrl),paras);
					}else{
						var _extraparas={selectId:selectedRow[0].id};
						
						layer.confirm('是否使用该条记录作为模板？', {
							  icon:2,
							  btn: ['是','否'], //按钮
							  title:"系统提示",
							}, function(index,layero){
								addTab(tabId,tabName,encodeURI(ajaxUrl),paras,_extraparas);
								layer.close(index);
							}, function(index,layero){
								addTab(tabId,tabName,encodeURI(ajaxUrl),paras);
								layer.close(index);
							});
						
					}
					
				}else{
					activeTab(tabId);
				}
			});
		}else{
			console.debug(btnId+" is not exist");
		}
	}
	
	//修改按钮绑定事件 
	function editBtnBindEvent(btnId,tabId,datatableObj,tabName,ajaxUrl){
		if($("#"+btnId).length>0){
			$("#"+btnId).unbind().click(function() {
				
				var selectedRow = datatableObj.rows('.selected').data();
				if(!isExsitTab(tabId)){
					if(selectedRow.length==0){
						layer.alert('请选择要修改的行',{
							title:'错误提示',
							icon:0
						});
					}else{
						//增加对edit的Tab页面互斥的判断  
						//【原因：新增/修改页面同时存在时，有很多全局变量污染导致功能错误】
						//【作者：肖佳】
						if(isExsitTab("add")){
							closeTab("add")
						}
						addTab(tabId,tabName, ajaxUrl+selectedRow[0].id);
					}
				}else{
					reloadTab(tabId,ajaxUrl+selectedRow[0].id);
				}
			});
		}else{
			console.debug(btnId+" is not exist");
		}
	}

	//刷新按钮绑定事件	
	function refBtnBindEvent(btnId,datatableObj,callback){
		if($("#"+btnId).length>0){
			$('#'+btnId).unbind().click(function(){
				if (callback && typeof(callback) == "function") {
					datatableObj.ajax.reload(callback,false);
	    		}else{
	    			datatableObj.ajax.reload();
	    		}
			});
		}else{
			console.debug(btnId+" is not exist");
		}
	}

	//输入框绑定事件
	//肖佳：增加datatableObj.page(0);，解决搜索后当前页数超出总页数的bug
	function searchBindEvent(inputId,btnId,datatableObj,callback){
		if($("#"+inputId).length>0){
			$('#'+inputId).on('keydown', function(e){
				if (e.keyCode == 13){
					e.preventDefault();
					if (callback && typeof(callback) == "function") {
						datatableObj.page(0);
						datatableObj.ajax.reload(callback,false);
		    		}else{
		    			datatableObj.page(0);
		    			datatableObj.ajax.reload();
		    			//datatableObj.page(0).draw(false);
		    		}
				}
			});
		}else{
			console.debug(btnId+" is not exist");
		}
		
		if($("#"+btnId).length>0){
			//查询框回车事件绑定
			$('#'+btnId).unbind().click( function(e){
				if (callback && typeof(callback) == "function") {
					datatableObj.page(0);
					datatableObj.ajax.reload(callback,false);
	    		}else{
	    			datatableObj.page(0);
	    			datatableObj.ajax.reload();
	    		}
			});
		}else{
			console.debug(btnId+" is not exist");
		}
	}
		
	
	//删除按钮绑定事件
	function delBtnBindEvent(btnId,datatableObj,ajaxUrl,colName,callback,delHint){
		if($("#"+btnId).length>0){
			$('#'+btnId).unbind().click( function(){
				var selectedRow = datatableObj.rows('.selected').data();
				if(selectedRow.length==0){
					layer.alert('请选择要删除的行',{
						title:'错误提示',
						icon:0
					});
				}else{
					var _delHint=delHint?delHint+' ':'';
					layer.confirm(_delHint+'是否删除【'+selectedRow[0][colName]+'】？',{
							title:'系统提示',
							icon:0,
							yes:function(){
								$.ajax({
										url : ajaxUrl,
										data:{"id":selectedRow[0].id},
										type:"post",
										success : function(json) {
											var title,icon,result,msg; 
											result = json.returnCode;
											msg = json.msg;
//											console.debug(result)
											if(result.toLowerCase()=='success'){//2019-03-18,wy修改
												title	='系统提示';
												icon = 1;
												
											}else{
												if(json.msgCode=='err0018'){	//资源被占用
														layer.confirm(json.msg,{
															title:'<font color="red">错误提示</font>',
															icon:0,
															btn: ['<font color="red">强制删除</font>','放弃']
														}
														,function(index){
															forceDo(ajaxUrl,{"id":selectedRow[0].id,"isForce":true},callback);		//强制执行
															layer.close(index);
														}
														,function(index){
															layer.close(index);
															return;
														}
													);
													return;
												}else{
													title='<font color="red">错误提示</font>';
													icon=0;
												}
											}
											
											layer.alert(msg,{
												title:title,
												icon:icon,
												yes:function(index){
													if(result.toLowerCase()=='success'){//2019-03-18,wy修改
														datatableObj.ajax.reload(null,false);
													}
													
										    		try{		//回调方法
											    		if (callback && typeof(callback) == "function") {
											    			callback();	
											    		}
										    		}catch(e){
										    			return false;
										    		}
													layer.close(index);
												}
											});
										},error: function (jqXHR, textStatus, errorThrown) {
											errStatus(ajaxUrl,jqXHR,errorThrown);
										},
									});
								}
							});
						}
					});
		}else{
			console.debug(btnId+" is not exist");
		}
	}
	
	//强制执行
	function forceDo(ajaxUrl,paraData,callback){
		$.ajax({
			url : ajaxUrl,
			data:paraData,
			type:"post",
			success : function(json) {
				var title,icon,msg,result;
				result = json.returnCode;
				msg = json.msg;
				
				if(result=='success'){
					title='系统提示';
					icon = 1;
				}else{
					title='<font color="red">错误提示</font>';
					icon=0;
				}
				layer.alert(msg,{
					title:title,
					icon:icon,
					yes:function(index){
						if(result=='success'){
							datatableObj.ajax.reload(null,false);
						}
			    		try{		//回调方法
				    		if (callback && typeof(callback) == "function") {
				    			callback();	
				    		}
			    		}catch(e){
			    			return false;
			    		}
						layer.close(index);
					}
				});
			}
		});
	}
	
	//初始化Tabs
	function initTabs(tabsId){
		//显示标签
		tabs =  $("#"+tabsId).tabs({
			//hide : "drop",	//注释 xj bug2992
			beforeActivate : function(event, ui) {  //标签被激活前做的事
            },
		}); 
	}
	
	//抛错提示信息
	function errStatus(url,jqXHR,errorThrown){
		if(jqXHR.status==404 ||  jqXHR.status==403 ){
			alert('访问地址错误，['+url+']不存在，状态码：'+jqXHR.statusText+',错误信息：'+errorThrown);
		}else if(jqXHR.status==500){
			alert('服务端错误，状态码：'+jqXHR.statusText+'，抛错信息：'+errorThrown);
		}else{
			alert('加载页面错误，状态码：'+jqXHR.statusText+'，抛错信息：'+errorThrown);
		}
		
	}
		
