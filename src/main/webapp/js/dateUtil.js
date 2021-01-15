/**
	日期JS处理工具
	@author James,25708164@qq.com;
	@date  2016-11-15
 */

	/**
	 * 获取当前日期
	 * yyyy-MM-dd HH:mm:ss 
	 * yyyy-MM-dd
	 */
	Date.prototype.Forma = function(fmt) { 
	var o = {
		"M+" : this.getMonth() + 1, //月份   
		"d+" : this.getDate(), //日   
		"h+" : this.getHours(), //小时   
		"m+" : this.getMinutes(), //分   
		"s+" : this.getSeconds(), //秒   
		"q+" : Math.floor((this.getMonth() + 3) / 3), //季度   
		"S" : this.getMilliseconds()
	//毫秒   
	};
	if (/(y+)/.test(fmt))
		fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "")
				.substr(4 - RegExp.$1.length));
	for ( var k in o)
		if (new RegExp("(" + k + ")").test(fmt))
			fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k])
					: (("00" + o[k]).substr(("" + o[k]).length)));
	return fmt;
} ;
	

/**
 * 比较两个日期大小
 * @param beginDate
 * @param endDate
 * @returns {Number}  0 相等；1 小于 ；2 大于 ；-1 出错
 */
jQuery.compareDate=function(date1,date2){
	var d1 = new Date(date1.replace(/\-/g, "\/"));  
	 var d2 = new Date(date2.replace(/\-/g, "\/"));  
	 if(date1!="" && date2!="") {
		 if(d1 >d2){
			 return 2;
		 }else if(d1<d2){
			 return 1;
		 }else{
			 return 0;
		 }
	 }else{
		 return -1;
	 }
};
	
/**
 * 两个日期时间比较
 * @param date1
 * @param date2
 * @returns {Number} 0 相等；1 小于 ；2 大于 ；
 */
jQuery.compareDateTime=function(date1,date2){
	var d1 = new Date(date1.replace(/\-/g, "\/"));  
	 var d2 = new Date(date2.replace(/\-/g, "\/"));  
	 
    if(d1.getTime()>d2.getTime()){
    	return 2;
    }else if(d1.getTime()<d2.getTime()){
    	return 1;
    }else{
    	return 0;
    }
};	

/**
 * 比较d1、d2 的相差时间大小
 * unit： d 天、m 月、y 年、h 小时、s、分钟
 */
jQuery.diffDateTime=function(date1,date2,unit){
	var d1 = new Date(date1.replace(/\-/g, "\/"));  
	var d2 = new Date(date2.replace(/\-/g, "\/"));
    var  diffValue = d1.getTime()-d2.getTime();

    switch(unit){
	   case 'd':
		   return parseInt(diffValue/1000/60/60/24);
	   case 'm':
		   return parseInt(diffValue/1000/60/60/3600/30);	//此处是平均算每月30天 ，不精准
	   case 'y':
		   return;
	   case 'h':
		   return parseInt(diffValue/1000/60/60);
	   case 's':
		   return parseInt(diffValue/1000/60);
   }
};	


/**
 * IE浏览器不支持date(time),所以用此方法转换
 * @param str  2016-08-22  13:09:09
 * @returns {Date}
 */
function NewDate(str) {
    //首先将日期分隔 ，获取到日期部分 和 时间部分
    var day = str.split(' ');
    //获取日期部分的年月日
    var days = day[0].split('-');
    //获取时间部分的 时分秒
    var mi = day[day.length - 1].split(':');
    //获取当前date类型日期
    var date = new Date();
    //给date赋值  年月日
    date.setUTCFullYear(days[0], days[1] - 1, days[2]);
    //给date赋值 时分秒  首先转换utc时区 ：+8      
    date.setUTCHours(mi[0] - 8, mi[1], mi[2]);
    return date;
} 

/**
 * date对象转yy-mm-dd hh:mm:ss形式string
 * @param t
 * @returns
 */
function time2String(t) {
	with (t)
		return [ getFullYear(), '-', ('0' + (getMonth() + 1)).slice(-2),
				'-', ('0' + getDate()).slice(-2), ' ',
				('0' + getHours()).slice(-2), ':',
				('0' + getMinutes()).slice(-2), ':',
				('0' + getSeconds()).slice(-2) ].join('')
}

	
/**
 * 计算增减某段时间的时间string
 * @param oldDateString	被计算的时间string
 * @param isAdd				true为加  false为减
 * @param num				增减的数量(number)
 * @param unit					增减的单位，目前支持min，hour，day
 */
function getCalTimeString(oldDateString,isAdd,num,unit){
	var _oldTime=NewDate(oldDateString);
	var TimeMSecond=_oldTime.getTime();//获取毫秒数
	var dayMSeconds=24*60*60*1000;
	var hourMSeconds=60*60*1000;
	var minMSeconds=60*1000;
	var gap=0;
	switch(unit){
		case "min":gap=num*minMSeconds;break;
		case "hour":gap=num*hourMSeconds;break;
		case "day":gap=num*dayMSeconds;break;
		default:;
	}
	var newTime=isAdd?new Date(Number((TimeMSecond+gap))):new Date(Number((TimeMSecond-gap)));
	return time2String(newTime);
}
