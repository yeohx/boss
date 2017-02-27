$(function(){
	//登录提交
	$("#login_sub").click(function() {
		if(!formUniteValidate("loginForm")){
			return;
		}
		
		$("#loginForm").submit();
	});
	//密码修改提交
	$("#login_sub_modify").click(function() {
		if(!formUniteValidate("loginForm_modify")){
			return;
		}

		$("#loginForm_modify").submit();
	});
	
	
});

$(document).keyup(function(event){
	if(event.keyCode == 13){
		if(!formUniteValidate("loginForm")){
			return;
		}
		$("#loginForm").submit();
	}
	
});