//获取页面ID
function getObject(objectId) {
    if(document.getElementById && document.getElementById(objectId)) {
		return document.getElementById(objectId);
    } else if (document.all && document.all(objectId)) {
		return document.all(objectId);
    } else if (document.layers && document.layers[objectId]) {
		return document.layers[objectId];
    } else {
		return false;
    }
}
//左侧菜单点击后样式及标题文字
var now_id=0;
var curTab=null;
function selectmenu(title,url){
	//打开tab标签
//	var url=$("#"+id).attr('src');
//	var title=$("#"+id).text();
//	if(id.substr(0,4)=="menu"){
//		//菜单展开
//		$("#menu ul li span").find("a").each(function (){
//			var traid=($(this).attr("id"));
//			if(id==$(this).attr("id")){
//				if(getObject("sub"+id).style.display=="none"){
//					$("#"+id).addClass("mover");
//					$("#sub"+id).slideDown("normal");
//				}else{
//					$("#"+id).removeClass("mover");
//					$("#sub"+id).slideUp("normal");
//				}
//			}else{
//				if(getObject("sub"+traid).style.display!="none"){
//					$("#"+traid).removeClass("mover");
//					$("#sub"+traid).slideUp("normal");
//				}
//			}
//		});
//	}else{
//		if(now_id!=0) {
//			getObject(now_id).className='out';
//		}
//		getObject(id).className= 'hover';
//		now_id=id;
//	}
	if(url!=null){
		addTab(title,url);
	}
}
//顶部右侧实时时间
function systime(){
	tabCloseEven();
	$('.systime').timer({format: "yy年mm月dd日 W HH:MM:ss"});
	$('#tabs').tabs({
		width:document.documentElement.clientWidth-216,
		height:document.documentElement.clientHeight-139,
		onSelect:function(title){   
			$.cookie('ttitle', title);
		}
	});
}
//刷新页面后返回首页
window.onunload=function (){
	$.cookie('ttitle', '首页');
	curTab='首页';
}
//打开Tab 
function addTab(title,url){
	if(title!=null&&title!=""){
		if ($('#tabs').tabs('exists', title)){
			$('#tabs').tabs('select', title);
			var currTab = $('#tabs').tabs('getSelected');
			var url = $(currTab.panel('options').content).attr('src');
			if(url != undefined && currTab.panel('options').title != '首页'){
				$('#tabs').tabs('update',{
					tab:currTab
				})
			}
		}else{
			var content = createFrame(url);
			if($('.tabs-inner span').length>20){
				jAlert("标签数不能超过10个！");
			}else{
				$("#tabs").data("addFlag",true);
				$('#tabs').tabs('add',{
					title:title,
					content:content,
					closable:true
				});
				
			}
		}
		tabClose();
	}
}
//创建iframe
function createFrame(url) {
	var s = '<iframe scrolling="auto" frameborder="0" src="'+url+'" style="width:100%;height:100%;"></iframe>';
	return s;
}
function CloseTab(tabtitle){
	$('#tabs').tabs('close',tabtitle);
}
//Tab关闭事件	
function tabClose() {
	/*双击关闭TAB选项卡*/
	$(".tabs-inner").dblclick(function(){
		var subtitle = $(this).children(".tabs-closable").text();
		$('#tabs').tabs('close',subtitle);
	})
	/*为选项卡绑定右键*/
	$(".tabs-inner").bind('contextmenu',function(e){
		$('#mm').menu('show', {
			left: e.pageX,
			top: e.pageY
		});

		var subtitle =$(this).children(".tabs-closable").text();

		$('#mm').data("currtab",subtitle);
		//$('#tabs').tabs('select',subtitle); 这里注释掉去掉右键刷新
		return false;
	});
}		
//绑定右键菜单事件
function tabCloseEven() {
	//刷新
	$('#mm-tabupdate').click(function(){
		var currTab = $('#tabs').tabs('getSelected');
		var url = $(currTab.panel('options').content).attr('src');
		if(url != undefined && currTab.panel('options').title != '首页') {
			$('#tabs').tabs('update',{
				tab:currTab,
				options:{
					content:createFrame(url)
				}
			})
		}
	})
	//关闭当前
	$('#mm-tabclose').click(function(){
		var currtab_title = $('#mm').data("currtab");
		$('#tabs').tabs('close',currtab_title);
	})
	//全部关闭
	$('#mm-tabcloseall').click(function(){
		$('.tabs-inner span').each(function(i,n){
			var t = $(n).text();
			if(t != '首页') {
				$('#tabs').tabs('close',t);
			}
		});
	});
	//关闭除当前之外的TAB
	$('#mm-tabcloseother').click(function(){
		var prevall = $('.tabs-selected').prevAll();
		var nextall = $('.tabs-selected').nextAll();		
		if(prevall.length>0){
			prevall.each(function(i,n){
				var t=$('a:eq(0) span',$(n)).text();
				if(t != '首页') {
					$('#tabs').tabs('close',t);
				}
			});
		}
		if(nextall.length>0) {
			nextall.each(function(i,n){
				var t=$('a:eq(0) span',$(n)).text();
				if(t != '首页') {
					$('#tabs').tabs('close',t);
				}
			});
		}
		return false;
	});
	//关闭当前右侧的TAB
	$('#mm-tabcloseright').click(function(){
		var nextall = $('.tabs-selected').nextAll();
		if(nextall.length==0){
			//msgShow('系统提示','后边没有啦~~','error');
			jAlert('后边没有啦~~');
			return false;
		}
		nextall.each(function(i,n){
			var t=$('a:eq(0) span',$(n)).text();
			if(t != '首页') {
				$('#tabs').tabs('close',t);
			}
		});
		return false;
	});
	//关闭当前左侧的TAB
	$('#mm-tabcloseleft').click(function(){
		var prevall = $('.tabs-selected').prevAll();
		if(prevall.length==0){
			jAlert('到头了，前边没有啦~~');
			return false;
		}
		prevall.each(function(i,n){
			var t=$('a:eq(0) span',$(n)).text();
			if(t != '首页') {
				$('#tabs').tabs('close',t);
			}
		});
		return false;
	});

	//退出
	$("#mm-exit").click(function(){
		$('#mm').menu('hide');
	})
}
//显示隐藏左侧菜单
function showmenu(){
	curTab=$.cookie('ttitle');
	if(getObject("menu").style.display=="none"){
		getObject("menu").style.display="block";
		getObject("split").style.left="209px";
		$("#split div").removeClass("show");
		$("#split div").addClass("hide");
		getObject("content").style.left="216px";
		getObject("content").style.width=document.documentElement.clientWidth-216+"px";
		var width=document.documentElement.clientWidth-216;
		$("#tabs").css("width",width);
		$("#tabs .tabs-header").css("width",width);
		$("#tabs .tabs-panels").css("width",width);
		$("#tabs .panel").css("width",width);
		$("#tabs .panel>div").css("width",width);
		
		//$('#tabs').tabs({
			//width:document.documentElement.clientWidth-216,
			//height:document.documentElement.clientHeight-139
		//});
	}else{
		getObject("menu").style.display="none";
		getObject("split").style.left="0px";
		$("#split div").removeClass("hide");
		$("#split div").addClass("show");
		getObject("content").style.left="7px";
		getObject("content").style.width=document.documentElement.clientWidth-7+"px";
		
		var width=document.documentElement.clientWidth-7;
		$("#tabs").css("width",width);
		$("#tabs .tabs-header").css("width",width);
		$("#tabs .tabs-panels").css("width",width);
		$("#tabs .panel").css("width",width);
		$("#tabs .panel>div").css("width",width);
		
		//$('#tabs').tabs({
			//width:document.documentElement.clientWidth-7,
			//height:document.documentElement.clientHeight-139
		//});
	}
	//addTab(curTab);
}

