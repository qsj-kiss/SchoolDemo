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
<div class="layui-side layui-bg-black">
    <div class="layui-side-scroll">
        <!-- 左侧导航区域（可配合layui已有的垂直导航） -->
        <ul class="layui-nav layui-nav-tree"  lay-filter="test">
            <li class="layui-nav-item ">
                <a class="" href="/student/list">学生管理</a>
            </li>
            <li class="layui-nav-item ">
                <a href="/class/list">班级管理</a>
            </li>
            <li class="layui-nav-item">
                <a href="/teacher/list">老师管理</a>
            </li>
        </ul>
    </div>
</div>

</body>
</html>
