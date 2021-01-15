package com.qsj.service;

import com.jfinal.kit.StrKit;
import com.jfinal.plugin.activerecord.Db;
import com.jfinal.plugin.activerecord.Record;
import com.qsj.model.Student;
import com.qsj.vo.*;

import java.util.ArrayList;
import java.util.List;

/**
 * @author qsj
 * 操作学生的服务层
 * @date 2020/12/27 20:05
 */
public class StudentService {

    /** 查询所有学生的方法
     * @param page
     * @param limit
     * @param username 模糊查询使用的数据
     * @return 一个数据封装类
     */
    public RenderList findAll(Integer page, Integer limit, String username){
        RenderList renderList=new RenderList();
        String sql="select s.s_id,s.s_name,s.s_age,s.s_gender,c.cls_name from student s left join classs c on c.cls_id = s.s_class";
        String count="select count(*) from student s left join classs c on c.cls_id = s.s_class ";
        StringBuilder sbr=new StringBuilder(" where 1 = 1 ");
        List<Object> paras = new ArrayList<>();
        if (StrKit.notBlank(username)){
            sbr.append(" and s_name like ?");
            paras.add("%"+username+"%");
        }
        long anInt = Db.queryLong(count + sbr.toString(), paras.toArray());
        renderList.setCount((int)anInt);
        sbr.append(" limit "+limit*(page-1)+" , "+limit);
        List<Record> list = Db.find(sql+sbr.toString(),paras.toArray());
        List<Object> sac =new ArrayList<>();
        for (Record record : list) {
            StudentAndClass subject=new StudentAndClass();
            subject.setS_id(record.getInt("s_id"));
            subject.setS_gender(record.getInt("s_gender"));
            subject.setS_name(record.getStr("s_name"));
            subject.setS_age(record.getInt("s_age"));
            subject.setCls_name(record.getStr("cls_name"));
            sac.add(subject);
        }
        renderList.setData(sac);
        return renderList;
    }

    /** 插入一个学生
     * @param student  一个学生实体类
     * @return 数据封装类
     */
    public Result insertStudent(Student student){
        Result result = new Result();
        long aLong = Db.queryInt("select max(s_id) from student");
        student.setSId((int) aLong);
        if (student.getSClass()==null){
            student.setSClass(1000);
        }
        try {
            boolean save = Student.dao.set("s_id", student.getSId() + 1).set("s_name", student.getSName()).set("s_gender", student.getSGender()).set("s_age", student.getSAge()).set("s_class", student.getSClass()).save();
            if (save){
                result.setState(200);
                result.setMsg("添加成功");
            }else{
                result.setState(404);
                result.setMsg("添加失败，查看是否数据有误");
            }
        } catch (Exception e) {
            e.printStackTrace();
            result.setState(404);
            result.setMsg("添加失败，查看是否数据有误,或者未勾选");
        }
        return result;
    }

    /** 根据学生ID查询学生信息
     * @param s_id  学生id
     * @return 返回一个学生类型
     */
    public Student findById(Integer s_id){
        Student student = new Student();
        Record record = Db.findById("student", "s_id", s_id);
        student.setSId(record.getInt("s_id"));
        student.setSName(record.getStr("s_name"));
        student.setSGender(record.getInt("s_gender"));
        student.setSAge(record.getInt("s_age"));
        student.setSClass(record.getInt("s_class"));
        return student;
    }

    /** 更新学生信息的方法
     * @param student  学生数据类型
     * @return 一个数据封装类型
     */
    public Result update(Student student){
        Result result = new Result();
        Record record=new Record().set("s_id",student.getSId()).set("s_name",student.getSName()).set("s_age",student.getSAge()).set("s_gender",student.getSGender()).set("s_class",student.getSClass());
        boolean isSave = Db.update("student", "s_id",record);
        if (isSave){
            result.setState(200);
            result.setMsg("修改成功");
        }else{
            result.setState(404);
            result.setMsg("修改失败，查看是否数据有误");
        }
        return result;
    }

}
