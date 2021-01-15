/**
 * 基于Webupload的文件上传 js V0.1
 * 实现：
 * 1、同一个页面实现多个单一文件上传同时存在
 * 2、自定义缩略图尺寸
 * 3、自定义上传成功后文件接收对象，缩略图显示对象等
 * 4、断点续传
 * @author James，25708164@qq.com
 * @date 2016-12-7
 * @since 依赖 jQuery 1.9以上， Webupload  0.1.5，bootstrap3
 * @param $
 * 修改  吴滔 2019-03-05 修改成功和错误的提示语
 */

//默认值
var defaultOptions = {
		auto:false,
		url:'',	
		fileNumLimit:10,							
		fileSizeLimit:200 * 1024 * 1024,
		fileSingleSizeLimit:50 * 1024 * 1024,
		uploader:'Uploader',
		runtimeOrder:'html5,flash',
		btn:'btn_upload',
		filePicker:'filePicker',
		fileName:'fileName',
		fileSize:'fileSize',
		filePath:'filePath',
		fileList:'fileList',
		fileType:'fileType',
		loading:'loading',
		md5:'',
		srpp:'',										//swf文件路径前段，
		ctx:'',											//上下文context
		formData:{},								//其他参数
		accept:{															//上传文件格式限制
	           title: 'Images',	
	           extensions: 'gif,jpg,jpeg,bmp,png',
	           //mimeTypes: 'image/jpg,image/jpeg,image/png'
	       },
		successCallback:null,
		compress: false,//不启用压缩
		resize: false,//尺寸不改变
};


//单张图片上传options 默认值
var signleImageDefaultOptions = function(){
	defaultOptions['thumb']='thumb';
	defaultOptions['thumbWidth']=40;
	defaultOptions['thumbHeight']=40;
	return defaultOptions;
};

//单张图片上传options 默认值
var multiImagesDefaultOptions = function(){
		return defaultOptions;
};


//单张图片上传options 默认值
var signFileDefaultOptions = function(){
	defaultOptions['newName']='';
	defaultOptions['uploadFolder'] = '';
	defaultOptions['accept'] = {									//上传文件格式限制
        title: 'Images',	
        extensions: 'gif,jpg,jpeg,bmp,png,pcgt,pcgz',
        mimeTypes: 'image/jpg,image/jpeg,image/png'
    };
	return defaultOptions;
};


//单个文件分块上传默认值
var chunkFileDefaultOptions= function() {		//options 默认值设置
		defaultOptions['runtimeOrder']='flash';
		defaultOptions['chunked']=true;
		defaultOptions['chunkSize']=5242880;
		defaultOptions['chunkRetry']=2;
		defaultOptions['threads']=3;
		defaultOptions['hint']='webUploadHint';
		defaultOptions['isBidAtta']=false;
		defaultOptions['bidAttaUploadBtn']='bidAttaUploadBtn';
		defaultOptions['newName']='';
		defaultOptions['uploadFolder'] = '';
		return defaultOptions;
};

//设置参数
//采用$.extend()来优化，一行代码的事情 by肖佳
var setOptions = function(options,dOptions){
	var combOption=$.extend({},dOptions,options)
	return combOption;
	/*if(typeof(options.auto)!='undefined'){
		dOptions.auto = options.auto;
	}
	
	if(typeof(options.url)!='undefined'){
		dOptions.url = options.url;
	}
	
	if(typeof(options.fileNumLimit)!='undefined'){
		dOptions.fileNumLimit = options.fileNumLimit;
	}
	
	if(typeof(options.fileSizeLimit)!='undefined'){
		dOptions.fileSizeLimit = options.fileSizeLimit;
	}
	
	if(typeof(options.fileSingleSizeLimit)!='undefined'){
		dOptions.fileSingleSizeLimit = options.fileSingleSizeLimit;
	}
	
	if(typeof(options.uploader)!='undefined'){
		dOptions.uploader = options.uploader;
	}
	
	if(typeof(options.btn)!='undefined'){
		dOptions.btn = options.btn;
	}
	
	if(typeof(options.filePicker)!='undefined'){
		dOptions.filePicker = options.filePicker;
	}
	
	if(typeof(options.fileSize)!='undefined'){
		dOptions.fileSize = options.fileSize;
	}
	
	if(typeof(options.fileName)!='undefined'){
		dOptions.fileName = options.fileName;
	}
	
	if(typeof(options.thumb)!='undefined'){
		dOptions.thumb = options.thumb;
	}else{
		dOptions.thumb = "";
	}
	
	if(typeof(options.hint)!='undefined'){
		dOptions.hint = options.hint;
	}
	
	if(typeof(options.isBidAtta)!='undefined'){
		dOptions.isBidAtta = options.isBidAtta;
	}
	
	if(typeof(options.thumbWidth)!='undefined'){
		dOptions.thumbWidth = options.thumbWidth;
	}
	
	if(typeof(options.thumbHeight)!='undefined'){
		dOptions.thumbHeight = options.thumbHeight;
	}
	
	if(typeof(options.filePath)!='undefined'){
		dOptions.filePath = options.filePath;
	}
	
	if(typeof(options.fileList)!='undefined'){
		dOptions.fileList = options.fileList;
	}
	
	if(typeof(options.srpp)!='undefined'){
		dOptions.srpp = options.srpp;
	}
	
	if(typeof(options.ctx)!='undefined'){
		dOptions.ctx = options.ctx;
	}
	
	if(typeof(options.formData)!='undefined'){
		dOptions.formData = options.formData;
	}
	
	if(typeof(options.accept)!='undefined'){
		dOptions.accept = options.accept;
	}

	
	if(typeof(options.fileType)!='undefined'){
		dOptions.fileType = options.fileType;
	}
	
	if(typeof(options.loading)!='undefined'){
		dOptions.loading = options.loading;
	}
	
	if(typeof(options.md5)!='undefined'){
		dOptions.md5 = options.md5;
	}
	
	if(typeof(options.newName)!='undefined'){
		dOptions.newName = options.newName;
	}
	
	if(typeof(options.runtimeOrder)!='undefined'){
		dOptions.runtimeOrder = options.runtimeOrder;
	}
	
	if(typeof(options.uploadFolder)!='undefined'){
		dOptions.uploadFolder = options.uploadFolder;
	}
	
	if(typeof(options.loading)!='undefined'){
		dOptions.loading = options.loading;
	}
	
	if(typeof(options.prepareNextFile)!='undefined'){
		dOptions.prepareNextFile = options.prepareNextFile;
	}
	
	if(typeof(options.duplicate)!='undefined'){
		dOptions.duplicate = options.duplicate;
	}
	
	if(typeof(options.successCallback)=="function" ){
		dOptions.successCallback = options.successCallback;
	}
	
	if(typeof(options.isBidAtta)!='undefined'){
		dOptions.isBidAtta = options.isBidAtta;
	}
	console.log("dOptions")
	console.log(dOptions);
	return dOptions;*/
};

// 判断浏览器是否支持图片的base64
var isSupportBase64 = ( function() {
    var data = new Image();
    var support = true;
    data.onload = data.onerror = function() {
        if( this.width != 1 || this.height != 1 ) {
            support = false;
        }
    };
    data.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
    return support;
} )();

//检测是否安装了Flash插件
var flashVersion = ( function() {
    var version;
    try {
        version = navigator.plugins[ 'Shockwave Flash' ];
        version = version.description;
    } catch ( ex ) {
        try {
            version = new ActiveXObject('ShockwaveFlash.ShockwaveFlash')
                    .GetVariable('$version');
        } catch ( ex2 ) {
            version = '0.0';
        }
    }
    version = version.match( /\d+/g );
    return parseFloat( version[ 0 ] + '.' + version[ 1 ], 10 );
} )();


//检测Flash安装情况，提示安装或者错误信息
var installFlash = function(container,state) {
    window['expressinstallcallback'] = function( state ) {
        switch(state) {
            case "Download.Cancelled" :
            	alert("安装被取消");
                break;
            case "Download.Failed" :
            	alert("安装失败");
                break;
            default:
                alert('安装已成功，请刷新！');
                break;
        };
        delete window['expressinstallcallback'];
    };

    var swf = dOptions.srpp+'/plugins/webupload/expressInstall.swf';
    
    var html = '<object type="application/x-shockwave-flash" data="' +  swf + '" ';

    if (WebUploader.browser.ie) {
        html += 'classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" ';
    }

    html += 'width="100%" height="100%" style="outline:0">'  +
        '<param name="movie" value="' + swf + '" />' +
        '<param name="wmode" value="transparent" />' +
        '<param name="allowscriptaccess" value="always" />' +
    '</object>';

    container.html(html);
};


// 判断浏览器是否支持图片的base64
var isSupportBase64 =  function() {
    var data = new Image();
    var support = true;
    data.onload = data.onerror = function() {
        if( this.width != 1 || this.height != 1 ) {
            support = false;
        }
    };
    data.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
    return support;
};


//错误提示方法 
// 2019-03-05，wy修改
var errorMsg = function(type,options){
	console.debug("error type-->"+type);
 	if('F_DUPLICATE'==type){						//文件重复选中
 		alert('此文件已在上传文件清单中');
 		return false;
 	}

 	if('F_EXCEED_SIZE'==type){						//文件重复选中
		alert('文件超过允许上传大小，不能上传'
		+'\n单个文件大小最大允许：'+$.calcSize(options.fileSingleSizeLimit)
		+'\n总文件大小最大允许：'+$.calcSize(options.fileSizeLimit));
 		return false;
 	}
 	
 	if('Q_EXCEED_SIZE_LIMIT'==type){		//单个文件大小超过
 		alert('文件超过允许上传大小，不能上传'
 				+'\n单个文件大小最大允许：'+$.calcSize(options.fileSingleSizeLimit)
 				+'\n总文件大小最大允许：'+$.calcSize(options.fileSizeLimit));
 		return false;
 	}
 	
 	if('Q_TYPE_DENIED'==type){
 		alert('选中文件是不允许上传的文件格式');
 		return false;
 	}
 	
 	if('Q_EXCEED_NUM_LIMIT'==type){
 		alert('超过了允许上传文件个数');
 		return false;
 	}
 	return true;
};


