package com.qsj.controller;

import com.jfinal.aop.Clear;
import com.jfinal.core.Controller;
import com.qsj.interceptor.DemoInterceptor;
/**
 * Create by qsj computer
 *
 * @author qsj
 * @date 2021/1/11 15:25
 */
@Clear(DemoInterceptor.class)
public class IndexController extends Controller {

    /**
     * 首页显示
     */
    public void index(){
        render("index.jsp");
    }
}
