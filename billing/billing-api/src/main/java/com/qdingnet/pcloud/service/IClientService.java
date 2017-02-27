package com.qdingnet.pcloud.service;

import com.qdingnet.pcloud.dto.ClientDto;
import com.qdingnet.pcloud.entity.billing.Client;

import java.util.List;

/**
 * Created by QDHL on 2017/1/23.
 */
public interface IClientService {

    public int saveClient(Client client);

    /**
     * 创建客户信息，默认自动创建子账号
     * @param clientDto
     * @return
     */
    public int createClient(ClientDto clientDto);
    public Client getClient(String id);

    public List<Client> getClientByName(String name);

    public List<ClientDto> getClientDtoByName(String name);

    /**
     * 根据id查看详情
     * @param Id
     * @return
     */
    public ClientDto getClientDtoById(String Id);

    public ClientDto getClientDetailInfo(String id);

    public int deleteProductInstanceById(String productInstanceId);
}