/**
 * 计算文件MD5时，可以使用此参数，对参数设定范围内的值进行MD5，而无需全文件进行MD5
 * 这样，提高MD5的计算效率，特别是遇到大文件时
 * 但注意：此方法是对范围文件进行部分MD5，而非全文件
 * 所以，上传后的文件如果要进行MD5比较时，也只能是选择同样区域范围的进行比较
 */
var md5blocksize = 10*1024*1024;	

/**
 * 根据传入options参数，生成最终实例化Webuploader对象的参数
 */
var uploaderOptions = function(options){
	var newOptions = {};
	newOptions['auto']=false;
	newOptions['pick']='#'+options.filePicker;
	newOptions['fileNumLimit']=options.fileNumLimit;							//允许上传文件总数限制
	newOptions['fileSizeLimit']=options.fileSizeLimit;								//全部文件大小限制，最小单位KB
	newOptions['fileSingleSizeLimit']=options.fileSingleSizeLimit;		//单个文件大小限制，最小单位KB 
	newOptions['swf']=options.srpp+'/plugins/webupload/Uploader.swf';
	newOptions['formData']=options.formData;
	newOptions['runtimeOrder']=options.runtimeOrder;
	newOptions['chunked']=options.chunked;
	newOptions['server']=options.url;															//向服务器发送请求的路径
	newOptions['method']=options.method;
	newOptions['accept']=options.accept;													//定义可发送的文件后缀  minetype等
	newOptions['duplicate']=options.duplicate;
	newOptions['chunked']=options.chunked;
	newOptions['chunkSize']=options.chunkSize;
	newOptions['chunkRetry']=options.chunkRetry;
	newOptions['threads']=options.threads;
	newOptions['compress']=options.compress;
	newOptions['resize']=options.resize;
	return newOptions;
};

/**
 * 上传单个文件
 * 支持缩略图
 */
jQuery.uploaderCustom = function(options){
//	console.debug(options);
	var fileCount = 0;			//添加文件总数
	var defaultOptions = signleImageDefaultOptions();
	var dOptions = setOptions(options,defaultOptions);

	var $wrap = $('#'+dOptions.uploader);		//上传容器对象
	var $uploadBtn = $('#'+dOptions.btn);		//上传按钮对象
	var $filePath = $('#'+dOptions.filePath);		//上传文件路径结果接收对象
	var $fileList = $('#'+dOptions.fileList);				//缩略图显示对象
	var $thumb = $('#'+dOptions.thumb);				//缩略图值保存对象
	var $fileSize = $('#'+dOptions.fileSize);		//文件大小	
	var $fileName =  $('#'+dOptions.fileName);
	 
// 优化retina, 在retina下这个值是2
//    var ratio = window.devicePixelRatio || 1;

    // 缩略图大小
//    var thumbnailWidth = dOptions.thumbWidth * ratio;
//    var thumbnailHeight = dOptions.thumbHeight * ratio;
//    var state = 'pedding';
    
    isSupportBase64();
    
    //判断是否支持Flash
    if ( !WebUploader.Uploader.support('flash') && WebUploader.browser.ie ) {
        if (flashVersion) {
     	   installFlash($wrap);
        } else {
            $wrap.html('<a href="http://www.adobe.com/go/getflashplayer" target="_blank" border="0"><img alt="get flash player" src="http://www.adobe.com/macromedia/style_guide/images/160x41_Get_Flash_Player.jpg" /></a>');
        }
        return;
    } else if (!WebUploader.Uploader.support()) {
        alert( 'Web Uploader 不支持您的浏览器！');
        return;
    }
   
   //实例化uploader
  var uploader = WebUploader.create(uploaderOptions(dOptions))
  	.on('fileQueued', function( file ) {
	    $fileList.empty().html('<img src="' + dOptions.srpp +'/img/loading_02.gif"  />');
	   	$thumb.val('');
		 $fileSize.val('0');
		 $fileName.val('');
		 fileCount ++;

		  if(dOptions.thumb!=""){		//生成缩略图
		      uploader.makeThumb( file, function( error, ret ) {
		          if ( error ) {
		             $fileList.text('生成缩略图失败');
		          } else {
		        	  $fileList.empty().html('<img src="' + ret +'"  style="width:'+dOptions.thumbWidth+'px;height:'+dOptions.thumbHeight+'px;" class="img-circle" />');
		        	  $uploadBtn.button('点击上传');
		          }
		      });
		  }else{
			  $fileList.empty().html(file.name);
		  }
   }).on('uploadProgress',function(file,response){
	   $fileList.empty().html('<img src="' + dOptions.srpp +'/img/loading_02.gif"  />');
   }).on('uploadSuccess',function(file,response){
   	 $filePath.val(dOptions.ctx+'/'+response.filePath);
   	 $filePath.trigger("change");		//触发其change事件
	 $fileSize.val(response.size);
   	 $fileName.val(response.name);
   	 
   	 $uploadBtn.button('reset').delay(500).queue(function() {
   	   	 if(dOptions.thumb!=""){
   	   		 $thumb.val(dOptions.ctx+'/'+response.thumbPath);
   	   		 $fileList.empty().html('<img src="'+dOptions.ctx+'/'+response.thumbPath+'" style="width:'+dOptions.thumbWidth+'px;height:'+dOptions.thumbHeight+'px;" class="img-circle" />');
   	   	 }else{
   	   		 $fileList.empty().html(file.name+"<font style='color:blue'>上传成功！</font>");
   	   	 }
         $(this).dequeue(); 
       });
   	 
   	 uploader.removeFile(file);		//上传成功后移除文件，同一个文件可以重复上传
   	 fileCount = 0;
   	 
   }).on('uploadError',function(file,response){
	  	$uploadBtn.button('reset');
	  	$fileList.empty().html(file.name+"<font style='color:red'>上传失败！</font>");
	   	fileCount = 0;
	   	uploader.removeFile(file);		//上传成功后移除文件，同一个文件可以重复上传
   }).on( 'error', function( type ) {
	 	errorMsg(type,options);
});
  
  //上传按钮click事件
  $uploadBtn.on('click',function(){
	  if(fileCount>0){
			$(this).button('loading');
	  		uploader.upload();
	  }
  });
  
  return uploader;
};
/**
 * 单文件上传（上传一次）（HL测试）
 * 支持缩略图
 */
jQuery.uploaderOnce = function(options){
//	console.debug(options);
    var fileCount = 0;			//添加文件总数
    var defaultOptions = signleImageDefaultOptions();
    var dOptions = setOptions(options,defaultOptions);

    var $wrap = $('#'+dOptions.uploader);		//上传容器对象
    var $uploadBtn = $('#'+dOptions.btn);		//上传按钮对象
    var $filePath = $('#'+dOptions.filePath);		//上传文件路径结果接收对象
    var $fileList = $('#'+dOptions.fileList);				//缩略图显示对象
    var $thumb = $('#'+dOptions.thumb);				//缩略图值保存对象
    var $fileSize = $('#'+dOptions.fileSize);		//文件大小
    var $fileName =  $('#'+dOptions.fileName);

// 优化retina, 在retina下这个值是2
//    var ratio = window.devicePixelRatio || 1;

    // 缩略图大小
//    var thumbnailWidth = dOptions.thumbWidth * ratio;
//    var thumbnailHeight = dOptions.thumbHeight * ratio;
//    var state = 'pedding';

    isSupportBase64();

    //判断是否支持Flash
    if ( !WebUploader.Uploader.support('flash') && WebUploader.browser.ie ) {
        if (flashVersion) {
            installFlash($wrap);
        } else {
            $wrap.html('<a href="http://www.adobe.com/go/getflashplayer" target="_blank" border="0"><img alt="get flash player" src="http://www.adobe.com/macromedia/style_guide/images/160x41_Get_Flash_Player.jpg" /></a>');
        }
        return;
    } else if (!WebUploader.Uploader.support()) {
        alert( 'Web Uploader 不支持您的浏览器！');
        return;
    }

    //实例化uploader
    var uploader = WebUploader.create(uploaderOptions(dOptions))
        .on('fileQueued', function( file ) {
            $fileList.empty().html('<img src="' + dOptions.srpp +'/img/loading_02.gif"  />');
            $thumb.val('');
            $fileSize.val('0');
            $fileName.val('');
            fileCount ++;

            if(dOptions.thumb!=""){		//生成缩略图
                uploader.makeThumb( file, function( error, ret ) {
                    if ( error ) {
                        $fileList.text('生成缩略图失败');
                    } else {
                        $fileList.empty().html('<img src="' + ret +'"  style="width:'+dOptions.thumbWidth+'px;height:'+dOptions.thumbHeight+'px;" class="img-circle" />');
                        $uploadBtn.button('点击上传');
                    }
                });
            }else{
                $fileList.empty().html(file.name);
            }
        }).on('uploadProgress',function(file,response){
            $fileList.empty().html('<img src="' + dOptions.srpp +'/img/loading_02.gif"  />');
        }).on('uploadSuccess',function(file,response){
            $filePath.val(dOptions.ctx+'/'+response.filePath);
            $filePath.trigger("change");		//触发其change事件
            $fileSize.val(response.size);
            $fileName.val(response.name);

            $uploadBtn.button('reset').delay(500).queue(function() {
                if(dOptions.thumb!=""){
                    $thumb.val(dOptions.ctx+'/'+response.thumbPath);
                    $fileList.empty().html('<img src="'+dOptions.ctx+'/'+response.thumbPath+'" style="width:'+dOptions.thumbWidth+'px;height:'+dOptions.thumbHeight+'px;" class="img-circle" />');
                }else{
                    $fileList.empty().html(file.name+"<font style='color:blue'>上传成功！</font>");
                }
                $(this).dequeue();
            });

            uploader.removeFile(file);		//上传成功后移除文件，同一个文件可以重复上传
            fileCount = 0;

        }).on('uploadError',function(file,response){
            $uploadBtn.button('reset');
            $fileList.empty().html(file.name+"<font style='color:red'>上传失败！</font>");
            fileCount = 0;
            uploader.removeFile(file);		//上传成功后移除文件，同一个文件可以重复上传
        }).on( 'error', function( type ) {
            errorMsg(type,options);
        }).on('beforeFileQueued',function () {//清除队列中的待上传文件
            uploader.reset();
            uploader.refresh();
        });

    //上传按钮click事件
    $uploadBtn.on('click',function(){
        if(fileCount>0){
            $(this).button('loading');
            uploader.upload();
        }
    });

    return uploader;
};


