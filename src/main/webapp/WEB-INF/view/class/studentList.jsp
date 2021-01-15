<%@ page language="java" contentType="text/html; charset=utf-8"
         pageEncoding="utf-8" isELIgnored="false" %>
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title></title>
    <meta name="renderer" content="webkit">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
    <link rel="stylesheet" href="/res/layui/css/layui.css" media="all">
    <!-- 注意：如果你直接复制所有代码到本地，上述css路径需要改成你本地的 -->
</head>

<body>
<div class="layui-form" lay-filter="layuiadmin-form-order" id="layuiadmin-form-order" style="padding: 20px 30px 0 0;">
        <!-- 内容主体区域 -->
        <h1 style="padding: 15px;">查看${Cls_Name}详细学生清单</h1>
        <div class="demoTable" style="padding: 15px">
            搜索学生名称：
            <div class="layui-inline">
                <input class="layui-input" name="id" id="demoReload" autocomplete="off">
            </div>
            <button class="layui-btn" data-type="reload">搜索</button>
        </div>
        <table class="layui-table" lay-data="{width: 1000, height:500, url:'/class/findStudentById?cls_id='+getQueryString('cls_id'), page:true, id:'idTest'}" lay-filter="demo">
            <thead>
            <tr>
                <th lay-data="{type:'checkbox', fixed: 'left'}"></th>
                <th lay-data="{field:'s_id', width:120, sort: true, fixed: true}">学生ID</th>
                <th lay-data="{field:'s_name', width:120, sort: true, fixed: true}">学生姓名</th>
                <th lay-data="{field:'s_age', width:120, sort: true, fixed: true}">学生年龄</th>
                <th lay-data="{field:'s_gender', width:110, sort: true, fixed: true,templet: '#sexTpl'}">学生性别</th>
                <th lay-data="{fixed: 'right', width:178, align:'center', toolbar: '#barDemo'}">操作</th>
            </tr>
            </thead>
        </table>
</div>
<script type="text/html" id="barDemo">
    <a class="layui-btn layui-btn-xs" lay-event="edit">编辑</a>
<%--    <a class="layui-btn layui-btn-danger layui-btn-xs" lay-event="del">删除</a>--%>
</script>
<script src="/res/layui/layui.js" charset="utf-8"></script>
<script type="text/html" id="sexTpl">
    {{#  if(d.s_gender === 2){ }}
    <span style="color: #F581B1;">女</span>
    {{#  } else if(d.s_gender === 1){ }}
    <span style="color: #48892c;">男</span>
    {{#  }else{ }}
    <span style="color: #2c7b89;">外星人</span>
    {{# } }}
</script>
<script>
  function getQueryString(name){
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null)return  unescape(r[2]); return null;
  }
  layui.use('table', function(){
    var table = layui.table;

    //监听工具条
    table.on('tool(demo)', function(obj){
      var data = obj.data;
     if(obj.event === 'del'){
        layer.confirm('真的删除行么', function(index){
          obj.del();
          layer.close(index);
        });
      } else if(obj.event === 'edit'){
        // layer.alert('编辑行：<br>'+ JSON.stringify(data))
       layer.open({
         type: 2,
         title: '修改学生信息',
         shade: false,
         shadeClose: true,
         shade:0.4,
         maxmin: true,
         area: ['50%', '70%'],
         content: '/student/update?s_id='+data.s_id,
       });
      }
    });

    var $ = layui.$, active = {
      reload: function(){
        var demoReload = $('#demoReload');
        //执行重载
        table.reload('idTest', {
          page: {
            curr: 1 //重新从第 1 页开始
          }
          ,where: {
            username: demoReload.val()
          }
        }, 'data');
      }
    };

    $('.demoTable .layui-btn').on('click', function(){
      var type = $(this).data('type');
      active[type] ? active[type].call(this) : '';
    });
  });
</script>
</body>
</html>