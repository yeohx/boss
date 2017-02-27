package com.qdingnet.pcloud.dao.user;

import com.qdingnet.pcloud.entity.user.User;

/**
 * Created by QDHL on 2017/1/22.
 */
public interface UserDao {
    public int insert(User user);
    public User selectByPrimaryKey(String id);
}
