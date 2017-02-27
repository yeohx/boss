/**
 * Created by QDHL on 2017/2/8.
 */


$(function () {

    var clientName = $("#clientName").val();
    // console.log("client name is " + clientName);
    var clientInfo = $.ajax({
        url: "/client/getclient", type: "GET", data: {"client": clientName}, success: function (data) {
            // console.log("clientInfo2 is " + JSON.stringify(data));
            //1.初始化Table
            var oTable = new TableInit(data);
            oTable.Init();
        }
    });
    //2.初始化Button的点击事件
    // var oButtonInit = new ButtonInit();
    // oButtonInit.Init();
});


var TableInit = function (clientData) {
    var oTableInit = new Object();
    var clientData = clientData;
    //初始化Table
    oTableInit.Init = function () {

        $('#tb_clients').bootstrapTable({
            url: '/client/getclient',
            columns: [{
                field: 'id',
                title: 'ID'
            }, {
                field: 'clientName',
                title: '客户名称'
            }, {
                field: 'gapId',
                title: 'GAP组织名称'
            }, {

                field: 'operate',

                title: '操作',

                align: 'center',

                events: operateEvents,

                formatter: operateFormatter

            }],
            data: clientData,
        });
    };

    //得到查询的参数
    oTableInit.queryParams = function (params) {
        var temp = { //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
            limit: params.limit, //页面大小
            offset: params.offset, //页码
            departmentname: $("#txt_search_departmentname").val(),
            statu: $("#txt_search_statu").val()
        };
        return temp;
    };
    return oTableInit;
};


var ButtonInit = function () {
    var oInit = new Object();
    var postdata = {};
    oInit.Init = function () {
        //初始化页面上面的按钮事件
        $("#find_client").unbind("click").bind("click", function () {
            var clientName = $("#clientName").val();
            console.log("client name is " + clientName);
            var clientInfo = $.ajax({
                url: "/client/getclient", type: "GET", data: {"client": clientName}, success: function (data) {
                    console.log("clientInfo2 is " + JSON.stringify(data));
                    //清空tables ？？？
                    $('#tb_clients tr').empty();
                    // $('#tb_clients thead').empty();
                    //1.初始化Table
                    var oTable = new TableInit(data);
                    oTable.Init(data);
                }
            });
        });
    };
    return oInit;
};

var findClient = function () {
    var clientName = $("#clientName").val();
    console.log("client name is " + clientName);
    //清空tables ？？？
    $('#tb_clients tbody').empty();
    var clientInfo = $.ajax({
        url: "/client/getclient", type: "GET", data: {"client": clientName}, success: function (data) {
            console.log("button action is " + JSON.stringify(data));
            //1.初始化Table
            var oTable = new TableInit(data);
            oTable.Init(data);
        }
    });
}

function operateFormatter(value, row, index) {
    return [
        '<a class="detail" href="javascript:void(0)" title="详情">',
        '<i class="glyphicon glyphicon-info-sign"></i>',
        '</a>  ',
        '<a class="edit" href="javascript:void(0)" title="编辑">' +
        '<i class="glyphicon glyphicon-pencil"></i>' +
        '</a>',
        '<a class="remove" href="javascript:void(0)" title="删除">',
        '<i class="glyphicon glyphicon-remove"></i>',
        '</a>'
    ].join('');
}

window.operateEvents = {
    'click .detail': function (e, value, row, index) {
        //longp.alert('show client detail : ' + JSON.stringify(row));
        // console.log("click .detail client info is " + JSON.stringify(row));
        var clientObj = JSON.parse(JSON.stringify(row));
        var clientId = clientObj["id"];
        // console.log("click detail client id is " + clientId);
        var clientInfo = $.ajax({
            url: "/client/getclientdetail", type: "GET", data: {"clientId": clientId}, success: function (data) {
                // console.log("client detail Info is " + JSON.stringify(data));
                //1.设置页面信息
                showClientDetailInfo(data);
                // console.log("html is " + $('#client_name').val());
                // console.log("html is " + $('#client_detail').html());
                layer.open({
                    type: 1,
                    content: $("#client_detail").html(), //这里content是一个普通的String
                    success:function(layero, index){
                        layero.find('#client_name').val($('#client_name').val()
                        );
                    }
                });
            }
        });
    },

    'click .edit': function (e, value, row, index) {
        // alert("edit client now row : " + JSON.stringify(row));
        // console.log("click .detail client info is " + JSON.stringify(row));
        var clientObj = JSON.parse(JSON.stringify(row));
        var clientId = clientObj["id"];
        var clientName = clientObj["clientName"];
        // console.log("click detail client id is " + clientId);

        longp.openPage(clientId,"编辑用户"+clientName,'../client/editclient?clientId='+ clientId);
    },

    'click .remove': function (e, value, row, index) {
        $table.bootstrapTable('remove', {
            field: 'id',
            values: [row.id]
        });
    }
};

var showClientDetailInfo = function (clientDetailInfo) {
    var clientDetailObj = JSON.parse(clientDetailInfo);
    var clientName = clientDetailObj['clientName'];
    var productInstance = clientDetailObj['productInstances'];
    var clientRef = clientDetailObj['clientRefs'];
    // console.log("client name is " + clientName);
    $('#client_name').val(clientName);
    // console.log("show client detail info is " + $('#client_name').val());
    $('#productInstance_detail').bootstrapTable({
        columns: [{
            field: 'id',
            title: 'ID'
        }, {
            field: 'name',
            title: '产品名称'
        }, {
            field: 'type',
            title: '计费模式'
        }, {
            field: 'unitPrice',
            title: '单价'
        },{
            field: 'count',
            title: '数量'
        },{
            field: 'createTime',
            title: '有效时间'
        },{
            field: 'createTime',
            title: '开始时间'
        },{
            field: 'endTime',
            title: '结束时间'
        }],
        data: productInstance,
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
        },{
            field: 'state',
            title: '内外部人员'
        }],
        data: clientRef,
    });
}