	function ByDay(){
		notshow();
		$("#ByDay").show();
	}
	function ByWeek(){
		notshow();
		$("#ByWeek").show();
	}
	function ByMonth(){
		notshow();
		$("#ByMonth").show();
	}
	function BySeason(){
		notshow();
		$("#BySeason").show();
	}
	function ByYear(){
		notshow();
		$("#ByYear").show();
	}

function  notshow(){
	$(".TimeStemp").hide();
}
//超链添加点击事件
/*	$(".timeHref").click(function(){
		$(this).prev().click();
	});*/

//按月和年的输入框验证
 $("#dayMonth").on("mouseover mouseout",function(event){
	 if(event.type == "mouseover"){
		 $("#dayMonthTips").html("请输入大于0小于31的整数")
		 $("#dayMonthTips").css('color','green');
	 }else if(event.type == "mouseout"){
		 $("#dayMonthTips").html("");
	 }
	}) 
$("#dayQuarter").on("mouseover mouseout",function(event){
	 if(event.type == "mouseover"){
		 $("#dayQuarterTips").html("请输入大于0小于92的整数")
		 $("#dayQuarterTips").css('color','green');
	 }else if(event.type == "mouseout"){
		 $("#dayQuarterTips").html("");
	 }
	})
//按月或按季度天数判断
	function inputCheck(res){
	 $("#"+res).val( $("#"+res).val().replace(/\D+/g, ""));  
			var value;
	if(res=="dayQuarter"){
		value=92;
	}else if(res =="dayMonth"){
		value = 31;
	}
			if($("#"+res).val()<1 || $("#"+res).val()>value||$("#"+res).val()==""||$("#"+res).val().length==0){
				$("#"+res+"Tips").html("请输入大于0小于"+value+"的整数")
				 $("#"+res+"Tips").css('color','red');
				 $("#"+res).css('color','red');
				
			}else{
				$("#"+res+"Tips").html("这个是可以的")
				 $("#"+res+"Tips").css('color','green');
				$("#"+res).css('color','green');
			}
}

//非空阻止提交验证
function saveTemplate(){
	var flag=true;
	 var zTree = $.fn.zTree.getZTreeObj("treeDemo");
	 var nodes = zTree.getCheckedNodes();
	 var roles = new Array();
	 for (var i = 0; i < nodes.length; i++) {
		 roles[i] = nodes[i].roleId;
	}
	 var zTree1 = $.fn.zTree.getZTreeObj("treeDemo1");
	 var nodes1 = zTree1.getCheckedNodes();
	 var regions = new Array();
	 for (var i = 0; i < nodes1.length; i++) {
		 regions[i] = nodes1[i].id;
	}
	 //获取角色id集合
	$("#roleId").val(roles);
	 //获取小区ID集合
	$("#regionId").val(regions);
	 // 判断小区集合是否为空
	 if(regions==null||regions==""){
		 $("#regionTips").html("请选择小区");
		 $("#regionTips").css("color","red");
		 flag =false;
	 }else{
		 $("#regionTips").html("");
	 }
	 // 判断角色集合是否为空
	 if(roles==null||roles==""){
		 $("#roleTips").html("请选择角色");
		 $("#roleTips").css("color","red");
		 flag =false;
	 }else{
		 $("#roleTips").html("");
	 }
	 //判断模板名称
	 if($("#rouTemplateName").val()==null||$("#rouTemplateName").val()==""){
				$("#rouTemplateNameTips").html("模板名称不能为空");
				$("#rouTemplateNameTips").css('color','red');
				flag =false;
			}else{
				$("#rouTemplateNameTips").html("");
			}
	 
	 //判断开始和结束日期
		if($("#beginDate").val()==null||$("#beginDate").val()==""||$("#endDate").val()==null||$("#endDate").val()==""){
			$("#timeTips").html("开始日期和结束日期不能为空");
			$("#timeTips").css('color','red');
			flag = false;
		}else{
			$("#timeTips").html("");
		}
	 //判断开始时间和结束时间
		if($("#beginTime").val()==null||$("#beginTime").val()==""||$("#endTime").val()==null||$("#endTime").val()==""){
			$("#dateTimeTips").html("开始时间和结束时间不能为空");
			$("#dateTimeTips").css('color','red');
			flag = false;
		}
	 //判断定期模式
	 			//获取name为routinePatten的被选中的单选框的值
			var routine =  $("input[name=routinePatten]:checked").val(); 
	 	if(routine==2){
	 		//按周处理,遍历星期复选框
	 		if($("input[type=checkbox]:checked").length==0){
	 			$("#weekTips").html("请至少选择一周的一天");
	 			$("#weekTips").css('color','red');
	 			flag = false;
	 		}else{
	 			$("#weekTips").html("");
	 		}
	 	}else if(routine==3){
	 		if($("#dayMonth").val()==null||$("#dayMonth").val()==""){
		 		$("#dayMonthTips").html("请输入第几天");
	 			$("#dayMonthTips").css('color','red');
	 			flag = false;
	 		}else{
	 			$("#dayMonthTips").html("");
	 		}
	 	
	 	}else if(routine==4){
	 		if($("#dayQuarter").val()==null||$("#dayQuarter").val()==""){
		 		$("#dayQueryTips").html("请输入第几天");
	 			$("#dayQueryTips").css('color','red');
	 			flag = false;
 			}else{
 				$("#dayQueryTips").html("");
 			}
	 		
	 	}
	//任务类别
	 	var taskType =  $("input[name=taskTypeId]:checked"); 
	 	if(taskType.length==0){
	 		$("#taskTypeTips").html("请选择任务类别");
	 		$("#taskTypeTips").css('color','red');
	 	}else{
	 		$("#taskTypeTips").html("");
	 		$("#taskTypeTips").css('color','red');
	 	}
	 	
	 //	标题为空
	 if($("#taskTitle").val()==null||$("#taskTitle").val()==""){
		 $("#taskTitleTips").html("标题不能为空");
			$("#taskTitleTips").css('color','red');
				flag = false;
	 }else{
		 $("#taskTitleTips").html("");
	 }
	 //内容
	 if($("#routineContent").val()==null||$("#routineContent").val()==""){
		 $("#routineContentTips").html("请输入描述");
			$("#routineContentTips").css('color','red');
				flag = false;
	 }else{
		 $("#routineContentTips").html("");
	 }
	 alert(flag);
	 
	var forms = $($("#tForm").serializeArray());
	var param = {
	};
	forms.each(function(){
		param[this.name]=this.value;
	});
	
	if(flag ==true){
		$.ajax({
			type : 'post',
			dataType : "json",
			url : _ctx+"/rouTemplate/saveRouTemplate",
			data : param,
			success : function(result) {
						alert(result);
						location.href=_ctx+"/rouTemplate/toRouTemplate"
				}
			}) 
	}

} 