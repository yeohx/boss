package com.qdingnet.pcloud.mapper.billing;

import com.qdingnet.pcloud.entity.billing.ClientChild;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ClientChildMapper {
    int deleteByPrimaryKey(String id);

    int insert(ClientChild record);

    int insertSelective(ClientChild record);

    ClientChild selectByPrimaryKey(String id);

    List<ClientChild> getClientChildNotDel();
    List<ClientChild> getAllClientChild();
    List<ClientChild> getClientChildByClientId(String clientId);
    List<ClientChild> getClientChildByClientName(String clientName);
    ClientChild getClientChildByClientIdAndProductId(String clientId,String productId);

    int updateByPrimaryKeySelective(ClientChild record);

    int updateByPrimaryKey(ClientChild record);
}