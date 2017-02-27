package com.qdingnet.pcloud.boss;

import com.qdingnet.pcloud.boss.base.common.BaseController;
import com.qdingnet.pcloud.entity.billing.Client;
import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Date;
import java.util.List;
import java.util.UUID;

/**
 * Created by QDHL on 2017/2/7.
 */
@Controller
@RequestMapping("/")
public class IndexController  extends BaseController {
    private static final Logger logger = Logger.getLogger(IndexController.class);

    @ResponseBody
    @RequestMapping(value = { "index/getmenu" }, method = { RequestMethod.GET, RequestMethod.POST })
    public void GetMenur(HttpServletRequest request, HttpServletResponse response, Model model){
        response.setContentType("application/json;charset=UTF-8");
        String jsonString = null;
        jsonString = "[\n" +
                "    {\n" +
                "        \"header\": \"BOSS\",\n" +
                "        \"url\": \"/client/index\",\n" +
                "        \"menus\": [\n" +
                "            {\n" +
                "                \"mid\": 125,\n" +
                "                \"text\": \"bill\",\n" +
                "                \"icon\": \"fa fa-th\",\n" +
                "                \"childs\": [\n" +
                "                    {\n" +
                "                        \"mid\": \"5555\",\n" +
                "                        \"text\": \"client\",\n" +
                "                        \"icon\": \"fa-circle-otext-red\",\n" +
                "                        \"url\": \"/client/showclient\"\n" +
                "                    },\n" +
                "                    {\n" +
                "                        \"mid\": \"6666\",\n" +
                "                        \"text\": \"order\",\n" +
                "                        \"icon\": \"fa-circle-otext-red\",\n" +
                "                        \"url\": \"/client/showclient\"\n" +
                "                    },\n" +
                "                    {\n" +
                "                        \"mid\": \"7777\",\n" +
                "                        \"text\": \"billing\",\n" +
                "                        \"icon\": \"fa-circle-otext-red\",\n" +
                "                        \"url\": \"/client/showclient\"\n" +
                "                    }\n" +
                "                ]\n" +
                "            }\n" +
                "        ]\n" +
                "    }\n" +
                "]";

        try {
            response.getWriter().print(jsonString);
        }catch (Exception e){
            logger.error("error info is " + e);
        }
    }

    @RequestMapping("/start")
    public String saveClient(){
        logger.info("start");

        return "boss";
    }
}