/**
 * 上传单个文件，不用生成缩略图
 */
jQuery.uploaderSingleFile = function(options){
	var fileCount = 0;			//添加文件总数
	var defaultOptions = signFileDefaultOptions();
	var dOptions = setOptions(options,defaultOptions);
//	console.debug(dOptions);

	var $wrap = $('#'+dOptions.uploader);		//上传容器对象
	var $uploadBtn = $('#'+dOptions.btn);		//上传按钮对象
	var $filePath = $('#'+dOptions.filePath);		//上传文件路径结果接收对象
	var $fileSize = $('#'+dOptions.fileSize);		//文件大小	
	var $fileName =  $('#'+dOptions.fileName);
	var $fileList =  $('#'+dOptions.fileList);
	var $fileType=$('#'+dOptions.fileType);
	var $fileMd5 = $('#'+dOptions.md5);
	var $uploadFolder = $('#'+dOptions.uploadFolder);
	var $newName = $('#'+dOptions.newName);
	var $progress = $fileList.find('#bidFileProgress');
    isSupportBase64();
    
    //判断是否支持Flash
    if ( !WebUploader.Uploader.support('flash') && WebUploader.browser.ie ) {
        if (flashVersion) {
     	   installFlash($wrap);
        } else {
            $wrap.html('<a href="http://www.adobe.com/go/getflashplayer" target="_blank" border="0"><img alt="get flash player" src="http://www.adobe.com/macromedia/style_guide/images/160x41_Get_Flash_Player.jpg" /></a>');
        }
        return;
    } else if (!WebUploader.Uploader.support()) {
        alert( 'Web Uploader 不支持您的浏览器！');
        return;
    }
   
   //实例化uploader
    var uploader = WebUploader.create(uploaderOptions(dOptions))
    .on('fileQueued', function( file ) {
    	 $fileSize.val('0');
		 $fileName.val('');
		 fileCount ++;
		 //对文件大小进行校验
		 var fileSize_M=( file.size/(1024*1024) ).toFixed(2);
		 if(  dOptions.isBidAtta==true && fileSize_M>20){
			 alert("当前文件大小超过20M，推荐使用超大文件断点续传功能")
		 }
		 var hint_fileSize =$.calcSize(file.size);
		 //$fileList.empty().html(file.name+"<font style='color:blue'>等待上传！</font>");
		 var fileHtml=  '<tr >'+
							'<td class="col-xs-4" id="bidFileName"></td>'+
							'<td class="col-xs-2" id="bidFileName">'+hint_fileSize+'</td>'+
							'<td class="col-xs-3" > '+
								'<div class="progress" style="">'+
									'<div  id="bidFileProgress" class="progress-bar progress-bar-striped active " role="progressbar"  aria-valuemin="0" aria-valuemax="100" style="width:0%">'+
										'0%'+
									 '</div>'+
								'</div>'+
							'</td>'+
							'<td class="col-xs-2" id="bidFileStatus"></td>'+
						'</tr>';
		 $fileList.html(fileHtml);
		 $('#bidFileName').html(file.name);
		 $('#bidFileStatus').html("<font style=''>等待上传！</font>");
   }).on('uploadSuccess',function(file,response){
	    console.log(response);
	   	//$fileList.empty().html('<img src="' + dOptions.srpp +'/img/loading_02.gif"  />');
//   	console.debug(ctx+"/"+response.filePath);
	   	 $filePath.val(dOptions.ctx+'/'+response.filePath);
	   	 $filePath.trigger("change");													//触发其change事件
		 $fileSize.val(response.size);
	   	 $fileName.val(response.name);
	     $fileType.val(response.type);
	     $uploadFolder.val(response.uploadFolder);
	     $newName.val(response.newName);
   	
	     //XXX
	     //md5码应该放在上传之前  之后再优化为【WebUploader.Uploader.register】来注册上传前的方法
	     if(dOptions.md5!=""){	//判断是否要md5	  
	    	 $('#bidFileProgress').html("md5");
 	 		$('#bidFileStatus').html("<font style='color:blue'>文件校验中，请稍等</font>");
		   	 // 生成文件MD5信息，可用于文件在上传前后的MD5校验
		       this.md5File(file).progress(function(percentage) {
		    	   	console.log('md5 Percentage:', percentage);		//及时进度反馈
		    	   	var _width=Math.round((100*percentage).toFixed(0))+"%";
		    		$('#bidFileProgress').width(_width).html(_width);
		         }) .then(function(ret) {
		        	 console.log('md5 result:', ret);
		        	 $fileMd5.val(ret);
		        	 
		        	 $uploadBtn.button('reset').delay(500).queue(function() {
		        	 		$('#bidFileProgress').removeClass("progress-bar-striped").addClass("progress-bar-success").html("成功");
		        	 		$('#bidFileStatus').html("<font style='color:green'>上传成功！</font>");
		        	 		$(this).dequeue(); 
		            });
		        	 	
		        	 	fileCount = 0;
		        	 	
		        	 	if(typeof dOptions.successCallback == "function"){
		        	 		(dOptions.successCallback)()
		        	 	}
		        });
		  }else{
			  
			  $uploadBtn.button('reset').delay(500).queue(function() {
		   	 		$('#bidFileProgress').removeClass("progress-bar-striped").addClass("progress-bar-success").html("成功");
		   	 		$('#bidFileStatus').html("<font style='color:green'>上传成功！</font>");
		   	 		$(this).dequeue(); 
		       });
		   	 	
		   	 	fileCount = 0;
		   	 	
		   	 	if(typeof dOptions.successCallback == "function"){
		   	 		(dOptions.successCallback)()
		   	 	}
			  
		  }
	  
	     //结束的回调函数，暂时放到md5分析成功后
   	 	/*$uploadBtn.button('reset').delay(500).queue(function() {
   	 		//$fileList.empty().html(file.name+"<font style='color:blue'>上传成功！</font>");
   	 		$('#bidFileProgress').removeClass("progress-bar-striped").addClass("progress-bar-success").html("complete");
   	 		$('#bidFileStatus').html("<font style='color:green'>上传成功！</font>");
   	 		$(this).dequeue(); 
       });
   	 	
   	 	fileCount = 0;
   	 	
   	 	if(typeof dOptions.successCallback == "function"){
   	 		(dOptions.successCallback)()
   	 	}*/
   	 	
   }).on('uploadProgress',function(file,response){
	   //$fileList.empty().html('<img src="' + dOptions.srpp +'/img/loading_02.gif"  />');
	   var _width=Math.round(100*(response).toFixed(0))+"%";
	   $('#bidFileProgress').width(_width).html(_width);;
   }).on('uploadError',function(file,response){
	  	$uploadBtn.button('reset');
	  	//$fileList.empty().html(file.name+"<font style='color:red'>上传失败！</font>");
		 $('#bidFileStatus').html("<font style='color:red'>上传失败！</font>");
	   	fileCount = 0;
   }).on( 'error', function( type ) {
	   errorMsg(type,options);
});
  
  //上传按钮click事件
  $uploadBtn.on('click',function(){
	  if(fileCount>0){
			$(this).button('loading');
	  		uploader.upload();
	  }
  });
  
  return uploader;
};



/**
 * 多文件上传
 * 不支持缩略图的生成
 */
