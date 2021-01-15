/**
	业务审批处理工具
	@author XJ
	@date  20190312
 */


//author肖佳
//ajax到相应Controller层的审批方法
//arguments:相应Controller层的url,提交审批对象的id，选择流程的id，回调函数

function ajaxAudit(userConfig){
    layer.open({
        type: 2,
        title: "审批备注",
        content: '/flowInst/flowRemark/',
        btn: ['确认', '取消'],
        area: ['750px', '540px'],	
        yes: function (index, layero) {
                var iframeWin = window[layero.find('iframe')[0]['name']];
                var flowRemark= iframeWin.getRemark();
                userConfig.remark=flowRemark;
                 submitAjaxAudit(userConfig);
                 layer.close(index);
        },
        btn1: function(index, layero){
            layer.close(index);
        },
        success: function(layero, index){
            var iframeWin = window[layero.find('iframe')[0]['name']];
            iframeWin.init();
        },
        cancel: function(index, layero){ 
              layer.close(index)
            return false; 
          } 
    });
}

function submitAjaxAudit (userConfig){
        var config={
            id:'',
            pageType:'',
            ajaxUrl:'',
            flowId:null,
            flowTag:null,
            listOperator:null,
            info:{
                'err0094':'',
            },
            successCb:function () {},
            failCbList:[
                {
                    msgCode:'err0094',
                    dealFunc:function err94Callback(config){
                        layer.open({
                            icon:16,
                            type:2,
                            title:'系统提示',
                            maxmin:true,
                            closeBtn:1,
                            area:['80%','90%'],
                            fixed: false,		 //不固定
                            content: "/flow/selectFlowIndex/"+config.id+"&"+config.pageType+"&"+config.info["err0094"]+"?errorType=page",
                            btn: ['提交','关闭'],
                            btn1:function(_index,layero){
                                var iframeWin = window[layero.find('iframe')[0]['name']];
                                var dataObj=iframeWin.selectFlow(config.id);
                                config.flowId=dataObj.flowId;
                                submitAjaxAudit(config);
                                layer.close(_index);
                            },
                            btn2:function(_index){
                                layer.close(_index);
                            },
                        });
                    }
                },
                {
                    msgCode:'flow0037',
                    dealFunc:function flow0037Callback(config,result){
                        var _flowId=config.flowId==null?result.obj.flowId:config.flowId
                        layer.open({
                            icon:16,
                            type:2,
                            title:'选择审批人员',
                            maxmin:true,
                            closeBtn:1,
                            area:['80%','90%'],
                            fixed: false,		 //不固定
                            content: "/flow/initFlow/"+_flowId+"?errorType=page",
                            btn: ['提交','关闭'],
                            btn1:function(_index,layero){
                                var iframeWin = window[layero.find('iframe')[0]['name']];
                                var dataObj=iframeWin.getSelectOpList();
                                if(dataObj==null){
                                    return false;
                                }else{
                                    config.listOperator=JSON.stringify(dataObj);
                                    submitAjaxAudit(config);
                                    layer.close(_index);
                                }
                            },
                            btn2:function(_index){
                                layer.close(_index);
                            },
                        });
                    }
                }
            ]
        };
        config=$.extend(true,{},config,userConfig);
        var _data={
            id:config.id,
            flowTag:(config.flowId==null)?(config.flowTag==null?"/"+config.pageType+"/details":config.flowTag):"",
            flowId:(config.flowId==null)?"":config.flowId,
            remark:userConfig.remark==null?"":userConfig.remark,
            listOperator:(config.listOperator==null)?"":config.listOperator,
            exparams:$.base64.encode("remark"),
            
        };
        //data与config中otherData对象合并
        if(config.otherData!=undefined){
            _data=$.extend(true,{},_data,config.otherData)
        }

        $.ajax({
            type: 'post'
            // ,url: "${ctx}/"+config.pageType+"/auditStart/"
            ,url: config.ajaxUrl
            ,dataTyp:'json'
            ,data:_data
            ,beforeSend:function(){
                loadingIdex = layer.load(2, {
                    shade: [0.1,'#fff'] //0.1透明度的白色背景
                });
            }
            ,success: function(result) {
                if((result.returnCode).toLowerCase()=='success'){
                    layer.alert('您的审批已提交，可在【我的工作台】->【审批任务】菜单中查看进度',{
                        icon:1,
                        title:'系统提示',
                        btn: ['关闭'] ,
                    },function(index){
                        layer.close(index);
                    });
                    if(typeof (config.successCb) == "function"){
                        (config.successCb)(result)	//datatableObj.ajax.reload(bindShowAtta,false);
                    }
                }else{
                    var hasDeal=false;
                    if((config.failCbList)!=undefined && ((config.failCbList) instanceof Array)){ //如果没有err处理的回调函数就直接alert
                        for(var i=0;i<(config.failCbList).length;i++){
                            var item=(config.failCbList)[i];
                            if( (result.msgCode).toLowerCase()==(item.msgCode).toLowerCase() ){
                                (item.dealFunc)(config,result);
                                hasDeal=true;
                                break;
                            }
                        }
                    }
                    if(!hasDeal){
                        layer.alert(result.msg,{
                            icon:0,
                            title:'系统提示',
                            btn: ['关闭'] ,
                        },function(index){
                            layer.close(index);
                        });
                    }
                }
            }
            ,error: function(XMLHttpRequest, textStatus, errorThrown) {
                layer.alert("操作失败["+textStatus+"]"
                    +XMLHttpRequest.status+"，"
                    +XMLHttpRequest.readyState,{
                    icon:0,
                    title:'操作失败',
                    btn: ['关闭'] ,
                },function(index){
                    layer.close(index);
                    // bv.resetForm();										//重置form元素状态
                });
            }
            ,complete:function(){
                layer.close(loadingIdex);
            }
        });

    }



