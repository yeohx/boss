<%--
  Created by IntelliJ IDEA.
  User: QDHL
  Date: 2017/2/9
  Time: 16:09
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>客户详细信息</title>
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
    <div id="client_detail">
        <div>客户名称</div>
        <input id="client_name"/>
        <div>CAP租户</div>
        <input id="gap_id" />
        <div>使用系统</div>
        <table id="productInstance_detail">
            <thead>
            <tr>
                <th>产品名称</th>
                <th>计费模式</th>
                <th>计量单位</th>
                <th>单价</th>
                <th>数量</th>
                <th>有效时间</th>
                <th>开始时间</th>
                <th>结束时间</th>
            </tr>
            </thead>
            <tbody id="productInstance_detail_body">

            </tbody>
        </table>
        <div>
            相关人员
        </div>
        <table id="client_ref_detail">
            <thead>
            <tr>
                <th>角色</th>
                <th>姓名</th>
                <th>电话</th>
                <th>内外部人员</th>
            </tr>
            </thead>
            <tbody id="client_ref_detail_body">

            </tbody>
        </table>
    </div>
</div>
<script id="js_client" src="${ctx}/boss/js/client.js?t=3"></script>
<script id="js_index" src="${ctx}/boss/js/index.js?t=6"></script>
</body>
</html>
