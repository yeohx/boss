/*********************************!
 * index.js
 * 
 * Version: 1.1.0
 *
 * Copyright 2016-09-30
 * author:wanglu
 *********************************/
//请求菜单地址
//long.menu_url = 'http://localhost/WebMsgqueue/LongMenu/GetMenuProject';
$(function() {
    "use strict";
    if (typeof layer != "undefined") {
        long.layer = layer;
    }
    if (typeof Pace != "undefined") {
        long.Pace = Pace;
    }
    if (typeof jQuery != "undefined") {
        long.$ = long.jQuery = jQuery;
    }
    //附加给jQuery对象
    //$.long = long;
    var index = {};
    if (!window.index) {
        index = window.index = {};
    }
    //缓存页面操作需要的jquery对象
    window.$data = index.data = {
            pageContent: $("#long-page-tab-content"),
            pageTab: $('#long-page-tabs'),
            menu: $("#long-menu")
        }
        //子菜单递归算法
    long.calculate_childs_menu = function(json) {
            var _menu_child_ = '<ul class="treeview-menu">';
            for (var i = 0; i < json.length; i++) {
                json[i].mid = json[i].mid || (long.timestamp() + long.rands(5));
                json[i].icon = json[i].icon || 'fa fa-circle-o';
                json[i].url = json[i].url || 'javascript:void(0)';
                _menu_child_ += '<li><a href="javascript:void(0)" long-mid = "{4}" long-url="{3}"><i class="{0}"></i><span>{1}</span>{2}</a>'
                    .format(json[i].icon,
                        json[i].text,
                        (json[i].childs && json[i].childs.length > 0) ? '<span class="pull-right-container"><i class="fa fa-angle-left pull-right"></i></span>' : '',
                        json[i].url,
                        json[i].mid);
                if (json[i].childs && json[i].childs.length > 0) {
                    _menu_child_ += long.calculate_childs_menu(json[i].childs);
                }
                _menu_child_ += '</li>';
            }
            _menu_child_ += '</ul>';
            return _menu_child_;
        }
        //菜单递归算法，内部调用子菜单算法
    long.calculate_menu = function(json) {
            var _menu_ = '';
            for (var i = 0; i < json.length; i++) {
                json[i].url = json[i].url || 'javascript:void(0)';
                json[i].icon = json[i].icon || 'fa-folder';
                json[i].mid = json[i].mid || (long.timestamp() + long.rands(5));
                if (json[i].header) {
                    _menu_ += '<li class="header" long-start="{1}">{0}</li>'.format(json[i].header, json[i].url);
                }
                if (json[i].menus && json[i].menus.length > 0) {
                    for (var j = 0; j < json[i].menus.length; j++) {
                        var item = json[i].menus[j];
                        item.url = item.url || 'javascript:void(0)';
                        _menu_ += '<li class="treeview">';
                        _menu_ += '<a href="javascript:void(0)" long-mid="{1}" long-url="{0}">'.format(item.url, item.mid);
                        //_menu_ += '<i class="{0}"></i> <span>{1}</span>'.format(item.icon, item.text);
                        //START_此处是为了适配CRM老的icon设置
                        item.icon = item.icon||"";
                        /*if(item.icon.length > 0 && item.icon.indexOf('<') >= 0){
                        	var icon_match = item.icon.match( /class ?= ?"(.*?)"/);
                        	if(icon_match != null && icon_match.length > 0)
                        		item.icon = icon_match[1];
                        	if(item.icon == 'icon iconfont')
                        		item.icon = 'fa fa-th';
                        }*/
                        //END__
                        _menu_ += '<i class="{0}"></i> <span>{1}</span>'.format(item.icon, item.text);
                        if (item.childs && item.childs.length > 0) {
                            _menu_ += '<span class="pull-right-container">';
                            _menu_ += '<i class="fa fa-angle-left pull-right"></i>';
                            _menu_ += '</span>';
                        }
                        _menu_ += '</a>';
                        if (item.childs && item.childs.length > 0) {
                            _menu_ += long.calculate_childs_menu(item.childs);
                        }
                        _menu_ += '</li>';
                    }
                }
            }
            return _menu_;
        }
        //打开一个菜单
    long.open_page = long.openPage = function(mid, text, url) {
            try {
                var $tag = $data.pageTab.find('li');
                var $current = $tag.siblings('[long-mid=tab_' + mid + ']');
                //$(this).find('span:first').text(),$(this).attr('long-url')
                if (!text || !url) {
                    var _menu = $data.menu.find('a[long-mid=' + mid + ']');
                    if (_menu.size() <= 0 && $current.size() <= 0) {
                        alert('无法打开页面![' + mid + ']');
                        return;
                    }
                    text = _menu.find('span:first').text();
                    url = _menu.attr('long-url');
                }
                /*if(url){
	                if(url.indexOf(long.global.appname) < 0 && url.indexOf('http://') != 0)
	                	url = long.global.appname +url;
	                //地址后面带?_isopen=true将不会在母版页里渲染出来
	                if(url.indexOf('_isopen')<0){
		                url = long.global.master + "?page="+ url;
	                }
                }*/
                //移除活动项
                $tag.siblings('.active').removeClass('active');
                $data.pageContent.find('.active').removeClass('active');
                //说明已经存在此标签
                if ($current.size() > 0) {
                    $current.addClass('active');
                    $data.pageContent.find("#tab_content_" + mid).addClass('active');
                    index.Page_Current($data.pageContent.find("#tab_content_" + mid).find("iframe")[0]);
                } else {
                    var first_tool = $tag.siblings("[long-tag-tool=true]");
                    if (first_tool.size() > 0) {
                        first_tool.first().before('<li class="active" long-mid="tab_{0}"><a href="#tab_content_{0}" data-toggle="tab"><span>{1}<span></a><i class="fa fa-fw fa-remove page-close" onclick="long.close_page(\'{0}\')" title="关闭"></i></li>'.format(mid, text));
                        $data.pageContent.append('<div class="tab-pane active" id="tab_content_{0}"><iframe onload="long.setIframeHeight(this)" id="long-iframe_{0}" long-url="{1}" long-mid="{0}" long-text="{2}" name="long-iframe_{0}" frameborder="no" border="0" src="{1}" class="long-iframe"></iframe></div>'
                            .format(mid, url, text));
                        Pace.restart();
                    }
                }
            } catch (e) {
                long.log("open_page:" + e);
            }
        }
        //当前活动页，JQuery对象的iframe
    long.currentIframe = function() {
            return $data.pageContent.find('.active').find('iframe');
        }
        //当前活动页Tab，JQuery对象的iframe
    long.currentTab = function() {
            return $data.pageTab.find('.active');
        }
        //设置当前页面没有边距
    long.pageContentPaddingNone = function(mid) {
        var frame_content = $data.pageContent.find("#tab_content_" + mid);
        if (frame_content.size() > 0)
            frame_content.css({ 'margin': '-15px' });
    }
    index.current_mid = '';
    index.Page_Current = function(iframe, isload) {
        try {
            isload = isload || false;
            var mid = iframe.getAttribute('long-mid');
            if (index.current_mid == mid) return false;
            else index.current_mid = mid;
            if ((iframe.contentWindow.Page_Current && typeof(iframe.contentWindow.Page_Current) == "function") ||
                (iframe.contentWindow.long && iframe.contentWindow.long.Page_Current && typeof(iframe.contentWindow.long.Page_Current) == "function")) {
                var text = iframe.getAttribute('long-text');
                var url = iframe.getAttribute('long-url');
                var _return = undefined;
                if (iframe.contentWindow.Page_Current)
                    _return = iframe.contentWindow.Page_Current(mid, text, url, isload);
                else
                    _return = iframe.contentWindow.long.Page_Current(mid, text, url, isload);
                if (_return == undefined) _return = true;
                return _return;
            }
        } catch (e) {
            long.log(e)
        }
    }
    index.Page_Close = function(iframe) {
            try {
                if ((iframe.contentWindow.Page_Close && typeof(iframe.contentWindow.Page_Close) == "function") ||
                    (iframe.contentWindow.long && iframe.contentWindow.long.Page_Close && typeof(iframe.contentWindow.long.Page_Close) == "function")) {
                    var mid = iframe.getAttribute('long-mid');
                    var text = iframe.getAttribute('long-text');
                    var url = iframe.getAttribute('long-url');
                    var _return = undefined;
                    if (iframe.contentWindow.Page_Close)
                        _return = iframe.contentWindow.Page_Close(mid, text, url);
                    else
                        _return = iframe.contentWindow.long.Page_Close(mid, text, url);
                    if (_return == undefined) _return = true;
                    return _return;
                }

            } catch (e) {
                long.log(e)
            }
            return true;
        }
        //子页面加载完成执行子页面事件
    index.Page_OnLoad = function(iframe) {
        try {
            if ((iframe.contentWindow.Page_OnLoad && typeof(iframe.contentWindow.Page_OnLoad) == "function") ||
                (iframe.contentWindow.long && iframe.contentWindow.long.Page_OnLoad && typeof(iframe.contentWindow.long.Page_OnLoad) == "function")) {
                var mid = iframe.getAttribute('long-mid');
                var text = iframe.getAttribute('long-text');
                var url = iframe.getAttribute('long-url');
                var _return = undefined;
                if (iframe.contentWindow.Page_OnLoad)
                    _return = iframe.contentWindow.Page_OnLoad(mid, text, url);
                else
                    _return = iframe.contentWindow.long.Page_OnLoad(mid, text, url);
                if (_return == undefined) _return = true;
                return _return;
            }

        } catch (e) {
            long.log(e)
        }
    }

    //子页面加载完成执行子页面事件
    index.Page_ChangeSkin = function(skin) {
        try {
            $data.pageContent.find('iframe').each(function() {
                var iframe = $(this)[0];
                if ((iframe.contentWindow.Page_ChangeSkin && typeof(iframe.contentWindow.Page_ChangeSkin) == "function") ||
                    (iframe.contentWindow.long && iframe.contentWindow.long.Page_ChangeSkin && typeof(iframe.contentWindow.long.Page_ChangeSkin) == "function")) {
                    var _return = undefined;
                    if (iframe.contentWindow.Page_ChangeSkin)
                        _return = iframe.contentWindow.Page_ChangeSkin(skin);
                    else
                        _return = iframe.contentWindow.long.Page_ChangeSkin(skin);
                    if (_return == undefined) _return = true;
                    return _return;
                }
            });

        } catch (e) {
            long.log(e)
        }
    }

    //long.currentIframe();
    //自设置iframe加载后高度
    long.setIframeHeight = function(iframe) {
        try {
            if (iframe) {
                index.Page_OnLoad(iframe);
                index.Page_Current(iframe, true);
                var iframeWin = iframe.contentWindow || iframe.contentDocument.parentWindow;
                if (iframeWin.document.body) {
                    iframe.height = iframeWin.document.documentElement.scrollHeight || iframeWin.document.body.scrollHeight;
                    $(iframe).css('height', iframe.height);
                }
            }
        } catch (e) {
            try {
                long.log('setIframeHeight设置自动高度:' + e);
                $("#" + iframe.name).load(function() {
                    var mainheight = $(this).contents().find("body").height() + 30;
                    $(this).height(mainheight);
                });
            } catch (ex) {
                long.log('setIframeHeight设置自动高度2:' + ex);
            }
        }
    }
    long.set_iframe_height = function(name, val) {
            try {
                var iframe = $(document.getElementsByName(name));
                if (iframe.size() > 0) {
                    iframe.height(val);
                } else long.log('没找到iframe');
            } catch (e) {
                long.log('set_iframe_height设置自动高度:' + e);
            }
        }
        //关闭菜单|没有传递mid就是当前活动项mid
    long.close_page = function(mid) {
        if (!mid) {
            mid = $data.pageTab.find('li.active').attr('long-mid').replace('tab_', '');
            if (mid == '__START__') return;
        }
        var tab = $data.pageTab.find('li[long-mid=tab_' + mid + ']');
        if (tab.size() <= 0) return;
        var pageContent = $data.pageContent.find("#tab_content_" + mid);
        if (index.Page_Close(pageContent.find("iframe")[0])) {
            if (tab.hasClass('active')) long.open_page('__START__');
            tab.remove();
            pageContent.remove();
        }
    }
    long.close_all_page = function() {
        $data.pageTab.find('li').each(function() {
            var mid = $(this).attr('long-mid');
            if (mid != undefined && mid != 'tab___START__') {
                long.close_page(mid.replace('tab_', ''));
            }
        })
    }

    //渲染菜单
    long.render_menu = function(json) {
            document.getElementById('long-menu').innerHTML = long.calculate_menu(json);
            $data.menu.find("a").each(function() {
                var _url = $(this).attr('long-url');
                var _mid = $(this).attr('long-mid');
                if (_url != undefined && _url != 'javascript:void(0)') {
                    $(this).unbind("click").bind("click", function() {
                        long.open_page($(this).attr('long-mid'), $(this).find('span:first').text(), long.setQs($(this).attr('long-url'), '_t', long.timestamp()));
                    });
                }
            });
            //给标签页添加一个单击事件，使之触发Page_Current事件
            $(document).on('click', '#long-page-tabs li[long-mid]', function(e) {
                index.Page_Current($data.pageContent.find("#tab_content_" + $(this).attr('long-mid').replace('tab_', '')).find("iframe")[0])
            });
            var start_url = $data.menu.find("li.header").first().attr('long-start');
            if (start_url && start_url != 'javascript:void(0)') {
                start_url = long.setQs(start_url, 'start', true);
                //渲染首页
                $("#long-iframe").attr({ 'long-url': start_url, 'long-text': '首页', 'long-mid': '__START__', 'src': start_url }).load(function() {
                    long.setIframeHeight($(this)[0])
                });
            } else {
                $('#tab_content___START__').hide();
                $data.pageTab.find('a[href="#tab_content___START__"]').hide();
            }
        }
        //渲染菜单
        //long.render_menu(long.test_menu_data) 
        //http://localhost/LonghuUI/js/model/menu.json
        //http://localhost/WebMsgqueue/LongMenu/GetMenuProject
    $.post(long.menu_url, function(data) {
        //data = eval('('+data+')');
        // Alert(JSON.stringify(data));
        // console.log("data is " ,data);
        if (typeof data == 'string') data = eval('(' + data + ')');
        if(long.startPage){
        	data[0].url = long.startPage;
        }
        long.render_menu(data);
        //判断URL是否有参数打开
        setTimeout(function() {
            try {
                var _mid = long.getQs(window.location.href, "_m"); //mid
                var _url = long.getQs(window.location.href, "_u"); //地址
                if (_mid != null) {
                    var _mids = _mid.split(',');
                    for (var i = 0; i <= _mids.length; i++) {
                        if (_mids[i] != undefined && _mids[i] != '')
                            long.open_page(_mids[i]);
                    }

                }
                if (_url != null) {
                    var _text = long.getQs(window.location.href, "_t"); //通过地址打开的文本
                    if (_text == null) _text = '新页面';
                    long.open_page("", _text, _url);
                }
            } catch (e) {
                long.log(e);
            }
        }, 500)
    }).error(function(d) {
        alert(d.responseText, "请求菜单发生错误"); //status:404,statusText:'Not Found'
    });

    // long.render_menu($.parseJSON('[{"headerName":"CRM系统","menus":[{"childs":[{"icon":"","mid":"002","text":"工作台","url":""},{"icon":"","mid":"001","text":"接待工作台","url":"/inform/inFormWorkbench"},{"icon":"","mid":"002","text":"工单工作台","url":"/work/workSite"},{"icon":"","mid":"003","text":"快速工单工作台","url":"/work/toQuickWork"},{"icon":"","mid":"004","text":"差评工作台","url":"/work/queryBadComment"},{"icon":"","mid":"005","text":"秩序工作台","url":"/work/toOrderUse"}],"mid":"104003","text":"临时菜单"},{"childs":[{"icon":"","mid":"003","text":"工单创建","url":""},{"icon":"","mid":"001","text":"业主房间报事","url":"/work/ownerHousesWork"},{"icon":"","mid":"002","text":"业主公区报事","url":"/work/ownerWork"},{"icon":"","mid":"003","text":"自检房间报事","url":"/work/work?relType=2"},{"icon":"","mid":"004","text":"自检公区报事","url":"/work/work?relType=1"}],"mid":"104004","text":"临时菜单"},{"childs":[{"icon":"","mid":"004","text":"数据查询","url":""},{"icon":"","mid":"001","text":"接待查询","url":"/inform/inForm"},{"icon":"","mid":"002","text":"工单查询","url":"/work/queryWork"}],"mid":"104005","text":"临时菜单"},{"childs":[{"icon":"","mid":"007","text":"基础信息","url":""},{"icon":"","mid":"001","text":"业主画像","url":"/ptal/frame"}],"mid":"104006","text":"临时菜单"},{"childs":[{"icon":"","mid":"010","text":"帮助中心","url":""},{"icon":"url","mid":"001","text":"CRM帮助","url":"http://list.youku.com/albumlist/show?id=27441931&ascending=1&page=1"},{"icon":"url","mid":"002","text":"管家端帮助","url":"http://list.youku.com/albumlist/show?id=27366211&ascending=1&page=1"}],"mid":"104009","text":"临时菜单"}],"startUrl":""}]'));

	

    //自定义页面上的一些功能		    
    long.loading_file_list = function(){
    	 $.ajax({
				url:long.global.appname+"/work/getExreport",
				type:"post",
				datatype:"json",
				success:function(data){
					var tr = "";
					$("#table_file_list").html('');
					$.each(data,function(i,port){
						tr+='<tr align="center">'+
						'<td>'+port.applyAtTime+'</td>'+
						'<td>'+port.businessName+'</td>'+
						'<td>'+port.fileName+'</td>'+
						'<td>'+(port.totalSize==null?'':port.totalSize)+'</td>'+
						'<td>'+(port.progress==null?0:port.progress)+'</td>'+
						'<td>'+(port.status==0?"生成中":(port.status==1?"生成成功":"生成失败"))+'</td>'+
						'<td>'+(port.createAtTime!=null?port.createAtTime:"")+'</td>'+
						'<td>'+port.applyBy+'</td>'+
						'<td>'+(port.status==1?'<a download="" href="'+long.global.appname+'/work/download?fileName='+port.loadLink+'" target="blank" id="downPdf">下载</a> ':'')+'</td>'+
						'</tr>';
					});
					$("#table_file_list").html(tr.length > 0?tr:'<tr><td colspan="9" align="center">当前没有可下载文件</td></tr>');									
				}
			});
    }
    //文件列表刷新函数
    var loading_file_list_time = null;
    long.open_file_list = function(){
		  var layer_width = '80%';
	        if(document.body.clientWidth < 768){
	            layer_width = '95%';
	        }
			layer.open({
			   //btn: ['确定', '取消'],
			   type: 1,
			   //offset: '20%',
			   maxmin: true,
			   area:[layer_width,'80%'],
			   title: '文件导出列表',
			   //skin: 'layui-layer-lan',
			   moveOut: true,
			   content: $('#export-file-list'),
			   yes: function (index, layero) {
				   
			   }, btn2: function (index, layero) {
			
			   }, success: function (layero, index) {
			       //layero.find('input:first').focus();
			       $("#table_file_list").html('<tr><td colspan="9" align="center"><i class="fa fa-spin fa-refresh"></i> 数据加载中...</td></tr>');
			       loading_file_list_time = window.setInterval("long.loading_file_list()",6000);
			       long.loading_file_list();
			   },end:function(){
				   if(loading_file_list_time){
					   clearInterval(loading_file_list_time);
				   }
               }
			});
    }
});
!(function() {
    long.MenuNotice = function(mid) {
        this.mid = mid;
        this.color = '#0073b7';
        this.content = 1;
        this.title = '';
        var htmls = '';
        this.add = function(id, content, color, title) {
            title = title || this.title;
            id = id || '';
            if (title != '') {
                title = 'title="' + title + '"';
            } else if (this.title != '') title = this.title = ' title="' + this.title + '" ';
            if (color == "red") color = '#dd4b39';
            else if (color == "blue") color = '#0073b7';
            else if (color == "yellow") color = '#f39c12';
            else if (color == "green") color = '#00a65a';
            if (id != '') {
                var item = $('#long-menu').find('a[long-mid=' + mid + ']');
                if (item.size() > 0) {
                    if (item.find('small[id=' + id + ']').size() > 0) item.find('small[id=' + id + ']').remove();
                }
            }
            htmls += '<small class="label pull-right" id="{3}" {2} style="background-color:{0} !important">{1}</small>'.format(color, content, title, id);
        }
        this.render = function() {
            var item = $('#long-menu').find('a[long-mid=' + mid + ']');
            if (item.size() > 0) {
                item.append(htmls);
            } else {
                long.log('没找到' + mid);
            }
        }
    }
    long.ClearMenuNotice = function(mid) {
            var item = $('#long-menu').find('a[long-mid=' + mid + ']');
            if (item.size() > 0) {
                item.find('small').remove();
            } else {
                long.log('没找到' + mid);
            }
        }
        //底部添加项|type,1向左，0向右，默认0
    long.FooterTool = function(id, content, type) {
            this.type = type || 0;
            this.content = content || '';
            this.id = id || '';
            this.render = function() {
                var footer = $('.main-footer');
                if (id != '') {
                    if (footer.find('div[id=' + id + ']').size() > 0) footer.find('div[id=' + id + ']').remove();
                }
                var $con = $('<div class="{1}" id="{3}" style="{2}">{0}</div>'.format('', type == 1 ? 'pull-left' : 'pull-right', type == 1 ? 'margin-left:4px' : 'margin-right:4px', id))
                $con.append(this.content);
                footer.append($con);
            }
            return this;
        }
        //信息接口
    long.HideMessage = function() {
        $('#messages-menu').hide();
    }
    long.Message = function(setting) {
            var json = {
                number: 0,
                label: 'label-success',
                header: '你有 {0} 条消息',
                list: [], //{title:'标题',content:'我是内容',time:'5 分钟',img:'res/image/admin.png',bind:false,data:'2323'}
                footer: '查看所有信息',
                footerBind: false
            }
            json = $.extend(json, setting);
            var $msg = $('#messages-menu').show();
            $msg.find('.label').removeClass('label-success').addClass(json.label).text(json.number);
            $msg.find('.header').text(json.header.format(json.number));
            $msg.find('.footer>a').html(json.footer);
            if (json.footerBind)
                $msg.find('.footer>a').bind(json.footerBind);
            if (json.list && json.list.length > 0) {
                $msg.find('.menu').empty();
                for (var i = 0; i < json.list.length; i++) {
                    var li = $('<li>')
                    $msg.find('.menu').append(li);
                    var a = $('<a href="javascript:void(0)">');
                    li.append(a);
                    if (json.list[i].data) {
                        a.attr('data', json.list[i].data);
                    }
                    if (json.list[i].bind) {
                        a.bind(json.list[i].bind);
                    }
                    if (json.list[i].img) {
                        a.append('<div class="pull-left"><img src="{0}" class="img-circle" alt=""></div>'.format(json.list[i].img));
                    }
                    a.append(function() {
                        var css = "";
                        if (!json.list[i].img)
                            css = " style='margin-left:2px;' ";
                        return '<h4{0}>'.format(css) + json.list[i].title +
                            (json.list[i].time ? ('<small><i class="fa fa-clock-o"></i> ' + json.list[i].time + '</small>') : '') +
                            '</h4>' +
                            '<p{0}>'.format(css) + json.list[i].content + '</p>';
                    })
                }
            }
        }
        //通知插件
    long.HideNotice = function() {
        $('#notice-menu').hide();
    }
    long.Notice = function(setting) {
            var json = {
                    number: 0,
                    label: 'label-success',
                    header: '你有 {0} 个系统通知',
                    list: [], //{content:'我是内容',time:'5 分钟',icon:'fa-users text-aqua',bind:false,data:'2323'}
                    footer: '查看所有信息',
                    footerBind: false
                }
                /*list.icon
                 * fa-users text-aqua
                 * fa-warning text-yellow
                 * fa-users text-red
                 * fa-shopping-cart text-green
                 * fa-user text-red
                 */
            json = $.extend(json, setting);
            var $msg = $('#notice-menu').show();
            $msg.find('.label').removeClass('label-success').addClass(json.label).text(json.number);
            $msg.find('.header').text(json.header.format(json.number));
            $msg.find('.footer>a').html(json.footer);
            if (json.footerBind)
                $msg.find('.footer>a').bind(json.footerBind);
            if (json.list && json.list.length > 0) {
                $msg.find('.menu').empty();
                for (var i = 0; i < json.list.length; i++) {
                    var li = $('<li>')
                    $msg.find('.menu').append(li);
                    var a = $('<a href="javascript:void(0)">');
                    li.append(a);
                    if (json.list[i].data) {
                        a.attr('data', json.list[i].data);
                    }
                    if (json.list[i].bind) {
                        a.bind(json.list[i].bind);
                    }
                    if (json.list[i].icon) {
                        a.append('<i class="fa {0}"></i> '.format(json.list[i].icon));
                    }
                    a.append(json.list[i].content);
                }
            }
        }
        //任务接口
    long.HideTasks = function() {
        $('#tasks-menu').hide();
    }
    long.Tasks = function(setting) {
            var json = {
                    number: 0,
                    label: 'label-success',
                    header: '你有 {0} 个任务',
                    list: [], //{content:'我是内容',percent:'50%',progress:'progress-bar-yellow',bind:false,data:'2323'}
                    footer: '查看所有任务',
                    footerBind: false
                }
                /*list.icon
                 * progress-bar-aqua
                 * progress-bar-green
                 * progress-bar-red
                 * progress-bar-yellow
                 */
            json = $.extend(json, setting);
            var $msg = $('#tasks-menu').show();
            $msg.find('.label').removeClass('label-success').addClass(json.label).text(json.number);
            $msg.find('.header').text(json.header.format(json.number));
            $msg.find('.footer>a').html(json.footer);
            if (json.footerBind)
                $msg.find('.footer>a').bind(json.footerBind);
            if (json.list && json.list.length > 0) {
                $msg.find('.menu').empty();
                for (var i = 0; i < json.list.length; i++) {
                    var li = $('<li>')
                    $msg.find('.menu').append(li);
                    var a = $('<a href="javascript:void(0)">');
                    li.append(a);
                    if (json.list[i].data) {
                        a.attr('data', json.list[i].data);
                    }
                    if (json.list[i].bind) {
                        a.bind(json.list[i].bind);
                    }
                    a.append('<h3>{0}<small class="pull-right">{1}</small></h3>'.format(json.list[i].content || '', json.list[i].percent || ''));
                    if (json.list[i].progress) {
                        a.append(('<div class="progress xs">' +
                            '<div class="progress-bar {1}" style="width: {0}" role="progressbar" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100">' +
                            '<span class="sr-only">{0} 完成</span></div></div>').format(json.list[i].percent, json.list[i].progress))
                    }
                }
            }
        }
        //[{id:'id1',text:'',bind:false,icon,type:0 }],1代表横线
    long.TagTool = function(json) {
            var tM = $data.pageTab.find('.dropdown-menu');
            for (var i = 0; i < json.length; i++) {
                json[i].id = json[i].id || '';
                if (json[i].id != '') {
                    if (tM.find('li[id=' + json[i].id + ']').size() > 0)
                        tM.find('li[id=' + json[i].id + ']').remove();
                }
                if ((json[i].type || 0) == 1)
                    tM.append('<li role="presentation" id="' + json[i].id + '" class="divider"></li>');
                else {
                    //<li role="presentation"><a role="menuitem" tabindex="-1" href="javascript:void(0)" onclick="long.close_all_page()"><i class="fa fa-fw fa-circle"></i>关闭所有</a></li>
                    tM.append($('<li id="' + json[i].id + '" role="presentation">').append(function() {
                        var a = $('<a role="menuitem" tabindex="-1" href="javascript:void(0)">');
                        if (json[i].bind) a.bind(json[i].bind);
                        if (json[i].icon) a.append('<i class="fa {0}"></i>'.format(json[i].icon));
                        a.append(json[i].text);
                        return a;
                    }));
                }
            }
        }
        //type,true展开，false隐藏
        //id,显示的标签id
    long.controlSidebarState = function(type, id) {
            var state = $("#control-sidebar").hasClass('control-sidebar-open');
            if ((type && !state) || (!type && state))
                $('#setting-control-sidebar').trigger('click');
            if (id) {
                //$("#control-sidebar").find(".control-sidebar-tabs li").removeClass('active');
                $("#control-sidebar").find("a[href='#" + id + "']").trigger('click');
            }
        }
        //控件库
    long.control = long.Control = function() {
            var THIS = this;
            //头部插件
            this.HeaderContent = function(html) {
                    this.html = html || '';
                    this.render = function() {
                        $('#header-content').html('').append(this.html);
                    }
                    return this;
                }
                //清除头部插件内容
            this.ClearHeaderContent = function() {
                    $('#header-content').html('');
                }
                /*
                 *侧边栏控件
                 *   tabId:
                 *   faIcon:图标
                 *   html:填充内容
                 *   title:标题
                 *   isJquery:说明是jQuery对象，这样添加会吧html对象的事件也加上
                 */
            this.SidebarTab = function(tabId, faIcon, html, title, isJquery) {
                this.tabId = tabId || ('sidebar_' + (long.timestamp() + long.rands(5)));
                this.faIcon = faIcon || ''; //'fa-cog'
                this.html = html || '';
                this.isJquery = isJquery || false;
                this.title = title || '';
                this.render = function() {
                    THIS.ClearSidebarTab(this.tabId);
                    var control = $("#control-sidebar");
                    control.find(".control-sidebar-tabs").append('<li><a href="#{0}" data-toggle="tab">{1}{2}</a></li>'.format(this.tabId, this.faIcon ? ('<i class="fa ' + this.faIcon + '"></i>') : '', this.title));
                    control.find('.tab-content').append('<div class="tab-pane" id="' + this.tabId + '">' + (this.isJquery ? '' : this.html) + '</div>');
                    if (this.isJquery) {
                        $('#' + this.tabId).append(this.html);
                    }
                }
                return this;
            }
            this.ClearSidebarTab = function(tabId) {
                var control = $("#control-sidebar");
                if (control.find('.tab-content').find('#' + tabId).size() > 0) {
                    control.find(".control-sidebar-tabs").find('a[href="#' + tabId + '"]').parent().remove();
                    control.find('.tab-content').find('#' + tabId).remove();
                }
            }
            this.HideSidebarTab = function(tabId) {
                var control = $("#control-sidebar");
                if (control.find('.tab-content').find('#' + tabId).size() > 0) {
                    control.find(".control-sidebar-tabs").find('a[href="#' + tabId + '"]').parent().hide();
                    control.find('.tab-content').find('#' + tabId).hide();
                }
            }
            this.ShowSidebarTab = function(tabId) {
                var control = $("#control-sidebar");
                if (control.find('.tab-content').find('#' + tabId).size() > 0) {
                    control.find(".control-sidebar-tabs").find('a[href="#' + tabId + '"]').parent().show();
                    control.find('.tab-content').find('#' + tabId).show();
                }
            }
            return THIS;
        }
        //返回值是Loading的ID，可以通过这个ID将Loading删除
    long.loading = function(setting) {
        //如果直接传递的文本信息
        if (typeof(setting) == 'string') {
            setting = { text: setting };
        }
        var json = {
            id: false, //如果设置ID，那么同一个ID不会显示加载多次
            text: '努力加载中...', //显示文本
            root: '', //根节点如：../../
            bc_type: 1, //1~3的背景类型,0表示没有背景
            img_type: 9, //1~10加载类型，或图片名称
            time: false, //设置时间多久消失
            font_size: '14px', //字体大小  
            offset: false, //{left:1,top:0}
            time_callback: false, //时间回调函数，参数（执行秒）
            main_css: false //主项样式
        }
        json = $.extend(json, setting);
        var _id = json.id;
        if (!json.id)
            _id = 'LONG_LOADING_' + long.rands(5);
        if ($('[loading-id=' + _id + ']').size() > 0)
            return false;
        //背景图片
        switch (json.bc_type) {
            case 1:
                json.bc_type = 'background-image: url({0}res/image/loading/opacity-b.png)'.format(json.root);
                break;
            case 2:
                json.bc_type = 'background-image: url({0}res/image/loading/opacity-w.png)'.format(json.root);
                break;
            case 3:
                json.bc_type = 'background-image: url({0}res/image/loading/opacity-bb.png)'.format(json.root);
                break;
            case 0:
                json.bc_type = '';
                break;
                //default: json.bc_type = json.bc_type;
        }
        //加载图片，也可以替换为其它图片
        if (typeof(json.img_type) == 'number')
            json.img_type = "loading-" + json.img_type + ".gif";
        //$('html').prepend document.write
        if (long.browser == 'MSIE' && long.msie < 8) {
            $(' <div loading-id="{1}" class="loading-bc" style="{0}"></div>'.format(json.bc_type, _id)).prependTo($('body'));
            $(' <div class="loading-main" loading-id="{4}"><div class="loading-show"><div class="loading-img" style="background-image: url({2}res/image/loading/{1});"></div><div class="loading-info" style="font-size:{3}">{0}</div></div></div>'.format(json.text, json.img_type, json.root, json.font_size, _id)).prependTo($('body'));
        } else {
            $(' <div loading-id="{1}" class="loading-bc" style="{0}"></div>'.format(json.bc_type, _id)).prependTo($('html'));
            $(' <div class="loading-main" loading-id="{4}"><div class="loading-show"><div class="loading-img" style="background-image: url({2}res/image/loading/{1});"></div><div class="loading-info" style="font-size:{3}">{0}</div></div></div>'.format(json.text, json.img_type, json.root, json.font_size, _id)).prependTo($('html'));
        }
        var main = $('.loading-main[loading-id={0}]'.format(_id));
        if (json.main_css)
            main.css(json.main_css);
        if (json.offset)
            main.offset(json.offset);
        else
            main.css({ 'margin-left': -main.width() / 2 });
        //如果不设置此处，虽然背景透明但还是隔层，不能点其它的
        if (json.bc_type == '')
            $('.loading-bc[loading-id={0}]'.format(_id)).hide();
        if (json.time) {
            if (json.time_callback && json.time >= 1000) {
                var i = 1;
                var _interval = setInterval(function() {
                    if (i >= json.time / 1000)
                        clearInterval(_interval);
                    var _res = json.time_callback(i, _id);
                    if (_res) $('[loading-id={0}]'.format(_id)).fadeOut(function() {
                        $(this).remove();
                    });
                    i++;
                }, 1000);
            } else {
                setTimeout(function() {
                    $('[loading-id={0}]'.format(_id)).fadeOut(function() {
                        $(this).remove();
                    });
                }, json.time);
            }
        }
        return _id;
    }
    long.loading_hide = long.loadingHide = function(id, callback) {
            var i = 0;
            var select = '.loading-bc,.loading-main';
            if (typeof id != 'undefined' && typeof id == "string")
                select = "div[loading-id=" + id + "]";
            var size = $(select).size();
            $(select).fadeOut(function() {
                i++;
                if (i >= size) {
                    if (typeof callback != 'undefined' && typeof callback == 'function')
                        callback();
                    else if (typeof id != 'undefined' && typeof id == 'function')
                        id();
                }
                $(this).remove();
            });
        }
        // var _id = long.loading({
        //     text: "我正在加载啊哈哈哈哈哈哈哈。。。。。", bc_type: 'background:blue;opacity:0.1', img_type: 8, time: 510000, time_callback: function (s, _id) {
        //         $('.loading-main[loading-id={0}]'.format(_id)).find('.loading-info').text('我还有 {0} 秒就关闭'.format(s));
        //         if (s == 6) return true;
        //     }
        // })

    //long.loading({ text: "请稍后一会儿呗...",time:2000, bc_type: 1, img_type: 'warning2.png', main_css: { 'background-color': '#3C8DBC', 'color': '#ffffff' } })
    //long.loading_hide();
}).call(this);