jQuery.uploaderMulitFiles = function(options){
  /**
   * 将当前uploader 赋值给 uploaderThis，在后续的回调方法中直接使用uploaderThis 作为uploader对象
   */
	var uploaderThis;
	var fileCount = 0;			//添加文件总数
	var defaultOptions = multiImagesDefaultOptions();
	var dOptions = setOptions(options,defaultOptions);
	
	var $wrap = $('#'+dOptions.uploader);		//上传容器对象
	var $uploadBtn = $('#'+dOptions.btn);		//上传按钮对象
	var $fileList =  $('#'+dOptions.fileList);
	var $loading=$('#'+dOptions.loading);
	
	
	isSupportBase64();
    
    //判断是否支持Flash
    if ( !WebUploader.Uploader.support('flash') && WebUploader.browser.ie ) {
        if (flashVersion) {
     	   installFlash($wrap);
        } else {
            $wrap.html('<a href="http://www.adobe.com/go/getflashplayer" target="_blank" border="0"><img alt="get flash player" src="http://www.adobe.com/macromedia/style_guide/images/160x41_Get_Flash_Player.jpg" /></a>');
        }
        return;
    } else if (!WebUploader.Uploader.support()) {
        alert( 'Web Uploader 不支持您的浏览器！');
        return;
    }
   
  //实例化uploader
	var uploader = WebUploader.create(uploaderOptions(dOptions))
	.on('beforeFileQueued',function(file){
		var fileNamePrefix=file.name.slice(0,file.name.lastIndexOf('.'));
		if(fileNamePrefix.length>64){
			alert('附件名称长度最多64位！');
			return false;
		}
	})
    .on('fileQueued', function( file ) {										//文件加入队列回调方法
	   $loading.show();
	  uploaderThis = this;
	  fileCount ++;
	  var fileRow;
	  var fileSize =$.calcSize(file.size);
	  var md5Row="";
	  if(dOptions.md5!=""){	//判断是否要md5	  
			md5Row='<td id="fileMd5_'+file.id+'" class="col-xs-1" ></td>';
	  }
	  //生成文件队列清单
	  fileRow = '<tr id="fileRow_'+file.id+'">'+
				  '<td class="col-xs-3" id="fileRow_'+file.id+'">'+file.name+'</td>'+
				  '<td class="col-xs-1" id="fileSize_'+file.id+'">'+fileSize+'</td>'+
				  '<td class="col-xs-3" > '+
					  	'<div class="progress" >'+
						  	'<div  id="fileProgress_'+file.id+'" class="progress-bar progress-bar-striped active " role="progressbar"  aria-valuemin="0" aria-valuemax="100" style="width:0%">'+
						   		'0%'+
						 	'</div>'+
						'</div>'+
				  '</td>'+
				  '<td class="col-xs-2" id="fileStatus_'+file.id+'">'+'等待上传'+'</td>'+
				  '<td class="col-xs-1" id="fileOp_'+file.id+'" class="pull-left">'+
				  		'<a  href="javascript:" id="'+file.id+'" class="remove-this">移除</a>'+
				  '</td>'+
				  md5Row+
	  			'</tr>';

	  $fileList.append(fileRow);
	 
	  if(dOptions.md5!=""){	//判断是否要md5	  	       
		   	 // 生成文件MD5信息，可用于文件在上传前后的MD5校验
				 uploaderThis.md5File(file).progress(function(percentage) {
//			    	   	console.log('Percentage:', percentage);		//及时进度反馈
			    	  	$('#fileMd5_'+file.id).html("完成:"+percentage+"%");
			         }) .then(function(ret) {
//			        	 console.debug("ret-->"+ret);
			        	$('#fileMd5_'+file.id).html(ret);
			        });
		  }
	  
	 //将文件移除队列
	 $('.remove-this').unbind().click(function(){
		 //uploaderThis.removeFile(uploaderThis.getFile($(this).attr("id")));
		 uploaderThis.cancelFile(uploaderThis.getFile($(this).attr("id")));
	 });
	 
	 $loading.hide();
   }).on('startUpload',function(){															//开始上传时触发
	   $loading.show();
	   $uploadBtn.button('loading');
  }).on('uploadFinished',function(){														//所有文件上传结束时触发
	   	 $uploadBtn.button('reset').delay(500).queue(function() {		//重置上传按钮状态
	         $(this).dequeue(); 
	      });
	   	$loading.hide();
  }).on('uploadSuccess',function(file,result){					//文件上传成功回调方法
	  uploaderThis = this;
	  var res = false;
	  if(result.returnCode){
		  if((result.returnCode).toLowerCase()=='success'){
			  $('#fileStatus_'+file.id).html('<font color="green">上传成功！</font>');
			  $('#fileOp_'+file.id).empty();
			  $('#fileProgress_'+file.id).removeClass("progress-bar-striped").addClass("progress-bar-success").html("成功");
			  res = true;
			 	if(typeof dOptions.successCallback == "function"){
        	 		(dOptions.successCallback)(result)
        	 	}
			  return;
		  }
	  }
	  
	  if(!res){
		  var errMsg = "上传失败";
		  
		  try {
			  eval(result);
			  errMsg = result.msg;
		  }catch(e) {
			  errMsg = '上传失败';
		  }
			  
//		  console.debug(result);
		  $('#fileStatus_'+file.id).html('<font color="red">'+errMsg+'</font>'); 
		  $('#fileOp_'+file.id).html('<font color="blue"><a  href="javascript:"   id="'+file.id+'" class="retry-this">重传</a></font>');
		  $('#fileProgress_'+file.id).removeClass("progress-bar-striped").addClass("progress-bar-danger").html("失败");
		  //重传绑定事件
		 $('.retry-this').unbind().click(function(){
			 uploaderThis.retry(uploaderThis.getFile($(this).attr("id")));
		 });
	  }
   }).on('uploadError',function(file,response){						//文件上传失败回调方法
	   uploaderThis = this;
	   $('#fileStatus_'+file.id).html('<font color="red">上传失败！</font>'); 
	   $('#fileOp_'+file.id).html('<font color="blue"><a  href="javascript:"   id="'+file.id+'" class="retry-this">重传</a></font>');
	   $('#fileProgress_'+file.id).removeClass("progress-bar-striped").addClass("progress-bar-danger").html("失败");
	   //重传绑定事件
		 $('.retry-this').unbind().click(function(){
			 uploaderThis.retry(uploaderThis.getFile($(this).attr("id")));
			 $('#fileProgress_'+file.id).removeClass("progress-bar-danger").addClass("progress-bar-striped").html("");
		 });
   }).on('fileDequeued',function(file){										//文件移除队列后回调事件
	   	fileCount --;
	   	$('#fileRow_'+file.id).remove();
   }).on( 'uploadComplete', function( file ) {							//文件上传完成后的触发事件
	   $loading.hide();
	   console.log("complete")
   }).on( 'uploadProgress', function( file,percentage) {
	   uploaderThis = this;
	   $('#fileStatus_'+file.id).html('<font color="blue">正在上传...</font>');
	   $('#fileOp_'+file.id).html('<font color="blue"><a  href="javascript:"   id="'+file.id+'" class="cancel-this">取消</a></font>');
	   $('#fileProgress_'+file.id).width(percentage*100+"%").html(Number(percentage*100).toFixed(0)+"%");
	   //取消上传
		 $('.cancel-this').unbind().click(function(){
			 currfile = uploaderThis.getFile($(this).attr("id"));
			 console.debug(currfile);
			 uploaderThis.cancelFile(currfile);
			  //$('#fileStatus_'+currfile.id).html('<font color="green">取消上传</font>'); 
		 });
 }).on( 'error', function( type ) {
	 errorMsg(type,options);
});
  
  //上传按钮click事件
  $uploadBtn.on('click',function(){
	  uploader.upload();
  });
  
  return uploader;
};

/**
 * 多文件上传
 * 不支持缩略图的生成
 */
jQuery.uploaderMulitFiles1 = function(options){
	/**
	 * 将当前uploader 赋值给 uploaderThis，在后续的回调方法中直接使用uploaderThis 作为uploader对象
	 */
	  var uploaderThis;
	  var fileCount = 0;			//添加文件总数
	  var defaultOptions = multiImagesDefaultOptions();
	  var dOptions = setOptions(options,defaultOptions);
	  
	  var $wrap = $('#'+dOptions.uploader);		//上传容器对象
	  var $uploadBtn = $('#'+dOptions.btn);		//上传按钮对象
	  var $fileList =  $('#'+dOptions.fileList);
	  var $loading=$('#'+dOptions.loading);
	  
	  isSupportBase64();
	  
	  //判断是否支持Flash
	  if ( !WebUploader.Uploader.support('flash') && WebUploader.browser.ie ) {
		  if (flashVersion) {
			  installFlash($wrap);
		  } else {
			  $wrap.html('<a href="http://www.adobe.com/go/getflashplayer" target="_blank" border="0"><img alt="get flash player" src="http://www.adobe.com/macromedia/style_guide/images/160x41_Get_Flash_Player.jpg" /></a>');
		  }
		  return;
	  } else if (!WebUploader.Uploader.support()) {
		  alert( 'Web Uploader 不支持您的浏览器！');
		  return;
	  }
	 
	//实例化uploader
	  var uploader = WebUploader.create(uploaderOptions(dOptions))
	  .on('fileQueued', function( file ) {										//文件加入队列回调方法
		 $loading.show();
		uploaderThis = this;
		fileCount ++;
		var fileRow;
		var fileSize =$.calcSize(file.size);
		var md5Row="";
		if(dOptions.md5!=""){	//判断是否要md5	  
			  md5Row='<td id="fileMd5_'+file.id+'" class="col-xs-1" ></td>';
		}
		//生成文件队列清单
		fileRow = '<tr id="fileRow_'+file.id+'">'+
					'<td class="col-xs-3" id="fileRow_'+file.id+'">'+file.name+'</td>'+
					'<td class="col-xs-1" id="fileSize_'+file.id+'">'+fileSize+'</td>'+
					'<td class="col-xs-3" > '+
							'<div class="progress" >'+
								'<div  id="fileProgress_'+file.id+'" class="progress-bar progress-bar-striped active " role="progressbar"  aria-valuemin="0" aria-valuemax="100" style="width:0%">'+
									 '0%'+
							   '</div>'+
						  '</div>'+
					'</td>'+
					'<td class="col-xs-2" id="fileStatus_'+file.id+'">'+'等待上传'+'</td>'+
					'<td class="col-xs-1" id="fileOp_'+file.id+'" class="pull-left">'+
							'<a  href="javascript:" id="'+file.id+'" class="remove-this">移除</a>'+
					'</td>'+
					md5Row+
					'</tr>';
  
		$fileList.append(fileRow);
	   
		if(dOptions.md5!=""){	//判断是否要md5	  	       
				  // 生成文件MD5信息，可用于文件在上传前后的MD5校验
				   uploaderThis.md5File(file).progress(function(percentage) {
  //			    	   	console.log('Percentage:', percentage);		//及时进度反馈
							$('#fileMd5_'+file.id).html("完成:"+percentage+"%");
					   }) .then(function(ret) {
  //			        	 console.debug("ret-->"+ret);
						  $('#fileMd5_'+file.id).html(ret);
					  });
			}
		
	   //将文件移除队列
	   $('.remove-this').unbind().click(function(){
		   //uploaderThis.removeFile(uploaderThis.getFile($(this).attr("id")));
		   uploaderThis.cancelFile(uploaderThis.getFile($(this).attr("id")));
	   });
	   
	   $loading.hide();
	 }).on('startUpload',function(){															//开始上传时触发
		 $loading.show();
		 $uploadBtn.button('loading');
	}).on('uploadFinished',function(){														//所有文件上传结束时触发
			  $uploadBtn.button('reset').delay(500).queue(function() {		//重置上传按钮状态
			   $(this).dequeue(); 
			});
			 $loading.hide();
	}).on('uploadSuccess',function(file,response){					//文件上传成功回调方法
		uploaderThis = this;
		var result = false;
		if(response.returnCode){
			if((response.returnCode).toLowerCase()=='success'){
				$('#fileStatus_'+file.id).html('<font color="green">上传成功！</font>');
				$('#fileOp_'+file.id).empty();
				$('#fileProgress_'+file.id).removeClass("progress-bar-striped").addClass("progress-bar-success").html("上传成功");
				result = true;
				   if(typeof dOptions.successCallback == "function"){
					   (dOptions.successCallback)(response)
				   }
				return;
			}
		}
		
		if(!result){
			var errMsg = "上传失败";
			
			try {
				eval(response);
				errMsg = response.msg;
			}catch(e) {
				errMsg = '上传失败';
			}
				
  //		  console.debug(response);
			$('#fileStatus_'+file.id).html('<font color="red">'+errMsg+'</font>'); 
			$('#fileOp_'+file.id).html('<font color="blue"><a  href="javascript:"   id="'+file.id+'" class="retry-this">重传</a></font>');
			$('#fileProgress_'+file.id).removeClass("progress-bar-striped").addClass("progress-bar-danger").html("上传失败");
			//重传绑定事件
		   $('.retry-this').unbind().click(function(){
			   uploaderThis.retry(uploaderThis.getFile($(this).attr("id")));
		   });
		}
	 }).on('uploadError',function(file,response){						//文件上传失败回调方法
		 console.log("err"+response);
		 uploaderThis = this;
		 $('#fileStatus_'+file.id).html('<font color="red">上传失败！</font>'); 
		 $('#fileOp_'+file.id).html('<font color="blue"><a  href="javascript:"   id="'+file.id+'" class="retry-this">重传</a></font>');
		 $('#fileProgress_'+file.id).removeClass("progress-bar-striped").addClass("progress-bar-danger").html("上传失败");
		 //重传绑定事件
		   $('.retry-this').unbind().click(function(){
			   uploaderThis.retry(uploaderThis.getFile($(this).attr("id")));
			   $('#fileProgress_'+file.id).removeClass("progress-bar-danger").addClass("progress-bar-striped").html("");
		   });
	 }).on('fileDequeued',function(file){										//文件移除队列后回调事件
			 fileCount --;
			 $('#fileRow_'+file.id).remove();
	 }).on( 'uploadComplete', function( file ) {							//文件上传完成后的触发事件
		 $loading.hide();
		 console.log("complete")
	 }).on( 'uploadProgress', function( file,percentage) {
		 uploaderThis = this;
		 $('#fileStatus_'+file.id).html('<font color="blue">正在上传...</font>');
		 $('#fileOp_'+file.id).html('<font color="blue"><a  href="javascript:"   id="'+file.id+'" class="cancel-this">取消</a></font>');
		 $('#fileProgress_'+file.id).width(percentage*100+"%").html(Number(percentage*100).toFixed(0)+"%");
		 //取消上传
		   $('.cancel-this').unbind().click(function(){
			   currfile = uploaderThis.getFile($(this).attr("id"));
			   console.debug(currfile);
			   uploaderThis.cancelFile(currfile);
				//$('#fileStatus_'+currfile.id).html('<font color="green">取消上传</font>'); 
		   });
   }).on( 'error', function( type ) {
	   errorMsg(type,options);
  });
	
	//上传按钮click事件
	$uploadBtn.on('click',function(){
		uploader.upload();
	});
	
	return uploader;
  };

