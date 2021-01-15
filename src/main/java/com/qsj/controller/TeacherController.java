package com.qsj.controller;

import com.qsj.controller.base.BaseController;
import com.qsj.model.Teacher;
import com.qsj.service.TeacherService;
import com.qsj.vo.RenderList;
import com.qsj.vo.Result;

/**
 * Create by qsj computer
 *
 * @author qsj
 * @date 2020/12/27 23:08
 */
public class TeacherController extends BaseController {
    private TeacherService teacherService = new TeacherService();

    public void list(){
        render("list.jsp");
    }

    public void update(){
        int para = getParaToInt("t_id");
        Teacher teacher = teacherService.findById(para);
        setAttr("teacher",teacher);
        render("update.jsp");
    }


    public void insert(){
        render("insert.jsp");
    }

    /**
     * 根据老师ID查询一个老师的方法
     */
    public void findById(){
        int tId = getParaToInt("t_id");
        Teacher service = teacherService.findById(tId);
        renderJson(service);
    }

    /**
     * 插入一个老师的方法
     */
    public void insertTeacher(){
        Teacher teacher = getBean(Teacher.class, "");
        Result result = teacherService.insert(teacher);
        renderJson(result);
    }

    /**
     * 更新一个老师的方法
     */
    public void updateTeacher(){
        Teacher bean = getBean(Teacher.class, "");
        Result result = teacherService.update(bean);
        renderJson(result);
    }

    /**
     * 查询所有老师的方法
     */
    public void findAll(){
        RenderList list = teacherService.findAll(getPage(), getLimit(), getName());
        renderPage(list);
    }

    /**
     * 删除一个老师的方法
     */
    public void del(){
        Integer t_id=this.getParaToInt("t_id");
        Result del = teacherService.del(t_id);
        renderJson(del);
    }


}
