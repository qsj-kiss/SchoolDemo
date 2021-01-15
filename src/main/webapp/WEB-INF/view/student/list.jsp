<%@ page language="java" contentType="text/html; charset=utf-8"
         pageEncoding="utf-8"%>
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>学生管理</title>
    <meta name="renderer" content="webkit">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
    <link rel="stylesheet" href="/res/layui/css/layui.css" media="all">
</head>

<body class="layui-layout-body">
<div class="layui-layout layui-layout-admin">
    <jsp:include page="../formwork/header.jsp"/>
    <jsp:include page="../formwork/side.jsp"/>
    <div class="layui-body">
        <!-- 内容主体区域 -->
        <h1 style="padding: 15px;">学生信息管理模块</h1>
        <div class="demoTable" style="padding: 15px">
            搜索学生姓名：
            <div class="layui-inline">
                <input class="layui-input" name="name" id="demoReload" autocomplete="off">
            </div>
            <button class="layui-btn" data-type="reload">搜索</button>
            <button class="layui-btn insert" data-type="reload">新增学生</button>
        </div>
        <table class="layui-table" lay-data="{width: 1500, height:500, url:'/student/findAll', page:true, id:'idTest'}" lay-filter="demo">
            <thead>
            <tr>
                <th lay-data="{type:'checkbox', fixed: 'left'}"></th>
                <th lay-data="{field:'s_id', width:80, sort: true, fixed: true}">ID</th>
                <th lay-data="{field:'s_name', width:100, sort: true}">用户名</th>
                <th lay-data="{field:'s_age', width:80, sort: true}">年龄</th>
                <th lay-data="{field:'s_gender', width:120, sort: true , templet: '#sexTpl'}">性别</th>
                <th lay-data="{field:'cls_name', width:200, sort: true}">班级</th>
                <th lay-data="{fixed: 'right', width:178, align:'center', toolbar: '#barDemo'}">操作</th>
            </tr>
            </thead>
        </table>
    </div>

    <jsp:include page="../formwork/footer.jsp"/>
</div>
<script type="text/html" id="barDemo">
    <a class="layui-btn layui-btn-xs" lay-event="edit">编辑</a>
    <a class="layui-btn layui-btn-danger layui-btn-xs" lay-event="del">删除</a>
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
  layui.use('table', function(){
    var table = layui.table;

    //监听工具条
    table.on('tool(demo)', function(obj){
      var data = obj.data;
      if(obj.event === 'detail'){
        layer.msg('ID：'+ data.id + ' 的查看操作');
      } else if(obj.event === 'del'){
        layer.confirm('真的删除行么', function(index){
          obj.del();
          layer.close(index);
        });
      } else if(obj.event === 'edit'){
        // layer.alert('编辑行：<br>'+ JSON.stringify(data));
        layer.open({
          type: 2,
          title: '修改学生信息',
          shade: false,
          shadeClose: true,
          shade:0.4,
          maxmin: true,
          area: ['30%', '50%'],
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
            name: demoReload.val()
          }
        }, 'data');
      }
    };
    $(".insert").on('click',function () {
      layer.open({
        type: 2,
        title: '新增学生',
        shade: false,
        shadeClose: true,
        shade:0.4,
        maxmin: true,
        area: ['30%', '50%'],
        content: '/student/insert',
      });
    })

    $('.demoTable .layui-btn').on('click', function(){
      var type = $(this).data('type');
      active[type] ? active[type].call(this) : '';
    });
  });
</script>
</body>
</html>