/*****************************以下源文件保留备用***********************************/

/*******************************文件分块上传 begin***************************/
var uuid = "";		//UUID
var _uuid="";       //HOOK中使用的uuid存档
var returnMsg = "";		//  服务端返回消息
var fileMd5 = "";  				//文件MD5 信息
var chunkUploader=""; //上传实例化对象
var thCount=0;
var _md5Status = 0;
//var deferred;
/********************监听分块上传过程中的三个时间点 start ***************************/  
//var uploaderChunkRegister = function(options,uuid){
var uploaderChunkRegister = function(dOptions){
	var $loading =  $('#'+dOptions.loading);
	var $uploadBtn = $('#'+dOptions.btn);	
	var $uploadHint = $('#'+dOptions.hint);
	//console.log(dOptions.loading+uuid);
	 WebUploader.Uploader.register({    
		    "before-send-file":"beforeSendFile",//整个文件上传前  
		    "before-send":"beforeSend",  //每个分片上传前  
		    "after-send-file":"afterSendFile",  //分片上传完毕  
		},  
		{    
		    //时间点1：所有分块进行上传之前调用此函数    
		    beforeSendFile:function(file){
		    	//console.log('beforeSendFile');
		    	$('#'+uuid+'_msg').empty().html("读取文件中....");
		        var deferred = WebUploader.Deferred();    
		        $('#'+uuid+'_progress').addClass("progress-bar-info");
		        try{
		        	var newUploader=new WebUploader.Uploader();
		        	newUploader.md5File(file).progress(function(percentage){  
			        	console.log(percentage);
			        	if(_md5Status==1){
			        		$('#'+uuid+'_msg').empty().html("文件分块处理中...");
				        	var _width=Number(percentage*100).toFixed(0)+"%";
		                	$('#'+uuid+'_progress').width(_width).html(_width);
			        	}else{
			        		newUploader.destroy();
			        		throw "err";
			        		console.log("reject");
			        		//deferred.reject("stopMD5");
			        	}
			        }).then(function(val){    
//			            console.debug("成功获取文件信息..."+val);  
			        	 $('#'+uuid+'_progress').removeClass("progress-bar-info");
			            fileMd5=val;    
			            deferred.resolve();    		 //获取文件信息后进入下一步    
			            //_md5Status=0;//_md5Status状态初始化 只有重新创建实例才会为1
			        }); 
		        }catch(err){
		        	console.log(err);
		        }
		        
		        return deferred.promise();   
		    },    
		    
		    //时间点2：如果有分块上传，则每个分块上传之前调用此函数    
		    beforeSend:function(block){
		    	//$('#'+uuid+'_msg').empty().html("正在上传第"+(block.chunk+1)+"块文件....");
		    	//console.log(block);
		    	$('#'+uuid+'_msg').empty().html("文件上传中...");
		    	
		       var deferred = WebUploader.Deferred();    
	            $.ajax({    
	                type:"POST",    
	                url:"/upload/chunkMark",  //ajax验证每一个分片  
	                data:{
	                	md5:fileMd5,
	                	uuid:uuid,
	                    chunk : block.chunk,
	                    chunks : block.chunks,
	                    end : block.end,
	                    start : block.start,
	                    total : block.total,
	                },    
	                cache: false,  
	                async: false,  // 与js同步  
	                timeout: 1000, //todo 超时的话，只能认为该分片未上传过  
	                dataType:"json",    
	                success:function(response){   
	                	//console.log("upload has success response:"+response);
	                    if(response.returnCode=='FILE_EXIST'){  
	                    	console.log("分块"+block.chunk+"已存在，跳过 ");
	                    	var _width=Math.round(100*(block.chunk+1)/block.chunks).toFixed(0)+"%";
	                    	$('#'+uuid+'_progress').width(_width).html(_width);
	                        deferred.reject();    
	                    }else if(response.returnCode=='FILE_MARK'){ 
	                    	console.log( '第'+(block.chunk+1)+'个文件分块上传成功！');
	                    	var _width=Math.round(100*(block.chunk+1)/block.chunks).toFixed(0)+"%";
	                    	$('#'+uuid+'_progress').width(_width).html(_width);
	                        deferred.resolve();    
	                    } 
	                },
	                error: function(XMLHttpRequest, textStatus, errorThrown) {
	                	console.log("chunk上传错误:"+textStatus);
	                	$('#'+uuid+'_msg').empty().html('<font color="red">第'+(block.chunk+1)+'个文件分块上传出错！</font>');
	                },
	                complete:function(){
	                	//console.log("chunk上传完成");
	                }
	            });    
				
				deferred.resolve();    
				return deferred.promise();  
		    },    
		    
		    //时间点3：所有分块上传成功后调用此函数    
		    afterSendFile:function(file){  
		    	//console.log(" afterSendFile验证文件完整性");
		    	$('#'+_uuid+'_msg').empty().html("验证上传文件完整性....");
	            $.ajax({    
	                type:"POST",    
	                url:"/upload/chunkAllComplete/"+_uuid,  //ajax将所有片段合并成整体  
	                dataType:"json",    
	                data:{    
	                	uuid:_uuid,
	                    md5:fileMd5,  
	                },    
	                success:function(result){  
	                	//console.debug('after...');
	                   if((result.returnCode).toLowerCase()=='success'){
	                	   returnMsg =  '<font color="green">'+result.msg+'</font>';
	                	   $('#'+_uuid+'_progress').removeClass("progress-bar-striped").addClass("progress-bar-success").html("成功");
	                	   $('#'+_uuid+'_op').empty();
	                	   $uploadHint.empty();
	                   }else{
	                	   returnMsg ='<font color="red">'+result.msg+'</font>';
	                	   $('#'+_uuid+'_progress').removeClass("progress-bar-striped").addClass("progress-bar-danger").html("失败");
	          			   //$('.retry-this').show();
	                	   $(".delete2-this").show();
	                	   $uploadHint.html("提示：上传出错，请重新上传文件！");
	                   }
	                },
	                error: function(XMLHttpRequest, textStatus, errorThrown) {
	                	returnMsg ='<font color="red">上传文件出错，错误信息：'+errorThrown+'</font>';
	                	$('#'+_uuid+'_progress').removeClass("progress-bar-striped").addClass("progress-bar-danger").html("失败");
	                	//$('.retry-this').show();
	                	 $(".delete2-this").show();
	                	 $uploadHint.html("提示：上传出错，请重新上传文件！");
	                },
	                complete:function(){
	                	console.log("afterSendFile complete");
	                	$('#'+_uuid+'_msg').empty().html(returnMsg);
	                	_uuid=uuid;//后续对uuid的操作结束，更新至uuid值
	                }    
	            });   
		    }    
		});  	
};
/********************监听分块上传过程中的三个时间点 end  ***************************/  


/**
 * 分块上传options及相关参数
 */
