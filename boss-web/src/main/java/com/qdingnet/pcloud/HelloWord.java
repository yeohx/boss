package com.qdingnet.pcloud;

import com.qdingnet.pcloud.service.IClientService;
import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.annotation.Resource;

/**
 * Created by QDHL on 2017/1/19.
 */
@Controller
@RequestMapping("/home")
public class HelloWord {
    //添加一个日志器
    private static final Logger logger = Logger.getLogger(HelloWord.class);

    @Resource
    IHelloWord iHelloWord;
    @Resource
    IClientService iClientService;
    //映射一个action
    @RequestMapping("/index")
    public String index() {
        //输出日志文件
        logger.info("the first jsp pages");
        //返回一个index.jsp这个视图
        logger.info("say hello now : " + iHelloWord.sayHello());
        return "frame";
    }

    @RequestMapping("/index2")
    public String index2() {
        //输出日志文件
        logger.info("the first jsp pages");
        //返回一个index.jsp这个视图
        logger.info("say hello now : " + iHelloWord.sayHello());
        return "boss";
    }
}
