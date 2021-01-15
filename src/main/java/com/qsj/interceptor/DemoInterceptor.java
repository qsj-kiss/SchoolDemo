package com.qsj.interceptor;

import com.jfinal.aop.Interceptor;
import com.jfinal.aop.Invocation;
import com.jfinal.plugin.activerecord.Db;
import com.jfinal.plugin.activerecord.Record;

/**
 * Create by qsj computer
 *  这是一个登陆拦截器
 * @author qsj
 * @date 2020/12/30 0:39
 */
public class DemoInterceptor implements Interceptor {
    @Override
    public void intercept(Invocation invocation) {
        String admin = null;
        try {
            admin = (String) invocation.getController().getSession().getAttribute("admin");
            Record id = Db.findById("admin_details", "ad_username", admin);
            if (id.get("ad_username")!=null){
                invocation.invoke();
            }else {
                invocation.getController().redirect("/admin");
            }
        } catch (Exception e) {
            invocation.getController().redirect("/admin");
        }
    }
}
