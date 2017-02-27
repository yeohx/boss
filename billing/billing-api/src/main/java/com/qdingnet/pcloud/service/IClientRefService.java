package com.qdingnet.pcloud.service;

import com.qdingnet.pcloud.entity.billing.Client;
import com.qdingnet.pcloud.entity.billing.ClientRef;

import java.util.List;

/**
 * Created by QDHL on 2017/1/24.
 */
public interface IClientRefService {
    int createClientRef(List<ClientRef> clientRefs);
    int deleteClientRef(String clientRefId);
    List<ClientRef> getClientRefNotDel();
    List<ClientRef> getAllClientRef();
    ClientRef getClientRefById(String clientRefId);
    ClientRef createClientRef(ClientRef clientRef);
}
