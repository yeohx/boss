package com.qdingnet.pcloud.dao.billing;

import com.qdingnet.pcloud.entity.billing.Client;

import java.util.List;

/**
 * Created by QDHL on 2017/1/23.
 */
public interface IClientDao {
    public int insertClient(Client client);

    public Client getClient(String id);

    public List<Client> getClientByName(String name);

    public List<Client> getClientNotDel();

    public List<Client> getAllClient();
}
