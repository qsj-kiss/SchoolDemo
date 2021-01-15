package com.qsj.vo;

import java.io.Serializable;

/**
 * Create by qsj computer
 * @author qsj
 * @date 2020/12/28 1:41
 * 数据封装类
 * 在数据的修改和新增登录时使用
 */
public class Result implements Serializable {
    private Integer state;
    private String msg;
    private Object data;

    public Integer getState() {
        return state;
    }

    public void setState(Integer state) {
        this.state = state;
    }

    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }

    public Object getData() {
        return data;
    }

    public void setData(Object data) {
        this.data = data;
    }

    @Override
    public String toString() {
        return "Result{" +
                "state=" + state +
                ", msg='" + msg + '\'' +
                ", data=" + data +
                '}';
    }
}
