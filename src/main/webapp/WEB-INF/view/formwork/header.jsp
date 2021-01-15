<%--
  Created by IntelliJ IDEA.
  User: 84735
  Date: 2021/1/12
  Time: 9:37
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title></title>
</head>
<body>
<div class="layui-header">
    <div class="layui-logo">校园人员管理平台</div>
    <!-- 头部区域（可配合layui已有的水平导航） -->
    <ul class="layui-nav layui-layout-left">
        <li class="layui-nav-item"><a href="/class/list">班级管理</a></li>
        <li class="layui-nav-item"><a href="/teacher/list">老师管理</a></li>
        <li class="layui-nav-item"><a href="/student/list">学生管理</a></li>
    </ul>
    <ul class="layui-nav layui-layout-right">
        <li class="layui-nav-item">
            <img src="http://t.cn/RCzsdCq" class="layui-nav-img">
            管理员
        </li>
        <li class="layui-nav-item"><a href="/admin/out">退了</a></li>
    </ul>
</div>
</body>
</html>
