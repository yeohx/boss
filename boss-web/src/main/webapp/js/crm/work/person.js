$(function(){
	//查询
	$("#search1").click(function() {
	    goPage('searchCriteria', 'dataDiv', 'first');

	});
	
	//tab标签绑定点击事件
	$('#list_menu ul li').each(function(index, ele) {
	    $(ele).bind('click', function() {
	    	$("#operType").val(index);
	    	goPage('searchCriteria', 'dataDiv', 'first');
	    });
	});
	
	var getHtml = function(eleId) {
	    $('#' + eleId + " input,select option").each(function() {
	      $(this).attr('value', $(this).val());
	    });
	    // 搞定 type=checkbox,type=radio 选中状态
	    $('#' + eleId + " input[type='checkbox'],input[type='radio']").each(function() {
	      if ($(this).attr('checked'))
	        $(this).attr('checked', true);
	      else
	        $(this).removeAttr('checked');
	    });
	    // 搞定select选中状态
	    $('#' + eleId + " select").each(function() {
	    	$(this).find("option:selected").attr("selected",true);
	    });

	    return $('#' + eleId).html();
	  }
	
	//导出
	$('#exportExcel').click(function() {
	    var _downForm = $('<form action="exportExcel" method="POST">');
	    _downForm.append(getHtml('searchCriteria'));
	    _downForm.appendTo('body').submit().remove();
	});
	
	//勾对
	$("#confirm").click(function(){
		if($("#diff").attr("class") == "active"){
			var arr = new Array();
			$("input[name='chk_list']").each(function(){
				if($(this).is(":checked")){
					arr.push($(this).val());
				}
			});
			if(arr.length == 0){
				alert("请选择数据！");
				return false;
			}
			$("#collateIds").val(arr.join(","));
			
			doConfirm('searchCriteria');
		}
	});
	
	function doConfirm(formId){
		$.ajax({
		    cache: true,
		    type: "POST",
		    url: "confirm",
		    data: $('#' + formId).serialize(),// 序列化的form
		    async: false,
		    success: function(data) {
		    	goPage('searchCriteria', 'dataDiv', 'first');
		    }
		  });
	}

	
	//调账
	$("body").on('click', '#adjust', function() {
		if($("#operType").val() == '3'){
			$.ajax({
			    cache: true,
			    type: "POST",
			    url: "adjust",
			    async: false,
			    success: function(data) {
			    	$("#adjust_hand_1").tmpl(data).appendTo("#dataDiv");
			    }
			  });
		}
	});
	
	//关闭
	 $("body").on('click', '#close', function() {
		 $(".prompt_box:last").remove();
	 });
	 
//	 $("#check_form").validate({
//		    errorElement: "span",
//		    rules: {
//		        order_number: "required",
//		    },
//		    messages: {
//		        order_number: "请输入订单编号"
//		    }
//	});
	 
	//查询
	 $("body").on('click','#search_form',function(){
		 if ($("#ordercode").val() != ''){
			 adjustQuery("check_form");
		 }else{
			 $("#ordercode").focus();
		 }
	 });

});

function checkAll(eleId){
	if($("#chk_all").prop('checked') == true){
		$("input[name='chk_list']").each(function(){
			$(this).prop("checked","checked");
		});
	}else{
		$("input[name='chk_list']").each(function(){
			$(this).removeAttr("checked");
		});
	}
}




		
		

