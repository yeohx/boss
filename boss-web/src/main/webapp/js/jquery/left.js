$(document).ready(function(){
	var a = ["<li><a href='${ctx}/inform/inForm'  target='mainFrame'  >接待查询</a><span class='t-r-cole'><img src='${ctx}/images/cole.png' /></li>"];
	$(window.parent.document).find(".main-right1 ul").html(a);
	$(window.parent.document).find(".main-right1 ul li").click(function(){
			$(this).css({"background":"green"}).siblings("li").css("background","blue");
			$(this).children("a").css("color","#fff");
			$(this).siblings("li").children("a").css({"color":"#fff"});
		}) 
	$(window.parent.document).find(".main-right1 ul li .t-r-cole").click(function(){
		var ind=$(this).parent().index();
		$(this).parent().css("display","none");
		a.splice(ind,1)
		var txt2 = $(window.parent.document).find(".main-right1 ul li").eq(ind+1).children("a").attr("href");
		var txt3= $(window.parent.document).find("#main-right-frame").attr("src",txt2);
		$(this).parent().next().css({"background":"green","color":"#fff"});
		
	})
	var str='';
   $(".l1").toggle(function(){
		
     $(this).next(".slist").slideUp();
   },function(){
	     
		 $(this).next(".slist").slideDown();
});
	$(".menu .l2").click(function(){
//		alert($(".txt").val());
		var span1="<span class='t-r-cole'><img src='${ctx}/images/cole.png' />"				
		var txt = $(this).html();
		var LL="<li>"+txt+""+span1+"</li>";
		
		if(a.indexOf(LL)===-1)
		{	a.push(LL);
			$(window.parent.document).find(".main-right1 ul").html(a);
		}
		$(window.parent.document).find(".main-right1 ul li").click(function(){
			$(this).css({"background":"green"}).siblings("li").css("background","blue");
			$(this).children("a").css("color","#fff");
			
			$(this).siblings("li").children("a").css({"color":"#fff"});
			
		}) 
		$(window.parent.document).find(".main-right1 ul li .t-r-cole").click(function(){
		var ind=$(this).parent().index();
		$(this).parent().css("display","none");
		a.splice(ind,1)
		var txt2 = $(window.parent.document).find(".main-right1 ul li").eq(ind+1).children("a").attr("href");
		var txt3= $(window.parent.document).find("#main-right-frame").attr("src",txt2);
		$(this).parent().siblings().css({"background":"blue","color":"#fff"});
		$(this).parent().next().css({"background":"green","color":"#fff"});
			})
	})
	$(".menu .lt2").click(function(){
//		alert($(".txt").val());
		var span1="<span class='t-r-cole'><img src='${ctx}/images/cole.png' />"				
		var txt = $(this).children("b").html();
		var LL="<li>"+txt+""+span1+"</li>";
		
		if(a.indexOf(LL)===-1)
		{	a.push(LL);
			$(window.parent.document).find(".main-right1 ul").html(a);
		}
		$(window.parent.document).find(".main-right1 ul li").click(function(){
			$(this).css({"background":"green"}).siblings("li").css("background","blue");
			$(this).children("b").css("color","#000");
			$(this).parent().siblings().css({"background":"blue","color":"#fff"});
			$(this).siblings("li").children("b").css({"color":"#fff"});
			
		}) 	
		$(window.parent.document).find(".main-right1 ul li .t-r-cole").click(function(){
		var ind=$(this).parent().index();
		$(this).parent().css("display","none");
		a.splice(ind,1)
		var txt2 = $(window.parent.document).find(".main-right1 ul li").eq(ind+1).children("a").attr("href");
		var txt3= $(window.parent.document).find("#main-right-frame").attr("src",txt2);
		
		$(this).parent().next().css({"background":"green","color":"#fff"});
		
	})
			
	})

})