//jQuery.createChunkUploader =  function(dOptions,uuid){
jQuery.createChunkUploader =  function(dOptions,uuid){
	   ckUploader = WebUploader.create({
	  		auto:false,
	        pick: '#'+dOptions.filePicker,
	        fileNumLimit: dOptions.fileNumLimit,								//允许上传文件总数限制
	        fileSizeLimit: dOptions.fileSizeLimit,   								// 全部文件大小限制，最小单位KB 
	        fileSingleSizeLimit: dOptions.fileSingleSizeLimit,   		// 单个文件大小限制，最小单位KB 
	        swf: dOptions.srpp+'/plugins/webupload/Uploader.swf',
	        formData:dOptions.formData,
	        runtimeOrder: dOptions.runtimeOrder,
	  		chunked: dOptions.chunked,  											//true为开启分片上传
	       	server: dOptions.url+"/"+uuid,											//向服务器发送请求的路径
	       	method:'POST',
	       	accept: dOptions.accept,													//定义可发送的文件后缀  minetype等
	       	duplicate:dOptions.duplicate,
	    });
	    return ckUploader;
};



//jQuery.initUploadChunkFile=function initUploadChunkFile(dOptions,uuid){
function initUploadChunkFile(dOptions){
	//实例化uploader
		var fileCount = 0;
	    var $loading =  $('#'+dOptions.loading);
		var $wrap = $('#'+dOptions.uploader);		//上传容器对象
		var $uploadBtn = $('#'+dOptions.btn);		//上传按钮对象
		var $filePath = $('#'+dOptions.filePath);	//上传文件路径结果接收对象
		var $fileSize = $('#'+dOptions.fileSize);		//文件大小	
		var $fileName =  $('#'+dOptions.fileName);
		var $fileList =  $('#'+dOptions.fileList);
		var $loading = $('#'+dOptions.loading);
		var $fileType=$('#'+dOptions.fileType);
		var $fileMd5 = $('#'+dOptions.md5);
		var $uploadFolder = $('#'+dOptions.uploadFolder);
		var $newName = $('#'+dOptions.newName);
		var $uploadHint = $('#'+dOptions.hint);
		var $bidAttaUploadBtn = $('#'+dOptions.bidAttaUploadBtn);
		
		console.log(dOptions);
		
	   var chunkUploader = $.createChunkUploader(dOptions,uuid);
	   chunkUploader.on('fileQueued', function( file ) {
		   		console.log("file start:"+uuid);
		   		$loading.append('<tr id="'+uuid+'_tr">'+
						  '<td class="col-xs-3" id="'+uuid+'_name">'+file.name+'</td>'+
						  '<td class="col-xs-3" > '+
							  	'<div class="progress" >'+
								  	'<div  id="'+uuid+'_progress" class="progress-bar progress-bar-striped active " role="progressbar"  aria-valuemin="0" aria-valuemax="100" style="width:0%">'+
								   		'0%'+
								 	'</div>'+
								'</div>'+
						  '</td>'+
						  '<td class="col-xs-2" id="'+uuid+'_msg">'+'等待上传'+'</td>'+
						  '<td class="col-xs-2" id="'+uuid+'_op">'+
						  	'<a  href="javascript:" x-uuid="'+uuid+'" x-id"'+file.id+'" class="upload-this" id="btn_upload">上传</a>'+
						  	'<a  href="javascript:" x-uuid="'+uuid+'" x-id="'+file.id+'" class="remove-this" style="background:red;">移除</a>'+
						  	//'<a  href="javascript:" x-uuid="'+uuid+'" x-id="'+file.id+'" class="stop-this" style="display:none;background:orange;">暂停</a>'+
							//'<a  href="javascript:" x-uuid="'+uuid+'" x-id="'+file.id+'" class="continue-this" style="display:none;;">继续</a>'+
							//'<a  href="javascript:" x-uuid="'+uuid+'" x-id="'+file.id+'" class="retry-this" style="display:none">重传</a>'+
							'<a  href="javascript:" x-uuid="'+uuid+'" x-id="'+file.id+'" class="delete1-this" style="display:none;background:red;">删除</a>'+
							'<a  href="javascript:" x-uuid="'+uuid+'" x-id="'+file.id+'" class="delete2-this" style="display:none;background:red;" >删除</a>'+
						  '</td>'+
						'</tr>');
		    	$fileSize.val('0');
		    	$fileName.val('');
		    	fileCount ++;
		    	//初始化_md5Status
				_md5Status=1;
				$uploadHint.html("<span style='color:#1C86EE;'> 提示：每次只能上传一个文件 </span>");
		    	 $uploadBtn = $('#'+dOptions.btn);	
		    	 	//上传按钮click事件
			  	   $uploadBtn.unbind().on('click',function(){
			  		 $('#'+uuid+'_progress').addClass("progress-bar-info");
			  	 	  if(fileCount>0){
			  	 			$(this).button('loading');
			  	 	  		chunkUploader.upload();
			  	 	  }
			  	   });
			  	   //移除
			    	 $('.remove-this').unbind().click(function(){
			    		 $uploadHint.empty();
			    		chunkUploader.removeFile($(this).attr("x-id"));
			    		thCount--;
			    		fileCount--;
			    		$("#"+$(this).attr("x-uuid")+"_tr").remove();
			    		 
			    	 });
			    	 //以下三个功能备份，不删   Xiaojia
				   /*//暂停
				   $('.stop-this').unbind().click(function(){
					   console.log("stop");
					   chunkUploader.stop(true);
					   $('.stop-this').hide();
					   $('.continue-this').show();
				   });
				   //继续
				   $('.continue-this').unbind().click(function(){
					   console.log("continue");
					   chunkUploader.upload($(this).attr("x-id"));
					   $('.stop-this').show();
					   $('.continue-this').hide();
				   });
				   //重传
				   $('.retry-this').unbind().click(function(){
					   console.log(chunkUploader.getStats());
					   console.log("retry");
					   //chunkUploader.retry($(this).attr("x-id")); 
					   console.log(file);
					   chunkUploader.retry(file); 
				   });*/
				 //删除+重实例化
				   $('.delete1-this').unbind().click(function(){
					   console.log("delete1");
					   _md5Status = 0;
					   chunkUploader.cancelFile(file);
					   chunkUploader.reset();
					   //deferred.reject();
					   thCount--;
					   fileCount--;
					   $uploadHint.empty();
					   $(this).parent().parent().remove();
					   uuid = UUID.generate();
					   console.log("delete1 uuid:"+uuid);
					   _uuid=uuid;
					   chunkUploader.option("server",'/upload/chunkFileUpload/'+uuid);
				   });
				 //删除div
				   $('.delete2-this').unbind().click(function(){
					   $uploadHint.empty();
					   $(this).parent().parent().remove();
				   });
	   }).on('startUpload',function(){	
		   console.log("startUpload");
		   //开始上传时触发
	  }).on('uploadStart',function(file){
		  console.log("uploadStart");
		  $('#'+uuid+'_progress').width('0').html("0%");
		  $('#'+uuid+'_msg').empty().html("文件上传中...");
		  //删除 上传和移除 按钮 
		  $('.upload-this').unbind().remove(); 
		  $('.remove-this').unbind().remove();
		  //$('.stop-this').show();
		  $('.delete1-this').show();
		  
	  }).on('uploadProgress',function(file,response){
		  $('#'+uuid+'_msg').empty().html("文件上传中...");
	   }).on('uploadSuccess',function(file,response){
		   console.log(file);
		   console.log(response);
		   /**
		    *  可通过执行回调方法，获取相关赋值
		    */
	   	 	$uploadBtn.button('reset').delay(500).queue(function() {	//重置按钮状态
	   	 		$(this).dequeue(); 
	       });
	   	 	fileCount = 0;
	   	   $('#'+uuid+'_op a').hide();
	   	   $('.delete1-this').remove();
	   }).on('uploadError',function(file,response){
		   console.log("uploadError");
		  	//$uploadBtn.button('reset');
		  	$('#'+uuid+'_msg').empty().html(file.name+"<font style='color:red'>"+response+"</font>");
		   	fileCount = 0;
		    //$('.retry-this').show();
		    //$('.delete2-this').show();
		   	$('.delete1-this').show();
	   }).on( 'error', function( type ) {
		   errorMsg(type,dOptions);
	   }).on( 'uploadComplete', function( file ,response) {							//文件上传完成后的触发事件
		    //console.log("uploadComplete");
		   console.log(response);
		   	chunkUploader.reset();					//不管是否成功，都重置上传队列，确保可以再次上传
		 	uuid = UUID.generate();
	   	 	console.log("complete uuid:"+uuid);
		 	chunkUploader.option("server",'/upload/chunkFileUpload/'+uuid);
	   });
	   return chunkUploader;
};

/**
 * 分块上传单个文件
 */
//jQuery.uploaderChunkFile = function(options,uuid){
jQuery.uploaderChunkFile = function(options,u_uuid){
	var fileCount = 0;			//添加文件总数
	var defaultOptions = chunkFileDefaultOptions();
	var dOptions = setOptions(options,defaultOptions);

	var $wrap = $('#'+dOptions.uploader);		//上传容器对象
	var $uploadBtn = $('#'+dOptions.btn);		//上传按钮对象
	var $filePath = $('#'+dOptions.filePath);	//上传文件路径结果接收对象
	var $fileSize = $('#'+dOptions.fileSize);		//文件大小	
	var $fileName =  $('#'+dOptions.fileName);
	var $fileList =  $('#'+dOptions.fileList);
	var $loading = $('#'+dOptions.loading);
	var $fileType=$('#'+dOptions.fileType);
	var $fileMd5 = $('#'+dOptions.md5);
	var $uploadFolder = $('#'+dOptions.uploadFolder);
	var $newName = $('#'+dOptions.newName);
	
    isSupportBase64();
    
    //判断是否支持Flash
    if ( !WebUploader.Uploader.support('flash') && WebUploader.browser.ie ) {
        if (flashVersion) {
     	   installFlash($wrap);
        } else {
            $wrap.html('<a href="http://www.adobe.com/go/getflashplayer" target="_blank" border="0"><img alt="get flash player" src="http://www.adobe.com/macromedia/style_guide/images/160x41_Get_Flash_Player.jpg" /></a>');
        }
        return;
    } else if (!WebUploader.Uploader.support()) {
        alert( 'Web Uploader 不支持您的浏览器！');
        return;
    }
    
    uuid=u_uuid;
    _uuid=u_uuid;
    uploaderChunkRegister(dOptions);	
   
   chunkUploader=initUploadChunkFile(dOptions,uuid);

  
  return chunkUploader;
};

