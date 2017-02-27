package com.qdingnet.pcloud.dao.billing;

import com.qdingnet.pcloud.entity.billing.ClientRef;
import com.qdingnet.pcloud.mapper.billing.ClientRefMapper;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by QDHL on 2017/1/24.
 */
@Service("iClientRefDao")
public class ClientRefDaoImpl implements IClientRefDao {
    private static final Logger logger = Logger.getLogger(ClientRefDaoImpl.class);
    @Autowired
    ClientRefMapper clientRefMapper;

    public int deleteByPrimaryKey(String id) {
        return clientRefMapper.deleteByPrimaryKey(id);
    }

    public int insert(ClientRef record) {
        return clientRefMapper.insert(record);
    }

    public int insertSelective(ClientRef record) {
        return clientRefMapper.insertSelective(record);
    }

    public ClientRef selectByPrimaryKey(String id) {
        return clientRefMapper.selectByPrimaryKey(id);
    }

    public List<ClientRef> getClientRefNotDel() {
        return clientRefMapper.getClientRefNotDel();
    }

    public List<ClientRef> getAllClientRef() {
        return clientRefMapper.getAllClientRef();
    }

    public List<ClientRef> getClientRefByClientId(String clientId) {
        return clientRefMapper.getClientRefByClientId(clientId);
    }

    public List<ClientRef> getClientRefByClientName(String clientName) {
        return clientRefMapper.getClientRefByClientName(clientName);
    }

    public int updateByPrimaryKeySelective(ClientRef record) {
        return clientRefMapper.updateByPrimaryKeySelective(record);
    }

    public int updateByPrimaryKey(ClientRef record) {
        return clientRefMapper.updateByPrimaryKey(record);
    }
}
