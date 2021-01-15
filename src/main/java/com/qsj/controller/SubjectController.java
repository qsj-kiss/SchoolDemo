package com.qsj.controller;

import com.qsj.controller.base.BaseController;
import com.qsj.model.Subject;
import com.qsj.service.SubjectService;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Create by qsj computer
 *  科目管理
 * @author qsj
 * @date 2021/1/13 14:49
 */
public class SubjectController  extends BaseController {
    /**
     * 查询所有所教科目的方法
     */
    public void findAllSubject(){
        SubjectService subjectService= new SubjectService();
        List<Subject> list = subjectService.findAllSubject();
        Map<String,Object> result= new HashMap<>();
        result.put("code",0);
        result.put("data",list);
        renderJson(result);
    }
}
