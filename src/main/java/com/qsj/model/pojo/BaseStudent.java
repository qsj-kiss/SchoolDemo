package com.qsj.model.pojo;

import com.jfinal.plugin.activerecord.Model;
import com.jfinal.plugin.activerecord.IBean;

/**
 * Generated by JFinal, do not modify this file.
 */
@SuppressWarnings("serial")
public abstract class BaseStudent<M extends BaseStudent<M>> extends Model<M> implements IBean {

	public void setSId(java.lang.Integer sId) {
		set("s_id", sId);
	}

	public java.lang.Integer getSId() {
		return get("s_id");
	}

	public void setSName(java.lang.String sName) {
		set("s_name", sName);
	}

	public java.lang.String getSName() {
		return get("s_name");
	}

	public void setSAge(java.lang.Integer sAge) {
		set("s_age", sAge);
	}

	public java.lang.Integer getSAge() {
		return get("s_age");
	}

	public void setSGender(java.lang.Integer sGender) {
		set("s_gender", sGender);
	}

	public java.lang.Integer getSGender() {
		return get("s_gender");
	}

	public void setSClass(java.lang.Integer sClass) {
		set("s_class", sClass);
	}

	public java.lang.Integer getSClass() {
		return get("s_class");
	}

}
