/** 创建弹出层开始 */
function crertdiv(_parent, _element, _id, _css) {// 创建层
	var newObj = document.createElement(_element);
	if (_id && _id != "")
		newObj.id = _id;
	if (_css && _css != "") {
		newObj.setAttribute("style", _css);
		newObj.style.cssText = _css;
	}
	if (_parent && _parent != "") {
		var theObj = getobj(_parent);
		var parent = theObj.parentNode;
		if (parent.lastChild == theObj) {
			theObj.appendChild(newObj);
		} else {
			theObj.insertBefore(newObj, theObj.nextSibling);
		}
	} else
		document.body.appendChild(newObj);
}

function getobj(o) {// 获取对象
	return document.getElementById(o)
}

var swtemp = 0, objtemp;
var timer
function Mout(o) {
	timer = setTimeout(function() {
		o.style.display = "none";
	}, 1000)
	swtemp = 0;
}

function hiddiv(e, inputid) {
	e = e || window.event;
	ev = e.target || e.srcElement;
	v = ev.innerText || ev.textContent;
	if (v != "clear")
		getobj(inputid).value = v;
	else
		getobj(inputid).value = ""
	getobj(inputid + "mydivroom").style.display = "none";
}
/** 创建弹出层结束 */

/**
 * 报事对象房间
 * 
 * @param inputid
 * @param url
 */
function showdivRoom(inputid, url) {// 显示层
	var regionId = $("#regionId").val();
	var buildingName = $("#buildingName").val();
	var node = document.getElementById(inputid + "mydivroom");
	if (node != null) {
		node.parentNode.removeChild(node)
	}
	if (!getobj(inputid + "mydivroom")) {// 若尚未创建就建之
		var divcss = "font-size:12px;color:#3b6fbe; background:#fff;position:absolute;left: border:#e1e1e1 1px solid; box-shadow:0px 2px 4px #d0d0d0; -moz-box-shadow:0px 2px 4px #d0d0d0; -webkit-box-shadow:0px 2px 4px #d0d0d0;"
				+ (getobj(inputid).offsetLeft + 20)
				+ "px;top:"
				+ (getobj(inputid).offsetTop + 75)
				+ "px;border:1px solid #a8a8a8;"
		crertdiv("", "div", inputid + "mydivroom", divcss);// 创建层"mydiv"
		crertdiv(inputid + "mydivroom", "ul", inputid + "myul");// 创建ul
		
				$.ajax({
					type : 'GET',
					dataType : "json",
					url : url,
					async : false,
					cache : false,
					data : {
						regionId : encodeURIComponent(regionId),
						buildingName : encodeURIComponent(buildingName)
					},
					success : function(data) {
						if(data !=null && data != ""){
							var a = 0;
							
							$.each(
									data,
									function(i, result) {
										crertdiv(inputid + "myul", "li",
												inputid + "li" + i,
												"background:#fff");
										getobj(inputid + "li" + i).innerHTML = data[i].roomName;
										a++
									});
					crertdiv(inputid + "myul", "li", inputid + "li" + a,
							"color:#f00;background:#fff");// 创建"clear"li
					getobj(inputid + "li" + a).innerHTML = "清除";
					getobj(inputid + "mydivroom").innerHTML += "<style type='text/css'>#"
							+ inputid
							+ "mydivroom ul {padding:0px;margin:0;}#"
							+ inputid
							+ "mydivroom ul li{list-style-type:none;padding:5px;margin:0;float:left;CURSOR: pointer;}</style>"
					for (var i = 0; i <= a; i++) {
						getobj(inputid + "li" + i).onmouseover = function() {
							this.style.background = "#eee";
							clearTimeout(timer)
						}
						getobj(inputid + "li" + i).onmouseout = function() {
							this.style.background = "#fff"
						}
					}

					$('#' + inputid + 'myul li').each(function(index, ele) {
						$(ele).bind('click', function() {
							if ($(ele).html() == "清除") {
								$("#" + inputid).val('');
							} else {
								$("#" + inputid).val($(ele).html());
							}

						});
					});

						}else{
							alert("请选择楼栋信息！");
						}
						
					}
				});
	}
	var newdiv = getobj(inputid + "mydivroom")
	newdiv.onclick = function() {
		hiddiv(event, inputid);
	}
	newdiv.onmouseout = function() {
		Mout(this)
	}
	newdiv.onmouseover = function() {
		clearTimeout(timer)
	}
	getobj(inputid).onmouseout = function() {
		Mout(newdiv)
	}
	newdiv.style.display = "block";
	swtemp = 1;
	objtemp = inputid;
}

