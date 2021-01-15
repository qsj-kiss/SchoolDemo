package com.qsj;

import com.jfinal.core.JFinal;

/**
 * Create by qsj computer
 *  启动端口
 *  webAppDir：设置文件的编译路径
 *  port：端口
 *  context：项目名,留空就是不需要添加
 *  scanIntervalSeconds : 5秒扫描一次
 * @author qsj
 * @date 2021/1/11 10:36
 */
public class Start {
    public static void main(String[] args) {
        JFinal.start("src/main/webapp",81,"/",5);
    }
}
