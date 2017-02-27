package com.qdingnet.pcloud.dao;

import com.qdingnet.pcloud.dao.user.UserDao;
import com.qdingnet.pcloud.entity.user.User;
import com.qdingnet.pcloud.mapper.user.UserMapper;
import org.springframework.stereotype.Repository;

import javax.annotation.Resource;

/**
 * Created by QDHL on 2017/1/20.
 */
@Repository("userDao")
public class UserDaoImpl implements UserDao {
    @Resource
    UserMapper userMapper;
    public int insert(User user){
        //before TODO

        int ret = userMapper.insert(user);

        //after TODO

        return ret;
    }
    public User selectByPrimaryKey(String userId){
        //before TODO

        User user = userMapper.selectByPrimaryKey(userId);

        //after TODO

        return user;
    }
}
