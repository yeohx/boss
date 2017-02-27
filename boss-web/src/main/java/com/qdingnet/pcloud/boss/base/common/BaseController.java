package com.qdingnet.pcloud.boss.base.common;

import com.qdingnet.pcloud.boss.base.Page;
import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;
import org.springframework.beans.propertyeditors.CustomDateEditor;
import org.springframework.beans.propertyeditors.StringTrimmerEditor;
import org.springframework.ui.Model;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.InitBinder;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.servlet.mvc.multiaction.MultiActionController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * Created by QDHL on 2017/1/24.
 */
public class BaseController extends MultiActionController {

    private static final Logger logger = Logger.getLogger(BaseController.class);

    HttpServletRequest request;
    HttpServletResponse response;
    Model model;
    HttpSession session;

    @InitBinder
    public void initBinder(WebDataBinder binder) throws Exception {
        DateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        CustomDateEditor dateEditor = new CustomDateEditor(df, true);
        binder.registerCustomEditor(Date.class, dateEditor);
        binder.registerCustomEditor(String.class, new StringTrimmerEditor(true));
    }

    public <T> Page<T> getPage(Page<T> page) {
        HttpServletRequest request = this.getRequest();
        int pageSize = 0;
        String param_pageSize = request.getParameter("pageSize");
        if (StringUtils.isNotBlank(param_pageSize) && StringUtils.isNumeric(param_pageSize)) {
            pageSize = Integer.parseInt(param_pageSize);
        }
        int currentPage = 0;
        String param_currentPage = request.getParameter("currentPage");
        if (StringUtils.isNotBlank(param_currentPage) && StringUtils.isNumeric(param_currentPage)) {
            currentPage = Integer.parseInt(param_currentPage);
        }
        if (currentPage < 1) {
            currentPage = 1;
        }
        page.setCurrentPage(currentPage);
        page.setPageSize(pageSize);
        return page;
    }
    public <T> Page<T> getPage2(Page<T> page) {
    	HttpServletRequest request = this.getRequest();
    	int pageSize = 0;
    	String param_pageSize = request.getParameter("pageSize2");
    	if (StringUtils.isNotBlank(param_pageSize) && StringUtils.isNumeric(param_pageSize)) {
    		pageSize = Integer.parseInt(param_pageSize);
    	}
    	int currentPage = 0;
    	String param_currentPage = request.getParameter("currentPage2");
    	if (StringUtils.isNotBlank(param_currentPage) && StringUtils.isNumeric(param_currentPage)) {
    		currentPage = Integer.parseInt(param_currentPage);
    	}
    	if (currentPage < 1) {
    		currentPage = 1;
    	}
    	page.setCurrentPage(currentPage);
    	page.setPageSize(pageSize);
    	return page;
    }

    @ModelAttribute
    public void setReqAndRes(HttpServletRequest request, HttpServletResponse response, Model model) {
        this.request = request;
        this.response = response;
        this.session = request.getSession();
        this.model = model;
        //request.setAttribute("xjhWeb", xjhWeb);
    }

    public HttpServletRequest getRequest() {
        return request;
    }

    public HttpServletResponse getResponse() {
        return response;
    }

    public HttpSession getSession() {
        return session;
    }

}