/*******************************文件分块上传 end  ***************************/







/**
 * 分块上传
 */
/***********************************投标文件分块上传*******************************/


/*******************************文件分块上传 begin***************************/
//var uuid = "";		//UUID
//var _uuid="";       //HOOK中使用的uuid存档
//var returnMsg = "";		//  服务端返回消息
//var fileMd5 = "";  				//文件MD5 信息
//var chunkUploader=""; //上传实例化对象
//var thCount=0;
//var _md5Status = 0;
/********************监听分块上传过程中的三个时间点 start ***************************/  
//var uploaderChunkRegister = function(options,uuid){
var bidUploaderChunkRegister = function(dOptions){
	var $wrap = $('#'+dOptions.uploader);		//上传容器对象
	var $uploadBtn = $('#'+dOptions.btn);		//上传按钮对象
	var $filePath = $('#'+dOptions.filePath);	//上传文件路径结果接收对象
	var $fileSize = $('#'+dOptions.fileSize);		//文件大小	
	var $fileName =  $('#'+dOptions.fileName);
	var $fileList =  $('#'+dOptions.fileList);
	var $loading = $('#'+dOptions.loading);
	var $fileType=$('#'+dOptions.fileType);
	var $fileMd5 = $('#'+dOptions.md5);
	var $uploadFolder = $('#'+dOptions.uploadFolder);
	var $newName = $('#'+dOptions.newName);
	var $uploadHint = $('#'+dOptions.hint);
	var $bidAttaUploadBtn = $('#'+dOptions.bidAttaUploadBtn);
	 WebUploader.Uploader.register({    
		    "before-send-file":"beforeSendFile",//整个文件上传前  
		    "before-send":"beforeSend",  //每个分片上传前  
		    "after-send-file":"afterSendFile",  //分片上传完毕  
		},  
		{    
		    //时间点1：所有分块进行上传之前调用此函数    
		    beforeSendFile:function(file){
		    	$('#'+uuid+'_msg').empty().html("读取文件中....");
		        var deferred = WebUploader.Deferred();    
		        $('#'+uuid+'_progress').addClass("progress-bar-info");
		        try{
		        	var newUploader=new WebUploader.Uploader();	
		        	newUploader.md5File(file).progress(function(percentage){  //每次都调用新的对象来进行md5，避免中断文件md5处理后影响新文件的处理
			        	if(_md5Status==1){
			        		$('#'+uuid+'_msg').empty().html("文件分块处理中...");
				        	var _width=Number(percentage*100).toFixed(0)+"%";
		                	$('#'+uuid+'_progress').width(_width).html(_width);
			        	}else{
			        		//newUploader.destroy();
			        		throw "err";
			        		//deferred.reject("stopMD5");
			        	}
			        }).then(function(val){    
			        	 $('#'+uuid+'_progress').removeClass("progress-bar-info");
			            fileMd5=val;    
			            deferred.resolve();    		 //获取文件信息后进入下一步    
			            //_md5Status=0;//_md5Status状态初始化 只有重新创建实例才会为1
			        }); 
		        }catch(err){
		        	console.log(err);
		        }
		        
		        return deferred.promise();   
		    },    
		    
		    //时间点2：如果有分块上传，则每个分块上传之前调用此函数    
		    beforeSend:function(block){
		    	$('#'+uuid+'_msg').empty().html("文件上传中...");
		    	
		       var deferred = WebUploader.Deferred();    
	            $.ajax({    
	                type:"POST",    
	                url:"/upload/chunkMark",  //ajax验证每一个分片  
	                data:{
	                	md5:fileMd5,
	                	uuid:uuid,
	                    chunk : block.chunk,
	                    chunks : block.chunks,
	                    end : block.end,
	                    start : block.start,
	                    total : block.total,
	                },    
	                cache: false,  
	                async: false,  // 与js同步  
	                timeout: 1000, //todo 超时的话，只能认为该分片未上传过  
	                dataType:"json",    
	                success:function(response){   
	                    if(response.returnCode=='FILE_EXIST'){  
	                    	//console.log("分块"+block.chunk+"已存在，跳过 ");
	                    	var _width=Math.round(100*(block.chunk+1)/block.chunks).toFixed(0)+"%";
	                    	$('#'+uuid+'_progress').width(_width).html(_width);
	                        deferred.reject();    
	                    }else if(response.returnCode=='FILE_MARK'){ 
	                    	//console.log( '第'+(block.chunk+1)+'个文件分块上传成功！');
	                    	var _width=Math.round(100*(block.chunk+1)/block.chunks).toFixed(0)+"%";
	                    	$('#'+uuid+'_progress').width(_width).html(_width);
	                        deferred.resolve();    
	                    } 
	                },
	                error: function(XMLHttpRequest, textStatus, errorThrown) {
	                	console.log("chunk上传错误:"+textStatus);
	                	$('#'+uuid+'_msg').empty().html('<font color="red">第'+(block.chunk+1)+'个文件分块上传出错！</font>');
	                },
	                complete:function(){
	                	//console.log("chunk上传完成");
	                }
	            });    
				
				deferred.resolve();    
				return deferred.promise();  
		    },    
		    
		    //时间点3：所有分块上传成功后调用此函数    
		    afterSendFile:function(file){  
		    	//console.log(" afterSendFile验证文件完整性");
		    	$('#'+_uuid+'_msg').empty().html("验证上传文件完整性....");
	            $.ajax({    
	                type:"POST",    
	                url:"/upload/chunkAllComplete/"+_uuid,  //ajax将所有片段合并成整体  
	                dataType:"json",    
	                data:{    
	                	uuid:_uuid,
	                    md5:fileMd5,  
	                },    
	                success:function(result){  
	                   if((result.returnCode).toLowerCase()=='success'){
	                	   //returnMsg =  '<font color="green">'+result.msg+'</font>';
	                	   //$('#'+_uuid+'_progress').removeClass("progress-bar-striped").addClass("progress-bar-success").html("complete");
	                	   $('#'+_uuid+'_op').empty();
	                	   $uploadHint.empty();
	                	   
	                	   //如果是bidAtta投标文件上传 则赋值input后再上传文件信息给bidSave
	                	   if(dOptions.isBidAtta==true){
	                		   returnMsg =  '<font color="green">'+"文件信息提交中"+'</font>';
		                	   $('#'+_uuid+'_progress').html("post");
	                		     
	                		     $filePath.val(dOptions.ctx+'/'+result.obj.filePath);
		              		   	 $filePath.trigger("change");													//触发其change事件
		              			 $fileSize.val(result.obj.total);
		              		   	 $fileName.val(result.obj.originName);
		              		   	 var _name=result.obj.originName;
		              		   	 $fileType.val(1); 								//默认为投标文件	
		              		   	 if(_name.substring(_name.lastIndexOf('.')+1)=="PCGT"){
		              		   		 $fileType.val(1); 								//根据不同文件后缀修改文件类型	
		              		   	 }
		              		     $uploadFolder.val(result.obj.fileRelativePath); 
		              		     $newName.val(result.obj.newFileName);				
		              		     $fileMd5.val(fileMd5);
		              		     
		              		   $bidAttaUploadBtn.click();//触发当前iframe赋值方法
	                	   }else{
	                		   returnMsg =  '<font color="green">'+result.msg+'</font>';
		                	   $('#'+_uuid+'_progress').removeClass("progress-bar-striped").addClass("progress-bar-success").html("成功");
		                	   
	                	   }
	                	   
	                   }else{
	                	   returnMsg ='<font color="red">'+result.msg+'</font>';
	                	   $('#'+_uuid+'_progress').removeClass("progress-bar-striped").addClass("progress-bar-danger").html("失败");
	          			   //$('.retry-this').show();
	                	   //$(".delete2-this").show();
	                	   $(".delete1-this").show();
	                	   $uploadHint.html("提示：上传出错，请重新上传文件！");
	                   }
	                },
	                error: function(XMLHttpRequest, textStatus, errorThrown) {
	                	returnMsg ='<font color="red">上传文件出错，错误信息：'+errorThrown+'</font>';
	                	$('#'+_uuid+'_progress').removeClass("progress-bar-striped").addClass("progress-bar-danger").html("失败");
	                	//$('.retry-this').show();
	                	 //$(".delete2-this").show();
	                	$(".delete1-this").show();
	                	 $uploadHint.html("提示：上传出错，请重新上传文件！");
	                },
	                complete:function(){
	                	console.log("afterSendFile complete");
	                	$('#'+_uuid+'_msg').empty().html(returnMsg);
	                	_uuid=uuid;//后续对_uuid的操作结束，更新至uuid值
	                }    
	            });   
		    }    
		});  	
};
/********************监听分块上传过程中的三个时间点 end  ***************************/  


/**
 * 分块上传options及相关参数
 */
//jQuery.createChunkUploader =  function(dOptions,uuid){
jQuery.createBidChunkUploader =  function(dOptions,uuid){
	   ckUploader = WebUploader.create({
	  		auto:false,
	        pick: '#'+dOptions.filePicker,
	        fileNumLimit: dOptions.fileNumLimit,								//允许上传文件总数限制
	        fileSizeLimit: dOptions.fileSizeLimit,   								// 全部文件大小限制，最小单位KB 
	        fileSingleSizeLimit: dOptions.fileSingleSizeLimit,   		// 单个文件大小限制，最小单位KB 
	        swf: dOptions.srpp+'/plugins/webupload/Uploader.swf',
	        formData:dOptions.formData,
	        runtimeOrder: dOptions.runtimeOrder,
	  		chunked: dOptions.chunked,  											//true为开启分片上传
	       	server: dOptions.url+"/"+uuid,											//向服务器发送请求的路径
	       	method:'POST',
	       	accept: dOptions.accept,													//定义可发送的文件后缀  minetype等
	       	duplicate:dOptions.duplicate,
	    });
	    return ckUploader;
};



