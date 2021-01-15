<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>老师管理</title>
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
        <h1 style="padding: 15px;">教师管理模块</h1>
        <div class="demoTable" style="padding: 15px">
            搜索教师姓名：
            <div class="layui-inline">
                <input class="layui-input" name="name" id="demoReload" autocomplete="off">
            </div>
            <button class="layui-btn" data-type="reload">搜索</button>
            <button class="layui-btn insert" data-type="reload">新增教师</button>
        </div>

        <table class="layui-table" lay-data="{width: 1500, height:500, url:'/teacher/findAll', page:true, id:'idTest'}" lay-filter="demo">
            <thead>
            <tr>
                <th lay-data="{type:'checkbox', fixed: 'left'}"></th>
                <th lay-data="{field:'t_id', width:80, sort: true, fixed: true}">ID</th>
                <th lay-data="{field:'t_name', width:100, sort: true}">姓名</th>
                <th lay-data="{field:'t_gender', width:120, sort: true, templet: '#sexTpl'}">性别</th>
                <th lay-data="{field:'sub_detail', width:180, sort: true}">所教科目</th>
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
    {{#  if(d.t_gender === 2){ }}
    <span style="color: #F581B1;">女</span>
    {{#  } else if(d.t_gender === 1){ }}
    <span style="color: #48892c;">男</span>
    {{#  }else{ }}
    <span style="color: #2c7b89;">外星人</span>
    {{# } }}
</script>
<!-- 注意：如果你直接复制所有代码到本地，上述js路径需要改成你本地的 -->
<script>
  layui.use('table', function(){
    var table = layui.table;

    //监听工具条
    table.on('tool(demo)', function(obj){
      var datas = obj.data;
      if(obj.event === 'del'){
        layer.confirm('真的删除行么', function(index){
          $.post("/teacher/del",{t_id:datas.t_id},function (data) {
                if (data===null){
                  layer.alert("删除失败")
                }else if (data.state==200){
                    obj.del();
                    layer.alert(data.msg)
                }else if (data.state==500){
                    layer.alert(data.msg)
                }
          })
          layer.close(index);
        });
      } else if(obj.event === 'edit'){
        layer.open({
          type: 2,
          title: '修改教师信息',
          shade: false,
          shadeClose: true,
          shade:0.4,
          maxmin: true,
          area: ['30%', '50%'],
          content: '/teacher/update?t_id= '+datas.t_id,
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
        title: '修改教师信息',
        shade: false,
        shadeClose: true,
        shade:0.4,
        maxmin: true,
        area: ['30%', '50%'],
        content: '/teacher/insert',
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