package com.qdingnet.pcloud.mapper.user;

import com.qdingnet.pcloud.entity.user.User;
import org.springframework.stereotype.Repository;

/**
 * Created by QDHL on 2017/1/22.
 */
@Repository
public interface UserMapper {
    int insert(User user);
    User selectByPrimaryKey(String userId);
}
