package com.qsj.model.pojo;

import com.jfinal.plugin.activerecord.Model;
import com.jfinal.plugin.activerecord.IBean;

/**
 * Generated by JFinal, do not modify this file.
 */
@SuppressWarnings("serial")
public abstract class BaseAdminTransition<M extends BaseAdminTransition<M>> extends Model<M> implements IBean {

	public void setAdUsername(java.lang.String adUsername) {
		set("ad_username", adUsername);
	}

	public java.lang.String getAdUsername() {
		return get("ad_username");
	}

	public void setAdStates(java.lang.Integer adStates) {
		set("ad_states", adStates);
	}

	public java.lang.Integer getAdStates() {
		return get("ad_states");
	}

}
