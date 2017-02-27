package com.qdingnet.pcloud.service;

import com.qdingnet.pcloud.dao.billing.*;
import com.qdingnet.pcloud.dto.ClientChildDto;
import com.qdingnet.pcloud.dto.ClientDto;
import com.qdingnet.pcloud.entity.billing.*;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;

/**
 * Created by QDHL on 2017/1/23.
 */
@Service("iClientService")
public class ClientServiceImpl implements IClientService {
    private static final Logger logger = Logger.getLogger(ClientServiceImpl.class);
    @Autowired
    IClientDao clientDao;
    @Autowired
    IClientChildDao clientChildDao;
    @Autowired
    IClientRefDao clientRefDao;
    @Autowired
    IProductDao productDao;
    @Autowired
    IProductInstanceDao productInstanceDao;

    public int saveClient(Client client) {
        int ret = clientDao.insertClient(client);
        return ret;
    }

    /**
     * 创建client
     * 1、创建client
     * 2、创建 子账号
     * 3、记录相关人员
     *
     * @param clientDto
     * @return
     */
    public int createClient(ClientDto clientDto) {
        Client client = new Client();
        Date startTime = new Date();
        client.setBalance(clientDto.getBalance());
        client.setClientName(clientDto.getClientName());
        client.setCreateTime(startTime);
        String id = UUID.randomUUID().toString();
        client.setCreateUserId(id);
        client.setDes(clientDto.getDes());
        client.setId(id);
        client.setIsDel((byte) 0);
        client.setGapId(clientDto.getGapId());
        client.setState(clientDto.getState());
        int req = clientDao.insertClient(client);

        List<Product> products = productDao.getProductNotDel();

        //根据产品创建子账号
        if (products != null && !products.isEmpty()) {
            for (Product product : products) {
                ClientChild clientChild = new ClientChild();
                clientChild.setBalance(0F);
                clientChild.setCreateTime(new Date());
                clientChild.setClientId(client.getId());
                clientChild.setCreateUserId(client.getCreateUserId());
                clientChild.setName(client.getClientName() + "_" + product.getName());
                clientChild.setId(UUID.randomUUID().toString());
                clientChild.setIsDel(new Byte("0"));
                clientChild.setTimestamp(startTime);
                clientChild.setUpdateTime(startTime);
                clientChild.setCreateTime(startTime);
                clientChild.setProductId(product.getId());
                clientChild.setVersionNum(1);
                clientChildDao.insert(clientChild);
            }
        }

        //创建相关人员
        List<ClientRef> clientRefs = clientDto.getClientRefs();

        if (clientRefs != null && !clientRefs.isEmpty()) {
            for (ClientRef clientRef : clientRefs) {
                clientRefDao.insert(clientRef);
            }
        }

        //创建产品实例
        List<ProductInstance> productInstances = clientDto.getProductInstances();

        if (productInstances != null && !productInstances.isEmpty()) {
            for (ProductInstance productInstance : productInstances) {
                productInstanceDao.insert(productInstance);
                //创建默认的产品订单 本来应该是现有订单才有产品实例。由于目前模型没有定义产品，所有产品实例当产品使用也当产品实例使用
                //这里是否创建订单？？？ TODO
                Order order = new Order();
                order.setCreateTime(startTime);
                //订单是未计费状态
                order.setState((byte) 0);
                order.setVersionNum(1);
                order.setId(UUID.randomUUID().toString());
                order.setProductInstanceId(productInstance.getId());
                order.setClientChildId(productInstance.getClientChildId());
                order.setPayCount(34F);
            }
        }
        return req;
    }

    public Client getClient(String id) {
//        logger.info("get client start now!");
        Client client = clientDao.getClient(id);
        return client;
    }

    public ClientDto getClientDetailInfo(String id) {
        logger.info("get client detail info id is " + id);
        Client client = clientDao.getClient(id);
        List<ClientChildDto> clientChildDtos = clientChildDao.getClientChildDtoByClientId(id);
        List<ClientRef> clientRefs = clientRefDao.getClientRefByClientId(id);
        List<ProductInstance> productInstances = productInstanceDao.getProductInstancesByClientId(id);

        ClientDto clientDto = new ClientDto();
        clientDto.setClientName(client.getClientName());
        clientDto.setCreateTime(client.getCreateTime());
        clientDto.setClientRefs(clientRefs);
        clientDto.setGapId(client.getGapId());
        clientDto.setBalance(client.getBalance());
        clientDto.setClientChildDtos(clientChildDtos);
        clientDto.setId(client.getId());
        clientDto.setProductInstances(productInstances);
        clientDto.setState(client.getState());
        clientDto.setUpdateTime(client.getUpdateTime());
        clientDto.setCreateUserId(client.getCreateUserId());

        logger.info("get client detail return info is " + clientDto);
        return clientDto;
    }

    public int deleteProductInstanceById(String productInstanceId) {
        ProductInstance productInstance = productInstanceDao.selectByPrimaryKey(productInstanceId);
        productInstance.setIsDel((byte) 1);
        int ret = productInstanceDao.updateByPrimaryKey(productInstance);
        return ret;
    }

    public List<Client> getClientByName(String name) {
        logger.info("client name is " + name);
        if (name == null || "".equals(name)) {
            logger.info("get client by name is null");
            return clientDao.getClientNotDel();
        }
        return clientDao.getClientByName(name);
    }

    /**
     * client 关联产品信息
     *
     * @param name
     * @return
     */
    public List<ClientDto> getClientDtoByName(String name) {
        List<Client> clients = clientDao.getClientByName(name);
        if (clients == null || clients.isEmpty()) {
            logger.info("can not find by name is " + name);
            return null;
        }
        List<ClientDto> clientDtos = new ArrayList<ClientDto>();
        ClientDto clientDto = new ClientDto();
        String clientId = null;
        for (Client client : clients) {

            clientId = client.getId();
            clientDto.setId(clientId);
            clientDto.setDes(client.getDes());
            clientDto.setState(client.getState());
            clientDto.setGapId(client.getGapId());
            clientDto.setClientName(client.getClientName());

            List<ClientChildDto> clientChildDtos = clientChildDao.getClientChildDtoByClientId(clientId);
            clientDto.setClientChildDtos(clientChildDtos);
            List<ClientRef> clientRefs = clientRefDao.getClientRefByClientId(clientId);
            clientDto.setClientRefs(clientRefs);
            clientDtos.add(clientDto);
        }
        return clientDtos;
    }

    public ClientDto getClientDtoById(String Id) {
        Client client = clientDao.getClient(Id);
        if (client == null) {
            logger.error("can not find client by id is " + Id);
            return null;
        }
        ClientDto clientDto = new ClientDto();
        List<ClientChildDto> clientChildDtos = clientChildDao.getClientChildDtoByClientId(Id);
        clientDto.setClientChildDtos(clientChildDtos);
        List<ClientRef> clientRefs = clientRefDao.getClientRefByClientId(Id);
        clientDto.setClientRefs(clientRefs);
        return clientDto;
    }

}
