package com.qsj.controller.base;

import com.jfinal.core.Controller;
import com.qsj.vo.RenderList;

import java.util.HashMap;
import java.util.Map;

/**
 * Create by qsj computer
 *  这个是一个公共的Controller增强
 * @author qsj
 * @date 2021/1/15 14:17
 */
public class BaseController extends Controller {

    /** 获取起始数
     * @return
     */
    protected Integer getPage(){
        return this.getParaToInt("page");
    }

    /** 获取多少个
     * @return
     */
    protected Integer getLimit(){
        return this.getParaToInt("limit");
    }

    /** 获取模糊查询
     * @return
     */
    protected String getName(){
        return this.getPara("name");
    }

    /** 渲染到前端
     * @param list  一个数据封装类型
     */
    protected  void  renderPage(RenderList list){
        Map<String,Object> map = new HashMap<>();
        map.put("code",0);
        map.put("count",list.getCount());
        map.put("data",list.getData());
        renderJson(map);
    }
}
