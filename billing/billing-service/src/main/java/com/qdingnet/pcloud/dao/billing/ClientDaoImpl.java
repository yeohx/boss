package com.qdingnet.pcloud.dao.billing;

import com.qdingnet.pcloud.entity.billing.Client;
import com.qdingnet.pcloud.mapper.billing.ClientMapper;
import com.qdingnet.pcloud.service.ClientServiceImpl;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by QDHL on 2017/1/23.
 */
@Service("iClientDao")
public class ClientDaoImpl implements IClientDao {
    private static final Logger logger = Logger.getLogger(ClientDaoImpl.class);
    @Autowired
    ClientMapper clientMapper;

    public int insertClient(Client client) {
        logger.info("insert client start client info is " + client);
        int ret = clientMapper.insert(client);
        return ret;
    }

    public Client getClient(String id) {
        Client client = clientMapper.selectByPrimaryKey(id);
        return client;
    }

    public List<Client> getClientByName(String name) {
        return clientMapper.selectByName(name);
    }

    public List<Client> getClientNotDel() {
        return clientMapper.getClientNotDel();
    }

    public List<Client> getAllClient() {
        return clientMapper.getAllClient();
    }
}
