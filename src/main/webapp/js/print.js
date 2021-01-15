var printSetting = [];
var selectTab;
var newstr = ""; 
var _signSetting;//签章配置
var isShowSign=false;//是否显示签章 详情页面才需要显示  默认不显示  
var ajaxPrint = new Array(); //ajax请求集合
//打印之前通过ajax获取数据之后拼接
var newArr = new Array(); //打印顺序设置array
var printHtml="";//需要打印的html
var openLayer;

//打印初始化参数
var printInit = function (objId, setting,signSetting) {
    selectTab = objId
    printSetting = setting
    _signSetting=signSetting
}

//打印之前选择需要打印的tab
function printStartBefore() {
    if(openLayer){
        layer.close(openLayer)

    }
    var str = "";
    newstr="";
    ajaxPrint = new Array();
    newArr = new Array()
    printHtml="";
    for (var i = 0; i < printSetting.length; i++) {
        str +='<div class="checkbox" style="margin-left:10px;"><label><input type="checkbox" id="cheValue" name="cheValue" value="' + i + '">' + printSetting[i].tabName + ' </label> </div>'
    }
    $("#" + selectTab).html(str);
   openLayer= layer.open({
        type: 1,
        title: "选择需要打印的页面",
        content: $("#" + selectTab),
        btn: ['确认', '取消'],
        yes: function (index, layero) {
            var seArr = []
            //获取选中的tab
            $("input:checkbox[name='cheValue']:checked").map(function(index,elem) {
                seArr.push($(this).val());
            })
            pnfPrint(seArr);
            layer.close(index)
        }
    })

}
//打印预览
function openPrintPreview(printHtml,signSetting){
    preview=parent.layer.open({
        type: 2,
        zIndex:99999999,
        title: "打印预览",
        content: "/print?setting="+encodeURIComponent(JSON.stringify(signSetting)),
        btn: ['打印','取消'],
        success: function(layero, index){
            var iframeWin = $(layero).find("iframe")[0].contentWindow
          
            iframeWin.init(printHtml,isShowSign)
            isShowSign=false;
          },
        yes: function (index, layero) {
        var iframeWin = $(layero).find("iframe")[0].contentWindow
        iframeWin.focus()
        // iframeWin.print()
        iframeWin.printPage();
      
        },
        btn2:function(index){
            layer.close(index);
        },
        cancel: function(index, layero){ 
            layer.close(index);
        }
           
    });
   
    parent.layer.full(preview);
}
function ajaxFuc(i, obj) {
    if(obj.isShowSign){ //打印配置中只要有需要显示签章就显示  打开打印预览页面之后修改为false
        isShowSign=true;
    }
    if (obj.data_url) {

            if(obj.isIframe){
                var a='<div style="width:90%;text-align: center;margin: 0px 51px 0px 46px;height: 40px;line-height: 40px;font-size: large;">'+obj.tabName+'</div>'+
                '<iframe src="'+obj.data_url+'?errorType=page" style="width:100%;height:100%;min-height:600px;border:none" ></iframe>';
                newArr.push({
                    'serial': i,
                    'data': a
                })
            }else{

        ajaxPrint[i] = $.ajax({
            url: obj.data_url,
            type: "post",
            data: $.parseJSON(obj.data_param),
            success: function (data) {
                var a='<div style="width:90%;text-align: center;margin: 0px 51px 0px 46px;height: 40px;line-height: 40px;font-size: large;">'+obj.tabName+'</div>'
                data=a+data;
                newArr.push({
                    'serial': i,
                    'data': data
                })
            }
        });
    }

    } else {
        var a='<div style="width:90%;text-align: center;margin: 0px 51px 0px 46px;height: 40px;line-height: 40px;font-size: large;">'+obj.tabName+'</div>'
        var s = a+document.getElementById(obj.elementId).innerHTML;
        newArr.push({
            'serial': i,
            'data': s
        })
    }
}

//打印
function pnfPrint(seArr) {
    var str = []
    //每次打印根据选择的tab读取配置
    for (i in seArr) {
        str.push(printSetting[seArr[i]])
    }
    for (var i = 0; i < str.length; i++) {
        var obj = str[i]
        ajaxFuc(i, obj);

    }

    //所有Ajax请求完后执行打印
    $.when.apply($, ajaxPrint).done(function () {
        // 打印顺序排序
        var sortArr = newArr.sort(function(a, b){
            return a.serial - b.serial;
        });
        sortArr.forEach(function(i){
            newstr += i.data
        })
        //展开所有手风琴
        newstr = newstr.replace(/aria-expanded=\"false\"/g, 'aria-expanded=\"true\"')
        newstr = newstr.replace(/class=\"panel-collapse collapse\"/g, 'class=\"panel-collapse collapse in\"')
        newstr = newstr.replace('<div id=\"showAddStepBtn\">添加步骤</div>', '')
        newstr = newstr.replace(/A4print/g, '')
        // newstr = newstr.replace('id=\"accordion\"', '')
        printHtml=newstr
        openPrintPreview(printHtml,_signSetting);

    });
    return false;
}
