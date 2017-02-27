package com.qdingnet.pcloud.service;

import com.qdingnet.pcloud.dao.billing.ClientChildDaoImpl;
import com.qdingnet.pcloud.dao.billing.IClientChildDao;
import com.qdingnet.pcloud.entity.billing.ClientChild;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Created by QDHL on 2017/1/24.
 */
@Service("iClientChildService")
public class ClientChildServiceImpl implements IClientChildService {
    private static final Logger logger = Logger.getLogger(ClientChildServiceImpl.class);
    @Autowired
    IClientChildDao clientChildDao;

    public int createClientChild(ClientChild clientChild) {
        int ret = clientChildDao.insert(clientChild);
        return ret;
    }

    public ClientChild getClientChildByClientIdAndProductId(String clientId, String productId) {
        return clientChildDao.getClientChildByClientIdAndProductId(clientId,productId);
    }
}
