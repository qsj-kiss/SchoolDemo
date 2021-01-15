<%@ page language="java" contentType="text/html; charset=utf-8"
         pageEncoding="utf-8"%>
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>添加班级</title>
    <meta name="renderer" content="webkit">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
    <link rel="stylesheet" href="/res/layui/css/layui.css"  media="all">
    <!-- 注意：如果你直接复制所有代码到本地，上述css路径需要改成你本地的 -->
</head>

<body class="layui-layout-body">
    <div class="layui-form" lay-filter="layuiadmin-form-order" id="layuiadmin-form-order" style="padding: 20px 30px 0 0;">
        <form class="layui-form" action="" lay-filter="example">
            <div class="layui-form-item">
                <label class="layui-form-label">教师姓名</label>
                <div class="layui-input-inline">
                    <input type="text" name="tName" lay-verify="title" autocomplete="off" placeholder="请输入教师姓名" class="layui-input">
                </div>
            </div>
            <div class="layui-form-item">
                <label class="layui-form-label">教师性别</label>
                <input type="radio" name="tGender" value="1" title="男" checked>
                <input type="radio" name="tGender" value="2" title="女" >
            </div>
            <div class="layui-form-item">
                <label class="layui-form-label">所教科目</label>
                <div class="layui-input-inline">
                    <select name="tSubject"  id="subject" lay-filter="required">
                        <option value=""></option>
                    </select>
                </div>
            </div>
            <div class="layui-form-item">
                <div class="layui-input-block">
                    <button type="submit" class="layui-btn" lay-submit="" lay-filter="demo1">立即提交</button>
                </div>
            </div>
        </form>
    </div>
<script src="/res/layui/layui.js" charset="utf-8"></script>
<script src="/res/jquery.js" type="application/javascript"></script>
<script>
  layui.use(['form', 'layedit', 'laydate','upload'], function(){
    var form = layui.form
        ,layer = layui.layer
        ,layedit = layui.layedit
        ,laydate = layui.laydate;

    $.ajax({
      url: '/subject/findAllSubject',
      dataType: 'json',
      type: 'get',
      success: function (data) {
        console.log(data);//下面会提到这个data是什么值
        //使用循环遍历，给下拉列表赋值
        $.each(data.data, function (index, value) {
          $('#subject').append(new Option(value.sub_detail,value.sub_id));// 下拉菜单里添加元素
        });
        layui.form.render("select");//重新渲染 固定写法
      }
    })

    //自定义验证规则
    form.verify({
      title: function(value){
        if(value == null || value == '' || value.length < 1){
          return '请输入正确的姓名';
        }
      }
      ,content: function(value){
        layedit.sync(editIndex);
      }
    });

    //监听提交
    form.on('submit(demo1)', function(data){
      $.post('/teacher/insertTeacher',data.field,function (data) {
        if (data===null){
          layer.alert("提交失败请检查数据是否填写完整")
        }
        if (data.state==200){
          layer.confirm("添加成功",{
            btn : ['确定']
          },function () {
            let index = parent.layer.getFrameIndex(window.name);
            parent.layer.close(index);
            window.parent.location.reload();
          })
        }else {
          layer.alert("提交失败,请检查数据是否填写完整或班级ID是否重复")
        }
      },'json')
      return false;
    });

  });
</script>

</body>
</html>