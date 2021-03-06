package com.qsj.model.pojo;

import com.jfinal.plugin.activerecord.Model;
import com.jfinal.plugin.activerecord.IBean;

/**
 * Generated by JFinal, do not modify this file.
 */
@SuppressWarnings("serial")
public abstract class BaseClasss<M extends BaseClasss<M>> extends Model<M> implements IBean {

	public void setClsId(java.lang.Integer clsId) {
		set("cls_id", clsId);
	}

	public java.lang.Integer getClsId() {
		return get("cls_id");
	}

	public void setClsName(java.lang.String clsName) {
		set("cls_name", clsName);
	}

	public java.lang.String getClsName() {
		return get("cls_name");
	}

	public void setClsRemark(java.lang.String clsRemark) {
		set("cls_remark", clsRemark);
	}

	public java.lang.String getClsRemark() {
		return get("cls_remark");
	}

	public void setClsMath(java.lang.Integer clsMath) {
		set("cls_math", clsMath);
	}

	public java.lang.Integer getClsMath() {
		return get("cls_math");
	}

	public void setClsChinese(java.lang.Integer clsChinese) {
		set("cls_chinese", clsChinese);
	}

	public java.lang.Integer getClsChinese() {
		return get("cls_chinese");
	}

	public void setClsEnglish(java.lang.Integer clsEnglish) {
		set("cls_english", clsEnglish);
	}

	public java.lang.Integer getClsEnglish() {
		return get("cls_english");
	}

	public void setClsPe(java.lang.Integer clsPe) {
		set("cls_pe", clsPe);
	}

	public java.lang.Integer getClsPe() {
		return get("cls_pe");
	}

	public void setClsPhysical(java.lang.Integer clsPhysical) {
		set("cls_physical", clsPhysical);
	}

	public java.lang.Integer getClsPhysical() {
		return get("cls_physical");
	}

}
