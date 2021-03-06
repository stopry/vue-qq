/**
 * Created by Administrator on 2017/1/4.
 */

//正则列表
const reg = {
    //身份证
    IDCard: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,
    //手机号
    cellPhone: /^1([358]\d|4[57]|7[^249])\d{8}$/,
    // 固话
    telephone: /^((0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$/,
    //验证码
    checkCode: /^\d{6}$/,
    //qq号码
    qqAccount: /^[1-9]\d{5,10}$/,
};

//表单校验
const checkForm = {
    //校验身份证
    isIDCards(socialNo) {
        let area={11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江",31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏",61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外"};

        if(area[parseInt(socialNo.substr(0,2))]==null) {
            return false;
        }
        if (socialNo.length == 15){
            var pattern= /^\d{15}$/;
            if (pattern.exec(socialNo)==null){
                return false;
            }
            let birth = parseInt("19" + socialNo.substr(6,2));
            let month = socialNo.substr(8,2);
            let day = parseInt(socialNo.substr(10,2));
            switch(month) {
                case '01': case '03': case '05': case '07': case '08': case '10': case '12':
                    if(day>31) {
                        return false;
                    }
                    break;
                case '04': case '06': case '09': case '11':
                    if(day>30) {
                        return false;
                    }
                    break;
                case '02':
                    if((birth % 4 == 0 && birth % 100 != 0) || birth % 400 == 0) {
                        if(day>29) {
                            return false;
                        }
                    }else {
                        if(day>28) {
                            return false;
                        }
                    }
                    break;
                default:
                    return false;
            }
            let nowYear = new Date().getFullYear();
            if(nowYear - parseInt(birth)<15 || nowYear - parseInt(birth)>100) {
                return false;
            }
            return true;
        }
        let Wi = [7,9,10,5,8,4,2,1,6,3,7,9,10,5,8,4,2,1];
        let lSum = 0, nNum = 0, nCheckSum = 0;

        for (let i = 0; i < 17; ++i){
            if (socialNo.charAt(i) < '0' || socialNo.charAt(i) > '9' ) {
                return false;
            }else{
                nNum = socialNo.charAt(i) - '0';
            }
            lSum += nNum * Wi[i];
        }

        if( socialNo.charAt(17) == 'X' || socialNo.charAt(17) == 'x') {
            lSum += 10*Wi[17];
        }else if (socialNo.charAt(17) < '0' || socialNo.charAt(17) > '9' ) {
            return false;
        }else {
            lSum += ( socialNo.charAt(17) - '0' ) * Wi[17];
        }
        if ( lSum % 11 == 1 ) {
            return true;
        }else {
            return (false);
        }
    },
    //校验手机号码
    isCellPhone: str => {
        return reg.cellPhone.test(str);
    },
    //校验固话
    isTelephone: str => {
        return reg.telephone.test(str);
    },
    //校验验证码
    isCode: str => {
        return reg.checkCode.test(str);
    },
    //校验qq账号
    isQQAccount: str => {
        return reg.qqAccount.test(str)
    },
    //校验密码
    isPassword: str=>{
      if(str.length<6 || str.length>16){
        return false
      }
      if(/^\d+$/.test(str) && str.length<9){
        return false
      }
      for(let i=0; i<str.length; i++){
        let code = str.charCodeAt(i);
        //32空格33-126
        if(code < 33 || code>126){
          return false
        }
      }
      return true
    }
};

export default checkForm;

