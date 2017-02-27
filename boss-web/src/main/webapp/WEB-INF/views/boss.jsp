<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<c:set var="ctx" value="${pageContext.request.contextPath}" />
<%
	String path = request.getContextPath();
	String host = request.getServerName();
	String basePath = request.getScheme()+"://"+host+":"+request.getServerPort()+path+"/";
%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
<meta name="renderer" content="webkit">
<meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
<title>BOSS</title>
	<link rel="stylesheet" id="css_bootstrap" href="${ctx}/boss/vender/bootstrap/css/bootstrap.min.css" type='text/css' />
    <link href="${ctx}/boss/res/css/font-awesome.min.css" id="css_font" rel="stylesheet" type='text/css' />
    <link href="${ctx}/boss/res/css/ionicons.min.css" id="css_icon" rel="stylesheet" type='text/css' />
    <link rel="stylesheet" id="css_lte" href="${ctx}/boss/vender/dist/css/AdminLTE.min.css" type='text/css' />
    <link rel="stylesheet" id="css_lte_skins" href="${ctx}/boss/vender/dist/css/skins/_all-skins.min.css" type='text/css' />
    <link href="${ctx}/boss/vender/pace/pace.min.css" id="css_pace" rel="stylesheet" type='text/css' />
    <link rel="stylesheet" id="css_base" href="${ctx}/boss/res/css/base.css" type='text/css' />
    <script id="js_long" src="${ctx}/boss/js/long.js"></script>
    
		<!--[if lt IE 9]>
			<script src="https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js"></script>
			<script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
		<![endif]-->
	<script type='text/javascript'>
	 		long.global.root = "<%=basePath%>";
	    	long.global.host = "<%=host%>";
			long.global.appname = '${ctx}';
			//请求菜单JSON地址
			long.menu_url = '${ctx}/index/getmenu';
			//母版加载地址
			<%--long.global.master =  '${ctx}/master';--%>
			//加载的首页
			<%--long.startPage = '${ctx}/index/start?_isopen=true';--%>
	</script>
</head>


