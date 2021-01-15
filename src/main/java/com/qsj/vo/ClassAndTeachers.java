package com.qsj.vo;

import java.io.Serializable;

/**
 * Create by qsj computer
 *  这是一个封装了老师和班级的vo类
 * @author qsj
 * @date 2020/12/30 23:53
 */
public class ClassAndTeachers implements Serializable {
    private Integer cls_id;
    private String cls_name;
    private String cls_remark;
    private String Chinese;
    private String Math;
    private String English;
    private String Pe;
    private String Physical;

    public Integer getCls_id() {
        return cls_id;
    }

    public void setCls_id(Integer cls_id) {
        this.cls_id = cls_id;
    }

    public String getCls_name() {
        return cls_name;
    }

    public void setCls_name(String cls_name) {
        this.cls_name = cls_name;
    }

    public String getCls_remark() {
        return cls_remark;
    }

    public void setCls_remark(String cls_remark) {
        this.cls_remark = cls_remark;
    }

    public String getChinese() {
        return Chinese;
    }

    public void setChinese(String chinese) {
        Chinese = chinese;
    }

    public String getMath() {
        return Math;
    }

    public void setMath(String math) {
        Math = math;
    }

    public String getEnglish() {
        return English;
    }

    public void setEnglish(String english) {
        English = english;
    }

    public String getPe() {
        return Pe;
    }

    public void setPe(String pe) {
        Pe = pe;
    }

    public String getPhysical() {
        return Physical;
    }

    public void setPhysical(String physical) {
        Physical = physical;
    }

    @Override
    public String toString() {
        return "ClassAndTeachers{" +
                "cls_id=" + cls_id +
                ", cls_name='" + cls_name + '\'' +
                ", cls_remark='" + cls_remark + '\'' +
                ", Chinese='" + Chinese + '\'' +
                ", Math='" + Math + '\'' +
                ", English='" + English + '\'' +
                ", Pe='" + Pe + '\'' +
                ", Physical='" + Physical + '\'' +
                '}';
    }
}
