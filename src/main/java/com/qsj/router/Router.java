package com.qsj.router;

import com.jfinal.config.Routes;
import com.qsj.controller.*;

/**
 * Create by qsj computer
 *  这个是路由配置类
 * @author qsj
 * @date 2021/1/11 14:52
 */
public class Router extends Routes {
    @Override
    public void config() {
        add("/", IndexController.class,"/");
        add("/admin", AdminLoginController.class,"/");
        add("/class", ClasssController.class,"/class");
        add("/student", StudentController.class,"/student");
        add("/teacher", TeacherController.class,"/teacher");
        add("/subject", SubjectController.class,"/subject");
    }
}
