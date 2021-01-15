package com.qsj.config;

import com.jfinal.config.*;
import com.jfinal.json.JFinalJsonFactory;
import com.jfinal.kit.PropKit;
import com.jfinal.plugin.activerecord.ActiveRecordPlugin;
import com.jfinal.plugin.c3p0.C3p0Plugin;
import com.jfinal.render.ViewType;
import com.qsj.interceptor.DemoInterceptor;
import com.qsj.model.AdminDetails;
import com.qsj.model._MappingKit;
import com.qsj.router.Router;

/**
 * Create by qsj computer
 *  这个是jfinal的总配置类
 * @author qsj
 * @date 2021/1/11 10:15
 */
public class StartConfig extends JFinalConfig {

    public static String absolutePath;
    /** 配置常量
     * @param me
     */
    @Override
    public void configConstant(Constants me) {
        // 读取Jfinal 配置文件
//        PropKit.use(FilesConfig.MAINCONFIG, "UTF-8");
        PropKit.use("config.properties", "UTF-8");
        // 开发模式设置
        me.setDevMode(PropKit.getBoolean("devModel"));
        // 先执行invoke，在打印信息
        me.setReportAfterInvocation(PropKit.getBoolean("reportAfterInvocation"));
        //设置模板
        if ("JSP".equalsIgnoreCase(PropKit.get("viewType")) || PropKit.get("viewType") == null) {
            me.setViewType(ViewType.JSP);
        } else if ("freemark".equalsIgnoreCase(PropKit.get("viewType"))) {
            me.setViewType(ViewType.FREE_MARKER);
        } else if ("velocity".equalsIgnoreCase(PropKit.get("viewType"))) {
            me.setViewType(ViewType.VELOCITY);
        } else {
            me.setViewType(ViewType.OTHER);
        }
        // 视图文件保存目录前缀
        me.setBaseViewPath(PropKit.get("baseViewPath"));
        //配置404/500 页面
        me.setError404View(PropKit.get("baseViewPath") + "error/404.jsp");
        me.setError500View(PropKit.get("baseViewPath") + "error/500.jsp");
        /**
         * 设置 Json 转换工厂实现类，目前支持：JFinalJsonFactory(默认)、JacksonFactory、FastJsonFactory
         * 分别支持 JFinalJson、Jackson、FastJson
         */
        me.setJsonFactory(new JFinalJsonFactory());
    }

    /** 配置路由
     * @param me
     */
    @Override
    public void configRoute(Routes me) {
        me.add(new Router());
    }

    /** 配置连接池
     * @param me
     */
    @Override
    public void configPlugin(Plugins me) {
        C3p0Plugin c3p0plugin = new C3p0Plugin(PropKit.get("jdbcUrl"), PropKit.get("user"), PropKit.get("password"));
        me.add(c3p0plugin);
        ActiveRecordPlugin arp=new ActiveRecordPlugin(c3p0plugin);
        _MappingKit.mapping(arp);
        arp.setShowSql(PropKit.getBoolean("showSql", true));
        me.add(arp);
    }

    /** 配置一个全局过滤器
     * @param me
     */
    @Override
    public void configInterceptor(Interceptors me) {
        me.add(new DemoInterceptor());
    }

    @Override
    public void configHandler(Handlers me) {

    }

    /**
     * 开启项目之前清楚过渡表的数据
     */
    @Override
    public void afterJFinalStart() {
        AdminDetails.dao.deleteAll();
    }
}
