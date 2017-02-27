<%@ page language="java" import="java.util.*" pageEncoding="utf-8" %>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<c:set var="ctx" value="${pageContext.request.contextPath}"/>
<%
    String path = request.getContextPath();
    String host = request.getServerName();
    String basePath = request.getScheme() + "://" + host + ":" + request.getServerPort() + path + "/";
%>
<!DOCTYPE html>
<html>
<head>
    <meta name="viewport" content="width=device-width"/>
    <title>BIll</title>
    <link rel="stylesheet" id="css_bootstrap" href="${ctx}/boss/vender/bootstrap/css/bootstrap.min.css"
          type='text/css'/>
    <script id="js_jquery" src="${ctx}/boss/vender/jQuery/jquery-2.2.3.min.js"></script>
    <script id="js_bootstrap" src="${ctx}/boss/vender/bootstrap/js/bootstrap.min.js"></script>
    <script id="js_long" src="${ctx}/boss/js/long.js"></script>
    <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/bootstrap-table/1.11.0/bootstrap-table.min.css">
    <script src="//cdnjs.cloudflare.com/ajax/libs/bootstrap-table/1.11.0/bootstrap-table.min.js"></script>
    <script src="//cdnjs.cloudflare.com/ajax/libs/bootstrap-table/1.11.0/locale/bootstrap-table-zh-CN.min.js"></script>
    <script id="js_layer" src="${ctx}/boss/vender/Layui/layer-v3.0.1/layer/layer.js"></script>
</head>
<body>
<div>
    <p>租户列表</p>
    <%--<input id="clientName" value="yeohx">--%>
    <%--<button type="button" id="find_client">查询</button>--%>
</div>
<table id="tb_clients"
       data-toolbar="#toolbar"
       data-search="true"
<%--data-show-refresh="true"--%>
<%--data-show-toggle="true"--%>
<%--data-show-columns="true"--%>
       data-show-export="true"
<%--data-detail-view="true"--%>
       data-detail-formatter="detailFormatter"
       data-minimum-count-columns="2"
<%--data-show-pagination-switch="true"--%>
       data-pagination="true"
       data-id-field="id"
<%--data-page-list="[10, 25, 50, 100, ALL]"--%>
       data-show-footer="false"
<%--data-side-pagination="server"--%>
       data-response-handler="responseHandler">
</table>
</div>
<div style="display: none">
        <div id="client_detail">
            <div>客户Id</div>
            <input id="client_id"/>
            <div>客户名称</div>
            <input id="client_name" value="a"/>
            <div>CAP租户</div>
            <input id="gap_id"/>
            <div>使用系统</div>
            <table id="productInstance_detail"
                   data-show-export="true"
                   data-detail-formatter="detailFormatter"
                   data-minimum-count-columns="2"
                   data-id-field="id"
                   data-show-footer="false">
            </table>
            <div>
                相关人员
            </div>
            <table id="client_ref_detail"
                   data-show-export="true"
                   data-detail-formatter="detailFormatter"
                   data-minimum-count-columns="2"
                   data-id-field="id"
                   data-show-footer="false">
            </table>
        </div>
    </div>
</div>
<script id="js_index" src="${ctx}/boss/js/client.js?t=3"></script>
</body>
</html>