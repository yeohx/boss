<%--
  Created by IntelliJ IDEA.
  User: QDHL
  Date: 2017/2/10
  Time: 14:38
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
    <script id="js_index" src="${ctx}/boss/js/client_edit.js?t=3"></script>
</head>
<body>
<script>
    $(function () {
        var clientDtoObj = JSON.parse('${clientDto}');
        var clientChildDtos = clientDtoObj["clientChildDtos"];
        var clientRefs = clientDtoObj["clientRefs"];
        var productInstances = clientDtoObj["productInstances"];
//        console.log("clientChildDto is " + JSON.stringify(clientChildDtos));
        console.log("clientRefs is " + JSON.stringify(clientRefs));
//        console.log("productInstances is " + JSON.stringify(productInstances));
        $('#create_product_instance').unbind("click").bind('click', function () {
            //弹出编辑框
//            alert("abc");
            layer.open({
                id: "create_product_instance_id",
                type: 1,
                btn: ["确定", "取消"],
                content: $("#product_instance_create").html(), //这里content是一个普通的String
                yes: function (index, layero) {
                    var productInstance = {};
                    var product_instance_name = $("#create_product_instance_id").find("#product_instance_name").val();
                    var product_instance_pay_type = $("#create_product_instance_id").find("#product_instance_pay_type").val();
                    var product_instance_unit_price = $("#create_product_instance_id").find("#product_instance_unit_price").val();
                    var product_instance_count = $("#create_product_instance_id").find("#product_instance_count").val();
                    productInstance["productName"] = product_instance_name;
                    productInstance["type"] = 1;
                    productInstance["unitPrice"] = product_instance_unit_price;
                    productInstance["count"] = product_instance_count;
                    productInstance["clientId"] = $("#client_id").val();
                    ;
                    productInstance["clientName"] = $("#client_name").val();
                    ;
                    productInstance = JSON.stringify(productInstance);
                    layer.close(index);
                    $.ajax({
                        url: "/client/createproductinstance",
                        type: "POST",
                        data: {"productInstance": productInstance},
                        success: function (data) {
                            console.log("create product instance is " + JSON.stringify(data));
                            $("#productInstance_detail").bootstrapTable('append', {
                                data: data
                            });
                        }
                    });
                }
            });
        });
        $('#create_client_ref').unbind("click").bind('click', function () {
            //弹出编辑框
//            alert("abc");
            layer.open({
                id: "create_client_ref_id",
                type: 1,
                btn: ["确定", "取消"],
                content: $("#client_ref_create").html(), //这里content是一个普通的String
                yes: function (index, layero) {
                    var clientRef = {};
                    var client_ref_role = $("#create_client_ref_id").find("#client_ref_role").val();
                    var client_ref_name = $("#create_client_ref_id").find("#client_ref_name").val();
                    var client_ref_phone = $("#create_client_ref_id").find("#client_ref_phone").val();
                    var client_id = $("#client_id").val();
                    var client_name = $('#client_name').val();
                    clientRef["role"] = client_ref_role;
                    clientRef["name"] = client_ref_name;
                    clientRef["phone"] = client_ref_phone;
                    clientRef["clientId"] = client_id;
                    clientRef["clientName"] = client_name;
                    clientRef = JSON.stringify(clientRef);
                    layer.close(index);
                    $.ajax({
                        url: "/client/createclientref",
                        type: "POST",
                        data: {"clientRef": clientRef},
                        success: function (data) {
                            console.log("create product instance is " + JSON.stringify(data));
                            $("#productInstance_detail").bootstrapTable('append', {
                                data: data
                            });
                        }
                    });
                },
                btn2: function () {
                    console.log("quxiao");
                }
            });
        });
        $('#productInstance_detail').bootstrapTable({
            columns: [{
                field: 'id',
                title: 'ID'
            }, {
                field: 'productName',
                title: '产品名称'
            }, {
                field: 'type',
                title: '计费模式'
            }, {
                field: 'unitPrice',
                title: '单价'
            }, {
                field: 'count',
                title: '数量'
            }, {
                field: 'createTime',
                title: '有效时间'
            }, {
                field: 'createTime',
                title: '开始时间'
            }, {
                field: 'endTime',
                title: '结束时间'
            }, {

                field: 'operate',

                title: '操作',

                align: 'center',

                events: operateEvents,

                formatter: operateFormatter

            }],
            data: productInstances,
        });
        $('#client_ref_detail').bootstrapTable({
            columns: [{
                field: 'id',
                title: 'ID'
            }, {
                field: 'role',
                title: '角色'
            }, {
                field: 'name',
                title: '姓名'
            }, {
                field: 'phone',
                title: '电话'
            }, {
                field: 'state',
                title: '内外部人员'
            }, {
                field: 'operate',
                title: '操作',
                align: 'center',
                events: operateEvents2,
                formatter: operateFormatter
            }],
            data: clientRefs,
        });
    });
    window.operateEvents = {
        'click .remove': function (e, value, row, index) {
            var productInstanceObj = JSON.parse(JSON.stringify(row));
            var productInstanceId = productInstanceObj["id"];
            layer.open({
                content: '确认删除按确定 ; 取消按X',
                yes: function (index, layero) {
                    //do something
                    console.log("close layer");
                    layer.close(index); //如果设定了yes回调，需进行手工关闭
                    //ajax 调用后端删除
                    $.ajax({
                        url: "/client/deleteproductinstance",
                        type: "GET",
                        data: {"productInstanceId": productInstanceId},
                        success: function (data) {
                            console.log("delete is " + JSON.stringify(data));
                            //清空tables ？？？
                            $("#productInstance_detail").bootstrapTable('remove', {
                                field: 'id',
                                values: [row.id]
                            });
                        }
                    });
                }
            });

        }
    };
    window.operateEvents2 = {
        'click .remove': function (e, value, row, index) {
            var clientRefObj = JSON.parse(JSON.stringify(row));
            var clientRefId = clientRefObj["id"];
            layer.open({
                content: '确认删除按确定 ; 取消按X',
                yes: function (index, layero) {
                    //do something
                    console.log("close layer");
                    layer.close(index); //如果设定了yes回调，需进行手工关闭
                    //ajax 调用后端删除
                    $.ajax({
                        url: "/client/deleteclientref",
                        type: "GET",
                        data: {"clientRefId": clientRefId},
                        success: function (data) {
                            console.log("delete is " + JSON.stringify(data));
                            //清空tables ？？？
                            $("#client_ref_detail").bootstrapTable('remove', {
                                field: 'id',
                                values: [row.id]
                            });
                        }
                    });
                }
            });
        },
    };
    function operateFormatter(value, row, index) {
        return [
            '<a class="remove" href="javascript:void(0)" title="删除">',
            '<i class="glyphicon glyphicon-remove"></i>',
            '</a>'
        ].join('');
    }
    ;


