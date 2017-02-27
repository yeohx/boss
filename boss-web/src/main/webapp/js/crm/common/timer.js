var refreshTime = 1000*5*60;
//日期
function getNowFormatDate() {
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    var strHours = date.getHours();
    var strMinutes = date.getMinutes();
    var seconds = date.getSeconds();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    if (strHours >= 0 && strHours <= 9) {
    	strHours = "0" + strHours;
    }
    if (strMinutes >= 0 && strMinutes <= 9) {
    	strMinutes = "0" + strMinutes;
    }
    if (seconds >= 0 && seconds <= 9) {
    	seconds = "0" + seconds;
    }
    var currentdate = year + seperator1 + month + seperator1 + strDate
            + " " + strHours + seperator2 + strMinutes
            + seperator2 + seconds;
     var str = "刷新时间："+currentdate;
     $("#time").text(str);
}
//日期
function getNowFormatDate2() {
	var date = new Date();
	var seperator1 = "-";
	var seperator2 = ":";
	var year = date.getFullYear();
	var month = date.getMonth() + 1;
	var strDate = date.getDate();
	var strHours = date.getHours();
	var strMinutes = date.getMinutes();
	var seconds = date.getSeconds();
	if (month >= 1 && month <= 9) {
		month = "0" + month;
	}
	if (strDate >= 0 && strDate <= 9) {
		strDate = "0" + strDate;
	}
	if (strHours >= 0 && strHours <= 9) {
		strHours = "0" + strHours;
	}
	if (strMinutes >= 0 && strMinutes <= 9) {
		strMinutes = "0" + strMinutes;
	}
	if (seconds >= 0 && seconds <= 9) {
		seconds = "0" + seconds;
	}
	var currentdate = year + seperator1 + month + seperator1 + strDate
	+ " " + strHours + seperator2 + strMinutes
	+ seperator2 + seconds;
	var str = "刷新时间："+currentdate;
	$("#time2").text(str);
}

//重复执行某个方法   定时器
var t1 ;
var t2 ;
//转换时间
function changeTiem(){
	var time = $("#timerDate").val();
	refreshTime = time *1000*60;
	 window.clearInterval(t1);
	 if(refreshTime > 0){
		 t1 = window.setInterval("getNowFormatDate()",refreshTime); 
		 getNowFormatDate();
	 }else{
		 window.clearInterval(t1);
	 }
}
function changeTiem2(){
	var time = $("#timerDate2").val();
	refreshTime = time *1000*60;
	window.clearInterval(t2);
	if(refreshTime > 0){
		t2 = window.setInterval("getNowFormatDate2()",refreshTime); 
		getNowFormatDate2();
	}else{
		window.clearInterval(t2);
	}
}