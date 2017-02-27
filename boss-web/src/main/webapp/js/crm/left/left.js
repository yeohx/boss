$(document).ready(function(){
	var a = new Array();
	var str='';
   $(".l1").toggle(function(){
		
     $(this).next(".slist").slideUp();
   },function(){
	     
		 $(this).next(".slist").slideDown();
   });
   $(".menu  .l2").click(add);

	
   //$(".l2").toggle(function(){
     //$(this).next(".sslist").animate({height: 'toggle', opacity: 'toggle'}, "slow");
   //},function(){
		// $(this).next(".sslist").animate({height: 'toggle', opacity: 'toggle'}, "slow");
   //});
   
  // $(".l2").click(function(){
	//$(".l3").removeClass("currentl3");
	//$(".l2").removeClass("currentl2");
	//$(this).addClass("currentl2");
//	});  
   
   //$(".l3").click(function(){
	//$(".l3").removeClass("currentl3");		  
	//$(this).addClass("currentl3");
	//});  
   
   $(".close").toggle(function(){
	$(".slist").animate({height: 'toggle', opacity: 'hide'}, "fast");  
	$(".sslist").animate({height: 'toggle', opacity: 'hide'}, "fast");  
	 },function(){
	$(".slist").animate({height: 'toggle', opacity: 'show'}, "fast");  
	$(".sslist").animate({height: 'toggle', opacity: 'show'}, "fast");  
	});  
	function add(){
		
	

	}
});
	
	