package com.qdingnet.pcloud;

import com.qdingnet.pcloud.entity.user.User;
import com.qdingnet.pcloud.service.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Created by QDHL on 2017/1/19.
 */
@Service("iHelloWord")
public class HelloWordImpl implements IHelloWord{
    @Autowired
    IUserService userService;
    public String sayHello() {
        User user = userService.getUser("ab");
        System.out.printf("say hello !" + user.getName());
        return "say hello!";
    }
}
