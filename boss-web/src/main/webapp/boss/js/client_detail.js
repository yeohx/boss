/**
 * Created by QDHL on 2017/2/10.
 */

var showClientDetailInfo = function (clientDetailInfo) {
    var clientDetailObj = JSON.parse(clientDetailInfo);
    var clientName = clientDetailObj["clientName"];
    console.log("client name is " + clientName);
    $("#client_name").val(clientName);
    console.log("show client detail info is " + $("#client_name").val());
}
$(function () {
    $.ajax({
        url: "/client/getclientdetail", type: "GET", data: {"clientId": clientId}, success: function (data) {
            console.log("client detail Info is " + JSON.stringify(data));
            //1.设置页面信息
            showClientDetailInfo(data);
            console.log("p table is " + $('#tb_clients').html());
            console.log("html is " + $('#client_detail').html());
        }
    });
})