<body class="hold-transition skin-blue sidebar-mini">
		<!-- 文件列表使用模板 -->
     <div class="table-responsive mailbox-messages" id="export-file-list" style="display:none; padding-bottom:20px;">
         <table class="table table-hover table-striped font-13">
          <thead style="background:#F9F9F9;" >
                    <th>申请时间</th>
					<th>业务名称</th>
					<th>文件名称</th>
					<th>总条数</th>
					<th>进度</th>
					<th>状态</th>
					<th>生成时间</th>
					<th>申请人</th>
					<th>操作</th>
        	 </thead>
             <tbody  id="table_file_list">
             <tr><td colspan="9" ></td></tr>
             </tbody>
         </table>
     </div>
    <div class="wrapper">
        <header class="main-header">
            <span class="logo">
                <span class="logo-mini">
                    <img src="${ctx}/boss/res/image/logo_boss.png" id="logo-mini-img" class="img-circle" alt="User Image" />
            </span>
            <span class="logo-lg">
                    <img src="${ctx}/boss/res/image/logo_boss.png" width="206" height="42" id="logo-lg-img" alt="BOSS" />
            </span>
            </span>
            <nav class="navbar navbar-static-top">
                <a href="javascript:void(0)" title="展开/折叠菜单" class="sidebar-toggle" data-toggle="offcanvas" role="button">
                </a>
                <div id="header-content" style="width: 100%; height: 50px; 1float: left; position: absolute;margin-left:45px; line-height:50px">
                </div>
                <div class="navbar-custom-menu">
                    <ul class="nav navbar-nav">
                        <li class="dropdown messages-menu" style="display:none" id='messages-menu'>
                            <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                                <i class="fa fa-envelope-o"></i>
                                <span class="label label-success">1</span>
                            </a>
                            <ul class="dropdown-menu">
                                <li class="header">你有 1 条消息</li>
                                <li>
                                    <ul class="menu">
                                        <!-- start message -->
                                        <li>
                                            <a href="#">
                                                <div class="pull-left">
                                                    <img src="${ctx}/boss/res/image/admin.png" class="img-circle" alt="User Image">
                                                </div>
                                                <h4>
                                                    物业客服
                                                    <small><i class="fa fa-clock-o"></i> 5 分钟</small>
                                                </h4>
                                                <p>你有一个包裹放在物业中心?</p>
                                            </a>
                                        </li>
                                        <!-- end message -->
                                    </ul>
                                </li>
                                <li class="footer"><a href="javascript:void(0)">查看所有信息</a></li>
                            </ul>
                        </li>
                        <li class="dropdown notifications-menu" id="notice-menu" style="display:none;">
                            <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                                <i class="fa fa-bell-o"></i>
                                <span class="label label-warning">10</span>
                            </a>
                            <ul class="dropdown-menu">
                                <li class="header">你有 10 个系统通知</li>
                                <li>
                                    <!-- Start -->
                                    <ul class="menu">
                                        <li>
                                            <a href="#">
                                                <i class="fa fa-user text-red"></i>测试查看1
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                                <li class="footer"><a href="javascript:void(0)">查看所有</a></li>
                            </ul>
                        </li>
                        <li class="dropdown notifications-menu user user-menu">
                            <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                                <img src="${ctx}/boss/res/image/admin.png" class="user-image" alt="User Image">
                                <span class="hidden-xs">${userName}</span>
                            </a>
                        </li>
                        <%--<li>--%>
                            <%--<a href="javascript:top.location.replace('${ctx}/logout')" id="out-system" title="退出系统"><i class="fa fa-power-off"></i></a>--%>
                        <%--</li>--%>
                        <%--<!-- 设置项 -->--%>
                        <%--<li>--%>
                            <%--<a href="javascript:void(0)" id="setting-control-sidebar" data-toggle="control-sidebar"><i class="fa fa-gears"></i></a>--%>
                        <%--</li>--%>
                    </ul>
                </div>
            </nav>
        </header>
        <aside class="main-sidebar">
            <section class="sidebar">
                <ul class="sidebar-menu" id="long-menu">
                    <li class="header">菜单加载中...</li>
                    <!-- 菜单加载区域 -->
                </ul>
            </section>

        </aside>

        <!-- Content Wrapper. Contains page content -->
        <div class="content-wrapper" style="background-color:#ffffff;">
            <!-- Content Header (Page header) -->
            <section class="content-header">
                <div class="nav-tabs-custom" style="margin-bottom:2px;">
                    <!--此处1设置后子页面没有边框距离-->
                    <ul class="nav nav-tabs" id="long-page-tabs" style="border-bottom:none;">
                        <li class="active" long-mid="tab___START__"><a href="#tab_content___START__" long-mid="__START__" data-toggle="tab">首页</a>
                            <!--<span class="label label-danger" style="position:absolute; top:0px; left:0px; opacity:0.9">1</span>-->
                        </li>

                        <li long-tag-tool='true' class="dropdown pull-right">
                            <a class="dropdown-toggle" data-toggle="dropdown" href="#">
                                操作 <span class="caret"></span>
                            </a>
                            <ul class="dropdown-menu">
                                <li role="presentation">
                                    <a role="menuitem" tabindex="-1" href="javascript:void(0)" onclick="long.close_page()"><i class="fa fa-fw fa-close"></i>关闭当前</a>
                                </li>
                                <li role="presentation">
                                    <a role="menuitem" tabindex="-1" href="javascript:void(0)" onclick="long.close_all_page()"><i class="fa fa-fw fa-circle"></i>关闭所有</a>
                                </li>
                                <!-- <li role="presentation" class="divider"></li>-->
                            </ul>
                        </li>
                    </ul>
                </div>
            </section>

            <!-- Main content -->
            <section class="content" style="padding:2px;">
                <!--此处1设置后子页面没有边框距离-->
                <div class="tab-content" id="long-page-tab-content">
                    <div class="tab-pane active" id="tab_content___START__">
                        <iframe id="long-iframe" name="long-iframe" frameborder="no" border="0" src="" class="long-iframe"></iframe>
                    </div>
                </div>
            </section>
        </div>
        <footer class="main-footer">
            <div class="pull-right hidden-xs">
            </div>
            <div class="pull-right hidden-xs">
            &nbsp;&nbsp;&nbsp;&nbsp;
            </div>
            <strong>Copyright &copy; 2016-09-12 <a href="javascript:void(0)">千丁BOSS</a>.</strong>
        </footer>

        <!-- 侧边工具箱 -->
        <aside class="control-sidebar control-sidebar-dark" id="control-sidebar">
            <ul class="nav nav-tabs nav-justified control-sidebar-tabs">
            </ul>
            <div class="tab-content">
            </div>
        </aside>
        <div class="control-sidebar-bg"></div>
    </div>
	<%--<a href="javascript:void(0)" onclick="window.open('http://form.mikecrm.com/jKOTY0')" class="questionnaire1"  > <i class="fa  fa-close qclose"  onclick="$(this).parent().remove(); long.stopPropagation();" title="点击关闭"></i> 系统问卷调查</a>--%>
    <script id="js_jquery" src="${ctx}/boss/vender/jQuery/jquery-2.2.3.min.js"></script>
    <script id="js_index" src="${ctx}/boss/js/index.js?t=6"></script>
    <script id="js_bootstrap" src="${ctx}/boss/vender/bootstrap/js/bootstrap.min.js"></script>
    <script id="js_app" src="${ctx}/boss/vender/dist/js/app.min.js"></script>
    <script id="js_control-sidebar-skin" src="${ctx}/boss/vender/dist/js/control-sidebar-skin.js"></script>
    <script id="js_pace" src="${ctx}/boss/vender/pace/pace.min.js"></script>
    <script id="js_layer" src="${ctx}/boss/vender/Layui/layer-v3.0.1/layer/layer.js"></script>
</body>
</html>