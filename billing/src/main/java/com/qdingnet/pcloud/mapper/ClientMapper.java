package com.qdingnet.pcloud.mapper;

import com.qdingnet.pcloud.dao.bean.Client;

public interface ClientMapper {
    int deleteByPrimaryKey(String id);

    int insert(Client record);

    int insertSelective(Client record);

    Client selectByPrimaryKey(String id);

    int updateByPrimaryKeySelective(Client record);

    int updateByPrimaryKey(Client record);
}