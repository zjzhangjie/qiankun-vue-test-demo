/**
 * Created by zhangJie on 2020/11/23.
 */

/**
 * 是否合法IP地址
 * @param rule
 * @param value
 * @param callback
 */
function validateIP(rule, value, callback) {
  if (value === '' || value === undefined || value == null) {
    callback();
  } else {
    const reg = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
    if ((!reg.test(value)) && value !== '') {
      callback(new Error('请输入正确的IP地址'));
    } else {
      callback();
    }
  }
}

/* 是否手机号码或者固话 */
function validatePhoneTwo(rule, value, callback) {
  const reg = /^((0\d{2,3}-\d{7,8})|(1[34578]\d{9}))$/;
  if (value === '' || value === undefined || value == null) {
    callback();
  } else if ((!reg.test(value)) && value !== '') {
    callback(new Error('请输入正确的电话号码或者固话号码'));
  } else {
    callback();
  }
}

/* 是否固话 */
function validateTelephone(rule, value, callback) {
  const reg = /0\d{2}-\d{7,8}/;
  if (value === '' || value === undefined || value == null) {
    callback();
  } else if ((!reg.test(value)) && value !== '') {
    callback(new Error('请输入正确的固话（格式：区号+号码,如010-1234567）'));
  } else {
    callback();
  }
}

/* 是否手机号码 */
function validatePhone(rule, value, callback) {
  const reg = /^[1][3,4,5,7,8][0-9]{9}$/;
  if (value === '' || value === undefined || value == null) {
    callback();
  } else if ((!reg.test(value)) && value !== '') {
    callback(new Error('请输入正确的电话号码'));
  } else {
    callback();
  }
}

/* 是否身份证号码 */
function validateIdNo(rule, value, callback) {
  const reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
  if (value === '' || value === undefined || value == null) {
    callback();
  } else if ((!reg.test(value)) && value !== '') {
    callback(new Error('请输入正确的身份证号码'));
  } else {
    callback();
  }
}

export default {
  validateIP,
  validatePhoneTwo,
  validateTelephone,
  validatePhone,
  validateIdNo,
};
