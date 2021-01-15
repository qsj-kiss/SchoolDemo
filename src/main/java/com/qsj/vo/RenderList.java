package com.qsj.vo;

import java.io.Serializable;
import java.util.List;

/**
 * Create by qsj computer
 * @author qsj
 * @date 2021/1/15 14:36
 * 数据封装类
 * 在数据查询多个时使用
 */
public class RenderList implements Serializable {
    private List<Object> data;
    private Integer count;

    public List<Object> getData() {
        return data;
    }

    public void setData(List<Object> data) {
        this.data = data;
    }

    public Integer getCount() {
        return count;
    }

    public void setCount(Integer count) {
        this.count = count;
    }
}
