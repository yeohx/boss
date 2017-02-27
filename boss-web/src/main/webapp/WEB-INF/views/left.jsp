<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fun" %>
<!DOCTYPE html>
<html>
<head>
    <c:set var="ctx" value="${pageContext.request.contextPath}"/>
</head>
<ul class="sidebar-menu">
    <li class="treeview">
        <a href="#">
            <i class="fa fa-dashboard" style="width:32px;"></i>
            <span>首3页</span>
            <span class="pull-right-container"></span>
        </a>
    </li>
    <li class="treeview">
        <a href="/">
            <i class="fa fa-dashboard" style="width:32px;"></i>
            <span>BILLING</span>
            <span class="pull-right-container"></span>
        </a>
    </li>
    <c:forEach var="map" items="${user_session.auFuncTreeMap }" varStatus="ind">
        <li class="treeview">
            <c:forEach var="mapList" items="${map.value}" varStatus="index">
                <c:if test="${index.index<1&&mapList.code!=104}">
                    <a href="#">
                        <c:if test="${!empty mapList.help}">${mapList.help}</c:if>
                        <span>${mapList.name}</span>
								<span class="pull-right-container">
									<i class="fa fa-angle-left pull-right"></i>
								</span>
                    </a>
                </c:if>
            </c:forEach>
            <ul class="treeview-menu">
                <c:forEach var="mapList" items="${map.value}" varStatus="index">
                    <c:if test="${index.index > 0}">
                        <li>
                            <c:if test="${empty mapList.help}">
                                <!-- <a href="${ctx}${mapList.url}">${mapList.name}</a> -->
                                <a href="#" uri="${ctx}${mapList.url}">${mapList.name}</a>
                            </c:if>
                        </li>
                    </c:if>
                </c:forEach>
            </ul>
        </li>
    </c:forEach>
</ul>
</section>
</aside>
</html>