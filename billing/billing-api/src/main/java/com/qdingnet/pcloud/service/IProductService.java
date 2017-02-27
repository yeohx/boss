package com.qdingnet.pcloud.service;

import com.qdingnet.pcloud.entity.billing.Product;

import java.util.List;

/**
 * Created by QDHL on 2017/1/24.
 */
public interface IProductService {
    public int createProduct(Product product);
    public Product getProductById(String id);
    public List<Product> getProductByIds(List<String> ids);
}
