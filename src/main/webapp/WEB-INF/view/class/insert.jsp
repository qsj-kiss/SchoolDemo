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
        <!-- 内容主体区域 -->
        <h1 style="padding: 15px;">添加班级</h1>
        <form class="layui-form" action="" lay-filter="example">
            <div class="layui-form-item">
                <label class="layui-form-label">班级名称</label>
                <div class="layui-input-inline">
                    <input type="text" name="clsName" placeholder="请输入班级名称" autocomplete="off" class="layui-input">
                </div>
            </div>

            <div class="layui-form-item">
                <label class="layui-form-label">语文老师</label>
                <div class="layui-input-inline">
                    <select name="clsChinese"  id="clsChinese" lay-filter="required">
                        <option value=""></option>
                    </select>
                </div>
                <label class="layui-form-label">数学老师</label>
                <div class="layui-input-inline">
                    <select name="clsMath" id="clsMath" lay-filter="required">
                        <option value=""></option>
                    </select>
                </div>
                <label class="layui-form-label">英语老师</label>
                <div class="layui-input-inline">
                    <select name="clsEnglish" id="clsEnglish" lay-filter="aihao">
                        <option value=""></option>
                    </select>
                </div>
                <label class="layui-form-label">体育老师</label>
                <div class="layui-input-inline">
                    <select name="clsPe" id="clsPe" lay-filter="aihao">
                        <option value=""></option>
                    </select>
                </div>
                <label class="layui-form-label">物理老师</label>
                <div class="layui-input-inline">
                    <select name="clsPhysical" id="clsPhysical" lay-filter="aihao">
                        <option value=""></option>
                    </select>
                </div>
            </div>

            <div class="layui-form-item layui-form-text">
                <label class="layui-form-label">班级备注</label>
                <div class="layui-input-block">
                    <textarea placeholder="请输入班级备注" class="layui-textarea" name="clsRemark"></textarea>
                </div>
            </div>

            <div class="layui-form-item">
                <div class="layui-input-block">
                    <button type="button" class="layui-btn layui-btn-normal" id="LAY-component-form-getval">取值</button>
                    <button type="submit" class="layui-btn" lay-submit="" lay-filter="demo1">立即提交</button>
                </div>
            </div>
        </form>
</div>
<%--<script type="text/html" id="barDemo">--%>
<%--    <a class="layui-btn layui-btn-xs" lay-event="edit">编辑</a>--%>
<%--    <a class="layui-btn layui-btn-danger layui-btn-xs" lay-event="del">删除</a>--%>
<%--</script>--%>
<script src="/res/layui/layui.js" charset="utf-8"></script>
<script src="/res/jquery.js" type="application/javascript"></script>
<script>
  layui.use(['form', 'layedit', 'laydate','upload'], function(){
    var form = layui.form
        ,layer = layui.layer
        ,layedit = layui.layedit
        ,laydate = layui.laydate;

    $.ajax({
      url: '/class/findTeacher?sub_id=6',
      dataType: 'json',
      type: 'get',
      success: function (data) {
        console.log(data);//下面会提到这个data是什么值
        //使用循环遍历，给下拉列表赋值
        $.each(data.data, function (index, value) {
          $('#clsChinese').append(new Option(value.t_name,value.t_id));// 下拉菜单里添加元素
        });
        layui.form.render("select");//重新渲染 固定写法
      }
    })
    $.ajax({
      url: '/class/findTeacher?sub_id=2',
      dataType: 'json',
      type: 'get',
      success: function (data) {
        console.log(data);//下面会提到这个data是什么值
        //使用循环遍历，给下拉列表赋值
        $.each(data.data, function (index, value) {
          $('#clsMath').append(new Option(value.t_name,value.t_id));// 下拉菜单里添加元素
        });
        layui.form.render("select");//重新渲染 固定写法
      }
    })
    $.ajax({
      url: '/class/findTeacher?sub_id=3',
      dataType: 'json',
      type: 'get',
      success: function (data) {
        console.log(data);//下面会提到这个data是什么值
        //使用循环遍历，给下拉列表赋值
        $.each(data.data, function (index, value) {
          $('#clsEnglish').append(new Option(value.t_name,value.t_id));// 下拉菜单里添加元素
        });
        layui.form.render("select");//重新渲染 固定写法
      }
    })
    $.ajax({
      url: '/class/findTeacher?sub_id=4',
      dataType: 'json',
      type: 'get',
      success: function (data) {
        console.log(data);//下面会提到这个data是什么值
        //使用循环遍历，给下拉列表赋值
        $.each(data.data, function (index, value) {
          $('#clsPe').append(new Option(value.t_name,value.t_id));// 下拉菜单里添加元素
        });
        layui.form.render("select");//重新渲染 固定写法
      }
    })
    $.ajax({
      url: '/class/findTeacher?sub_id=5',
      dataType: 'json',
      type: 'get',
      success: function (data) {
        console.log(data);//下面会提到这个data是什么值
        //使用循环遍历，给下拉列表赋值
        $.each(data.data, function (index, value) {
          $('#clsPhysical').append(new Option(value.t_name,value.t_id));// 下拉菜单里添加元素
        });
        layui.form.render("select");//重新渲染 固定写法
      }
    })
    //日期
    laydate.render({
      elem: '#date'
    });
    laydate.render({
      elem: '#date1'
    });

    //创建一个编辑器
    // var editIndex = layedit.build('LAY_demo_editor');

    //自定义验证规则
    form.verify({
      title: function(value){
        if(value.length < 4){
          return '班级ID至少得4个字符啊';
        }
      }
      ,pass: [
        /^[\S]{6,12}$/
        ,'密码必须6到12位，且不能出现空格'
      ]
      ,content: function(value){
        layedit.sync(editIndex);
      }
    });

    //监听提交
    form.on('submit(demo1)', function(data){
      $.post('/class/insertClass',data.field,function (data) {
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

    //表单取值
    layui.$('#LAY-component-form-getval').on('click', function(){
      var data = form.val('example');
      alert(JSON.stringify(data));
    });

  });
</script>

</body>
</html>