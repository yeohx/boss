package com.qdingnet.pcloud.mapper.billing;

import com.qdingnet.pcloud.entity.billing.Client;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface ClientMapper {
    int deleteByPrimaryKey(String id);

    int insert(Client record);

    int insertSelective(Client record);

    Client selectByPrimaryKey(String id);

    List<Client> selectByName(String clientName);

    List<Client> getClientNotDel();

    List<Client> getAllClient();

    int updateByPrimaryKeySelective(Client record);

    int updateByPrimaryKey(Client record);
}