/**
 * 报事对象楼栋
 * 
 * @param inputid
 * @param url
 */
function showdivBuilding(inputid, url) {// 显示层
	var regionId = $("#regionId").val();
	var node = document.getElementById(inputid + "mydiv");
	if (node != null) {
		node.parentNode.removeChild(node)
	}
	if (!getobj(inputid + "mydiv")) {// 若尚未创建就建之
		var divcss = "font-size:12px;color:#3b6fbe; background:#fff;position:absolute;left: border:#e1e1e1 1px solid; box-shadow:0px 2px 4px #d0d0d0; -moz-box-shadow:0px 2px 4px #d0d0d0; -webkit-box-shadow:0px 2px 4px #d0d0d0;"
				+ (getobj(inputid).offsetLeft + 20)
				+ "px;top:"
				+ (getobj(inputid).offsetTop + 75)
				+ "px;border:1px solid #a8a8a8;"
		crertdiv("", "div", inputid + "mydiv", divcss);// 创建层"mydiv"
		crertdiv(inputid + "mydiv", "ul", inputid + "myul");// 创建ul
		
				$.ajax({
					type : 'GET',
					dataType : "json",
					async : false,
					cache : false,
					url : url,
					data : {
						regionId : encodeURIComponent(regionId)
					},
					success : function(data) {
						
						if(data !=null && data != ""){
						var a = 0;
						
								$.each(
										data,
										function(i, result) {
											crertdiv(inputid + "myul", "li",
													inputid + "li" + i,
													"background:#fff");
											getobj(inputid + "li" + i).innerHTML = data[i].buildingName;
											a++
										});
						crertdiv(inputid + "myul", "li", inputid + "li" + a,
								"color:#f00;background:#fff");// 创建"clear"li
						getobj(inputid + "li" + a).innerHTML = "清除";
						getobj(inputid + "mydiv").innerHTML += "<style type='text/css'>#"
								+ inputid
								+ "mydiv ul {padding:0px;margin:0;}#"
								+ inputid
								+ "mydiv ul li{list-style-type:none;padding:5px;margin:0;float:left;CURSOR: pointer;}</style>"
						for (var i = 0; i <= a; i++) {
							getobj(inputid + "li" + i).onmouseover = function() {
								this.style.background = "#eee";
								clearTimeout(timer)
							}
							getobj(inputid + "li" + i).onmouseout = function() {
								this.style.background = "#fff"
							}
						}

						$('#' + inputid + 'myul li').each(function(index, ele) {
							$(ele).bind('click', function() {
								if ($(ele).html() == "清除") {
									$("#" + inputid).val('');
								} else {
									$("#" + inputid).val($(ele).html());
								}

							});
						});
						}else {
							alert("请选择项目信息！");
						}

					}
				});
	}
	var newdiv = getobj(inputid + "mydiv")
	newdiv.onclick = function() {
		hiddiv(event, inputid);
	}
	newdiv.onmouseout = function() {
		Mout(this)
	}
	newdiv.onmouseover = function() {
		clearTimeout(timer)
	}
	getobj(inputid).onmouseout = function() {
		Mout(newdiv)
	}
	newdiv.style.display = "block";
	swtemp = 1;
	objtemp = inputid;
}


function getRegionRef(url){
	var iWidth=700; 
	var iHeight=500;
	var iTop=(window.screen.height-iHeight)/2;
	var iLeft=(window.screen.width-iWidth)/2;
	 window.open(url,'newwindow', 'height='+iHeight+', width='+iWidth+', top='+iTop+', left='+iLeft+', toolbar=no, menubar=no, scrollbars=yes, resizable=no, location=no, status=no');
//	var dat=localStorage.getItem("a1");
//	alert(returnvalue[0]);
//	if (!returnvalue) {
//		returnvalue = window.returnValue;
//	}
//
//	$("#regionId").val(returnvalue[0]);
//	$("#regionName").val(returnvalue[1]);
}
