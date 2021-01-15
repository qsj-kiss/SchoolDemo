/**
	基于Layer的扩展方法，
	适用于JQuery Ui 1.10.x 以上版本
	layer-v2.4 以上版本
	@author James,25708164@qq.com;
	@date  2016-11-22
 */
/**
 * options顺序
 * 0、icon 1 成功  0 失败
 * 1、msg
 * 2、callback 方法
 */
jQuery.layerAlert = function(options){
	var title;
	if(options[0]==1){
		title='系统提示';
	}else{
		title='<font color="red">错误提示</font>';
	}
	layer.alert(options[1],{
		title:title,
		icon:options[0],
		yes:function(index){
			if(options[2]){
				for(var i=0;i<options[2].length;i++){
		    		try{
			    		if (options[2][i] && typeof(options[2][i]) == "function") {
			    			options[2][i]();
			    		}
		    		}catch(e){
		    			return false;
		    		}
				}
			}
			layer.close(index);
		}
	});
};
