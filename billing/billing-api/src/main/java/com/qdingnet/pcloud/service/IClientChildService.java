package com.qdingnet.pcloud.service;

import com.qdingnet.pcloud.entity.billing.ClientChild;

/**
 * Created by QDHL on 2017/1/24.
 */
public interface IClientChildService {
    public int createClientChild(ClientChild clientChild);
    ClientChild getClientChildByClientIdAndProductId(String clientId,String productId);
}
