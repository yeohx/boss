$.widget.bridge('uibutton', $.ui.button);
//var msgVersion = "20160714";
//msgId = msgVersion;

$(function() {

	/*评论*/


	$("#checkedAll").click(function() {
		checkedAll();
	});

	/*全选*/

	$('#myTab th').on('click', function() {
		var i = $(this).index();
		$(this).addClass('activetab').siblings().removeClass('activetab');
	});

/*工单工作台原因弹窗 完成*/
	
	
	$('#myModal-finish').on('shown.bs.modal', function() {
//		$.fn.zTree.init($("#__treeDemo"), setting, __zNodes);
		$('#_Cause').focus(function() {
			$('#myModal_4').modal('show');
		});

		$(".modal-dialog").on('click', "#__treeDemo li a.level2", function() {
			_$name = $(this).children().text();
			$("#_Cause").val(_$name);
			$('#myModal_4').modal('hide');
		});
	});

	/*工单工作台原因弹窗*/

	$('#why').focus(function() {
		$('#myModal-class').modal('show');
		$("#yuanyin p").dblclick(function() {
			$name = $(".classbg1").html();
			$("#why").val($name);
			$('#myModal-class').modal('hide');
		});
	});

	/*报事创建工单弹窗*/

	/*//$("tr:even").addClass("active");
	function  loading(object){
		var url = $(object).attr("uri");
		$.ajax({
			type:'GET',
			dataType:"html",
			url:url,
			data:{},
			success:function(data){
				$("#myTabContent").html(data);
			}
		});	
	}*/

	$(".treeview-menu li a").on('click', function() {
		$(".ban").show().delay(250).hide(40);
		var a = "";
		var tag = true;
		//$(this).addClass('active_a').siblings().removeClass('active_a');
		var t = $(this).text();
		$('.tag li').each(function(index, ele) {
			a = $(ele).find("a").text();
			if(t == a){
				tag = false;
				$(ele).addClass('activetag').siblings().removeClass('activetag');
				$("#myTabContent").load($(ele).attr("uri"));
				return;
			}
		});
		
		var  li_length = $('.tag li').length;
		if(tag){
			if(li_length<6){
				$(".tag li").removeClass('activetag');
				$(".tag ul").append('<li uri="' + $(this).attr("uri") + '" class="activetag" ><a><i   class="icon-right fa fa-folder-open fa-lg"></i>' + t + '</a><i class="icon-x fa fa-close"></i></li>');
				$("#myTabContent").load($(this).attr("uri"));
			}else{
				alert('不能超过6个标签');
				return false;
			}
		}
		
		$('.tag li').off('click');
		
		$('.tag li').click(function() {
		    $(this).addClass('activetag').siblings().removeClass('activetag');
			$("#myTabContent").load($(this).attr("uri"));
		});

		$(".icon-x").off('click');
		$(".icon-x").click(function() {
			$(this).parent().remove();
			$(".tag ul").each(function(i){
				var x = $(".tag ul li").length;
			    var y = $(this).children().last();
			    if(x==0){
			    	$("#myTabContent").html("");
			    }else{
			    	$("#myTabContent").load(y.attr("uri"));
			    	y.addClass('activetag').siblings().removeClass('activetag');
			    }
			    
			});
		});
	});
	
	/*TAG动态加载移除效果*/

	$('table tr:last').removeClass('border-bian');

	/*工单详情 图片轮番*/

	$('#mylist tbody tr').click(function() {
		$(this).addClass('tdblue').siblings().removeClass('tdblue');
	});
	
//	$('.zxtable tbody tr').click(function() {
//		$(this).addClass('tdblue').siblings().removeClass('tdblue');
//	});

	/*自检公区报事创建点击蓝色高亮*/

	$('#accordion p').click(function() {
		$(this).addClass('classbg').siblings().removeClass('classbg');
	});

	/*工单工作台责任人选择高亮*/

	$('#accordion1 p').click(function() {
		$(this).addClass('classbg1').siblings().removeClass('classbg1');
	});

	/*工单工作台原因细类选择高亮*/

})

