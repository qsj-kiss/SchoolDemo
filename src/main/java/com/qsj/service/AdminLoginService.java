package com.qsj.service;

import com.jfinal.plugin.activerecord.Db;
import com.jfinal.plugin.activerecord.Record;
import com.qsj.model.Admin;
import com.qsj.model.AdminDetails;
import com.qsj.model.AdminTransition;

import javax.servlet.http.HttpSession;
import java.sql.Timestamp;
import java.util.List;

/**
 * Create by qsj computer
 *  管理员登录的方法
 * @author qsj
 * @date 2021/1/11 12:51
 */
public class AdminLoginService {
    /** 这是管理员登陆方法
     * @param admin 账号密码数据
     * @param session   session
     * @return inter类型的数据
     */
    public Integer loginIn(Admin admin, HttpSession session) {
        List<AdminTransition> adminTransitions = AdminTransition.dao.find("select * from admin_transition where ad_username = ?", admin.getAdUsername());
        if (adminTransitions.size() < 1) {
            AdminTransition.dao.set("ad_username", admin.getAdUsername()).set("ad_states", 0).save();
        }else if (adminTransitions.size() == 1){
            for (AdminTransition transition : adminTransitions) {
                if (transition.getAdStates() >= 3) {
                    return 3;
                }
            }
        }
        List<AdminDetails> admins = AdminDetails.dao.find("select * from admin_details where ad_username = ?", admin.getAdUsername());
        if (admins.size() < 1) {
            List<Admin> list = Admin.dao.find("select * from admin where ad_username = ? and ad_password = ?", admin.getAdUsername(), admin.getAdPassword());
            if (list.size() < 1) {
                Record transition = Db.findById("admin_transition","ad_username" ,admin.getAdUsername());
                transition.set("ad_states",transition.getInt("ad_states")+1);
                Db.update("admin_transition","ad_username",transition);
                return 0;
            }
            for (Admin lists : list) {
                admin = lists;
            }
            AdminDetails.dao.set("ad_username", admin.getAdUsername()).set("ad_logintime", new Timestamp(System.currentTimeMillis())).set("ad_id", admin.getAdId()).save();
            session.setAttribute("admin",admin.getAdUsername());
            AdminTransition.dao.deleteById(admin.getAdUsername());
            return 1;
        } else {
            return 2;
        }
    }
}
