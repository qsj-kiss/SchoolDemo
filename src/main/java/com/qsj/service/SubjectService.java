package com.qsj.service;

import com.qsj.model.Subject;

import java.util.List;

/**
 * Create by qsj computer
 *  操作科目服务层
 * @author qsj
 * @date 2021/1/13 14:51
 */
public class SubjectService {

    /** 查询所有的教师科目
     * @return 返回一个科目类型的List集合
     */
    public List<Subject> findAllSubject(){
        List<Subject> list = Subject.dao.find("select * from subject");
        return list;
    }
}
