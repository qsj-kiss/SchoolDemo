/**
	金格签章插件
	@author James,25708164@qq.com;
	@date  2017-06-08
 */

	iSignatureInit = function(options){
		  
		var dOptions = {		//options 默认值设置
				fieldXml:'',	
				divId:'qzDiv',							
				isAutoSave:true,
				extParam:'',
				extParam1:'',
				extParam2:''
		};
		
		
		if(typeof(options.divId)!='undefined'){
			dOptions.divId = options.divId;
		}		
		
		if(typeof(options.isAutoSave)!='undefined'){
			dOptions.isAutoSave = options.isAutoSave;
		}	
		
		if(typeof(options.isAutoSave)!='undefined'){
			dOptions.isAutoSave = options.isAutoSave;
		}			
		
		console.debug(dOptions);
		
		SignatureControl.FieldXml=dOptions.fieldXml;
		SignatureControl.DivId=dOptions.divId;                             	//设置签章位置是相对于哪个标记的什么位置 
		SignatureControl.AutoSave =dOptions.isAutoSave;
		SignatureControl.UserName=dOptions.userName;          	//文件版签章用户
	  	SignatureControl.ExtParam = dOptions.extParam;
		SignatureControl.ExtParam1 = dOptions.extParam1;
		SignatureControl.ExtParam2 = dOptions.extParam2;
		SignatureControl.RunSignature();                        				 //执行签章操作
	};
