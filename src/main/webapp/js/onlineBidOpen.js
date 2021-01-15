/*
 * 作者：肖佳
 */
/*修改：HL 添加title属性*/
var columns={
			signIn:[
		         	{data:"companyName",title:"公司名称"},
		        	{data:"status",title:"当前状态",
		         		render:function(data,type,row){
		         			return data
		         		}
		         	},
		         	{data:"signInTime",title:"签到时间"},
		         	{data:"signInUserName",title:"签到人员"},
		         ],
	         openBid:[
	 	         	{data:"companyName",title:"投标人"},
	 	        	{data:"status",title:"状态",
	 	         		render:function(data,type,row){
		         			return data
		         		}
	 	         	},
	 	         	{data:"signInUserName",title:"签到人员"},
	 	         	{data:"signInTime",title:"签到时间"},
	 	          	{data:"decryptTime",title:"解密时间"},
	 	          	{data:"confirmTime",title:"确认时间"},
	 	         	{data:"marginPayType",title:"投标保证金"},
	 	         	{data:"bidPrice",title:"投标报价"},
			 	   	{data:"content",title:"唱标内容"},
			 		{data:"remark",title:"备注"},
	 	         ]
		
}

function renderBidOpenPage(areaDom,renderType){
	
}
/***************投标人页面渲染方法****************/
/**
 * 不能签到
 */
function renderCantSignIn(areaDom){
	$("#bidOpen_DataTable").html("<tr class='hintTr'><td>当前不能进行签到</td></tr>");
}

/**
 * 未签到
 */
function renderNoSignIn(areaDom){
	$("#bidOpen_DataTable").html("<tr  class='hintTr'><td>暂未签到</td></tr>");
}

/**
 * 已签到待解密
 */
function renderHasSignIn(columns,searchParasCreater,dataSrcFun,timer){
	renderDataTable("bidOpen_DataTable",columns,"/bidOpen/mySignInInfo",null,searchParasCreater,dataSrcFun,timer)
}

/**
 * 获取所有投标人开标信息
 */
function renderAllByBidder(columns,searchParasCreater,dataSrcFun,timer){
	renderDataTable("bidOpen_DataTable",columns,"/bidOpen/listAllDecrypted",null,searchParasCreater,dataSrcFun,timer)
}



function renderAll(columns,searchParasCreater,dataSrcFun,timer){
	renderDataTable("bidOpen_DataTable",columns,"/bidOpen/listAll",null,searchParasCreater,dataSrcFun,timer)
}

/***************************获取数据&&渲染页面的基础方法***********************************/
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

//查询参数设置
var searchParams = function(d,searchParasCreater,containerId){
	var arr=[];
	
	ary = $(".searchPara");
	
	if(ary.length>0){
			for(var i=0;i<ary.length;i++){
				d[ary[i].id] = ary[i].value;
			}
	}
		
	if(typeof(searchParasCreater)=='function'){
		sp= searchParasCreater();
		for(key in sp){
			d[key] = sp[key];
		}
	}
	return d;
};