var fn_date = function() {
		$(".form_datetime").datetimepicker({
			format: 'yyyy-mm-dd hh:ii'
		});
	}
	/*时间*/

var checkedAll = function() {
	var oBtn = document.getElementById('checkedAll');
	var aInput = document.getElementsByTagName('input');
	var i = 0;
	for(i = 0; i < aInput.length; i++) {
		//aInput[i].checked=true;
		var e = aInput[i];
		e.checked = !e.checked;
	}
}

/*快速工单工作台全选/取消*/

var Favor = function() {
	$(this).toggleClass("active");
	//var starVal = $(".ico-star").attr("data-value");
	//var starVal = window.localStorage.getItem("star" + msgId)
	if(starVal == 0) {
		addFavor("评论成功");
	} else {
		delFavor("取消评论");
	};
}

var addFavor = function() {
	//$(".pg").attr("data-value", "1");
	//window.localStorage.setItem("star" + msgId, "1");
	favorHint("评论成功");
}

var delFavor = function() {
	//$(".pg").attr("data-value", "0");
	//window.localStorage.setItem("star" + msgId, "0");
	favorHint("取消评论");
}

function favorHint(hintTxt) {
	var starHint = $(".addFavor");
	starHint.text(hintTxt).addClass("animated fadeInUp");
	setTimeout(function() {
		starHint.addClass("fadeOutDown");
	}, 1000);
	setTimeout(function() {
		starHint.attr("class", "").text("");
	}, 1600);
}

/*评论*/

/**
 * Created by zhaoxue on 16/7/28.
 * 功能维护
 */

$("#insert-row").click(function() {
	insertRow();
});

if($('.sub').length > 0) {
	_choseRadio();
}
var insertRow = function() {
	var tr = '';
	tr += '<tr>';
	tr += '<td><input type="checkbox" name="checkbox_name[]" value="option1"></td>';
	tr += '<td><select class="form-control input-height"><option>供需模式</option><option>工作流</option><option>系统</option><option>分派</option><option>供需&分派</option><option>快速报事</option></select></td>';
	tr += '<td><input type="text" class="form-control input-height"></td>';
	tr += '<td><input type="text" class="form-control input-height"></td>';
	tr += '<td><input type="text" class="form-control input-height"></td>';
	tr += '<td><input type="text" class="form-control input-height"></td>';
	tr += '<td><input type="text" class="form-control input-height"></td>';
	tr += '<td id="del-row">删除</td>';
	tr += '</tr>';
	$("#mytable tbody").append(tr);
}

/*增行*/

$("#del-all").click(function() {
	delAll();
});

/* 批量删除 */

var delAll = function() {
	// 判断是否至少选择一项 
	var checkedNum = $("input[name='checkbox_name[]']:checked").length;
	if(checkedNum == 0) {
		alert("请选择至少一项");
		return;
	} else {
		_aLert('确认要删除吗?');
	}
}

var _aLert = function(txt) {
	var alert_str = "";
	alert_str += '<div class="modal fade bs-example-modal-sm" id="myModal_del" tabindex="-1" role="dialog" aria-labelledby="myModal_del">';
	alert_str += '<div class="modal-dialog modal-sm">';
	alert_str += '<div class="modal-content bord-radius">';
	alert_str += '<div class="modal-header">';
	alert_str += '<h4 class="modal-title text-center" id="mySmallModalLabel">' + txt + '</h4>';
	alert_str += '</div>';
	alert_str += '<div class="btn-bg text-center">';
	alert_str += '<button type="button" class="margin-right2 btn btn-primary">提交</button>';
	alert_str += '<button type="button" data-dismiss="modal" aria-label="Close" class="btn btn-primary">返回</button>';
	alert_str += '</div>';
	alert_str += '</div></div></div>';
	$("._popover").append(alert_str);
}

