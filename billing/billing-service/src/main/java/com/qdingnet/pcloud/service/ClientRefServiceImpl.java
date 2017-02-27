package com.qdingnet.pcloud.service;

import com.qdingnet.pcloud.dao.billing.IClientRefDao;
import com.qdingnet.pcloud.entity.billing.ClientRef;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

/**
 * Created by QDHL on 2017/1/24.
 */
@Service("iClientRefService")
public class ClientRefServiceImpl implements IClientRefService {
    private static final Logger logger = Logger.getLogger(ClientRefServiceImpl.class);
    @Autowired
    IClientRefDao clientRefDao;

    public int createClientRef(List<ClientRef> clientRefs) {
        int i = 0;
        if(clientRefs == null || clientRefs.isEmpty()){
            return 0;
        }
        for(ClientRef clientRef : clientRefs){
            i += clientRefDao.insert(clientRef);
        }
        return i;
    }

    public int deleteClientRef(String clientRefId){
        int i = 0;
        if(clientRefId == null || "".equals(clientRefId)){
            logger.info("client ref id is null");
            return 0;
        }
        ClientRef clientRef = clientRefDao.selectByPrimaryKey(clientRefId);
        clientRef.setIsDel((byte)1);
        if(clientRef == null){
            logger.info("can not find client ref by id is " + clientRefId);
        }
        i = clientRefDao.updateByPrimaryKey(clientRef);
        return i;
    }

    public List<ClientRef> getClientRefNotDel() {
        return clientRefDao.getClientRefNotDel();
    }

    public List<ClientRef> getAllClientRef() {
        return clientRefDao.getAllClientRef();
    }

    public ClientRef getClientRefById(String clientRefId) {
        return clientRefDao.selectByPrimaryKey(clientRefId);
    }

    public ClientRef createClientRef(ClientRef clientRef) {
        Date date = new Date();
        clientRef.setCreateTime(date);

        int ret = clientRefDao.insert(clientRef);
        if(ret > 0){
            return clientRef;
        }else {
            return null;
        }
    }
}
