var curMenu = null, zTree_Menu = null;
var setting = {
		  view: {
			  showLine: false,
			  showIcon: false,
			  selectedMulti: false,
			  addDiyDom: addDiyDom
		  },
		  data: { 
		    simpleData: { 
		       enable: true ,  
		       idKey:"regionId",
		       pIdKey:"parentId",
		       rootPId:"0"
		      } ,
		      key: {
		      name: "regionName"
		    }
		  },
		  async: {  
		        enable: true,  
		        url: _ctx + "/user/getRegion",  
		        autoParam:["regionId"]
		  }
		};

	var zNodes =[ ];
	
var zTree;

function addDiyDom(treeId, treeNode) {
	var spaceWidth = 7;
	var switchObj = $("#" + treeNode.tId + "_switch");

	if (treeNode.level > 0) {
		var spaceStr = "<span style='display: inline-block;width:" + (spaceWidth * treeNode.level)+ "px'></span>";
		switchObj.before(spaceStr);
	}
}
		
$(function(){
	 $.fn.zTree.init($("#treeDemo"), setting, zNodes);
	 zTree = $.fn.zTree.getZTreeObj("treeDemo");
	 
	 $("#id_confirm").click(function(){
		 var zTree = $.fn.zTree.getZTreeObj("treeDemo");
		 var nodes = zTree.getSelectedNodes();
		 var regionNames = new Array();
		 var x;
		 for(x in nodes){
			 regionNames.push(nodes[x].regionName);
		 }
		 
		 if (window.opener) {
		       window.opener.returnValue = regionNames.join();
		 }else {
		       window.returnValue = regionNames.join();
		 }
		 
		 window.close();
	 });
	 
	 $("#id_return").click(function(){
		if (window.opener) {
		       window.opener.returnValue = "";
		}else {
		       window.returnValue = "";
		}
		 window.close();   
	 });
});




		
		

