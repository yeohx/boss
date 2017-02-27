package com.qdingnet.pcloud.boss;

import com.alibaba.fastjson.JSON;
import com.qdingnet.pcloud.boss.base.common.BaseController;
import com.qdingnet.pcloud.boss.base.common.ErrorCode;
import com.qdingnet.pcloud.boss.base.utils.ErrorAction;
import com.qdingnet.pcloud.dto.ClientDto;
import com.qdingnet.pcloud.entity.billing.Client;
import com.qdingnet.pcloud.entity.billing.ClientRef;
import com.qdingnet.pcloud.entity.billing.ProductInstance;
import com.qdingnet.pcloud.service.IClientRefService;
import com.qdingnet.pcloud.service.IClientService;
import com.qdingnet.pcloud.service.IProductInstanceService;
import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.*;

/**
 * Created by QDHL on 2017/1/24.
 */
@Controller
@RequestMapping("client")
public class ClientController extends BaseController {
    private static final Logger logger = Logger.getLogger(ClientController.class);

    @Resource
    IClientService iClientService;
    @Resource
    IClientRefService iClientRefService;
    @Resource
    IProductInstanceService iProductInstanceService;

    @RequestMapping("/index")
    public String client() {
        //输出日志文件
        logger.info("client jsp pages");
        //返回一个index.jsp这个视图
        logger.info("say client name  now : " + iClientService.getClient("2586248f-9f9e-4296-b604-c2eb657d8011").getClientName());
        return "index";
    }

    @RequestMapping("/getclientByname")
    public String getClientByName(HttpServletRequest request) {
        String name = request.getParameter("name");
        String age = request.getParameter("age");
        logger.info("get client by name is " + name + " age is  " + age);
        logger.info("get client by name : " + iClientService.getClientByName(name));
        return "index";
    }

    @RequestMapping("createclient")
    public String createClient(HttpServletRequest request) {
        String client = request.getParameter("requestJson");
        logger.info("create client start request is " + client);
        ClientDto clientDto = new ClientDto();
        iClientService.createClient(clientDto);
        return "index";
    }

    @RequestMapping("/showclient")
    public String showClient() {
        logger.info("show client");
        return "client";
//        return "table_example";
    }

    @ResponseBody
    @RequestMapping("getclient")
    public void getClient(HttpServletRequest request, HttpServletResponse response, Model model) {
        String name = request.getParameter("client");
        logger.info("get client name is  " + name);
        response.setContentType("application/json;charset=UTF-8");
        String jsonString = null;
        List<Client> clientList = iClientService.getClientByName(name);
        jsonString = JSON.toJSONString(clientList);
        logger.info("json string is " + jsonString);
//        return jsonString;
        try {
            response.getWriter().print(jsonString);
        } catch (Exception e) {
            logger.error("error info is " + e);
        }
    }

    @ResponseBody
    @RequestMapping("getclientdetail")
    public void getClientDetail(HttpServletRequest request, HttpServletResponse response) {
        String clientId = request.getParameter("clientId");
        logger.info("get client detail id is " + clientId);
        ClientDto clientDto = iClientService.getClientDetailInfo(clientId);
        logger.info("get client detail info is " + clientDto);
        String jsonString = JSON.toJSONString(clientDto);
        try {
            response.getWriter().print(jsonString);
        } catch (Exception e) {
            logger.error("error info is " + e);
        }
    }

    @RequestMapping("/editclient")
    public String editclient(HttpServletRequest request, HttpServletResponse response, Model model) {
        logger.info("edit client start");
        String clientId = request.getParameter("clientId");
        Enumeration params = request.getParameterNames();
        if (params != null) {
            while (params.hasMoreElements()) {
                logger.info("params is " + params.nextElement());
            }
        }
        if (clientId == null || "".equals(clientId)) {
            logger.info("clientId is null");
            return "index";
        }

        logger.info("get client detail id is " + clientId);
        ClientDto clientDto = iClientService.getClientDetailInfo(clientId);
        logger.info("get client detail info is " + clientDto);
        logger.info("get client ref is " + clientDto.getClientRefs());
        logger.info("get instance is " + clientDto.getProductInstances());
        String clientDtoString = JSON.toJSONString(clientDto);
        model.addAttribute("clientDto", clientDtoString);
        model.addAttribute("clientName", clientDto.getClientName());
        model.addAttribute("clientId", clientDto.getId());
        return "client_edit";
    }

    @RequestMapping("/saveclient")
    public String saveClient() {
        logger.info("save client start");
        Client client = new Client();
        client.setBalance(1.01F);
        client.setClientName("yeohx");
        client.setCreateTime(new Date());
        String id = UUID.randomUUID().toString();
        client.setCreateUserId(id);
        client.setDes("desc");
        client.setId(id);
        client.setIsDel((byte) 0);
        client.setGapId("gapId");
        client.setState((short) 1);
        logger.info("save client is " + client.toString());
        int ret = iClientService.saveClient(client);
        return "index";
    }

    @ResponseBody
    @RequestMapping("/deleteproductinstance")
    public void deleteProductInstance(HttpServletRequest request, HttpServletResponse response) {
        String productInstanceId = request.getParameter("productInstanceId");
        logger.info("delete product isntance  id is   " + productInstanceId);
        response.setContentType("application/json;charset=UTF-8");
        String jsonString = null;
        int ret = iClientService.deleteProductInstanceById(productInstanceId);
        logger.info("json string is " + ret);
//        return jsonString;
        try {
            response.getWriter().print(ret);
        } catch (Exception e) {
            logger.error("error info is " + e);
        }
    }

