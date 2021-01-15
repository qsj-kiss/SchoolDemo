package com.qsj.controller;

import com.qsj.controller.base.BaseController;
import com.qsj.model.Classs;
import com.qsj.service.ClasssService;
import com.qsj.vo.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Create by qsj computer
 *
 * @author qsj
 * @date 2020/12/27 23:09
 */
public class ClasssController extends BaseController {

    private ClasssService classsService =new ClasssService();

    public void list(){
        render("list.jsp");
    }

    public void insert(){
        render("insert.jsp");
    }

    public void update(){
        Integer cls_id = getParaToInt("cls_id");
        Classs classs = classsService.findById(cls_id);
        setAttr("class",classs);
        render("update.jsp");
    }

    /**
     * 查询单个班级名字的方法
     */
    public void findStudent(){
        Integer cls_id=this.getParaToInt("cls_id");
        Classs classs = classsService.findById(cls_id);
        setAttr("Cls_Name",classs.getClsName());
        render("studentList.jsp");
    }

    /**
     * 查询所有的班级名称的方法
     */
    public void findAllClassName(){
        List<Classs> list = classsService.findAllClassName();
        Map<String,Object> result= new HashMap<>();
        result.put("code",0);
        result.put("data",list);
        renderJson(result);
    }

    /**
     * 根据班级id查询学生的方法
     */
    public void findStudentById(){
        Integer cls_id=this.getParaToInt("cls_id");
        String username=this.getPara("username");
        RenderList list = classsService.findAllStudents(getPage(),getLimit(),username, cls_id);
        renderPage(list);
    }

    /**
     * 根据老师科目查询老师的方法
     */
    public void findTeacher(){
        Integer cls_id=this.getParaToInt("sub_id");
        RenderList list = classsService.findTeacher(cls_id);
        renderPage(list);
    }

    /**
     * 插入一个班级的方法
     */
    public void insertClass(){
        Classs bean = getBean(Classs.class,"");
        Result result = classsService.insertClass(bean);
        renderJson(result);
    }

    /**
     * 更新一个班级的方法
     */
    public void updateClass(){
        Classs bean = getBean(Classs.class,"");
        Result result = classsService.updateClass(bean);
        renderJson(result);
    }

    /**
     * 查询所有班级的方法
     */
    public void findAll(){
        RenderList list = classsService.findAll(getPage(), getLimit(), getName());
        renderPage(list);
    }

}
