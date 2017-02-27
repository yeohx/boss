package com.qdingnet.pcloud.dao.billing;

import com.qdingnet.pcloud.entity.billing.ClientRef;

import java.util.List;

/**
 * Created by QDHL on 2017/1/24.
 */
public interface IClientRefDao {
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
