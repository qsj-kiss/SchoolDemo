
/**
 * 名称：湖南CA--NetONE系统集成（拓展）
 * 版本：1.1.0
 * 更新时间：2018.02.06
 * 维护人员：Akay
 * 作用：解析Ukey中信息
 *
 * ver  1.1.0 2018.02.06
 *       1. 提供获取Ukey硬件序列号。（仅限SM2证书）
 *
 * ver 1.0.0 2017.09.01
 *      1. 提供两种解析方式：
 *          >HuncaGetCertInfoBySelect()  枚举获取计算机中的证书。
 *          >HuncaGetCertInfoByCertBase64() 通过传入证书内容
 *      2. 新增解析证书使用者，颁发者，SN，失效时间，证书内容 等等。
 */
function HUNCA_NETONEX_CERT(){

	//Ukey信息
	var ca_ukey_number = null;
	var ca_ukey_provider =null;
	
    //证书使用者
    var ca_subject_CN = null;
    var ca_subject_G  = null;
    var ca_subject_OU = null;
    var ca_subject_O  = null;
    var ca_subject_S  = null;
    var ca_subject_T  = null;
    var ca_subject_OID2541 = null;
	

    //证书颁发者
    var ca_issuer_O = null;

    //其他信息
    var ca_sn = null;
    var ca_content = null;
    var ca_NotAfterSystemTime  = null;

    var lastError = "";

    try {
        var netONEX = new NetONEX();
        netONEX.setupObject();
        var ccx = netONEX.getCertificateCollectionX();
    }catch (e) {
        alert("CA安全控件加载失败，请确保计算机安装最新驱动！");
        return null;
    }

    /**
     * 获取证书对象
     * @param certType
     * @returns {boolean}
     * @constructor
     */
    function SelectCert(certType) {
        var certMax = 0;
        ccx.CF_KeyUsage = certType;
        ccx.CF_Issuer_Contains = "湖南";
        ccx.OEM = 2;
        ccx.Quiet = 1;
        certMax = ccx.Load();

        if (certMax < 1) {
            cx = null;
            lastError = "对不起，未能获取到数字证书！";
            return false;
        }
        else if (certMax == 1) {
            cx = ccx.GetAt(0);
        }
        else {
            cx = ccx.SelectCertificateDialog();
            if (cx == null) {
                cx = null;
                lastError = "用户取消证书选择！";
                return false;
            }
        }

        ca_cert = cx.Content;
        return true;
    }

    /**
     * 通过枚举计算机中的证书获取证书信息
     * @returns {boolean}
     * @constructor
     */
    this.HuncaGetCertInfoBySelect = function(){
        if(!SelectCert(0x20)){
            return false;
        }
        DealCertInfo();
        return true;
    };

    /**
     * 通过证书内容获取证书值
     * @param certBase64
     * @returns {boolean}
     * @constructor
     */
    this.HuncaGetCertInfoByCertBase64 = function(certContent){

        if(certContent == null || certContent == ""){
            lastError = "证书内容不能为空！";
            return false;
        }
        cx = ccx.CreateCertificateBase64(certContent);
        if(cx == null){
            lastError = "证书对象构建失败！";
            return false;
        }
        DealCertInfo();
        return true;
    };

    /**
     * 解析证书对象中的
     * @constructor
     */
    function DealCertInfo() {

        ca_content = cx.Content;    //证书内容
        ca_sn = cx.SerialNumberDec; //证书SN号
        ca_NotAfterSystemTime = cx.NotAfterSystemTime;  //证书失效时间
		
        DealIssuer();
        DealSubject();
		DealUkey();
    }

    /**
     * 解析证书颁发者信息
     * @constructor
     */
    function DealIssuer(){
        var issuer = null;
        var issuerList = null;
        var slist = null;
        var skey,svalue;

        issuer = cx.Issuer;
        issuerList = issuer.split(',');

        for (var i = 0; i < issuerList.length; i++) {

            slist = issuerList[i].split("=");
            skey = trimSpace(slist[0]);
            svalue = trimSpace(slist[1]);

            if (skey == "O") {
                ca_issuer_O = svalue;
               continue;
            }
        }
        return ;
    }
	
	function DealUkey(){
		var ukeyNumber = "";
		
		if(cx.Algorithm == "SM2"){
			ca_ukey_number = cx.ProviderName;
		}
		else if(cx.Algorithm == "RSA"){
			ca_ukey_provider = cx.ProviderName;
		}
	}

    /**
     * 解析证书使用者信息
     * @constructor
     */
    function DealSubject(){
        var subject = null;
        var subjectList = null;

        var slist = null;
        var skey,svalue;

        subject = cx.Subject;
        subjectList = subject.split(',');

        for (var i = 0; i < subjectList.length; i++) {

            slist = subjectList[i].split("=");
            skey = trimSpace(slist[0]);
            svalue = trimSpace(slist[1]);

            if("CN"==skey){
                ca_subject_CN = svalue;
                continue;
            }

            if("G" == skey){
                ca_subject_G = svalue;
                continue;
            }

            if("OU" == skey){
                ca_subject_OU = svalue;
                continue;
            }

            if("O" == skey){
                ca_subject_O = svalue;
                continue;
            }

            if("S" == skey){
                ca_subject_S = svalue;
                continue;
            }

            if("T" == skey){
                ca_subject_T = svalue;
                continue;
            }

            if("OID.2.5.4.1" == skey){
                ca_subject_OID2541 = svalue;
                continue;
            }
        }
        return ;
    }

    /**
     * 取出字符串两端空格
     * @param str
     * @returns {void|XML|string}
     */
    function trimSpace(str) { //删除左右两端的空格
        return str.replace(/(^\s*)|(\s*$)/g, "");
    }

    /**
     * 获取证书使用者附加号
     * @returns {*}
     * @constructor
     */
    this.HuncaGetSubjectOID2541 = function(){
        return ca_subject_OID2541;
    };

    /**
     * 获取证书内容
     * @returns {*}
     * @constructor
     */
    this.HuncaGetContent = function(){
        return ca_content;
    };

    /**
     * 获取证书使用者G项
     * @returns {*}
     * @constructor
     */
    this.HuncaGetSubjectG = function(){
        return ca_subject_G;
    };

    /**
     * 获取证书使用者O项
     * @returns {*}
     * @constructor
     */
    this.HuncaGetSubjectO = function(){
        return ca_subject_O;
    };

    /**
     * 获取证书SN号
     * @returns {*}
     * @constructor
     */
    this.HuncaGetSN = function(){
        return ca_sn;
    };

    /**
     * 获取证书颁发者O项
     * @returns {*}
     * @constructor
     */
    this.HuncaGetIssuerO = function(){
        return ca_issuer_O;
    };

    /**
     * 获取证书的失效时间
     * @returns {*}
     * @constructor
     */
    this.HuncaGetNotAfterSystemTime = function(){
        return ca_NotAfterSystemTime;
    };
	
	   /**
     * 获取Ukey硬件序列号(仅供SM2) 证书使用
     * @returns {*}
     * @constructor
     */
    this.HuncaGetUkeyNumber = function(){
        return ca_ukey_number;
    };
	
    /**
     * 返回最后的错误信息
     * @returns {string}
     * @constructor
     */
    this.HuncaGetLastError = function () {
        return lastError;
    };

}