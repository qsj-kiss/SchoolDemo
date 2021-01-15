<%@ page language="java" contentType="text/html; charset=utf-8"
         pageEncoding="utf-8" isELIgnored="false" %>
<%@taglib prefix="c"  uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title></title>
    <meta name="renderer" content="webkit">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
    <link rel="stylesheet" href="/res/layui/css/layui.css"  media="all">
    <!-- 注意：如果你直接复制所有代码到本地，上述css路径需要改成你本地的 -->
</head>
<body>
<div class="layui-form" lay-filter="layuiadmin-form-order" id="layuiadmin-form-order" style="padding: 20px 30px 0 0;">
    <input id="s_id" name="sId" style="display: none" value="${student.SId}">
    <div class="layui-form-item">
        <label class="layui-form-label">姓名</label>
        <div class="layui-input-inline">
            <input type="text" name="sName" value="${student.SName}" lay-verify="required" placeholder="请输入学生姓名" autocomplete="off" class="layui-input">
        </div>
    </div>
    <div class="layui-form-item">
        <label class="layui-form-label">年龄</label>
        <div class="layui-input-inline">
            <input type="text" name="sAge" value="${student.SAge}" lay-verify="required" placeholder="请输入学生年龄" autocomplete="off" class="layui-input">
        </div>
    </div>
    <div class="layui-form-item">
        <label class="layui-form-label">学生性别</label>
        <input type="radio" name="sGender" <c:if test="${student.SGender == 1}">checked</c:if> value="1" title="男" checked>
        <input type="radio" name="sGender" <c:if test="${student.SGender == 2}">checked</c:if> value="2" title="女" >
    </div>
    <div class="layui-form-item">
        <label class="layui-form-label">所在班级</label>
        <div class="layui-input-inline">
            <select name="sClass"  id="s_class" lay-filter="required">
                <option value=""></option>
            </select>
        </div>
    </div>
    <div class="layui-form-item">
        <div class="layui-input-block">
            <button type="submit" class="layui-btn" lay-submit="" lay-filter="demo1">确认修改</button>
        </div>
    </div>
</div>

<script src="/res/layui/layui.js" charset="utf-8"></script>
<script src="/res/jquery.js" type="application/javascript"></script>
<script>
function selected(){
  $("#s_class").each(function() {
    // this代表的是<option></option>，对option再进行遍历
    $(this).children("option").each(function() {
      // 判断需要对那个选项进行回显
      if (this.value == ${student.SClass}) {
        // 进行回显
        $(this).attr("selected","selected");
        console.log(this.value)
      }
    });
    layui.form.render();
  })
}

  layui.use(['form', 'layedit', 'laydate','upload'], function(){
    var form = layui.form
        ,layer = layui.layer
        ,layedit = layui.layedit
        ,laydate = layui.laydate;

    $.ajax({
      url: '/class/findAllClassName',
      dataType: 'json',
      type: 'get',
      success: function (data) {
        console.log(data);//下面会提到这个data是什么值
        //使用循环遍历，给下拉列表赋值
        $.each(data.data, function (index, value) {
          $('#s_class').append(new Option(value.cls_name,value.cls_id));// 下拉菜单里添加元素
        });
        layui.form.render("select");//重新渲染 固定写法
        selected();
      }
    })

    //自定义验证规则
    form.verify({
      title: function(value){
        if(value == null || value == '' || value.length < 1){
          return '请输入正确数据';
        }
      }
      ,content: function(value){
        layedit.sync(editIndex);
      }
    });

    //监听提交
    form.on('submit(demo1)', function(data){
      $.post('/student/updateStudent',data.field,function (data) {
        if (data===null){
          layer.alert(data.msg)
        }
        if (data.state==200){
          layer.confirm(data.msg,{
            btn : ['确定']
          },function () {
            let index = parent.layer.getFrameIndex(window.name);
            parent.layer.close(index);
            window.parent.location.reload();
          })
        }else {
          layer.alert(data.msg)
        }
      },'json')
      return false;
    });

  });
</script>


</body>
</html>