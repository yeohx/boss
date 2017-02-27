$(function(){
		$(".main-mov").toggle(
			function(){$(".main-left").animate({width:"4%"});
			$(".main-left1").css({"display":"none"});
			$(".main-left2").css({"display":"block"});
			$(".main-right").animate({width:"95%"});
			},
			function(){
				$(".main-left").animate({width:"15%"});
				$(".main-left1").css({"display":"block"});
				$(".main-left2").css({"display":"none"});
				$(".main-right").animate({width:"84%"});
			
			})
		$(".main-left2 li").mouseover(function(){
			$(this).children("b").css({display:"block"})
			
		})
		$(".main-left2 li").mouseleave(function(){
			$(this).children("b").css({display:"none"})
			
		})
		 $(".main-right1 li a").click(function(){
			console.log(123);
		
		 
			 
			 
		 })
		


	})