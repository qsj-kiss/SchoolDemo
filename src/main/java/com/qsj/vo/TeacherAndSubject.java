package com.qsj.vo;

import java.io.Serializable;

/**
 * Create by qsj computer
 *  这是一个封装了老师和所教科目的vo类
 * @author qsj
 * @date 2020/12/31 9:17
 */
public class TeacherAndSubject implements Serializable {
    private Integer t_id;
    private String t_name;
    private Integer t_gender;
    private String sub_detail;

    public Integer getT_id() {
        return t_id;
    }

    public void setT_id(Integer t_id) {
        this.t_id = t_id;
    }

    public String getT_name() {
        return t_name;
    }

    public void setT_name(String t_name) {
        this.t_name = t_name;
    }

    public Integer getT_gender() {
        return t_gender;
    }

    public void setT_gender(Integer t_gender) {
        this.t_gender = t_gender;
    }

    public String getSub_detail() {
        return sub_detail;
    }

    public void setSub_detail(String sub_detail) {
        this.sub_detail = sub_detail;
    }

    @Override
    public String toString() {
        return "TeacherAndSubject{" +
                "t_id=" + t_id +
                ", t_name='" + t_name + '\'' +
                ", t_gender=" + t_gender +
                ", sub_detail='" + sub_detail + '\'' +
                '}';
    }
}
