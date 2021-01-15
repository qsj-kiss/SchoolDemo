package com.qsj.model;

import com.jfinal.plugin.activerecord.Db;
import com.jfinal.plugin.activerecord.Record;
import com.qsj.model.pojo.BaseAdminDetails;

/**
 * Generated by JFinal.
 * @author 84735
 */
@SuppressWarnings("serial")
public class AdminDetails extends BaseAdminDetails<AdminDetails> {
	public static final AdminDetails dao = new AdminDetails();

	/**
	 * 这个是开启项目清除过渡表的方法
	 */
	public void deleteAll(){
		Db.update("delete from admin_details");
		Db.update("delete from admin_transition");
	}

}