    @ResponseBody
    @RequestMapping("/deleteclientref")
    public void deleteClientRef(HttpServletRequest request, HttpServletResponse response) {
        String clientRefId = request.getParameter("clientRefId");
        logger.info("delete clientRef id is   " + clientRefId);
        response.setContentType("application/json;charset=UTF-8");
        String jsonString = null;
        int ret = iClientRefService.deleteClientRef(clientRefId);
        logger.info("json string is " + ret);
//        return jsonString;
        try {
            response.getWriter().print(ret);
        } catch (Exception e) {
            logger.error("error info is " + e);
        }
    }

    @ResponseBody
    @RequestMapping(value = "/createclientref", method = RequestMethod.POST)
    public void createClientRef(HttpServletRequest request, HttpServletResponse response) {
        String clientRef = request.getParameter("clientRef");
        if (clientRef == null || "".equals(clientRef)) {
            logger.info("create client ref info is null");
            ErrorAction.errorReturn(response, ErrorCode.getCodeParameterNull(), ErrorCode.getMsgParameterNull(), "client ref info is null");
            return;
        }
        logger.info("create client ref info is " + clientRef);
        String id = UUID.randomUUID().toString();
        ClientRef clientRef1 = null;
        try {
            clientRef1 = JSON.parseObject(clientRef, ClientRef.class);
        } catch (Exception e) {
            logger.info("json to client ref error is " + e);
            ErrorAction.errorReturn(response, ErrorCode.getCodeStringtojsonError(), ErrorCode.getMsgStringtojsonError(), "string to json error");
            return;
        }
        clientRef1.setId(id);
        //参数判空
        if (clientRef1.getName() == null || "".equals(clientRef1.getName())) {
            logger.error("client ref name is null");
            ErrorAction.errorReturn(response, ErrorCode.getCodeParameterNull(), ErrorCode.getMsgParameterNull(), "client ref name is null");
            return;
        }
        if (clientRef1.getClientId() == null || "".equals(clientRef1.getClientId())) {
            logger.error("client id is null");
            ErrorAction.errorReturn(response, ErrorCode.getCodeParameterNull(), ErrorCode.getMsgParameterNull(), "client id is null");
            return;
        }
        if (clientRef1.getPhone() == null || "".equals(clientRef1.getPhone())) {
            logger.error("client phone is null");
            ErrorAction.errorReturn(response, ErrorCode.getCodeParameterNull(), ErrorCode.getMsgParameterNull(), "client phone is null");
            return;
        }
        if (clientRef1.getRole() == null || "".equals(clientRef1.getRole())) {
            logger.error("client role is null");
            ErrorAction.errorReturn(response, ErrorCode.getCodeParameterNull(), ErrorCode.getMsgParameterNull(), "client role is null");
            return;
        }
        if (clientRef1.getClientName() == null || "".equals(clientRef1.getClientName())) {
            logger.error("client name is null");
            ErrorAction.errorReturn(response, ErrorCode.getCodeParameterNull(), ErrorCode.getMsgParameterNull(), "client name is null");
            return;
        }
        ClientRef clientRef2 = iClientRefService.createClientRef(clientRef1);
        if (clientRef2 != null) {
            String ret = JSON.toJSONString(clientRef2);
            try {
                response.getWriter().print(ret);
            } catch (Exception e) {
                logger.error("error info is " + e);
            }
        } else {
            ErrorAction.errorReturn(response, ErrorCode.getCodeCreateClientrefError(), ErrorCode.getMsgCreateClienterfError(), "创建相关人员失败");
            return;
        }
    }

    @ResponseBody
    @RequestMapping(value = "/createproductinstance", method = RequestMethod.POST)
    public void createProductInstance(HttpServletRequest request, HttpServletResponse response) {
        String productInstance = request.getParameter("productInstance");
        logger.info("create product instance info is " + productInstance);
        if (productInstance == null || "".equals(productInstance)) {
            logger.info("create client ref info is null");
            ErrorAction.errorReturn(response, ErrorCode.getCodeParameterNull(), ErrorCode.getMsgParameterNull(), "client ref info is null");
            return;
        }
        String id = UUID.randomUUID().toString();
        ProductInstance productInstance1 = null;
        try {
            productInstance1 = JSON.parseObject(productInstance, ProductInstance.class);
        } catch (Exception e) {
            logger.info("json to ProductInstance error is " + e);
            ErrorAction.errorReturn(response, ErrorCode.getCodeStringtojsonError(), ErrorCode.getMsgStringtojsonError(), "string to json error");
            return;
        }
        productInstance1.setId(id);
        logger.info("product info is " + productInstance1);
        ProductInstance productInstance2 = iProductInstanceService.createProductInstance(productInstance1);
        logger.info("product instance is " + productInstance2);
        if (productInstance2 != null) {
            String ret = JSON.toJSONString(productInstance2);
            try {
                response.getWriter().print(ret);
            } catch (Exception e) {
                logger.error("error info is " + e);
            }
        } else {
            logger.error("create product instance error");
            ErrorAction.errorReturn(response,ErrorCode.getCodeCreateProductinstanceError(), ErrorCode.getMsgCreateProductinstanceError(), "创建商品实例失败");
        }
        return;
    }
}
