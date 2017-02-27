//修改版数据 
var  idYhide   ="";// 储存选中的id,分隔开
var  nameYhide =""; //储存选中的name,分隔开
/**修改ztree展示数据的样式*/
var tempdata ={};   // 临时保存的数据
var zNodes = [] ;//创建一个数组 push 添加push
var zTree;
/*,chkboxType :{ "Y" : "", "N" : "" } //Y:勾选（参数：p:影响父节点），N：不勾（参数s：影响子节点）[p 和 s 为参数]
 * 单选-效果代码
*/
var setting = {
		view: {
			selectedMulti: true
		},
		check: {
			enable: true
			,chkStyle: 'checkbox'
		},
		data: {
			simpleData: {
				enable: true 
			} 
		},
		edit: {
			enable: true
		},
		callback: {
			onCheck: onCheckYuan
		}
};

$(function(){
	getMsg();  // 执行数据
	/**添加按钮事件*/
	$("#id_confirm").click(function(){
		if(nameYhide.length ==0 || idYhide.length ==0 ){
			alert("请至少选择一项！")
			return false;
		}
//		alert(nameYhide+","+idYhide);
		var regions = new Array();
		regions[0] = idYhide;
		regions[1] = nameYhide;
		window.opener.document.getElementById("regionName").value=nameYhide;
		window.opener.document.getElementById("regionId").value=idYhide;
//		localStorage.setItem("a1",regions);
//		if (window.opener) {
//			alert("1");
//			alert(regions);
//			window.opener.returnValue = regions;
//		}else {
//			alert("2");
//			window.returnValue = regions;
//		}
		window.close();
	});
	/**添加按钮事件*/
	$("#id_return").click(function(){
//		if (window.opener) {
//			window.opener.returnValue = "";
//		}else {
//			window.returnValue = "";
//		}
		window.opener.document.getElementById("regionName").value="";
		window.opener.document.getElementById("regionId").value="";
		window.close();   
	});	
});
//获取  数据 集
function  getMsg(){
	$.post(_ctx + "/common/getMyRegions", {},
			function (data, textStatus){
		var datas = eval(data);
		for(var i=0;i<datas.length;i++){
			tempdata = {
					"id" : datas[i].id ,
					"pId" : datas[i].parentId  ,
					"name" : datas[i].name 
			};
			zNodes.push(tempdata);	
		} 
		//  绑定数据
		setting.check.enable = true; //多选框没有 颗单独设置
		$.fn.zTree.init($("#treeDemo"), setting, zNodes);   
	}, "json")};


	// 单击事件
	function onCheckYuan(e, treeId, treeNode) {
		idYhide = "";
		nameYhide = "";
		var zTree = $.fn.zTree.getZTreeObj("treeDemo"),
		nodes = zTree.getCheckedNodes(true)
		for (var i=0, l=nodes.length; i<l; i++) {
			idYhide += nodes[i].id + ",";
			nameYhide += nodes[i].name + ",";
		}
		if (nameYhide.length > 0 ) 
			nameYhide = nameYhide.substring(0,nameYhide.length-1);
		if (idYhide.length > 0 ) 
			idYhide = idYhide.substring(0,idYhide.length-1); 
	}

