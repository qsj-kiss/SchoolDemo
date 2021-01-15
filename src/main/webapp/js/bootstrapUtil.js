/**
 * Bootstrap自定义工具类
 * @author：James,25708164@qq.com
 * @date:2016-10-23
 */

/**
 * 生成自定义模态对话框
 * id:对话框ID
 * height:高度
 * width：宽度
 * title:标题
 * top:距顶部距离
 * msg:内容
 * msgType: success,info,warning,danger
 */
jQuery.showDialog = function( o) {
		var msgcontent =  '<div class="alert alert-info alert-dismissable">'+o.msg+'</div>';
		var alertType = 'alert-'+o.msgType;
		
		if(typeof(o.msgType)=="undefined"){
			alertType = 'alert-info';
		}
		
		msgcontent =  '<div class="alert '+alertType+' alert-dismissable">'+o.msg+'</div>';
		var dhtml = '<div id="' + o.id + '" class="modal fade" role="dialog" tabindex="-1" aria-labelledby="myModalLabel" aria-hidden="true"  style="margin-top:'+o.top+'px">'
		+'<div class="modal-dialog"  style="width:' + o.width + 'px;height:' + o.height + 'px;top-margin:'+o.top+'px;"><div class="modal-content">'
		+'<div class="modal-header"><button type="button" class="close"  data-dismiss="modal" aria-hidden="true">×</button>'+o.title+'</div>'
		+ '<div class="modal-body" >'+msgcontent+'</div>'
		+'<div class="modal-footer"><button type="button" class="btn btn-primary" data-dismiss="modal">关闭</button></div>';
		+' </div> </div></div>';
		$("body").append(dhtml);
		
	};