</script>
<div>
    <div id="client_edit">
        <div>客户id</div>
        <input id="client_id" value="${clientId}"/>
        <div>客户名称</div>
        <input id="client_name" value="${clientName}"/>
        <div>CAP租户</div>
        <input id="gap_id"/>
        <div>
            <div>使用系统</div>
            <div>
                <button id="create_product_instance">
                    新建
                </button>
            </div>
        </div>

        <%--<div style="max-height:300px;overflow: scroll;">--%>
        <table id="productInstance_detail"
               data-height="300"
               data-show-export="true"
               data-detail-formatter="detailFormatter"
               data-minimum-count-columns="1"
               data-id-field="id"
               data-show-footer="false"
        >
        </table>
        <%--</div>--%>
        <div>
            <div>
                相关人员
            </div>
            <div>
                <button id="create_client_ref">
                    新建
                </button>
            </div>
        </div>

        <table id="client_ref_detail"
               data-height="300"
               data-show-export="true"
               data-detail-formatter="detailFormatter"
               data-minimum-count-columns="1"
               data-id-field="id"
               data-show-footer="false"
        >
        </table>
    </div>
</div>
</div>
<div style="display: none">
    <div id="client_ref_create">
        <div>
            角色
        </div>
        <input id="client_ref_role"/>
        <div>姓名</div>
        <input id="client_ref_name"/>
        <div>电话</div>
        <input id="client_ref_phone"/>
        <div>内外部人员</div>
        <select>
            <option>内部</option>
            <option>外部</option>
        </select>
    </div>
    <div id="product_instance_create">
        <div>产品名称</div>
        <select id="product_instance_name">
            <option>CRM</option>
            <option>FM</option>
        </select>
        <div>计费方式</div>
        <select id="product_instance_pay_type">
            <option>年付费</option>
            <option>整租</option>
        </select>
        <div>单价</div>
        <input id="product_instance_unit_price">
        <div>数量</div>
        <input id="product_instance_count">
        <div>有效时间</div>
        <div>开始计费时间</div>
        <div>结束计费时间</div>
    </div>
</div>
</body>
</html>
