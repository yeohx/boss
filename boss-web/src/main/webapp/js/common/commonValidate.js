//返回
function goBack(){
	history.go(-1);
}

//表单数据合法性校验
function formUniteValidate(formId){
	var validateFlag = true;
	
	var textInputValue;
	
	var textInputName = "";
	
	// 固定长度
	var fixLength = -1;
	
	// 最大长度
	var maxValidLength = -1;
	
	var intValueUp = 0;
	var intValueDown = 0;
	
	// 一、校验所有输入域是否含有特殊符号，以及是否超出有效长度
	$("#"+formId+" input:text").each(function(){
		textInputValue = $.trim($(this).val());
		textInputLength = textInputValue.length;
		
		if(textInputValue == ""){
			validateFlag = true;
		}else{
			textInputName = $(this).attr("elementName");
			if(textInputName == undefined ||textInputName == ""){
				textInputName = $(this).parent().prev().text();
				textInputName = textInputName.replace("：", "");
			}
			
			// 1.1 有效长度判断
			maxValidLength = $(this).attr("maxValidLength");
			if(textInputValue.length > maxValidLength){
				alert(textInputName + "的输入最多允许" + maxValidLength + "个字符，请检查输入！");
				$(this).focus();
				validateFlag = false;
				return false;
			}
				
			if (  textInputValue.indexOf("!") >= 0 /*|| textInputValue.indexOf("@") >= 0*/  
				|| textInputValue.indexOf("#") >= 0 || textInputValue.indexOf("$") >= 0  
				|| textInputValue.indexOf("%") >= 0 || textInputValue.indexOf("^") >= 0  
				|| textInputValue.indexOf("&") >= 0 || textInputValue.indexOf("*") >= 0  
				|| textInputValue.indexOf("(") >= 0 || textInputValue.indexOf(")") >= 0  
				|| textInputValue.indexOf("[") >= 0 || textInputValue.indexOf("]") >= 0  
				|| textInputValue.indexOf("{") >= 0 || textInputValue.indexOf("}") >= 0  
				|| textInputValue.indexOf("<") >= 0 || textInputValue.indexOf(">") >= 0
				|| textInputValue.indexOf("?") >= 0 
			){
				if(textInputName == '规则名称' ||  textInputName == 'URL'){
				}else{
					alert(textInputName + "中不能含有特殊字符，请检查输入！");
					$(this).focus();
					validateFlag = false;
					return false;
				}
			}
		}
		// 去掉输入内容的前后空格
		$(this).val(textInputValue);
	});
	
	if(!validateFlag){
		return false;
	}

	// 二、必填项校验
	$("#"+formId+" input:text").each(function(){
		var requiredFlag = $(this).attr("requiredFlag");
		if(requiredFlag != "true"){
			return;
		}
		
		textInputValue = $.trim($(this).val());
		if(textInputValue == ""){
			textInputName = $(this).attr("elementName");
			if(textInputName == undefined ||textInputName == ""){
				textInputName = $(this).parent().prev().text();
				textInputName = textInputName.replace("：","");
			}
			alert(textInputName + "为必填项，不允许为空，请重新输入！"); 
			$(this).focus();
			validateFlag = false;
			return false;
		}
	});
	
	if(!validateFlag){
		return false;
	}
	
	$("#"+formId+" input:password").each(function(){
		var requiredFlag = $(this).attr("requiredFlag");
		if(requiredFlag != "true"){
			return;
		}
		
		textInputValue = $.trim($(this).val());
		if(textInputValue == ""){
			textInputName = $(this).attr("elementName");
			if(textInputName == undefined ||textInputName == ""){
				textInputName = $(this).parent().prev().text();
				textInputName = textInputName.replace("：","");
			}
			alert(textInputName + "为必填项，不允许为空，请重新输入！");
			$(this).focus();
			validateFlag = false;
			return false;
		}
	});
	
	if(!validateFlag){
		return false;
	}
	
	$("#"+formId+" select").each(function(){
		var requiredFlag = $(this).attr("requiredFlag");
		if(requiredFlag != "true"){
			return;
		}
		
		textInputValue = $.trim($(this).val());
		if(textInputValue == "-1" || textInputValue == ""){
			textInputName = $(this).attr("elementName");
			if(textInputName == undefined ||textInputName == ""){
				textInputName = $(this).parent().prev().text();
				textInputName = textInputName.replace("：","");
			}
			alert(textInputName + "为必填项，不允许为空，请重新选择！");
			$(this).focus();
			validateFlag = false;
			return false;
		}
	});
	if(!validateFlag){
		return false;
	}
	
	// 三、整数项校验
	$("#"+formId+" input:text[elementType='int']").each(function(){
		textInputName = $(this).attr("elementName");
		if(textInputName == undefined ||textInputName == ""){
			textInputName = $(this).parent().prev().text();
			textInputName = textInputName.replace("：","");
		}
		textInputValue = $.trim($(this).val());
		var regu = /^[0-9]{1,}$/; 
		
		if(textInputValue != ""){
			
			//输入合法性校验
			if(textInputValue.substring(0,1) == "-"){
				alert(textInputName + "的输入不允许为负数，请重新输入！");
				$(this).focus();
				validateFlag = false;
				return false;
			}
			else if(textInputValue != "" && !regu.test(textInputValue)){
				alert(textInputName + "的输入只允许为整数，请重新输入！");
				$(this).focus();
				validateFlag = false;
				return false;
			}else{
				textInputValue = parseInt($(this).val());
			}
			
			//输入区间校验
			intValueUp = $(this).attr("valueUp");
			intValueDown = $(this).attr("valueDown");
			if(intValueUp != "" && intValueDown != ""){
				intValueUp = parseInt(intValueUp);
				intValueDown = parseInt(intValueDown);
				if(textInputValue > intValueUp || textInputValue < intValueDown){
					alert(textInputName + "的输入区间为："+intValueDown+"--"+intValueUp+"，请重新输入！");
					$(this).focus();
					validateFlag = false;
					return false;
				}
			}
		}
	});
	
	if(!validateFlag){
		return false;
	}
	
	// 四、小数项校验
	$("#"+formId+" input:text[elementType='float']").each(function(){
		textInputName = $(this).attr("elementName");
		if(textInputName == undefined ||textInputName == ""){
			textInputName = $(this).parent().prev().text();
			textInputName = textInputName.replace("：","");
		}
		textInputValue = $.trim($(this).val());
		
		//整数位数
		var intDigit = $(this).attr("intDigit");
		//小数位数
		var decimalDigit = $(this).attr("decimalDigit");
		
		var reguForIntStr = "^[0-9]{1,"+intDigit+"}$";
		var reguForInt = new RegExp(reguForIntStr); 
		
		var reguForFloatStr = '^[0-9]{0,'+intDigit+'}[\.][0-9]{1,'+decimalDigit+'}$'; 
		var reguForFloat = new RegExp(reguForFloatStr); 
		
		//输入区间校验
		if(textInputValue == ""){
			validateFlag = true;
		}else if(textInputValue.substring(0,1) == "-"){
			alert(textInputName + "的输入不允许为负数，请重新输入！");
			$(this).focus();
			validateFlag = false;
			return false;
		}
		else if(reguForInt.test(textInputValue)){
			validateFlag = true;
		}else if(reguForFloat.test(textInputValue)){
			validateFlag = true;
		}else{
			alert(textInputName + "的数值内容有不当输入，且输入的非负整数位数不得超过"+intDigit+"位，小数位数不得超过"+decimalDigit+"位，请重新输入！");
			$(this).focus();
			validateFlag = false;
			return false;
		}
		
	});
	
	if(!validateFlag){
		return false;
	}
	
	// 五、小数项（数值存在上限或者下限）校验
	$("#"+formId+" input:text[elementType='limitedFloat']").each(function(){
		textInputName = $(this).attr("elementName");
		if(textInputName == undefined ||textInputName == ""){
			textInputName = $(this).parent().prev().text();
			textInputName = textInputName.replace("：","");
		}
		textInputValue = $.trim($(this).val());
		
		//整数部分的数值
		var intValue = parseInt(textInputValue);
		
		//小数位数
		var decimalDigit = $(this).attr("decimalDigit");
		
		var reguForIntStr = "^[0-9]{1,}$";
		var reguForInt = new RegExp(reguForIntStr); 
		
		var reguForFloatStr = '^[0-9]{0,}[\.][0-9]{1,'+decimalDigit+'}$'; 
		var reguForFloat = new RegExp(reguForFloatStr); 
		
		//输入区间校验
		if(textInputValue == ""){
			validateFlag = true;
		}else if(textInputValue.substring(0,1) == "-"){
			alert(textInputName + "的输入不允许为负数，请重新输入！");
			$(this).focus();
			validateFlag = false;
			return false;
		}
		else if(reguForInt.test(textInputValue)){
			validateFlag = true;
		}else if(reguForFloat.test(textInputValue)){
			validateFlag = true;
		}else{
			alert(textInputName + "的数值内容有不当输入，小数位数不得超过"+decimalDigit+"位，请重新输入！");
			$(this).focus();
			validateFlag = false;
			return false;
		}
		
		//输入区间校验
		intValueUp = $(this).attr("valueUp");
		intValueDown = $(this).attr("valueDown");
		if(textInputValue != "" && intValueUp != "" && intValueDown != ""){
			intValueUp = parseInt(intValueUp);
			intValueDown = parseInt(intValueDown);
			if(textInputValue > intValueUp || textInputValue < intValueDown){
				alert(textInputName + "的输入区间为："+intValueDown+"--"+intValueUp+"，请重新输入！");
				$(this).focus();
				validateFlag = false;
				return false;
			}
		}
		
	});
	
	if(!validateFlag){
		return false;
	}
	
	// 六、数字项校验（特指只能由数字组成的项目，比如编号等）
	$("#"+formId+" input:text[elementType='digit']").each(function(){
		textInputName = $(this).attr("elementName");
		if(textInputName == undefined ||textInputName == ""){
			textInputName = $(this).parent().prev().text();
			textInputName = textInputName.replace("：","");
		}
		textInputValue = $(this).val();
		textInputValue = $.trim(textInputValue);
		//固定长度校验
		fixLength = $(this).attr("fixLength");
		if(fixLength > -1 && fixLength != textInputValue.length){
			alert(textInputName + "必须由数字组成，且固定位数为" + fixLength + "位，请重新输入！");
			$(this).focus();
			validateFlag = false;
			return false;
		}
			
		var reguForDigit = /^[0-9]{1,}$/; 
	
		if(textInputValue == ""){
			validateFlag = true;
		}else if(reguForDigit.test(textInputValue)){
			validateFlag = true;
		}else{
			alert(textInputName + "必须由数字组成，且最大长度为："+$(this).attr("maxValidLength")+"，请重新输入！");
			$(this).focus();
			validateFlag = false;
			return false;
		}
		
	});
	
	if(!validateFlag){
		return false;
	}

	// 七、邮箱校验
	$("#"+formId+" input:text[elementType='email']").each(function(){
		textInputName = $(this).attr("elementName");
		if(textInputName == undefined ||textInputName == ""){
			textInputName = $(this).parent().prev().text();
			textInputName = textInputName.replace("：","");
		}
		textInputValue = $.trim($(this).val());
		var reEmail = new RegExp("^(\\w)+(\\.\\w+)*@(\\w)+(\\.\\w+)+$");
    	if(!reEmail.test(textInputValue)){
    		alert(textInputName+"输入格式错误");
    		$(this).focus();
    		validateFlag = false;
    		return false;
    	}
	});

	if(!validateFlag){
		return false;
	}
	
	// 清空隐藏tr下的单选框和下拉框
	$("#"+formId + " tr").each(function(){
		var trDisplay = $(this).css("display");
		if(trDisplay == "none"){
			$(this).find("input:radio").attr("disabled","disabled");
			$(this).find("select").attr("disabled","disabled");
		}
		
	});
	
	return validateFlag;
}
 
/* 
	用途：检查输入的起止日期是否正确，规则为两个日期的格式正确， 
	且结束如期>=起始日期 
	输入： 
	startDate：起始日期，字符串 
	endDate：结束如期，字符串 
	返回： 
	如果通过验证返回true,否则返回false 
*/ 
function checkTwoDate( startDate,endDate ) { 
	if( startDate > endDate ) { 
		alert("起始日期不能大于终止日期!"); 
		return false; 
	} 
	return true; 
}

function checkTwoMonth( startDate,endDate ) {
	if( startDate > endDate ) { 
		alert("起始月份不能大于终止月份!"); 
		return false; 
	} 
	return true; 
}

function isSomeYear( startDate,endDate ) {
	var startYear = startDate.substring(0,4);
	var endYear = endDate.substring(0,4);
	
	if(startYear != endYear){
		return false;
	}
	
	return true;
}