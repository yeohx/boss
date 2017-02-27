package com.qdingnet.pcloud.service;

import com.qdingnet.pcloud.dao.user.UserDao;
import com.qdingnet.pcloud.entity.user.User;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

/**
 * Created by QDHL on 2017/1/22.
 */
@Service
public class UserServiceImpl implements IUserService {
    @Resource
    UserDao userDao;

    public User getUser(String id){
        User user = userDao.selectByPrimaryKey(id);
        return user;
    }
}
