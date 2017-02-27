$(function(){
	//查询
	$("#search1").click(function() {
		$(".ban").css({"display":"block"});
	 goPage('searchCriteria', 'dataDiv', 'first');
	
	});
	//报事来源
	function sourceSystem(){
		var inforSourceType = $("#sourceSystem").val();
		$("#sourceSystem").val(inforSourceType);
	}
	
	
});
	