//jQuery.initUploadChunkFile=function initUploadChunkFile(dOptions,uuid){
function initBidUploadChunkFile(dOptions){
	//实例化uploader
		var fileCount = 0;
	    var $loading =  $('#'+dOptions.loading);
		var $wrap = $('#'+dOptions.uploader);		//上传容器对象
		var $uploadBtn = $('#'+dOptions.btn);		//上传按钮对象
		var $filePath = $('#'+dOptions.filePath);	//上传文件路径结果接收对象
		var $fileSize = $('#'+dOptions.fileSize);		//文件大小	
		var $fileName =  $('#'+dOptions.fileName);
		var $fileList =  $('#'+dOptions.fileList);
		var $loading = $('#'+dOptions.loading);
		var $fileType=$('#'+dOptions.fileType);
		var $fileMd5 = $('#'+dOptions.md5);
		var $uploadFolder = $('#'+dOptions.uploadFolder);
		var $newName = $('#'+dOptions.newName);
		var $uploadHint = $('#'+dOptions.hint);
		var $bidAttaUploadBtn = $('#'+dOptions.bidAttaUploadBtn);
		
		
	   var chunkUploader = $.createBidChunkUploader(dOptions,uuid);
	   chunkUploader.on('fileQueued', function( file ) {
		   		var hint_fileSize =$.calcSize(file.size);
		   		$loading.append('<tr id="'+uuid+'_tr">'+
						  /*'<th class="col-xs-1">'+
						  (++thCount)+
						  '</th>'+*/
						  '<td class="col-xs-4" id="'+uuid+'_name">'+file.name+'</td>'+
						  '<td class="col-xs-1" id="'+uuid+'_sizw">'+hint_fileSize+'</td>'+
						  '<td class="col-xs-3" > '+
							  	'<div class="progress" >'+
								  	'<div  id="'+uuid+'_progress" class="progress-bar progress-bar-striped active " role="progressbar"  aria-valuemin="0" aria-valuemax="100" style="width:0%">'+
								   		'0%'+
								 	'</div>'+
								'</div>'+
						  '</td>'+
						  '<td class="col-xs-2 uploadMsg" id="'+uuid+'_msg" >'+'等待上传'+'</td>'+
						  '<td class="col-xs-2" id="'+uuid+'_op">'+
						  	'<a  href="javascript:" x-uuid="'+uuid+'" x-id"'+file.id+'" class="upload-this" id="btn_upload">上传</a>'+
						  	'<a  href="javascript:" x-uuid="'+uuid+'" x-id="'+file.id+'" class="remove-this" style="background:red;">移除</a>'+
						  	//'<a  href="javascript:" x-uuid="'+uuid+'" x-id="'+file.id+'" class="stop-this" style="display:none;background:orange;">暂停</a>'+
							//'<a  href="javascript:" x-uuid="'+uuid+'" x-id="'+file.id+'" class="continue-this" style="display:none;;">继续</a>'+
							//'<a  href="javascript:" x-uuid="'+uuid+'" x-id="'+file.id+'" class="retry-this" style="display:none">重传</a>'+
							'<a  href="javascript:" x-uuid="'+uuid+'" x-id="'+file.id+'" class="delete1-this" style="display:none;background:red;">删除</a>'+
							//'<a  href="javascript:" x-uuid="'+uuid+'" x-id="'+file.id+'" class="delete2-this" style="display:none;background:red;" >删除</a>'+
						  '</td>'+
						'</tr>');
		    	$fileSize.val('0');
		    	$fileName.val('');
		    	fileCount ++;
		    	//初始化_md5Status
				_md5Status=1;
				$uploadHint.html("<span style='color:#1C86EE;'> 提示：每次只能上传一个文件 </span>");
		    	 $uploadBtn = $('#'+dOptions.btn);	
		    	 	//上传按钮click事件
			  	   $uploadBtn.unbind().on('click',function(){
			  		 $('#'+uuid+'_progress').addClass("progress-bar-info");
			  	 	  if(fileCount>0){
			  	 			$(this).button('loading');
			  	 	  		chunkUploader.upload();
			  	 	  }
			  	   });
			  	   //移除
			    	 $('.remove-this').unbind().click(function(){
			    		 $uploadHint.empty();
			    		chunkUploader.removeFile($(this).attr("x-id"));
			    		thCount--;
			    		fileCount--;
			    		$("#"+$(this).attr("x-uuid")+"_tr").remove();
			    		 
			    	 });
			    	 //以下三个功能备份，不删   Xiaojia
				   /*//暂停
				   $('.stop-this').unbind().click(function(){
					   console.log("stop");
					   chunkUploader.stop(true);
					   $('.stop-this').hide();
					   $('.continue-this').show();
				   });
				   //继续
				   $('.continue-this').unbind().click(function(){
					   console.log("continue");
					   chunkUploader.upload($(this).attr("x-id"));
					   $('.stop-this').show();
					   $('.continue-this').hide();
				   });
				   //重传
				   $('.retry-this').unbind().click(function(){
					   console.log(chunkUploader.getStats());
					   console.log("retry");
					   //chunkUploader.retry($(this).attr("x-id")); 
					   console.log(file);
					   chunkUploader.retry(file); 
				   });*/
				 //删除+重实例化
				   $('.delete1-this').unbind().click(function(){
					   _md5Status = 0;
					   chunkUploader.cancelFile(file);
					   chunkUploader.reset();
					   //deferred.reject();
					   thCount--;
					  // fileCount--;
					   $uploadHint.empty();
					   $(this).parent().parent().remove();
					   uuid = UUID.generate();
					   console.log("delete1 uuid:"+uuid);
					   _uuid=uuid;
					   chunkUploader.option("server",'/upload/chunkFileUpload/'+uuid);
				   });
				 //删除div
				  /* $('.delete2-this').unbind().click(function(){
					   chunkUploader.reset();
					   $uploadHint.empty();
					   $(this).parent().parent().remove();
				   });*/
	   }).on('startUpload',function(){	
		   //开始上传时触发
	  }).on('uploadStart',function(file){
		  console.log("uploadStart");
		  $('#'+uuid+'_progress').width('0').html("0%");
		  $('#'+uuid+'_msg').empty().html("文件上传中...");
		  //删除 上传和移除 按钮 
		  $('.upload-this').unbind().remove(); 
		  $('.remove-this').unbind().remove();
		  //$('.stop-this').show();
		  $('.delete1-this').show();
	  }).on('uploadProgress',function(file,response){
		  $('#'+uuid+'_msg').empty().html("文件上传中...");
	   }).on('uploadSuccess',function(file,response){
	   	 	$uploadBtn.button('reset').delay(500).queue(function() {	//重置按钮状态
	   	 		$(this).dequeue(); 
	       });
	   	 	fileCount = 0;
	   	   $('#'+uuid+'_op a').hide();
	   	   $('.delete1-this').remove();
	   	   if(dOptions.isBidAtta==false){
	   		chunkUploader.reset();//投标文件只能上传一个 所有队列不清空
	   	   }
	   }).on('uploadError',function(file,response){
		   console.log("uploadError");
		  	//$uploadBtn.button('reset');
		  	$('#'+uuid+'_msg').empty().html(file.name+"<font style='color:red'>"+response+"</font>");
		   	fileCount = 0;
		    //$('.retry-this').show();
		    $('.delete2-this').show();
		    chunkUploader.reset();
	   }).on( 'error', function( type ) {
		   errorMsg(type,dOptions);
	   }).on( 'uploadComplete', function( file,response ) {							//文件上传完成后的触发事件
		   	//chunkUploader.reset();					//不管是否成功，都重置上传队列，确保可以再次上传
		 	uuid = UUID.generate();
		 	chunkUploader.option("server",'/upload/chunkFileUpload/'+uuid);
	   });
	   return chunkUploader;
};

/**
 * 分块上传单个文件
 */
//jQuery.uploaderChunkFile = function(options,uuid){
jQuery.bidUploaderChunkFile = function(options,u_uuid){
	var fileCount = 0;			//添加文件总数
	var defaultOptions = chunkFileDefaultOptions();
	var dOptions = setOptions(options,defaultOptions);

	var $wrap = $('#'+dOptions.uploader);		//上传容器对象
	var $uploadBtn = $('#'+dOptions.btn);		//上传按钮对象
	var $filePath = $('#'+dOptions.filePath);	//上传文件路径结果接收对象
	var $fileSize = $('#'+dOptions.fileSize);		//文件大小	
	var $fileName =  $('#'+dOptions.fileName);
	var $fileList =  $('#'+dOptions.fileList);
	var $loading = $('#'+dOptions.loading);
	var $fileType=$('#'+dOptions.fileType);
	var $fileMd5 = $('#'+dOptions.md5);
	var $uploadFolder = $('#'+dOptions.uploadFolder);
	var $newName = $('#'+dOptions.newName);
	
    isSupportBase64();
    
    //判断是否支持Flash
    if ( !WebUploader.Uploader.support('flash') && WebUploader.browser.ie ) {
        if (flashVersion) {
     	   installFlash($wrap);
        } else {
            $wrap.html('<a href="http://www.adobe.com/go/getflashplayer" target="_blank" border="0"><img alt="get flash player" src="http://www.adobe.com/macromedia/style_guide/images/160x41_Get_Flash_Player.jpg" /></a>');
        }
        return;
    } else if (!WebUploader.Uploader.support()) {
        alert( 'Web Uploader 不支持您的浏览器！');
        return;
    }
    
    uuid=u_uuid;
    _uuid=u_uuid;
    //console.log(uuid);
    //注册分块上传相关事件
    bidUploaderChunkRegister(dOptions);	
   
   chunkUploader=initBidUploadChunkFile(dOptions,uuid);

  
  return chunkUploader;
};

/*******************************文件分块上传 end  ***************************/
/******************************投标文件分块上传end************************************************/


/**************************************投标文件普通上传begin**************************************/


/**************************************投标文件普通上传end**************************************/


//文件大小计算
jQuery.calcSize = function(size){
	if(size>=1024*1024){					//大于1M，以M为单位
		size = size/(1024*1024);
		return size.toFixed(2)+"M";
	}else if(size<1024*1024){			//小于1M，以K为单位
		size = size/1024;
		return size.toFixed(2)+"K";
	}
};
