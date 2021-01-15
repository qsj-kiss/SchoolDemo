package com.qsj.vo;

import java.io.Serializable;

/**
 * Create by qsj computer
 *  这是一个封装了学生和班级的vo类
 * @author qsj
 * @date 2021/1/13 18:03
 */
public class StudentAndClass implements Serializable {
    private Integer s_id;
    private String s_name;
    private Integer s_age;
    private Integer s_gender;
    private String cls_name;

    public Integer getS_id() {
        return s_id;
    }

    public void setS_id(Integer s_id) {
        this.s_id = s_id;
    }

    public String getS_name() {
        return s_name;
    }

    public void setS_name(String s_name) {
        this.s_name = s_name;
    }

    public Integer getS_age() {
        return s_age;
    }

    public void setS_age(Integer s_age) {
        this.s_age = s_age;
    }

    public Integer getS_gender() {
        return s_gender;
    }

    public void setS_gender(Integer s_gender) {
        this.s_gender = s_gender;
    }

    public String getCls_name() {
        return cls_name;
    }

    public void setCls_name(String cls_name) {
        this.cls_name = cls_name;
    }
}
