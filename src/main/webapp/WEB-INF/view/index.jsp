<%@ page language="java" contentType="text/html; charset=utf-8"
         pageEncoding="utf-8" isELIgnored="false" %>
<%@taglib prefix="c"  uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>学校管理平台</title>
    <meta name="renderer" content="webkit">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
    <link rel="stylesheet" href="/res/layui/css/layui.css" media="all">
    <!-- 注意：如果你直接复制所有代码到本地，上述css路径需要改成你本地的 -->
</head>

<body class="layui-layout-body">
<div class="layui-layout layui-layout-admin">
    <jsp:include page="formwork/header.jsp"/>
    <jsp:include page="formwork/side.jsp"/>
    <div class="layui-body">
        <!-- 内容主体区域 -->
        <h1 style="padding: 15px;">欢迎管理员进入学校管理平台</h1>
    </div>

    <jsp:include page="formwork/footer.jsp"/>
</div>
<script src="/res/layui/layui.js" charset="utf-8"></script>
<script>
  layui.use('table', function(){
    var table = layui.table;
  });
</script>
</body>
</html>