$('.Dispatch').focus(function() {
	$('#myModal_Dispatch').modal('show');
	$.ajax({
		url: '/longhu-CRM/js/api/2.json',
		type: 'get',
		dataType: 'json',
		success: function(rs) {
			var zNodes_house = [rs];
			$.fn.zTree.init($("#treeDispatch"), setting, zNodes_house);
			$(".modal-dialog").on('click', "#treeDispatch li a.level2", function() {
				_$name = $(this).children().text();
				$(".Dispatch").val(_$name);
				$('#myModal_Dispatch').modal('hide');
			});
		}
	});
});

/*分配人角色弹窗*/

$('.Dealing').focus(function() {
	var t1 = $(this);
	$('#myModal_Dealing').modal('show');
	$.ajax({
		url: '/longhu-CRM/js/api/2.json',
		type: 'get',
		dataType: 'json',
		success: function(rs) {
			var zNodes_house = [rs];
			$.fn.zTree.init($("#treeDealing"), setting, zNodes_house);
			$(".modal-dialog").on('click', "#treeDealing li a.level2", function() {
				_$name = $(this).children().text();
				$(".Dealing").val(_$name);
				$('#myModal_Dealing').modal('hide');
			});
		}
	});
});

/*处理人角色弹窗*/

$('.xiaoqu').focus(function() {
	$('#myModal_xiaoqu').modal('show');
	$.ajax({
		url: '/longhu-CRM/js/api/1.json',
		type: 'get',
		dataType: 'json',
		success: function(rs) {
			var zNodes_house = [rs];
			$.fn.zTree.init($("#treexiaoqu"), setting, zNodes_house);
			$(".modal-dialog").on('click', "#treexiaoqu li a.level2", function() {
				_$name = $(this).children().text();
				$(".xiaoqu").val(_$name);
				$('#myModal_xiaoqu').modal('hide');
			});
		}
	});
});

/*适用小区弹窗*/

/* function _choseRadio () {
	var radios = document.getElementsByName('optionsRadios');
	for(var i = 0; i < radios.length; i++) {
		radios[i].indexs = i + 1;
		radios[i].onchange = function() {
			if(this.checked) {
				document.getElementById("id1").style.display = "none";
				document.getElementById("id2").style.display = "none";
				document.getElementById("id3").style.display = "none";
				document.getElementById("id4").style.display = "none";
				document.getElementById("id5").style.display = "none";
				document.getElementById("id" + this.indexs).style.display = "block";
			}
		}
	}
}*/
 /*定期模式 radio*/
function  loadOrderDetail(url){
	//var a = "";
	
	var  li_length = $('.tag li').length;
	
	if(li_length<6){
		$(".tag li").removeClass('activetag');
		$(".tag ul").append('<li uri="' + url + '" class="activetag" ><a><i   class="icon-right fa fa-folder-open fa-lg"></i>' + '工单详情' + '</a><i class="icon-x fa fa-close"></i></li>');
		$("#myTabContent").load(url);
	}else{
		alert('不能超过6个标签');
		return false;
	}
	
	
	
	$('.tag ul li').each(function(index, ele) {
	    $(ele).bind('click', function() {
	    	$(this).addClass('activetag').siblings().removeClass('activetag');
			$("#myTabContent").load($(ele).attr("uri"));
	    });
	});

	$('.icon-x').each(function(index, ele) {
	    $(ele).bind('click', function() {
	    	$(ele).parent().remove();
			$(".tag ul").each(function(i){
				var x = $(".tag ul li").length;
			    var y = $(this).children().last();
			    if(x==0){
			    	$("#myTabContent").html("");
			    }else{
			    	$("#myTabContent").load(y.attr("uri"));
			    	y.addClass('activetag').siblings().removeClass('activetag');
			    }
			});
	    });
	});
	
}

/*评论*/
