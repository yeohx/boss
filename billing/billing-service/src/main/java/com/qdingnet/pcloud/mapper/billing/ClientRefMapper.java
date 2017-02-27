package com.qdingnet.pcloud.mapper.billing;

import com.qdingnet.pcloud.entity.billing.ClientRef;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ClientRefMapper {
    int deleteByPrimaryKey(String id);

    int insert(ClientRef record);

    int insertSelective(ClientRef record);

    ClientRef selectByPrimaryKey(String id);
    List<ClientRef> getClientRefNotDel();
    List<ClientRef> getAllClientRef();

    List<ClientRef> getClientRefByClientId(String clientId);

    List<ClientRef> getClientRefByClientName(String clientName);

    int updateByPrimaryKeySelective(ClientRef record);

    int updateByPrimaryKey(ClientRef record);
}