package com.qsj.service;

import com.jfinal.kit.StrKit;
import com.jfinal.plugin.activerecord.Db;
import com.jfinal.plugin.activerecord.Page;
import com.jfinal.plugin.activerecord.Record;
import com.qsj.model.Classs;
import com.qsj.model.Student;
import com.qsj.model.Teacher;
import com.qsj.vo.*;

import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Create by qsj
 * 操作班级的服务层
 * @author qsj
 * @date 2020/12/27 22:05
 */

public class ClasssService {

    /** 查询一个班级所有学生的方法
     * @param page
     * @param pageSize
     * @param username   模糊查询输入的数据
     * @param cls_id  班级id
     * @return 一个数据封装类型
     */
    public RenderList findAllStudents(int page, int pageSize, String username , Integer cls_id){
        if (!StrKit.notBlank(username)){
            username="";
        }
        RenderList renderList = new RenderList();
        List<Object> list = new ArrayList<>();
        List<Student> students = Classs.dao.findById(cls_id).getStudents(page,pageSize,username);
        long integer = Db.queryLong("select count(*) from student where s_class = ? and  s_name like '%' ? '%' ",cls_id,username);
        int count=(int) integer;
        for (Student student : students) {
            list.add(student);
        }
        renderList.setData(list);
        renderList.setCount(count);
        return renderList;
    }

    /**
     /** 根据教的课程查询老师
     * @param sub_id 科目Id
     * @return 一个数据封装类型
     */
        public RenderList findTeacher(Integer sub_id){
        RenderList renderList = new RenderList();
            List<Teacher> teacherList = Classs.dao.getTeachers(sub_id);
            List<Object> list = new ArrayList<>();
            for (Teacher teacher : teacherList) {
                list.add(teacher);
            }
            renderList.setData(list);
            return renderList;
        }

    /** 插入一个班级
     * @param classs 班级实体类
     * @return 一个数据封装类
     */
    public Result insertClass(Classs classs){
        Result result =new Result();
        long aLong = Db.queryInt("select max(cls_id) from classs");
        classs.setClsId((int) aLong);
        boolean save = false;
        try {
            Record set = new Record().set("cls_id", classs.getClsId()+1).set("cls_name", classs.getClsName()).set("cls_remark", classs.getClsRemark())
                    .set("cls_chinese", classs.getClsChinese()).set("cls_math", classs.getClsMath()).set("cls_english", classs.getClsEnglish())
                    .set("cls_pe", classs.getClsPe()).set("cls_physical", classs.getClsPhysical());
            save = Db.save("classs", set);
        } catch (Exception e) {
            result.setState(500);
        }
        if (save){
            result.setState(200);
        }else {
            result.setState(500);
        }
        return result;
    }

    /** 查询班级的名称和id的集合
     * @return  一个封装classs的List集合
     */
    public List<Classs> findAllClassName(){
        List<Classs> list = Classs.dao.find("select cls_id,cls_name from classs");
        return list;
    }
    public Classs findById(Integer cls_id){
        Classs classs = Classs.dao.findById(cls_id);
        return classs;
    }

    /** 查询所有班级数据的方法
     * @param page
     * @param pageSize
     * @param cls_name 模糊查询输入的数据
     * @return 一个数据封装类型
     */
    public RenderList findAll(int page, int pageSize, String cls_name){
        RenderList classList = new RenderList();
        List<Object> list = new ArrayList<>();
        Map<Integer,String> map = new HashMap<>();
        StringBuilder sbr=new StringBuilder("from classs where 1 = 1 ");
        List<Object> paras = new ArrayList<>();
        if (StrKit.notBlank(cls_name)){
            sbr.append(" and cls_name like ?");
            paras.add("%"+cls_name+"%");
        }
        Page<Classs> paginate = Classs.dao.paginate(page, pageSize, "select *", sbr.toString(), paras.toArray());
        List<Teacher> teacherList = Teacher.dao.find("select t_id,t_name from teacher");
        for (Teacher teacher : teacherList) {
            map.put(teacher.getTId(),teacher.getTName());
        }
        for (Classs classs : paginate.getList()) {
            ClassAndTeachers cats = new ClassAndTeachers();
            cats.setCls_id(classs.getClsId());
            cats.setCls_name(classs.getClsName());
            cats.setCls_remark(classs.getClsRemark());
            cats.setChinese(map.get(classs.getClsChinese()));
            cats.setMath(map.get(classs.getClsMath()));
            cats.setEnglish(map.get(classs.getClsEnglish()));
            cats.setPe(map.get(classs.getClsPe()));
            cats.setPhysical(map.get(classs.getClsPhysical()));
            list.add(cats);
        }
        classList.setData(list);
        classList.setCount(paginate.getTotalRow());
        return classList;
    }
    /** 根据班级ID更新一个班级
     * @param classs 班级实体类
     * @return 一个数据封装类
     */
    public Result updateClass(Classs classs){
        Result result =new Result();
        System.out.println(classs);
        boolean save = false;
        try {
            Record set = new Record().set("cls_id", classs.getClsId()).set("cls_name", classs.getClsName()).set("cls_remark", classs.getClsRemark())
                    .set("cls_chinese", classs.getClsChinese()).set("cls_math", classs.getClsMath()).set("cls_english", classs.getClsEnglish())
                    .set("cls_pe", classs.getClsPe()).set("cls_physical", classs.getClsPhysical());
            save = Db.update("classs","cls_id", set);
        } catch (Exception e) {
            e.printStackTrace();
            result.setState(500);
        }
        if (save){
            result.setState(200);
        }else {
            result.setState(500);
        }
        return result;
    }
}