//页面自适应宽高度
function fixlayout(){	
	try{
		curTab=$.cookie('ttitle');
		if(document.documentElement.clientWidth<1003){
			window.resizeTo(1032,746);
			if(getObject("menu").style.display=="none"){
				getObject("content").style.width=1003-7+"px";
				$('#tabs').tabs({
					width:1003-7,
					height:document.documentElement.clientHeight-139
				});
			}else{
				getObject("content").style.width=1003-216+"px";
				$('#tabs').tabs({
					width:1003-216,
					height:document.documentElement.clientHeight-139
				});
			}
			getObject("content").style.height=document.documentElement.clientHeight-119+"px";
			getObject("menu").style.height=document.documentElement.clientHeight-119+"px";
			getObject("split").style.height=document.documentElement.clientHeight-119+"px";
		}else{
			if(getObject("menu").style.display=="none"){
				getObject("content").style.width=document.documentElement.clientWidth-7+"px";
				$('#tabs').tabs({
					width:document.documentElement.clientWidth-7,
					height:document.documentElement.clientHeight-139
				});
			}else{
				getObject("content").style.width=document.documentElement.clientWidth-216+"px";
				$('#tabs').tabs({
					width:document.documentElement.clientWidth-216,
					height:document.documentElement.clientHeight-139
				});
			}
			getObject("content").style.height=document.documentElement.clientHeight-119+"px";
			getObject("menu").style.height=document.documentElement.clientHeight-119+"px";
			getObject("split").style.height=document.documentElement.clientHeight-119+"px";
		}
		addTab(curTab);
	}catch(e){
	}
}

if (document.addEventListener)
	window.addEventListener("resize",fixlayout,false);
if (document.attachEvent)
	window.attachEvent("onresize",fixlayout);
//页面屏蔽js错误
function ResumeError() { 
	return true; 
} 
//window.onerror=ResumeError;
top.addTab = addTab;
top.closeTab = CloseTab;