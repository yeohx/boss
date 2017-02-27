package com.qdingnet.pcloud;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * Created by QDHL on 2017/1/19.
 */
@Controller
@RequestMapping("/home")
public class HelloController {
//    //添加一个日志器
//    private static final Logger logger = Logger.getLogger(HelloController.class);
//
//    @Autowired
//    HelloWordImpl helloWord;
//    //映射一个action
//    @RequestMapping("/index")
//    public String index() {
//        //输出日志文件
//        logger.info("the first jsp pages");
//        logger.info("say : " + helloWord.sayHello());
//        //返回一个index.jsp这个视图
//        return "index";
//    }
}
