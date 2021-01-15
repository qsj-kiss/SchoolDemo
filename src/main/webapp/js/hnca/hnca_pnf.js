/**
 * 湖南CA登录，获取签名证书信息
 * @param signData
 * @returns
 * 2019-03-28，wy,ca获取不允许登陆
 */	 
hnCA= function(signData){
		 var activex = new HUNCA_NETONEX_CORE();
		 var netone_cert = new HUNCA_NETONEX_CERT();
		 
		 if ( !netone_cert.HuncaGetCertInfoBySelect() ){
             alert(netone_cert.HuncaGetLastError());
             return ;
         }
		 
         var data=signData;
         var res;

         res = activex.HuncaLogin(data);
         if(!res){
             alert(activex.HuncaGetLastError());
             return {returnCode:"fail"};
         }else{
        	 var data1 = new Date(netone_cert.HuncaGetNotAfterSystemTime()).getTime();
        	 var data2 = new Date().getTime();
        	 if(data2>data1){
				 alert("CA已经过期过期，请及时续费");
				 return {returnCode:"fail"};
        	 }else{
        		 var day = (data1 - data2) / (1000 * 60 * 60 * 24);
        		 if(day<30){
        			 alert("【距离CA过期还有"+parseInt(day)+"天，请及时续费】");
        		 }
//        		 alert(data1+"=="+data2+"=="+day);
        	 }
        	return {
				returnCode : "success",
				caNumber : netone_cert.HuncaGetSN(),
				caCert : activex.HuncaGetContent(),
				caOID : netone_cert.HuncaGetSubjectOID2541(),
				signStr:function (str){
					return activex.HuncaEnvSeal(str);
				},
				openSignStr:function (str){
					return activex.HuncaEnvOpen(str);
				},
				t1:function (str){
					return activex.EnvOpen(str);
				},
				t2:function(str){
					return activex.PrivateDecrypt(str);
				},
				t3:function(str){
					return activex.HuncaPrivateDecrypt(str);
				},
				d4:function(str){
					return activex.HuncaPublicEncrypt(str)
				},
				tt:function(type){
					return activex.HuncaGetContentBySelct(type);
				},
				caExpirDate:netone_cert.HuncaGetNotAfterSystemTime()
			};
		}
         
	};
	
	/**
	 * 无需登录，获取签名证书信息
	 */
	 hnCAInfo=function(){
		 var activex = new HUNCA_NETONEX_CORE();
		 var netone_cert = new HUNCA_NETONEX_CERT();
		 
		 if ( !netone_cert.HuncaGetCertInfoBySelect() ){
             alert(netone_cert.HuncaGetLastError());
             return ;
         }

    	 var data1 = new Date(netone_cert.HuncaGetNotAfterSystemTime()).getTime();
    	 var data2 = new Date().getTime();
    	 if(data2>data1){
			 alert("CA已经过期过期，请及时续费");
    	 }else{
    		 var day = (data1 - data2) / (1000 * 60 * 60 * 24);
    		 if(day<30){
    			 alert("【距离CA过期还有"+parseInt(day)+"天，请及时续费】");
    		 }
    	 }
    	 
    	return {
			returnCode : "success",
			caNumber : netone_cert.HuncaGetSN(),
			caCert : netone_cert.HuncaGetContent(),
			caOID : netone_cert.HuncaGetSubjectOID2541(),
			signStr:function (str){
				return activex.HuncaEnvSeal(str);
			},
			openSignStr:function (str){
				return activex.HuncaEnvOpen(str);
			},
			caExpirDate:netone_cert.HuncaGetNotAfterSystemTime()
		};
	
	 };
	
	 
		//获得加解密方法及证书信息(非登录)
	 function hnCaCryptInfo() {
         var netone_core = new HUNCA_NETONEX_CORE();
         var netone_cert = new HUNCA_NETONEX_CERT();

       //构建证书对象，解析证书
         //netone_cert.HuncaGetCertInfoByCertBase64(netone_core.HuncaGetCert());
         netone_cert.HuncaGetCertInfoByCertBase64(netone_core.HuncaGetContentBySelct(1));//获取加解密证书信息
         return {
        	 caCertSN: netone_cert.HuncaGetSN(),
        	 caCert : netone_cert.HuncaGetContent(),
        	 caCertSubjectG:netone_cert.HuncaGetSubjectG(),
        	 caCertSubjectOID:netone_cert.HuncaGetSubjectOID2541(),
        	 encryptData:function(data){
        		 var encryptData = netone_core.HuncaEnvSeal(data);
        		 if (encryptData == null || encryptData.length == 0 || encryptData == false) {
                     alert(netone_core.HuncaGetLastError());
                     return {};
                 }
        		 return {
        			 encryptData : encryptData,
        			 orDataHash:netone_core.HuncaSHA1(data),
                	 enryptDataHash:netone_core.HuncaSHA1(encryptData),
        		 }
        	 },
        	 decryptData:function(data){
        		 var decryptData = netone_core.HuncaEnvOpen(data,null);
        		 if(decryptData == null || decryptData.length == 0 || decryptData == false){
                     alert(netone_core.HuncaGetLastError());
                     return {};
                 }

        		 return {
        			 decryptData : decryptData,
        			 decryptDataHash:netone_core.HuncaSHA1(decryptData),
                	 enryptDataHash:netone_core.HuncaSHA1(data),
        		 }
        	 },
        	 getCert:function(type){
        		 return netone_core.HuncaGetContentBySelct(type)
        	 }
         }
     }
	 
	 function hnTest() {
         var netone_core = new HUNCA_NETONEX_CORE();
         var netone_cert = new HUNCA_NETONEX_CERT();

         var data = "123";
         var encryptData = "";
         var dataHash = "";
         var encryptDataHash = "";
         var ca_cert_SN = "";
         var ca_cert_subject_G= "";
         var ca_cert_subject_OID2541= "";


         encryptData = netone_core.HuncaEnvSeal(data);
         if (encryptData == null || encryptData.length == 0 || encryptData == false) {
        	 alert(netone_core.HuncaGetLastError());
             return;
         }

         //构建证书对象，解析证书
         netone_cert.HuncaGetCertInfoByCertBase64(netone_core.HuncaGetCert());
         ca_cert_SN = netone_cert.HuncaGetSN();
         ca_cert_subject_G = netone_cert.HuncaGetSubjectG();
         ca_cert_subject_OID2541 = netone_cert.HuncaGetSubjectOID2541();
         dataHash = netone_core.HuncaSHA1(data);
         encryptDataHash = netone_core.HuncaSHA1(encryptData);

         return {
        	 encryptData:encryptData,
        	 caCertSN: netone_cert.HuncaGetSN(),
        	 caCertSubjectG:ca_cert_subject_G,
        	 caCertSubjectOID:ca_cert_subject_OID2541,
        	 orDataHash:dataHash,
        	 enryptDataHash:encryptDataHash
         }
     }