function renderDataTable(containerId,arrayColumns,ajaxUrl,completeCallback,searchParasCreater,dataSrcFunc,timer){
	try{
		dataTable.destroy();
	}catch(err){
		console.debug(err)
	}
	dataTable=$('#'+containerId).DataTable( {
		//实现表格单元鼠标浮动展示所有内容

        "aoColumnDefs": [
            {
                "aTargets": "_all",
                "fnCreatedCell": function (td, cellData, rowData, row, col) {
                    if (cellData != null && cellData != undefined && !(cellData instanceof Object)) {
                        $(td).attr("title", $(td).text())//wutao 2019-03-05修改 表格单元鼠标浮动展示所有内容
                    }
                }
            }
        ],
		"columns": arrayColumns,
        "scrollX": false,
        "scrollCollapse": true,
        /*"scrollY": 50,*/
        "sScrollY":"100%",
        "paging": false,
        "ordering": false,
        "searching":false,
        "bInfo":false,
        //"destroy": true,  
        "language": {
				// "url":"${srpp}/plugins/datatables/zh.json"
				'sZeroRecords':'没有可显示数据'//没有数据时提示 wt 2019-03014
	        },
        "ajax": {
        	url:ajaxUrl,
        	"data":function(d){
        		searchParams(d,searchParasCreater,containerId);
        		return d;
        	},
        	type:"post",
        	"dataSrc": function ( data ) {
        	    try{
        	    	//默认数据错误处理方法
        	    	if(! (data instanceof Array) ){
        	    		if(data.returnCode){
        	    			//提示错误
        	    			layer.alert(data.msg,{
    							icon:"",
    							title:"系统提示",
    							btn: ['关闭'] ,
    						},function(index){
    						   	layer.close(index);
    						});
        	    			//关闭轮询
	       	    			window.clearInterval(timer);
        	    			//销毁表格数据
        	    			dataTable.destroy();
        	    			this.destroy()
        	    		}
        	    	}else{
        	    		//如果有自定义数据处理方法
            	     	if(typeof dataSrcFunc =="function"){
            	    		return dataSrcFunc(data);
            	    	}
        	    	}
        	    }catch(err){
        	    	console.error(err)
        	    }
        	     return data
        	}
        },
        "initComplete": function () { //datatable对象初始化调用  reload不会触发
        	try{
	        	this.on( 'click', 'tr', function () {
	        	    if ($(this).hasClass('selected') ) {
	        	        $(this).removeClass('selected');
	        	    }else {
	        	    	$('#'+containerId).DataTable().$('tr.selected').removeClass('selected');
	        	        $(this).addClass('selected');
	        	    }
	        	});
    		}catch(e){
    			console.error(e);
    			return false;
    		}
        },
        "drawCallback": function () { //每一次绘制table时候调用
        	try{
	      		if (completeCallback && typeof(completeCallback) == "function") {
	    			completeCallback();	
	    		}
    		}catch(e){
    			console.error(e);
    			return false;
    		}
        },
    } ).on('xhr.dt', function ( e, settings, result, xhr ) {
    		if(result.returnCode){
    			if((result.returnCode).toLowerCase()=='fail'){
    				alert('错误：'+result.msg);
    			}
    			return ;
    		}
    } );
	
	return dataTable;
}
	
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


/***************************获取时间的基础方法***********************************/

//时间Date转换相关方法
function time2String(t) {
	with (t)
		return [ getFullYear(), '-', ('0' + (getMonth() + 1)).slice(-2),
				'-', ('0' + getDate()).slice(-2), ' ',
				('0' + getHours()).slice(-2), ':',
				('0' + getMinutes()).slice(-2), ':',
				('0' + getSeconds()).slice(-2) ].join('')
}
//毫秒转为中文时间显示
function int2time(m) {
	m -= (D = parseInt(m / 86400000)) * 86400000;
	m -= (H = parseInt(m / 3600000)) * 3600000;
	S = parseInt((m -= (M = parseInt(m / 60000)) * 60000) / 1000);
	return D + '天' + H + '小时' + M + '分' + S + '秒'
}
/**
 * IE浏览器不支持date(time),所以用此方法转换
 * @param str  2016-08-22  13:09:09
 * @returns {Date}
 */
function NewDate(str) {
    //首先将日期分隔 ，获取到日期部分 和 时间部分
    var day = str.split(' ');
    //获取日期部分的年月日
    var days = day[0].split('-');
    //获取时间部分的 时分秒
    var mi = day[day.length - 1].split(':');
    //获取当前date类型日期
    var date = new Date();
    //给date赋值  年月日
    date.setUTCFullYear(days[0], days[1] - 1, days[2]);
    //给date赋值 时分秒  首先转换utc时区 ：+8      
    date.setUTCHours(mi[0] - 8, mi[1], mi[2]);
    return date;
} 

//************ 获取服务器时间  *************//
function webDate(fn) {
	var Htime = new XMLHttpRequest();
	Htime.onreadystatechange = function() {
		Htime.readyState == 4
				&& (fn(new Date(Htime.getResponseHeader('Date'))))
	};
	Htime.open('HEAD', '/static/time.html?_=' + (-new Date));
	Htime.send(null);
}

//肖佳
var currentTime=new Date();
var compareTime=new Date();
var webServeTime=new Date();
function initWebDate(timeDom,updateCb){
	//根据本地时间差来计算服务器时间，同时每隔一定时间从远端获取最新服务器时间
	//立即执行1次
	webDate(function(webTime) {
		currentTime=new Date();
		webServeTime=webTime;
	});
	//间断获取服务器时间
	setInterval(function() {
		webDate(function(webTime) {
			currentTime=new Date();
			webServeTime=webTime;
		});
	}, 300000);
	//每秒更新当前时间显示
	setInterval(function(){
		compareTime=new Date();
		var gapTime=compareTime.getTime() - currentTime.getTime();//距离上一次获取服务端时间的毫秒数
		_webServeTime=new Date(webServeTime.getTime()+gapTime);//将间隔时间加到上次获取的服务器时间并渲染
		var _showTime=time2String( _webServeTime) ;
		$('#'+timeDom).html( _showTime );
		if(typeof updateCb=="function"){
			updateCb(_showTime);
		}
	},1000);
}
