/*********************************!
 * long.js
 * 
 * 
 * Version: 1.1.0
 * Copyright 2016-09-30
 * author:wanglu
 *********************************/
;
! function(window, undefined) {
    if (!window.long) {
        long = window.long = {};
    }
    long.global = {};
    long.global.root = "http://localhost/LonghuUI/";
    long.global.host = "localhost";
    long.global.version = "2016050922";

    //longp访问父窗口的long
    //如果一个窗口没有父窗口,则它的 parent 属性为自身的引用.
    //如果当前窗口是一个 <iframe>, <object>, 或者 <frame>,则它的父窗口是嵌入它的那个窗口
    if (!window.longp) {
        longp = window.longp = long.parent = window.parent.long;
    }
    long.top = window.top; //返回当前窗口最顶层的父窗口.
    //当前的iframe窗口
    if (window.frameElement != null) {
        long.iframe = long.frame = window.frameElement;
        //菜单的mid
        long.mid = long.frame.name.replace('long-iframe_', ''); //long.frame.getAttribute("src");
    }
    //longc访问子窗口的long,需要传递iframe对象或ID
    if (!window.longc) {
        longc = window.longc = long.child = function(iframe) {
            if (typeof iframe == 'string') //如果是传递的Iframe的ID
                iframe = document.getElementById(iframe);
            else
                iframe = iframe[0] || iframe; //如果是JQuery对象就转化为JS对象
            return iframe.contentWindow.long;
        }
    }
    window.Alert = window.alert;
    long.alert = window.alert = function(msg, title, func) {
        if (typeof layer != "undefined")
            layer.alert(msg, { title: title }, func);
        else {
            Alert(msg);
            func = func || false;
            if (func) func();
        }
    }
    long.timestamp = function() {
        return (new Date()).getTime();
    };
    window.Confirm = window.confirm;
    long.confirm = window.confirm = function(msg, title, func, icon) {
        if (typeof layer != "undefined") {
            layer.confirm(msg, { icon: icon || 3, title: title }, function(index) {
                if (func)
                    func();
                layer.close(index);
            });
        } else {
            if (window.Confirm(msg)) {
                func = func || false;
                if (func) func();
            }
        }

    }
    window.Prompt = window.prompt;
    //type:0（文本）默认1（密码）2（多行文本）
    long.prompt = window.prompt = function(title, value, func, maxlength, type) { //func(value, index, elem)
        func = func || false;
        type = type || 0;
        maxlength = maxlength || 10000;
        value = value || "";
        if (typeof layer != "undefined") {
            /*layer.open({
                btn: ['确定', '取消'],
                type: 1,
                title: title, skin: 'layui-layer-lan',
                content: '<div style="padding:5px;font-size:14px;"><span style="font-size:14px;">{0}:</span><br/><input style="width:300px; margin-left:30px; height:20px;line-height:20px; border-radius:3px;text-indent:3px;" type="text" value="{1}"/></div>'.format(ask, value),
                yes: function (index, layero) {
                    func(layero.find('input').val());
                    layer.close(index);
                }, btn2: function (index, layero) {
                    //alert('cancel')
                }, cancel: function () {
                    //点击右上角叉叉的事件
                }, success: function (layero, index) {
                    layero.find('input').focus();
                }
            });*/
            layer.prompt({
                formType: type,
                value: value,
                maxlength: maxlength,
                title: title
            }, func);
        } else {
            var _result = window.Prompt(title, value);
            if (func) {
                func(_result);
            }
        }
    }
    if (!long.AllRequest) {
        long.AllRequest = []; //Array();//记录当前页的操作记录
    }
    //当前请求对象，url有可能是菜单连接的地址里面的内部请求地址
    long.Request = { mid: '', url: '', text: '', isSort: '' };
    long.page = function() {
        var _page = { doc: $(document), document: $(document), body: $('body') };
        return _page;
    };
    Array.prototype.delete = function(delIndex) {
        var temArray = [];
        for (var i = 0; i < this.length; i++) {
            if (i != delIndex) {
                temArray.push(this[i]);
            }
        }
        return temArray;
    }
    long.document = document;
    long.format = function() {
        var args = arguments;
        var string = args[0];
        args[0] = "";
        return string.replace(/\{(\d+)\}/g,
            function(m, i) {
                i++;
                return args[i];
            });
    }

    String.prototype.format = function() {
        var args = arguments;
        return this.replace(/\{(\d+)\}/g,
            function(m, i) {
                return args[i];
            });
    };
    String.prototype.compare = function(str) {
        //不区分大小写
        if (this.toLowerCase() == str.toLowerCase()) return true;
        else return false;
    }
    long.trim = function(str) {
        return str.replace(/(^\s*)|(\s*$)/g, "");
    }
    String.prototype.trim = String.prototype.Trim = function() {
        return this.replace(/(^\s*)|(\s*$)/g, "");
    };
    long.delHtmlTag = function(str) {
            return str.replace(/<[^>]+>/g, "");
        }
        //判断当前页面是否嵌套在iframe里面
    long.isiframe = function() {
        return (self != null && self.frameElement != null && self.frameElement.tagName != null && self.frameElement.tagName == "IFRAME");
    }
    String.prototype.delHtmlTag = function() {
            return long.delHtmlTag(this);
        }
        //IE8及以下不支持new Date(),会得到NaN-aN-aN这样的字样
        // (new Date()).formatDate("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423   
        // (new Date()).formatDate("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18  
    Date.prototype.formatDate = function(fmt) {
        var o = {
            "M+": this.getMonth() + 1, //月份   
            "d+": this.getDate(), //日   
            "h+": this.getHours(), //小时   
            "m+": this.getMinutes(), //分   
            "s+": this.getSeconds(), //秒   
            "q+": Math.floor((this.getMonth() + 3) / 3), //季度   
            "S": this.getMilliseconds() //毫秒   
        };
        if (/(y+)/.test(fmt))
            fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt))
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    }
    long.formatDate = function(str, fmt) {
            return str.formatDate(fmt);
        }
        //此格式化兼容IE8及以下
    String.prototype.dateFormat = function(format) {
        if (!this) return "";
        var time = new Date(this.replace(/-/g, '/').replace(/T|Z|T00/g, ' ').Trim());
        var o = {
            "M+": time.getMonth() + 1, //月份
            "d+": time.getDate(), //日
            "h+": time.getHours(), //小时
            "m+": time.getMinutes(), //分
            "s+": time.getSeconds(), //秒
            "q+": Math.floor((time.getMonth() + 3) / 3), //季度
            "S": time.getMilliseconds() //毫秒
        };
        if (/(y+)/.test(format)) format = format.replace(RegExp.$1, (time.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(format)) format = format.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return format;
    }
    long.replaceAll = long.replaceall = function(strs, reg, str) {
            return strs.replace(eval("/" + reg + "/gi"), str);
        }
        /*替换字符串中全部匹配的*/
    String.prototype.replaceAll = function(reg, str) {
        return long.replaceAll(this, reg, str);
    }
    long.cutstr = function(strs, len, sign) {
        sign = sign || "...";
        if (strs.length > len)
            return strs.substr(0, len) + sign;
        return strs;
    }
    String.prototype.cutstr = function(len, sign) {
        long.cutstr(this, len, sign);
    }
    long.cutTrueStr = function(str, len, sign) {
        sign = sign || "...";
        if (long.trueLength(str) > len)
            return str.substr(0, len) + sign;
        return str;
    }
    String.prototype.cutTrueStr = function(len, sign) {
        return long.cutTrueStr(this, len, sign);
    }
    Array.prototype.indexOf = function(val) {
        for (var i = 0; i < this.length; i++) {
            if (this[i] == val) return i;
        }
        return -1;
    };
    Array.prototype.remove = function(val) {
        var index = this.indexOf(val);
        if (index > -1) {
            this.splice(index, 1);
        }
    };
    //long.boxdy = function (con, doc) { return $(document); };
    //获取一个url参数
    long.GetQueryString = long.getQs = long.getqs = function(url, name) {
        var pattern = new RegExp("[?&]" + name + "\=([^&]+)", "g");
        var matcher = pattern.exec(url);
        var items = null;
        if (null != matcher) {
            try {
                items = decodeURIComponent(decodeURIComponent(matcher[1]));
            } catch (e) {
                try {
                    items = decodeURIComponent(matcher[1]);
                } catch (e) {
                    items = matcher[1];
                }
            }
        }
        return items;
    }

    String.prototype.getqs = function(name) {
            return long.GetQueryString(this, name);
        }
        //替换一个url参数
    long.SetQueryString = long.setQs = long.setqs = function(url, name, value) {
        var str = "";
        if (url.indexOf('?') != -1)
            str = url.substr(url.indexOf('?') + 1);
        else
            return url + "?" + name + "=" + value;
        var returnurl = "";
        var setparam = "";
        var arr;
        var modify = "0";
        if (str.indexOf('&') != -1) {
            arr = str.split('&');
            for (var i = 0; i < arr.length; i++) {
                if (arr[i].split('=')[0] == name) {
                    setparam = value;
                    modify = "1";
                } else {
                    setparam = arr[i].split('=')[1];
                }
                returnurl = returnurl + arr[i].split('=')[0] + "=" + setparam + "&";
            }
            returnurl = returnurl.substr(0, returnurl.length - 1);
            if (modify == "0")
                if (returnurl == str)
                    returnurl = returnurl + "&" + name + "=" + value;
        } else {
            if (str.indexOf('=') != -1) {
                arr = str.split('=');
                if (arr[0] == name) {
                    setparam = value;
                    modify = "1";
                } else {
                    setparam = arr[1];
                }
                returnurl = arr[0] + "=" + setparam;
                if (modify == "0")
                    if (returnurl == str)
                        returnurl = returnurl + "&" + name + "=" + value;
            } else
                returnurl = name + "=" + value;
        }
        return url.substr(0, url.indexOf('?')) + "?" + returnurl;
    }
    String.prototype.setqs = function(name, value) {
            return long.SetQueryString(this, name, value);
        }
        //删除一个url参数
    long.DelQueryString = long.delQs = long.delqs = function delQueStr(url, name) {
        var str = "";
        if (url.indexOf('?') != -1) {
            str = url.substr(url.indexOf('?') + 1);
        } else {
            return url;
        }
        var arr = "";
        var returnurl = "";
        var setparam = "";
        if (str.indexOf('&') != -1) {
            arr = str.split('&');
            for (var i = 0; i < length; i++) {
                if (arr[i].split('=')[0] != name) {
                    returnurl = returnurl + arr[i].split('=')[0] + "=" + arr[i].split('=')[1] + "&";
                }
            }
            return url.substr(0, url.indexOf('?')) + "?" + returnurl.substr(0, returnurl.length - 1);
        } else {
            arr = str.split('=');
            if (arr[0] == name) {
                return url.substr(0, url.indexOf('?'));
            } else {
                return url;
            }
        }
    }
    String.prototype.delqs = function(name) {
        return long.DelQueryString(this, name);
    }
    long.page.url = window.location.href;
    long.boxdy = function(con, doc) { return $(document); };
    long.page.empty = function(v) {
            switch (typeof v) {
                case 'undefined':
                    return true;
                case 'string':
                    if ($.trim(v).length == 0) return true;
                    break;
                case 'boolean':
                    if (!v) return true;
                    break;
                case 'number':
                    if (0 === v) return true;
                    break;
                case 'object':
                    if (null === v) return true;
                    if (undefined !== v.length && v.length == 0) return true;
                    for (var k in v) { return false; }
                    return true;
            }
            return false;
        }
        //如果不传递open_fn方法，则直接用window.location.href打开
    long.back = function(open_fn) {
        if (long.AllRequest && long.AllRequest.length > 0) {
            if (long.AllRequest.length == 1) {
                if (open_fn) {
                    open_fn(long.AllRequest[0]);
                } else
                    window.location.href = long.AllRequest[0].url;
            } else {
                if (open_fn) {
                    open_fn(long.AllRequest[long.AllRequest.length - 2]);
                } else {
                    window.location.href = long.AllRequest[long.AllRequest.length - 2].url;
                }
                long.AllRequest.pop();
            }
        }
    };
    long.stopPropagation = function(e) {
        try {
            e = e || window.event;
            if (e.stopPropagation) { //W3C阻止冒泡方法 
                e.stopPropagation();
            } else {
                e.cancelBubble = true; //IE阻止冒泡方法 
            }
        } catch (e) {}
    }
    long.iframeOnload = function(iframe_id, callback) {
        var iframe = document.getElementById(iframe_id);
        if (iframe.attachEvent) {
            iframe.attachEvent("onload", function() {
                if (callback) callback();
            });
        } else {
            iframe.onload = function() {
                if (callback) callback();
            };
        }
    }
    long.guid = function() {
        var NewRandom = function() {
            return Math.random().toString(16).slice(2);
        };
        return NewRandom().slice(0, 8) + "-" +
            NewRandom().slice(0, 4) + "-" + NewRandom().slice(0, 4) + "-" + NewRandom().slice(0, 4) +
            "-" + NewRandom().slice(0, 12);
    }
    long.rands = function(n) {
            var chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0']
            var res = "";
            for (var i = 0; i < n; i++) {
                var id = Math.ceil(Math.random() * 10);
                res += chars[id];
            }
            return res;
        }
        //产生可以重复的随机数 参数：个数|最小|最大
    long.randomArrayRepeatable = function(n, min, max) {
            var arrayValue = [];
            for (var i = min; i <= max; i++) {
                arrayValue.push(i);
            }
            var array = [];
            for (var i = 0; i < n; i++) {
                var r = parseInt(Math.random() * arrayValue.length);
                array[i] = arrayValue[r];
            }
            return array;
        }
        //产生不重复的随机数 参数：个数|最小|最大
    long.randomArray = function(n, min, max) {
        if (max - min + 1 < n) {
            alert("无法产生" + n + "个随机数！");
            return null;
        }
        var arrayValue = [];
        for (var i = min; i <= max; i++) {
            arrayValue.push(i);
        }
        var array = [];
        for (var i = 0; i < n; i++) {
            var r = parseInt(Math.random() * arrayValue.length);
            array[i] = arrayValue[r];
            arrayValue.splice(r, 1); //添加后删除  
        }
        return array;
    }
    long.letter = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
    long.upper = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    long.number = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    long.randLetter = function(n) {
        var seed = long.letter;
        var array = long.randomArray(n, 0, 25);
        var array2 = [];
        for (var i = 0; i < n; i++) {
            array2[i] = seed[array[i]];
        }
        return array2;
    }
    long.randUpper = function(n) {
            var array = [];
            var array2 = long.randLetter(n);
            for (var i = 0; i < n; i++) {
                array[i] = array2[i].toUpperCase();
            }
            return array;
        }
        /*产生n个安全字符串 参数:数量|是否包含下划线|是否允许第一个为数字*/
    long.randSafeChar = function(n, include_, allowFirstNumber) {
        if (include_ == undefined) include_ = true;
        if (allowFirstNumber == undefined) allowFirstNumber = true;
        var num = allowFirstNumber || false;
        var seed = long.letter.concat(long.upper).concat(long.number);
        if (include_) {
            seed.unshift('_');
        }
        seedlength = seed.length;
        var createPassword = '';
        for (i = 0; i < n; i++) {
            j = Math.floor(Math.random() * seedlength);
            if (!num && i == 0 && !isNaN(seed[j])) {
                i--;
            } else {
                createPassword += seed[j];
            }
        }
        return createPassword;
    }
    long.encode = function(value) {
        var temp = document.createElement("div");
        (temp.textContent != null) ? (temp.textContent = value) : (temp.innerText = value);
        var output = temp.innerHTML;
        temp = null;
        return output;
    }
    long.TimeSpan = function(edate, sdate) {
        var getSpan = function(d) {
            return parseFloat(d.getHours() * 600 + d.getMinutes() * 60 + d.getSeconds() + "." + d.getMilliseconds());
        }
        return getSpan(edate) - getSpan(sdate);
    };
    //把 Json value 化.处理 Json 的Value 值是 function 的情况. IsRecursion 表示是否递归处理.
    long.JsonValuer = function(jsonVaule, valParaCallback, IsRecursion) {
        var ret = {};
        valParaCallback = valParaCallback || $.noop;
        IsRecursion = IsRecursion || false;
        if (!jsonVaule) return ret;
        for (var p in jsonVaule) {
            if ($.isFunction(p)) continue;
            var v = jsonVaule[p];
            if ($.isFunction(v)) {
                var para = valParaCallback(p, v);
                if (para !== false) {
                    ret[p] = v(para);
                    continue;
                }
            }
            ret[p] = v;
        }
        return ret;
    };

    long.Enter = long.enter = function(id, CallBack) {
        var $obj = id;
        if (typeof(id) == 'string') {
            if (id.indexOf('#') < 0)
                $obj = $('#' + id);
            else
                $obj = $(id);
        }
        $obj.bind("keydown", function(e) {
            if (e.keyCode == 13) {
                e.preventDefault(); //阻止默认行为
                long.stopPropagation(e);
                if ($.isFunction(CallBack)) CallBack($obj, e);
                else alert('CallBack对象不是函数');
            }
        });
    };
    long.CtrlEnter = function(id, callback, args) {
        var $obj = id;
        if (typeof(id) == 'string') {
            if (id.indexOf('#') < 0)
                $obj = $('#' + id);
            else
                $obj = $(id);
        }
        $obj.keypress(function(e) {
            if (e.ctrlKey && e.which == 13 || e.which == 10) {
                if (!$.isArray(args)) args = [];
                callback.apply(this, args);
                return false;
            }
        });
    };
    long.Alt = function(key, callback, args) {
        var isAlt = false;
        $(document).keydown(function(e) {
            if (e.which === 18)
                isAlt = true;
            if (e.which === key.toUpperCase().charCodeAt(0) && isAlt === true) {
                if ($.isFunction(callback)) {
                    e.preventDefault();
                    long.stopPropagation(e);
                    if (!$.isArray(args)) args = [];
                    callback.apply(this, args);
                }
                isAlt = false;
                return false;
            }
        }).keyup(function(e) {
            if (e.which === 18) isAlt = false;
        });
    };

    long.log = function(c) {
        try {
            window.console = window.console || {};
            console.log || (console.log = opera.postError);
            console.log(c);
        } catch (err) {}
    };
    //写cookies
    long.setCookie = function(c_name, value, expiredays) {
        var exdate = new Date();
        expiredays = expiredays || 30;
        exdate.setDate(exdate.getDate() + expiredays);
        document.cookie = c_name + "=" + escape(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString());
    }

    //读取cookies
    long.getCookie = function(name) {
        var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
        if (arr = document.cookie.match(reg))
            return (arr[2]);
        else
            return null;
    }

    //删除cookies
    long.delCookie = function(name) {
            var exp = new Date();
            exp.setTime(exp.getTime() - 1);
            var cval = long.getCookie(name);
            if (cval != null)
                document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
        }
        //H5的本地缓存
        //判断是否支持storage
    long.storage = function() {
            return (typeof(Storage) !== "undefined");
        }
        //设置本地缓存值
    long.setstore = function(name, val) {
            if (typeof(Storage) !== "undefined") {
                localStorage.setItem(name, val);
            } else {
                console.log('不支持Storage');
            }
        }
        //得到本地缓存值
    long.getstore = function(name) {
        if (typeof(Storage) !== "undefined") {
            return localStorage.getItem(name);
        } else {
            console.log('不支持Storage');
        }
    }
    long.header = {
            link: {
                add: function(id, href) {
                    //var head = document.getElementsByTagName('head')[0];
                    var linkTag = document.createElement('link');
                    linkTag.id = id;
                    linkTag.href = href;
                    linkTag.setAttribute('rel', 'stylesheet');
                    linkTag.setAttribute('media', 'all');
                    linkTag.setAttribute('type', 'text/css');
                    document.head.appendChild(linkTag);
                }
            },
            script: {
                add: function(id, src) {
                    var scriptTag = document.createElement('script');
                    scriptTag.id = id;
                    scriptTag.src = src;
                    document.head.appendChild(scriptTag);
                    //document.body.parentNode.appendChild(scriptTag);
                }
            }
        }
        //验证集
    long.verify = {};
    long.verify.check = function(area_id) {
            if ((typeof area_id).toLowerCase() == "string")
                area_id = $('#' + area_id);
            var verify = true;
            area_id.find('select,input,textarea').each(function() {
                //console.log("START...tagName:"+$(this)[0].tagName+",ID:"+$(this).attr('id') +"//" +$(this).attr('verify'));
                if ($(this).attr('verify') != undefined && $(this).val().length <= 0) {
                    var tips = $(this);
                    if (tips[0].tagName.compare("SELECT")) {
                        tips = $(this).parent().find('.bootstrap-select');
                        if (tips.size() <= 0)
                            tips = $(this);
                    }
                    layer.tips($(this).attr('placeholder'), tips, { tips: [2, '#F51C1C'], time: 3000 });
                    tips.focus();
                    verify = false;
                    return false;
                }
            });
            return verify;
        }
        //验证是否有汉字
    long.verify.china = function(val) {
            var reg = /[\u4E00-\u9FA5]/gi;
            return reg.test(str);
        }
        //验证日期
    long.verify.date = function(val) {
            var regTextTime = /^((\d{2}(([02468][048])|([13579][26]))[\-\/\s]?((((0?[13578] )|(1[02]))[\-\/\s]?((0?[1-9])|([1-2][0-9])|(3[01])))|(((0?[469])|(11))[\-\/\s]?((0?[1-9])|([1-2][0-9])|(30)))|(0?2[\-\/\s]?((0?[1-9])|([1-2][0-9])))))|(\d{2}(([02468][1235679])|([13579][01345789]))[\-\/\s]?((((0?[13578])|(1[02]))[\-\/\s]?((0?[1-9])|([1-2][0-9])|(3[01])))|(((0?[469])|(11))[\-\/\s]?((0?[1-9])|([1-2][0-9])|(30)))|(0?2[\-\/\s]?((0?[1-9])|(1[0-9])|(2[0-8]))))))$/;
            return regTextTime.test(val);
        }
        //验证密码
    long.verify.password = function(val) {
        var pattern = /[a-zA-Z_0-9]{6,16}/;
        return pattern.test(val);
    }
    long.verify.username = function(val, minLength, maxLength) {
        minLength = minLength || 6;
        maxLength = maxLength || 30;
        if (val.length <= 0 || val.length < minLength || val.length > maxLength)
            return false;
        var pattern = /^[^0-9][0-9A-Za-z_]*$/;
        return pattern.test(val);
    }
    long.verify.phone = function(val) {
            var patrn = /^(13[0-9]|15[0|3|6|7|8|9]|18[8|9])\d{8}$/;
            return patrn.test(val);
        }
        //座机
    long.verify.tel = function(val) {
        var patrn = /^[+]{0,1}(\d){1,4}[ ]{0,1}([-]{0,1}((\d)|[ ]){1,12})+$/;
        return patrn.test(val);
    }
    long.verify.tel = function(val) {
            var patrn = /^[+]{0,1}(\d){1,4}[ ]{0,1}([-]{0,1}((\d)|[ ]){1,12})+$/;
            return patrn.test(val);
        }
        //Email
    long.verify.email = function(val) {
            var patrn = /^[a-zA-Z0-9_\-]{1,}@[a-zA-Z0-9_\-]{1,}\.[a-zA-Z0-9_\-.]{1,}$/;
            return patrn.test(val);
        }
        //邮编
    long.verify.postcode = function(val) {
            var patrn = /^[0-9]{6}$/;
            return patrn.test(val);
        }
        //汉字算两个字符
    long.trueLength = function(val) {
        var len = 0;
        for (var i = 0; i < val.length; i++) {
            var c = val.charCodeAt(i);
            if ((c >= 0x0001 && c <= 0x007e) || (0xff60 <= c && c <= 0xff9f)) len++;
            else len += 2;
        }
        return len;
    }
    long.isleapYear = function(year) {
        return (0 == year % 4 && ((year % 100 != 0) || (year % 400 == 0)));
    }; {
        long.browser = 'MSIE';
        if (navigator.userAgent.indexOf("MSIE") > 0) {
            long.browser = "MSIE"; //IE 
        } else if (isFirefox = navigator.userAgent.indexOf("Firefox") > 0) {
            long.browser = "Firefox"; //火狐 
        } else if (isSafari = navigator.userAgent.indexOf("Safari") > 0) {
            long.browser = "Safari"; //Ipad浏览器 
        } else if (isCamino = navigator.userAgent.indexOf("Camino") > 0) {
            long.browser = "Camino";
        } else if (isMozilla = navigator.userAgent.indexOf("Gecko/") > 0) {
            long.browser = "Gecko";
        }
        long.msie = -1;
        if (long.browser == 'MSIE') {
            try {
                //IE版本
                long.msie = parseFloat(navigator.appVersion.match(/msie ([\d.]+)/i)[0].match(/[\d.]+/)[0]);
                //IE文档模式版本
                long.documentMode = document.documentMode;
                if (document.documentMode < 9) {
                    var log = "【浏览器错误】：当前IE浏览器版本或文档模式过低,将导致当前网页无法正常运行。\r\n├──当   前   浏   览   器：IE\r\n├──当 前 浏 览 器 版 本：{0}\r\n├──当前浏览器文档模式：{1}\r\n├──你的浏览器有些古老，建议使用IE>=9版本或Chrome、Firefox、Opera等浏览器！\r\n(点击确定跳转下载新版IE)".format(long.msie, document.documentMode);
                    if (Confirm(log)) {
                        window.open("http://sw.bos.baidu.com/sw-search-sp/software/5c02c37194565/IE11-Windows6.1-x86-zh-cn.exe");
                    }
                    long.log(log);
                }
            } catch (e) {
                long.msie = 9.5; //edge
            }
        }
    };
}(window);