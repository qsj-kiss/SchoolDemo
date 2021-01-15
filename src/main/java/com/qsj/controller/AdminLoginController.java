package com.qsj.controller;

import com.jfinal.aop.Clear;
import com.jfinal.plugin.activerecord.Db;
import com.qsj.controller.base.BaseController;
import com.qsj.interceptor.DemoInterceptor;
import com.qsj.model.Admin;
import com.qsj.service.AdminLoginService;

import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.Map;

/**
 * Create by qsj computer
 * 这个是登录的类
 * @author qsj
 * @date 2021/1/11 10:22
 */
@Clear(DemoInterceptor.class)
public class AdminLoginController extends BaseController {

    private AdminLoginService service =new AdminLoginService();

    public void index() {
        render("login.jsp");
    }

    /**
     * 登录方法
     */
    public void login(){
        HttpSession session = getSession();
        Admin bean = getBean(Admin.class, "");
        Map<String,Object> map = new HashMap<>(16);
        Integer login = service.loginIn(bean,session);
        map.put("code",0);
        if (login == 0){
            map.put("data",0);
        }else if (login == 1){
            map.put("data",1);
        }else if (login == 2){
            map.put("data",2);
        }else {
            map.put("data",3);
        }
        renderJson(map);
    }


    /**
     * 登出方法
     */
    public void out(){
        HttpSession session = getSession();
        Db.update("delete from admin_details where ad_username = ?",session.getAttribute("admin"));
        session.removeAttribute("admin");
        redirect("/admin");
    }
}
