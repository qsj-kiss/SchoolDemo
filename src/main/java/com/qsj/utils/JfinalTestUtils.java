package com.qsj.utils;

import com.jfinal.config.Constants;
import com.jfinal.config.JFinalConfig;
import com.jfinal.config.Plugins;
import com.jfinal.plugin.IPlugin;
import org.junit.After;
import org.junit.Before;

/**
 * Create by qsj computer
 *  这是一个jfinal的测试工具
 * @author qsj
 * @date 2021/1/13 9:22
 */
public class JfinalTestUtils {

    /**
     * jfinal单元测试
     */
    private Constants constants;
    private Plugins plugins;

    /**
     * 通过配置类启动jfinal插件等
     */
    @Before
    public void initConfig() {
        try {
            String configClass = "com.qsj.config.StartConfig";
            Class<?> clazz = Class.forName(configClass);
            JFinalConfig jfinalConfig = (JFinalConfig) clazz.newInstance();
            constants = new Constants();
            jfinalConfig.configConstant(constants);
            plugins = new Plugins();
            jfinalConfig.configPlugin(plugins);
            for (IPlugin plug : plugins.getPluginList()) {
                plug.start();
            }
            jfinalConfig.afterJFinalStart();
            System.out.println("\n==JunitFinalTest Start==================\n");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @After
    public void endConfig() {
        System.out.println("\n==JunitFinalTest End====================");
        if (plugins != null) {
            for (IPlugin plug : plugins.getPluginList()) {
                plug.stop();
            }
        }
    }
}