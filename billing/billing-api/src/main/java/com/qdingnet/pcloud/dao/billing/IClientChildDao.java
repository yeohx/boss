package com.qdingnet.pcloud.dao.billing;

import com.qdingnet.pcloud.dto.ClientChildDto;
import com.qdingnet.pcloud.entity.billing.ClientChild;

import java.util.List;

/**
 * Created by QDHL on 2017/1/24.
 */
public interface IClientChildDao {
    int deleteByPrimaryKey(String id);

    int insert(ClientChild record);

    int insertSelective(ClientChild record);

    ClientChild selectByPrimaryKey(String id);

    List<ClientChildDto> getClientChildDtoByClientId(String clientId);
    ClientChild getClientChildByClientIdAndProductId(String clientId,String productId);
    int updateByPrimaryKeySelective(ClientChild record);

    int updateByPrimaryKey(ClientChild record);
}
