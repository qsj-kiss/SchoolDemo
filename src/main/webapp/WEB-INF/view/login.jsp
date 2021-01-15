<%@ page language="java" contentType="text/html; charset=utf-8"
         pageEncoding="utf-8"%>
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>登入页面</title>
    <meta name="renderer" content="webkit">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <link rel="stylesheet" href="/res/layui/css/layui.css" media="all">
    <link rel="stylesheet" href="/res/layui/css/admin.css" media="all">
    <link rel="stylesheet" href="/res/layui/css/login.css" media="all">
</head>
<body>

<div class="layadmin-user-login layadmin-user-display-show" id="LAY-user-login" style="display: none;">

    <div class="layadmin-user-login-main">
        <div class="layadmin-user-login-box layadmin-user-login-header">
            <h2>校园后台管理平台</h2>
        </div>
        <div class="layadmin-user-login-box layadmin-user-login-body layui-form">
            <div class="layui-form-item">
                <label class="layadmin-user-login-icon layui-icon layui-icon-username" for="LAY-user-login-username"></label>
                <input type="text" name="adUsername" id="LAY-user-login-username" lay-verify="required" placeholder="用户名" class="layui-input">
            </div>
            <div class="layui-form-item">
                <label class="layadmin-user-login-icon layui-icon layui-icon-password" for="LAY-user-login-password"></label>
                <input type="password" name="adPassword" id="LAY-user-login-password" lay-verify="required" placeholder="密码" class="layui-input">
            </div>
            <div class="layui-form-item">
                <div class="layui-row">
                    <div class="layui-col-xs7">
                        <label class="layadmin-user-login-icon layui-icon layui-icon-vercode" for="LAY-user-login-vercode"></label>
                        <input type="text" name="vercode" id="LAY-user-login-vercode" lay-verify="required" placeholder="图形验证码" class="layui-input">
                    </div>
                    <div class="layui-col-xs5">
                        <div style="margin-left: 10px;">
                            <img src="https://www.oschina.net/action/user/captcha" class="layadmin-user-login-codeimg" id="LAY-user-get-vercode">
                        </div>
                    </div>
                </div>
            </div>
            <div class="layui-form-item">
                <button class="layui-btn layui-btn-fluid" lay-submit lay-filter="LAY-user-login-submit">登 入</button>
            </div>
        </div>
    </div>
</div>

<script src="/res/layui/layui.js"></script>
<script src="/res/layui/index.js"></script>
<script src="/res/config.js"></script>
<script>
  layui.config({
    base: 'res/' //静态资源所在路径
  }).extend({
    index: 'layui/index' //主入口模块
  }).use(['index', 'user'], function(){
    var $ = layui.$
        ,admin = layui.admin
        ,form = layui.form
        ,router = layui.router()
        ,search = router.search;

    form.render();

    //提交
    form.on('submit(LAY-user-login-submit)', function(obj){

      //请求登入接口
      admin.req({
        url: '/admin/login' //实际使用请改成服务端真实接口
        ,data: obj.field
        ,done: function(data){
          if (data===null){
            return
          }
          if (data.data==1){
            //登入成功的提示与跳转
            layer.msg('登入成功', {
              offset: '15px'
              ,icon: 1
              ,time: 1000
            }, function(){
              location.href = '/index'; //后台主页
            });
          }
          else if (data.data==0) {
            layer.msg('登入失败,检查账户或者密码是否错误', {
              offset: '15px'
              ,icon: 2
              ,time: 1000
            })
          }
          else if (data.data==2) {
            layer.msg('该用户已登录', {
              offset: '15px'
              ,icon: 0
              ,time: 1000
            })
          }
          else{
            layer.msg('账户或密码错误次数太多请稍后再试', {
              offset: '15px'
              ,icon: 2
              ,time: 1000
            })
        }
      }});
    });
  });
</script>
</body>
</html>