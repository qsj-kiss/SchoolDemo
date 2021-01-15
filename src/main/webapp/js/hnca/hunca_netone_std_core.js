/**
 * 名称：湖南CA--NetONE系统集成（标准）
 * 版本：3.9
 * 更新时间：2018.06.21
 * 维护人员：Akay
 *
 * 更新日志：
 * ver3.9 2018.06.21
 *	   1. 修改底层文件，解决部分计算机 版本号 无法计算的问题。
 *
 * ver3.8.1 2018.06.21
 *	   1. 修复批量对数据签名的方法。
 *
 * ver3.8 2018.06.07
 *	   1. 新增批量对数据签名的方法。HuncaBatchPKCS1(data),HuncaBatchPKCS1Ex(data,userPin)
 *
 * ver3.7 2017.12.14
 *     1. 新增对数据的数字信封加密/解密方法。 HuncaEvnSeal(data),HuncaEvnOpen(data)
 *     2. 新增批量对数据的数字信封加密/解密方法。HuncaBatchEvnSeal(data),HuncaEvnOpen(data)
 *     3. 修复Bug，如果密码验证不足4~16位则返回错误，并将缓存的证书对象清理。
 *
 * ver3.6 2017.08.29
 *     1. 新增非对称密钥加/解密方法。 HuncaPublicEncrypt(data),HuncaPrivateDecrypt(data,userPin)
 *     2. 新增批量加解密方法。HuncaPublicEncrypt(data,userPin),HuncaBatchPrivateDecrypt(data,userPin),
 *     3. 新增Base64编码/解码方法，所有的中文按照UTF-8编码处理。
 *     4. 修改SelectCert()方法，增加其灵活性。
 *     5. 针对批量操作，新增
 *     6. 新增HuncaGetContent()获取证书信息。
 *     7. 新增HuncaGetContentBySelct(type)方法，先选择计算机中的证书，再返回证书内容。
 *
 * ver3.5 2017.08.22
 *     1. 修正部分不兼容的地方，会导致浏览器报错。
 *     2. 强类型转化，防止参数错误。
 *     3. 去除签名是获取证书信息。
 *
 * ver3.4 2017.08.08
 *     1. 获取证书使用者G项
 *     2. 获取颁发者O项目
 *     3. 改进获取证书信息的方式
 * ver3.3 2017.07.28
 *     1. 新增获取证书更多信息,如：内容，SN，附加信息，失效时间等等。
 *     2. 证书进行签名操作时也会更新读取证书信息
 *
 * ver3.2 2017.07.25
 *     1. 修复返回错误不正常的地方
 *
 * ver3.1 2017.07.17
 *     1. 新增方法：HuncaSHA1()对数据做SHA-1摘要操作。
 *     2. 控件加载如果不成功给予错误提示。
 *
 * ver3.0
 *     1. 搭建好基本架构使得控件加载支持IE，Chrome 45以下，Firefox 52以下。（支持ActiveX标准或NP_AIP标准的浏览器）
 *     2. 新增HuncaGetLastError()，SelectCert(),VerifyPIN(),PKCS1String()等方法，支持密码验证，证书选择，数据签名等基本功能。
 *     3. 新增方法：HuncaGetSign(),HuncaGetCert() 签名成功后获取 签名结果 与 签名证书
 *
 * ver 2.0
 *      1. 采用面向对象的接口提供方式，增强接口的独立性，方便开发人员更易于集成。
 *        使用方法：var activex = new HUNCA_NETONEX_CORE();
 *      2. 补齐: 基本方法,方便开发人员集成，输入密码有两种方式：
 *         >开发人员自定义密码框。
 *         >采用组件或Ukey厂家密码输入框。
 *      3. 支持散列算法：sha-1
 *      4. 支持字符串做P1裸签。
 *
 * ver 1.0
 *     1.由于依赖文件过于老旧，许多新增方法无法使用，顾放弃。
 *
 *
 * ------------
 * 基本调用方法：
 * ------------
 *     类似于面向对象的调用方式：
 *          var activex = new HUNCA_NETONEX_CORE()
 *     调用完成后集成调用内部的相关方法，如使用证书签名:
 *          activex.HuncaPKCS1(data,userPin);
 *     如果调用成功则可以调用以下方法获取签名证书与签名结果
 *          activex.HuncaGetSign();
 *          activex.HuncaGetCert();
 *
 * ----------------
 * 关于私有与共有方法：
 * ----------------
 *   共有方法（可以调用）---> 格式：this.xxx = function(){}
 *   私有方法（不可调用）---> 格式：function xxx(){}
 *   私有变量（不可调用）---> 格式：var xxx;
 *
 * @constructor
 */

