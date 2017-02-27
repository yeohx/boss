/**
 * 通用ajax查询，异步返回，刷新界面
 * @param formId
 * @param showBoxId
 */
function ajaxCommonList(formId,action,showBoxId) {
    $("#" + formId).attr("action",action);
    var url = $("#" + formId).attr("action");
    $.ajax({
        cache: true,
        type: "POST",
        url: url,
        data: $('#' + formId).serialize(),// 序列化的form
        async: false,
        error: function(data) {
          saveFlag = true;
          alert("与服务器通讯异常，请刷新重试！");
        },
        success: function(data) {
          $("#" + showBoxId).html(data);
        }
      });
  }

/**
 * 通用ajax查询，同步返回，刷新界面(带加载效果)
 * @param formId
 * @param action
 * @param showBoxId
 */
function ajaxCommonReq(formId,action,showBoxId) {
    $.ajax({
        cache: true,
        type: "POST",
        url: action,
        data: $('#' + formId).serialize(),// 序列化的form
        async: true,
        beforeSend: function() {
			$(".ban").css({"display":"block"})
		},
		
        error: function(data) {
          saveFlag = true;
          alert("与服务器通讯异常，请刷新重试！");
        },
        success: function(data) {
          $("#" + showBoxId).html(data);
        },
        complete: function() {
			if (!!window.ActiveXObject || "ActiveXObject" in window){
				setTimeout(function(){$(".ban").css({"display":"none"});},100);
			}else{
				$(".ban").css({"display":"none"})
			}
		}
      });
  }

/**
 * 通用提示
 * @param msg
 */
function msgPromotion(msg){
	if(msg != null && msg != ''){
		alert(msg);
	}else{
		if($("#errorMsg").val() != null && $("#errorMsg").val() != ''){
			alert($("#errorMsg").val());
		}
	}
	
}
