package com.qdingnet.pcloud.service;

import com.qdingnet.pcloud.entity.billing.ProductInstance;

import java.util.List;

/**
 * Created by QDHL on 2017/1/24.
 */
public interface IProductInstanceService {

    List<ProductInstance> getProductInstanceByClientName(String clientName);
    int deleteProductInstanceById(String productInstanceId);
    ProductInstance createProductInstance(ProductInstance productInstance);
}