function HUNCA_NETONEX_CORE() {

    var ca_cert = null;
    var ca_sign = null;
    var ca_data = null;

    var lastError = "";

    try {
        var netONEX = new NetONEX();
        netONEX.setupObject();
        var cmainx = netONEX.getMainX();
        var ccx = netONEX.getCertificateCollectionX();
        var cx = null;
        var cbase64x = netONEX.getBase64X();
        var chashx = netONEX.getHashX();
    } catch (e) {
        alert("CA安全控件加载失败，请确保计算机安装最新驱动！");
        return null;
    }

    /**
     * 返回最后的错误信息
     * @returns {string}
     * @constructor
     */
    this.HuncaGetLastError = function () {
        return lastError;
    };


    /**
     * 对数据进行SHA-1操作，返回
     * @param data
     * @returns {*}
     * @constructor
     */
    this.HuncaSHA1 = function (data) {
        var resData = null;
        var dataBytes = null;

        chashx.Quiet = 1;
        if (data.length == 0) {
            lastError = "数据不能为空!";
            return "";
        }

        dataBytes = cbase64x.DecodeBytes(cbase64x.EncodeUtf8String(data));
        resData = chashx.SHA1String(dataBytes);

        if (resData == "") {
            lastError = chashx.ErrorString;
        }

        return resData;
    };

    /**
     * 获取计算机证书库中的证书，如果符合要求的证书有多张则弹出证书选择框。
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
     * 对数据进行加密操作（数字信封）
     * @param data 待加密数据
     * @returns {*} 解密结果
     * @constructor
     */
    this.HuncaEnvSeal = function (data) {
        var encryptData = "";

        if (!SelectCert(0x10)) {
            return false;
        }

        encryptData = EnvSeal(data);
        return encryptData;
    };


    /**
     * 对数据进行解密操作（数字信封）
     * @param data  待解密数据
     * @param userPin   Ukey密码
     * @returns {*} 成功
     * @constructor
     */
    this.HuncaEnvOpen = function (data, userPin) {
        var decryptData = null;

        if (!SelectCert(0x10)) {
            return false;
        }

        var version = cmainx.Version;
        if (parseInt(version) > 16974848 && userPin != null) {
            if (!VerifyPIN(userPin)) {
                return false;
            }
        }

        decryptData = EnvOpen(data);
        return decryptData;
    };

    /**
     * 对数据进行批量加密操作（数字信封）
     * @param data
     * @returns {*}
     * @constructor
     */
    this.HuncaBatchEnvSeal = function(data){
        var encryptData = null;

        //证书对象是否为空，不为空选择证书，为空不选择证书，直接进行批量操作。
        if (cx == null || cx == "") {
            if (!SelectCert(0x10)) {
                return false;
            }
        }
        encryptData = EnvSeal(data);
        return encryptData;
    };

    /**
     *  对数据进行批量解密操作（数字信封）
     * @param data
     * @param userPin
     * @returns {boolean}
     * @constructor
     */
    this.HuncaBatchEnvOpen = function(data,userPin){
        var decryptData = null;
        //证书对象是否为空，不为空选择证书，为空不选择证书，直接进行批量操作。
        if (cx == null || cx == "") {
            if (!SelectCert(0x10)) {
                return false;
            }

            var version = cmainx.Version;
            if (parseInt(version) > 16974848) {
                if (!VerifyPIN(userPin)) {
                    return false;
                }
            }
        }
        decryptData = EnvOpen(data);
        return decryptData;

    };

    /**
     * 对data数据做加密操作(数字信封）
     * @param data
     * @returns {string}
     * @constructor
     */
    function EnvSeal(data) {
        var m_data = "";
        var m_dataB64 = "";
        var encryptData = "";

        m_data = "" + data;
        if (m_data == null || m_data.length == 0) {
            lastError = "加密数据不能为空";
            return "";
        }

        if (cx == null || cx == "") {
            lastError = "证书对象不能为空，请插入UKey！";
            return "";
        }

        cx.Quiet = 1;
        m_dataB64 = cbase64x.EncodeUtf8String(m_data);
        encryptData = cx.EnvSeal(m_dataB64);

        if (encryptData == null || encryptData == "") {
            lastError = cx.ErrorString;
            return "";
        }

        return encryptData;
    }


    /**
     * 对data数据做解密操作(数字信封）
     * @param data
     * @returns {string}
     * @constructor
     */
    function EnvOpen(data) {
        var m_data = "";
        var decryptDataB64 = "";
        var decryptData = "";

        m_data = "" + data;
        if (m_data == null || m_data.Length == 0 || "" == m_data) {
            lastError = "解密原文不能为空！";
            return "";
        }

        if (cx == null || cx == "") {
            lastError = "证书对象不能为空，请插入UKey！";
            return "";
        }

        cx.Quiet = 1;
        decryptDataB64 = cx.EnvOpen(m_data);    //对字符串进行解密操作
        if (decryptDataB64 == null || decryptDataB64 == "") {
            lastError = "解密失败，请检查密文是否完整，Ukey是否插入正确!"
            return "";
        }

        decryptData = cbase64x.DecodeUtf8String(decryptDataB64);
        if (decryptData == null || decryptData == "") {
            lastError = cbase64x.ErrorString;
            return "";
        }
        return decryptData;
    }

    /**
     * 验证证书对应的Ukey密码
     * @param userPin 传入Ukey的密码
     * @returns {boolean} true，表示密码验证成功;false，密码验证失败。可以通过lastError获取剩余次数
     * @constructor
     */
    function VerifyPIN(userPin) {
        var res = 0;
        var algo = null;
        var m_Pin = "";

        m_Pin = "" + userPin;
        if (m_Pin.length < 4 || m_Pin.length > 16) {
            lastError = "Ukey密码必须为4~16位,请重新输入！";
            cx = null;
            ca_cert = null;
            return false;
        }

        cx.Quiet = 1;
        res = cx.VerifyPIN(m_Pin);  //验证密码是否正确
        algo = cx.Algorithm;    //获取算法

        if (algo == "RSA" && res == -1) {
            cx = null;
            ca_cert = null;
            lastError = "UKey密码不正确，请输入正确的密码！\n可使用客户端\"验证密码\"功能获取Ukey剩余次数！";
            return false;
        }

        if (algo != "RSA" && res == -1) {
            cx = null;
            ca_cert = null;
            lastError = "UKey密码已经被锁死，请联系管理员进行解锁操作!";
            return false;
        }

        if (algo != "RSA" && res > 0) {
            cx = null;
            ca_cert = null;
            lastError = "UKey密码不正确，请输入正确的密码,还剩" + res + "次重试机会!";
            return false;
        }

        cx.UserPIN = m_Pin;   //最后将密码置于预设密码处
        return true;
    }

    /**
     * 对数据做签名操作。
     * @param data
     * @returns {boolean}
     * @constructor
     */
    function PKCS1String(data) {
        var result = null;
        var m_data = "";

        ca_cert = null;
        ca_data = null;
        ca_sign = null;

        m_data = "" + data;

        if (m_data == null || m_data.Length == 0) {
            lastError = "签名原文不能为空！";
            return false;
        }

        if (cx == null) {
            lastError = "证书对象不能为空，请插入UKey！";
            return false;
        }

        cx.Quiet = 1;
        reslut = cx.PKCS1String(m_data);
        if (reslut == null || reslut == "") {
            lastError = cx.ErrorString;
            return false;
        }


        ca_cert = cx.Content;
        ca_sign = reslut;
        ca_data = m_data;

        return true;
    }

    /**
     * 对data数据做加密操作(非数字信封）
     * @param data
     * @returns {string}
     * @constructor
     */
    function PublicEncrypt(data) {

        var m_data = "";
        var m_dataB64 = "";
        var encryptData = "";

        m_data = "" + data;

        if (m_data == null || m_data.Length == 0 || "" == m_data) {
            lastError = "加密原文不能为空！";
            return "";
        }

        if (cx == null || cx == "") {
            lastError = "证书对象不能为空，请插入UKey！";
            return "";
        }

        cx.Quiet = 1;
        m_dataB64 = cbase64x.EncodeUtf8String(m_data);
        encryptData = cx.PublicEncrypt(m_dataB64);

        if (encryptData == null || encryptData == "") {
            lastError = cx.ErrorString;
            return "";
        }

        return encryptData;
    }

    /**
     * 对data数据做解密操作（非数字信封）
     * @param data
     * @constructor
     */
    function PrivateDecrypt(data) {
        var m_data = "";
        var decryptDataB64 = "";
        var decryptData = "";

        m_data = "" + data;

        if (m_data == null || m_data.Length == 0 || "" == m_data) {
            lastError = "解密原文不能为空！";
            return "";
        }

        if (cx == null || cx == "") {
            lastError = "证书对象不能为空，请插入UKey！";
            return "";
        }

        cx.Quiet = 1;
        decryptDataB64 = cx.PrivateDecrypt(m_data);    //对字符串进行解密操作
        if (decryptDataB64 == null || decryptDataB64 == "") {
            lastError = "解密失败，请检查Ukey是否插入正确!"
            return "";
        }

        decryptData = cbase64x.DecodeUtf8String(decryptDataB64);
        if (decryptData == null || decryptData == "") {
            lastError = cbase64x.ErrorString;
            return "";
        }
        return decryptData;
    }

    /**
     * 对data数据做Base64编码，中文按照UTF-8编码进行处理
     * @param data   待编码数据
     * @returns {*}  原数据Base64编码值
     * @constructor
     */
    this.HuncaBase64 = function (data) {
        var base64data = null;
        var m_data = "";


        m_data = data + "";
        if (m_data.length == 0) {
            lastError = "数据不能为空!";
            return "";
        }

        try {
            base64data = cbase64x.EncodeUtf8String(m_data);
            if (null != base64data && undefined != base64data && "" != base64data) {
                return base64data;
            } else {
                lastError = cbase64x.ErrorString;
                return "";
            }
        } catch (e) {
            lastError = cbase64x.ErrorString;
            return "";
        }
    };

    /**
     * 对Base64字符串进行解密，返回UTF-8编码字符。
     * @param base64data    进行Base64编码的字符
     * @returns {*}     返回UTF-8编码的字符
     * @constructor
     */
    this.HuncaDecodeBase64 = function (base64data) {
        var data = null;
        var m_base64data = "";

        m_base64data = "" + base64data;

        if (m_base64data.length == 0) {
            lastError = "数据不能为空!";
            return "";
        }

        try {
            data = cbase64x.DecodeUtf8String(m_base64data);
            if (null != data && undefined != data && "" != data) {
                return data;
            } else {
                lastError = cbase64x.ErrorString;
                return "";
            }
        } catch (e) {
            lastError = cbase64x.ErrorString;
            return "";
        }
    };
	
	 /**
     * 批量操作：对data进行签名操作，返回签名结果，在进行批量循环签名前进行用 HuncaBatchInit()进行批量初始化操作
     * @param data  待加密的字符串
     * @returns {*} 成功，返回非空字符串；失败，返回空字符串。
     * @constructor
     */
	this.HuncaBatchPKCS1Ex = function(data,userPin){
        lastError = "";
        ca_cert = null;
        ca_data = null;
        ca_sign = null;


        //证书对象是否为空，不为空选择证书，为空不选择证书，直接进行批量操作。
        if (cx == null || cx == "") {
            if (!SelectCert(0x20)) {
                return false;
            }

            var version = cmainx.Version;
            if (parseInt(version) > 16974848 && userPin != null) {
                if (!VerifyPIN(userPin)) {
                    return false;
                }
            }
        }
		
		if(!PKCS1String(data)){
			return false;
		}
		
		return true;	
	}
	
	 /**
     * 批量操作：对data进行签名操作，返回签名结果，返回签名结果，在进行批量循环签名前进行用 HuncaBatchInit()进行批量初始化操作
     * @param data  待加密的字符串
     * @returns {*} 成功，返回非空字符串；失败，返回空字符串。
     * @constructor
     */
	this.HuncaBatchPKCS1 = function(data){
		return this.HuncaBatchPKCS1Ex(data,null);
	}




    /**
     * 对data进行加密操作，返回加密后的字符串（非数字证书）
     * @param data  待加密数据
     * @returns {*} 成功，返回非空字符串；失败，返回空字符串。
     * @constructor
     */
    this.HuncaPublicEncrypt = function (data) {
        var encryptData = "";

        if (!SelectCert(0x10)) {
            return false;
        }

        encryptData = PublicEncrypt(data);
        return encryptData;
    };

    /**
     * 批量操作：对data进行加密操作，返回加密后的字符串（非数字证书），在进行批量加密循环前进行用 HuncaBatchInit()进行批量初始化操作
     * @param data  待加密的字符串
     * @returns {*} 成功，返回非空字符串；失败，返回空字符串。
     * @constructor
     */
    this.HuncaBatchPublicEncrypt = function (data) {
        var encryptData = "";

        //证书对象是否为空，不为空选择证书，为空不选择证书，直接进行批量操作。
        if (cx == null || cx == "") {
            if (!SelectCert(0x10)) {
                return false;
            }
        }

        encryptData = PublicEncrypt(data);
        return encryptData;
    };

    /**
     * 批量操作：对data进行解密操作，返回解密后的字符串（非数字证书），在进行批量解密循环前采用 HuncaBatchInit()进行批量初始化操作
     * @param data      待解密的字符串
     * @param userPin   Ukey密码
     * @returns {*}     成功，返回非空字符串；失败，返回空字符串。
     * @constructor
     */
    this.HuncaBatchPrivateDecrypt = function (data, userPin) {
        var result = null;

        //证书对象是否为空，不为空选择证书，为空不选择证书，直接进行批量操作。
        if (cx == null || cx == "") {
            if (!SelectCert(0x10)) {
                return false;
            }

            var version = cmainx.Version;
            if (parseInt(version) > 16974848 && userPin != null) {
                if (!VerifyPIN(userPin)) {
                    return false;
                }
            }
        }

        result = PrivateDecrypt(data);
        return result;
    };

    /**
     * 在进行批量循环操作前进行初始化操作，防止错误操作。
     * @returns {boolean}   ture表示成功
     * @constructor
     */
    this.HuncaBatchInit = function () {
        cx = null;

        ca_cert = null;
        ca_sign = null;
        ca_data = null;

        return true;
    };

    /**
     * 对data进行解密操作，返回解密后的字符串（非数字证书）
     * @param data  待解密的字符串
     * @param userPin   Ukey密码
     * @returns {*} 成功，返回飞空字符串，失败，返回空字符串。
     * @constructor
     */
    this.HuncaPrivateDecrypt = function (data, userPin) {
        var result = null;

        if (!SelectCert(0x10)) {
            return false;
        }

        var version = cmainx.Version;
        if (parseInt(version) > 16974848 && userPin != null) {
            if (!VerifyPIN(userPin)) {
                return false;
            }
        }

        result = PrivateDecrypt(data);
        return result;
    };

    /**
     * 对data数据做签名
     * @param data 待签名原始数据
     * @param userPin   Ukey的密码。如果为 userPin 为 null，则弹出控件自定义密码框
     * @returns {boolean}  true，表示签名成功；false，表示签名失败
     * @constructor
     */
    this.HuncaPKCS1Ex = function (data, userPin) {
        lastError = "";
        ca_cert = null;
        ca_data = null;
        ca_sign = null;

        if (!SelectCert(0x20)) {
            return false;
        }

        var version = cmainx.Version;
        if (parseInt(version) > 16974848 && userPin != null) {
            if (!VerifyPIN(userPin)) {
                return false;
            }
        }

        if (!PKCS1String(data)) {
            return false;
        }

        return true;
    };

    /**
     * 对data数据做签名，调用控件自身的密码输入框。
     * @param data  待签名数据
     * @returns {boolean}   true，表示签名成功，false，表示签名失败。
     * @constructor
     */
    this.HuncaPKCS1 = function (data) {
        return this.HuncaPKCS1Ex(data, null);
    };


    /**
     * 对data数据做签名，同HuncaPKCS1方法
     * @param data  待签名原始数据
     * @returns {boolean}   true，表示签名成功；false，表示签名失败
     * @constructor
     */
    this.HuncaLogin = function (data) {
        lastError = "";
        return this.HuncaPKCS1(data);
    };

    /**
     * 对data数据做签名，同HuncaPKCS1方法
     * @param data  待签名原始数据
     * @param userPin   Ukey的密码
     * @returns {boolean}   true，表示签名成功；false，表示签名失败
     * @constructor
     */
    this.HuncaLoginEx = function (data, userPin) {
        lastError = "";
        return this.HuncaPKCS1Ex(data, userPin);
    };

    /**
     * 如果签名成功返回 签名结果
     * @returns {*}
     * @constructor
     */
    this.HuncaGetSign = function () {
        return ca_sign;
    };

    /**
     * 获取证书内容
     * @returns {*}
     * @constructor
     */
    this.HuncaGetCert = function () {
        return ca_cert;
    };

    /**
     * 获取证书内容
     * @returns {string}
     * @constructor
     */
    this.HuncaGetContent = function () {
        return ca_cert;
    };

    /**
     * 通过读取计算机中的证书获取证书内容
     * @param type  1,枚举加密证书，2,枚举签名证书
     * @returns {*}
     * @constructor
     */
    this.HuncaGetContentBySelct = function (type) {
        if (type == 1) {
            if (SelectCert(0x10)) {
                return ca_cert;
            }
        }
        if (type == 2) {
            if (SelectCert(0x20)) {
                return ca_cert;
            }
        }
        else {
            lastError = "选择证书：参数错误!";
        }
        return null;
    };


    function DealString(arg_str, arg_key) {
        var strList = null;
        var skey, svalue, slist;

        strList = arg_str.split(',');
        for (var i = 0; i < strList.length; i++) {
            slist = strList[i].split("=");
            skey = trimSpace(slist[0]);
            svalue = trimSpace(slist[1]);

            if (skey == arg_key) {
                return svalue;
            }
        }
        return "";
    }

    /**
     * 取出字符串两端空格
     * @param str
     * @returns {void|XML|string}
     */
    function trimSpace(str) { //删除左右两端的空格
        return str.replace(/(^\s*)|(\s*$)/g, "");
    }
}