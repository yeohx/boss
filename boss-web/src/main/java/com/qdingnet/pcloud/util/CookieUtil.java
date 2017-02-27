package com.qdingnet.pcloud.util;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.HashMap;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * Cookie工具类,封装Cookie常用操作
 * 
 * @author wangxin
 */
public class CookieUtil {

    private static final Logger log = LoggerFactory.getLogger(CookieUtil.class);

    /**
     * 设置cookie有效期，根据需要自定义[本系统设置为30天]
     */
    public final static int COOKIE_MAX_AGE = 1000 * 60 * 60 * 24 * 7;

    /**
     * 
     * @param response
     * @param name
     *            cookie名称
     * @param path
     *            cookie存放路径
     * @param value
     *            cookie值
     * @param maxAge
     *            cookie最长时间
     */
    public static void addCookie(HttpServletResponse response, String name, String path, String value, int maxAge) {
        Cookie cookie = new Cookie(name, value);
        cookie.setPath(path);
        if (maxAge > 0)
            cookie.setMaxAge(maxAge);
        response.addCookie(cookie);
    }

    /**
     * 
     * 获取cookie的值
     * 
     * @param request
     * @param name
     *            cookie的名称
     * @return
     */
    public static String getCookieByName(HttpServletRequest request, String name) {
        Map<String, Cookie> cookieMap = CookieUtil.readCookieMap(request);
        if (cookieMap.containsKey(name)) {
            Cookie cookie = (Cookie) cookieMap.get(name);
            return cookie.getValue();
        } else {
            return null;
        }
    }

    protected static Map<String, Cookie> readCookieMap(HttpServletRequest request) {
        Map<String, Cookie> cookieMap = new HashMap<String, Cookie>();
        Cookie[] cookies = request.getCookies();
        if (null != cookies) {
            for (int i = 0; i < cookies.length; i++) {
                cookieMap.put(cookies[i].getName(), cookies[i]);
            }
        }
        return cookieMap;
    }

    /**
     *
     * @desc 删除指定Cookie
     * @param response
     * @param cookie
     */
    public static void removeCookie(HttpServletResponse response, Cookie cookie) {
        if (cookie != null) {
            cookie.setPath("/");
            cookie.setValue("");
            cookie.setMaxAge(0);
            response.addCookie(cookie);
        }
    }

    /**
     *
     * @desc 删除指定Cookie
     * @param response
     * @param cookie
     * @param domain
     */
    public static void removeCookie(HttpServletResponse response, Cookie cookie, String domain) {
        if (cookie != null) {
            cookie.setPath("/");
            cookie.setValue("");
            cookie.setMaxAge(0);
            cookie.setDomain(domain);
            response.addCookie(cookie);
        }
    }

    /**
     *
     * @desc 根据Cookie名称得到Cookie的值，没有返回Null
     * @param request
     * @param name
     * @return
     */
    public static String getCookieValue(HttpServletRequest request, String name) {
        Cookie cookie = getCookie(request, name);
        if (cookie != null) {
            return cookie.getValue();
        } else {
            return null;
        }
    }

    /**
     *
     * @desc 根据Cookie名称得到Cookie对象，不存在该对象则返回Null
     * @param request
     * @param name
     */
    public static Cookie getCookie(HttpServletRequest request, String name) {
        Cookie cookies[] = request.getCookies();
        if (cookies == null || name == null || name.length() == 0)
            return null;
        Cookie cookie = null;
        for (int i = 0; i < cookies.length; i++) {
            if (!cookies[i].getName().equals(name))
                continue;
            cookie = cookies[i];
            if (request.getServerName().equals(cookie.getDomain()))
                break;
        }

        return cookie;
    }

    /**
     *
     * @desc 添加一条新的Cookie信息，默认有效时间为一个月
     * @param response
     * @param name
     * @param value
     */
    public static void setCookie(HttpServletResponse response, String name, String value) {
        setCookie(response, name, value, COOKIE_MAX_AGE);
    }

    /**
     *
     * @desc 添加一条新的Cookie信息，可以设置其最长有效时间(单位：秒)
     * @param response
     * @param name
     * @param value
     * @param maxAge
     */
    public static void setCookie(HttpServletResponse response, String name, String value, int maxAge) {
        if (value == null)
            value = "";
        Cookie cookie = new Cookie(name, value);
        if (maxAge != 0) {
            cookie.setMaxAge(maxAge);
        } else {
            cookie.setMaxAge(COOKIE_MAX_AGE);
        }
        cookie.setPath("/");
        response.addCookie(cookie);
    }

    /**
     * 去除html代码
     * 
     * @param inputString
     * @return
     */
    public static String HtmltoText(String inputString) {
        String htmlStr = inputString; // 含html标签的字符串
        String textStr = "";
        Pattern p_script;
        Matcher m_script;
        Pattern p_style;
        Matcher m_style;
        Pattern p_html;
        Matcher m_html;
        Pattern p_ba;
        Matcher m_ba;

        try {
            String regEx_script = "<[\\s]*?script[^>]*?>[\\s\\S]*?<[\\s]*?\\/[\\s]*?script[\\s]*?>"; // 定义script的正则表达式{或<script[^>]*?>[\\s\\S]*?<\\/script> }
            String regEx_style = "<[\\s]*?style[^>]*?>[\\s\\S]*?<[\\s]*?\\/[\\s]*?style[\\s]*?>"; // 定义style的正则表达式{或<style[^>]*?>[\\s\\S]*?<\\/style> }
            String regEx_html = "<[^>]+>"; // 定义HTML标签的正则表达式
            String patternStr = "\\s+";

            p_script = Pattern.compile(regEx_script, Pattern.CASE_INSENSITIVE);
            m_script = p_script.matcher(htmlStr);
            htmlStr = m_script.replaceAll(""); // 过滤script标签

            p_style = Pattern.compile(regEx_style, Pattern.CASE_INSENSITIVE);
            m_style = p_style.matcher(htmlStr);
            htmlStr = m_style.replaceAll(""); // 过滤style标签

            p_html = Pattern.compile(regEx_html, Pattern.CASE_INSENSITIVE);
            m_html = p_html.matcher(htmlStr);
            htmlStr = m_html.replaceAll(""); // 过滤html标签

            p_ba = Pattern.compile(patternStr, Pattern.CASE_INSENSITIVE);
            m_ba = p_ba.matcher(htmlStr);
            htmlStr = m_ba.replaceAll(""); // 过滤空格

            textStr = htmlStr;

        } catch (Exception e) {
            log.error("## 过滤标签符异常={}", e.getMessage());
        }
        return textStr;// 返回文本字符串
    }

}