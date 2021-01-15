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
    <!-- 注意：如果你直接复制所有代码到本地，上述css路径需要改成你本地的 -->
</head>

<body class="layui-layout-body">
<div class="layui-layout layui-layout-admin">
    <jsp:include page="../formwork/header.jsp"/>
    <jsp:include page="../formwork/side.jsp"/>
    <div class="layui-body">
        <!-- 内容主体区域 -->
        <h1 style="padding: 15px;">班级管理模块</h1>
        <div class="demoTable" style="padding: 15px">
            搜索班级名称：
            <div class="layui-inline">
                <input class="layui-input" name="name" id="demoReload" autocomplete="off">
            </div>
            <button class="layui-btn" data-type="reload">搜索</button>
            <button class="layui-btn" data-type="reload " onclick="insert()">新增班级</button>
        </div>

        <table class="layui-table" lay-data="{width: 1500, height:500, url:'/class/findAll', page:true, id:'idTest'}" lay-filter="demo">
            <thead>
            <tr>
                <th lay-data="{type:'checkbox', fixed: 'left'}"></th>
                <th lay-data="{field:'cls_id', width:80, sort: true, fixed: true}">ID</th>
                <th lay-data="{field:'cls_name', width:120, sort: true, fixed: true}">班级名称</th>
                <th lay-data="{field:'cls_remark', width:200, sort: true, fixed: true}">班级描述</th>
                <th lay-data="{field:'chinese', width:110, sort: true, fixed: true}">语文老师</th>
                <th lay-data="{field:'math', width:110, sort: true}">数学老师</th>
                <th lay-data="{field:'english', width:110, sort: true}">英语老师</th>
                <th lay-data="{field:'pe', width:110, sort: true}">体育老师</th>
                <th lay-data="{field:'physical', width:110, sort: true}">物理老师</th>
                <th lay-data="{fixed: 'right', width:178, align:'center', toolbar: '#barDemo'}">操作</th>
            </tr>
            </thead>
        </table>
    </div>
    <jsp:include page="../formwork/footer.jsp"/>
</div>
<script type="text/html" id="barDemo">
    <a class="layui-btn layui-btn-primary layui-btn-xs" lay-event="detail">查看</a>
    <a class="layui-btn layui-btn-xs" lay-event="edit">编辑</a>
    <a class="layui-btn layui-btn-danger layui-btn-xs" lay-event="del">删除</a>
<%--    <a class="layui-btn layui-btn-xs" data-type="reload " lay-event="insert">班级</a>--%>

</script>
<script src="/res/layui/layui.js" charset="utf-8"></script>
<script src="/res/jquery.js" type="javascript"></script>

<script>
  function insert() {
    layer.open({
      type: 2,
      title: '新增班级',
      shade: false,
      shadeClose: true,
      shade: 0.4,
      maxmin: true,
      area: ['50%', '70%'],
      content: '/class/insert',
    });
  }
  layui.use('table', function(){
    var table = layui.table;

    //监听工具条
    table.on('tool(demo)', function(obj){
      var data = obj.data;
      console.log(data.cls_id)
      if(obj.event === 'detail'){
        layer.open({
          type: 2,
          title: '查看班级学生',
          shade: false,
          shadeClose: true,
          shade:0.4,
          maxmin: true,
          area: ['60%', '80%'],
          content: '/class/findStudent?cls_id= '+data.cls_id,
        });
      } else if(obj.event === 'del'){
        layer.confirm('真的删除行么', function(index){
          obj.del();
          layer.close(index);
        });
      } else if(obj.event === 'edit'){
        layer.open({
          type: 2,
          title: '修改班级信息',
          shade: false,
          shadeClose: true,
          shade:0.4,
          maxmin: true,
          area: ['50%', '70%'],
          content: '/class/update?cls_id= '+data.cls_id,
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

    $('.demoTable .layui-btn').on('click', function(){
      var type = $(this).data('type');
      active[type] ? active[type].call(this) : '';
    });
  });

</script>
</body>
</html>