package com.qsj.controller;

import com.qsj.controller.base.BaseController;
import com.qsj.model.Student;
import com.qsj.service.StudentService;
import com.qsj.vo.RenderList;
import com.qsj.vo.Result;

/**
 * Create by qsj computer
 *
 * @author qsj
 * @date 2020/12/27 22:13
 */
public class StudentController extends BaseController {
    private StudentService studentService = new StudentService();

    public void list(){
        render("list.jsp");
    }


    public void insert(){
        render("insert.jsp");
    }

    public void update(){
        Integer toInt = getParaToInt("s_id");
        Student student = studentService.findById(toInt);
        setAttr("student",student);
        render("update.jsp");
    }

    /**
     * 查询所有学生的方法
     */
    public void findAll(){
        RenderList list = studentService.findAll(getPage(), getLimit(), getName());
        renderPage(list);
    }

    /**
     * 新增一个学生的方法
     */
    public void insertStudent(){
        Student bean = getBean(Student.class, "");
        Result result = studentService.insertStudent(bean);
        renderJson(result);
    }

    /**
     * 更新一个学生的方法
     */
    public void updateStudent(){
        Student bean = getBean(Student.class, "");
        Result result = studentService.update(bean);
        renderJson(result);
    }

}
