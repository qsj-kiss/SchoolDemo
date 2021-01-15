package com.qsj.service;

import com.jfinal.kit.StrKit;
import com.jfinal.plugin.activerecord.Db;
import com.jfinal.plugin.activerecord.Record;
import com.qsj.model.Teacher;
import com.qsj.vo.RenderList;
import com.qsj.vo.Result;
import com.qsj.vo.TeacherAndSubject;

import java.util.ArrayList;
import java.util.List;

/**
 * @author qsj
 * 操作老师数据服务层
 * @date 2020/12/27 21:05
 */
public class TeacherService {

    /** 插入一个老师的方法
     * @param teacher  一个老师实体类
     * @return 一个数据封装类
     */
    public Result insert(Teacher teacher){
        Result result = new Result();
        long aLong = Db.queryInt("select max(t_id) from teacher");
        teacher.setTId((int) aLong);
        if (teacher.getSubject()==null){
            teacher.setTSubject(1);
        }
        try {
            boolean save = Teacher.dao.set("t_id", teacher.getTId() + 1).set("t_name", teacher.getTName()).set("t_gender", teacher.getTGender()).set("t_subject", teacher.getTSubject()).save();
            if (save){
                result.setState(200);
                result.setMsg("添加成功");
            }else{
                result.setState(404);
                result.setMsg("添加失败，查看是否数据有误");
            }
        } catch (Exception e) {
            result.setState(404);
            result.setMsg("添加失败，查看是否数据有误,或者数据未勾选");
        }
        return result;
    }

    /** 根据老师ID查询老师的数据
     * @param id 老师的ID
     * @return 老师实体类
     */
    public Teacher findById(Integer id){
        Teacher teacher = new Teacher();
        Record record = Db.findById("teacher", "t_id", id);
        teacher.setTId(record.getInt("t_id"));
        teacher.setTName(record.getStr("t_name"));
        teacher.setTGender(record.getInt("t_gender"));
        teacher.setTSubject(record.getInt("t_subject"));
        return teacher;
    }

    /** 根据老师id更新数据
     * @param teacher 一个老师实体类
     * @return 一个数据封装类型
     */
    public Result update(Teacher teacher){
        Result result = new Result();
        Record record=new Record().set("t_id",teacher.getTId()).set("t_name",teacher.getTName()).set("t_gender",teacher.getTGender()).set("t_subject",teacher.getTSubject());
        boolean isSave = Db.update("teacher", "t_id",record);
        if (isSave){
            result.setState(200);
            result.setMsg("修改成功");
        }else{
            result.setState(404);
            result.setMsg("修改失败，查看是否数据有误");
        }
        return result;
    }

    /** 查询所有老师的方法
     * @param page
     * @param limit
     * @param username 模糊查询使用的数据
     * @return 一个数据封装类型
     */
    public RenderList findAll(Integer page, Integer limit, String username){
        RenderList renderList=new RenderList();
        String sql="select s.sub_detail,t.t_id,t.t_name,t.t_gender from subject s left join teacher t on t.t_subject = s.sub_id ";
        String count="select count(*) from subject s left join teacher t on t.t_subject = s.sub_id ";
        StringBuilder sbr=new StringBuilder(" where 1 = 1 ");
        List<Object> paras = new ArrayList<>();
        if (StrKit.notBlank(username)){
            sbr.append(" and t_name like ?");
            paras.add("%"+username+"%");
        }
        long anInt = Db.queryLong(count + sbr.toString(), paras.toArray());
        renderList.setCount((int)anInt);
        sbr.append(" limit "+limit*(page-1)+" , "+limit);
        List<Record> list = Db.find(sql+sbr.toString(),paras.toArray());
        List<Object> andSubjectList =new ArrayList<>();
        for (Record record : list) {
        TeacherAndSubject subject=new TeacherAndSubject();
            subject.setT_id(record.getInt("t_id"));
            subject.setT_gender(record.getInt("t_gender"));
            subject.setT_name(record.getStr("t_name"));
            subject.setSub_detail(record.getStr("sub_detail"));
            andSubjectList.add(subject);
        }
        renderList.setData(andSubjectList);
        return renderList;
    }

    /** 根据老师id删除一个老师 （慎用删除方法，不可逆）
     * @param t_id  老师的id
     * @return 一个数据封装类
     */
    public Result del(Integer t_id){
        Result result = new Result();
        boolean b = Teacher.dao.deleteById(t_id);
        if (b){
            result.setState(200);
            result.setMsg("删除成功");
        }else {
            result.setState(500);
            result.setMsg("删除失败");
        }
        return result;
    }
}
