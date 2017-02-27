// hash 数组去重复 params: array ;return :array
function removeRepeat(arr) {
  var result = [], hash = {};
  for ( var i = 0, elem; (elem = arr[i]) != null; i++) {
    if (!hash[elem]) {
      result.push(elem);
      hash[elem] = true;
    }
  }
  return result;
}
// 数组去重复 params: array ;return :array
function removeToRepeat(arr) {
  arr.sort();
  var re = [arr[0]];
  for ( var i = 1; i < arr.length; i++) {
    if (arr[i] !== re[re.length - 1]) {
      re.push(arr[i]);
    }
  }
  return re;

}
// 数组删除元素 params: array 和元素; return :array
function remove(val, arr) {
  var index = indexOf(val, arr);
  if (index > -1) {
    arr.splice(index, 1);
  }
  return arr;
};
// 获取数组索引
function indexOf(val, arr) {
  for ( var i = 0; i < arr.length; i++) {
    if (arr[i] == val) return i;
  }
  return -1;
};

// 获取当前时间 yyyy-mm-dd hh:mm:ss
function currentDate() {
  var datetime = new Date();
  datetime.setTime(new Date());
  var year = datetime.getFullYear();
  var month = datetime.getMonth() + 1 < 10 ? "0" + (datetime.getMonth() + 1) : datetime.getMonth() + 1;
  var date = datetime.getDate() < 10 ? "0" + datetime.getDate() : datetime.getDate();
  var hour = datetime.getHours() < 10 ? "0" + datetime.getHours() : datetime.getHours();
  var minute = datetime.getMinutes() < 10 ? "0" + datetime.getMinutes() : datetime.getMinutes();
  var second = datetime.getSeconds() < 10 ? "0" + datetime.getSeconds() : datetime.getSeconds();
  return year + "-" + month + "-" + date + " " + hour + ":" + minute + ":" + second;
}

/**
 * 文本非空校验
 * 
 * @param text
 *          待校验文本
 * @returns {Boolean} true=为null或为空，false=反之
 */
function stringIsBlank(text) {
  if ($.trim(text).length < 1) {
    return true;
  } else {
    return false;
  }
}

/**
 * 文本非空校验
 * 
 * @param text
 *          待校验文本
 * @returns {Boolean} false=为null或为空，true=反之
 */
function stringIsNotBlank(text) {
  if ($.trim(text).length < 1) {
    return false;
  } else {
    return true;
  }
}

/**
 * 计算中英文客串长度
 * 
 * @param str
 *          字符串
 * @returns {Number} 字符长度
 */
function stringLengthOf(str) {
  var totalCount = 0;
  for ( var i = 0; i < str.length; i++) {
    var c = str.charCodeAt(i);
    if ((c >= 0x0001 && c <= 0x007e) || (0xff60 <= c && c <= 0xff9f)) {
      totalCount++;
    } else {
      totalCount += 2;
    }
  }
  return totalCount;
}

/**
 * 字符转Integer
 * 
 * @param str
 *          字符串
 * @returns 数值，若转失败返回0
 */
function objectParseInt(str) {
  if (str != undefined && $.trim(str) != "") {
    return window.parseInt(str);
  } else {
    return 0;
  }
}

/**
 * 生成随机数
 * 
 * @returns {Number} 数值
 */
function getRandomNum() {
  var a = {};
  var b;
  while (true) {
    b = Math.random().toString().substr(2, 7) / 100;
    if (b.toString().length === 8 && a[b] === undefined) { return a[b] = b; }
  }
}

/**
 * 模式消息提示框
 * 
 * @param title
 *          标题
 * @param message
 *          消息内容
 */
function showMessageDailog(title, message) {
  $("<div title='" + title + "'><p style='color:red;font-weight:bold;'>" + message + "</p></div>").dialog({
    modal: true,
    zIndex: 99999,
    position:[null,200]
  });
}

/**
 * 模式消息提示框（在top显示）
 * 
 * @param title
 *          标题
 * @param message
 *          消息内容
 */
function showMessageDailogTop(title, message,top) {
  $("<div title='" + title + "'><p style='color:red;font-weight:bold;'>" + message + "</p></div>").dialog({
    modal: true,
    zIndex: 99999
  });
  $('.ui-dialog').css('top',top);
  
}

/**
 * 确认对话框
 * 
 * @param title
 *          标题
 * @param message
 *          消息
 * @param func
 *          回调方法
 */
function confirmDailog(title, message, func) {
  var $configDailog = $("<div title='" + title + "'><p style='color:red;font-weight:bold;'>" + message + "</p></div>");
  $($configDailog).dialog({
    modal: true,
    zIndex: 99999,
    buttons: {
      Ok: function() {
        $($configDailog).dialog("close");
        eval(func);// 方法回调
      },
      Cacel: function() {
        $($configDailog).dialog('close');
      }
    }
  });
}

/**
 * 校验是不是数字
 * @param str
 * @returns true是，false不是
 */
function checkNum(str){
  var reg = /^\d+(\.\d+)?$/;
  return reg.test(str);
}
/**
 * 
 * 校验中英文长度 
 * @param str 字符串
 * @param min  最小长度
 * @param max  最大长度
 * @returns
 */
function checkStrLen(str,min,max){

  var len = 0;
  for (var i = 0; i < str.length; i++) {
      var c = str.charCodeAt(i);
      //单字节加1 
      if ((c >= 0x0001 && c <= 0x007e) || (0xff60 <= c && c <= 0xff9f)) {
          len++;
      }
      else {
          len += 2;
      }
  }
  if(min>len){
    return  "min";
  }else if(len>max){
    return "max";
  }
  
  return "1";
}

/***
 * 
 * 将时间转成str格式 
 * @param time   eg:1427696972916 
 * @returns {String} eg:2015-03-30 14:29:32
 */
function dateToString(time){
  var datetime = new Date();  
  datetime.setTime(time);  
  var year = datetime.getFullYear();
  var month = datetime.getMonth() + 1 < 10 ? "0" + (datetime.getMonth() + 1) : datetime.getMonth() + 1;
  var date = datetime.getDate() < 10 ? "0" + datetime.getDate() : datetime.getDate();
  var hour = datetime.getHours() < 10 ? "0" + datetime.getHours() : datetime.getHours();
  var minute = datetime.getMinutes() < 10 ? "0" + datetime.getMinutes() : datetime.getMinutes();
  var second = datetime.getSeconds() < 10 ? "0" + datetime.getSeconds() : datetime.getSeconds();
  return year + "-" + month + "-" + date + " " + hour + ":" + minute + ":" + second;
  
}
/**
 * 校验是不是2位正小数
 * @param str
 * @returns true是，false不是
 */
function checkDecimal(str){
  var reg = /^\d+\.?\d{0,2}$/;
  return reg.test(str);
}

MyPlugins = {
  shenLue: function(class_) {
    $('.' + class_).each(function() {
      var $this = $(this);
      var text = $this.text();// text
      $this.attr('title', text);

      var texts = (text.length > 5) ? text.substr(0, 5) + "...." : text;

      $this.text(texts);

    });
  }
};

$(function() {
  MyPlugins.shenLue('subString');
});