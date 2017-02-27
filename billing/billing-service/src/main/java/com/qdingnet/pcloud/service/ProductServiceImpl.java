package com.qdingnet.pcloud.service;

import com.qdingnet.pcloud.dao.billing.IProductDao;
import com.qdingnet.pcloud.entity.billing.Product;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

/**
 * Created by QDHL on 2017/1/24.
 */
public class ProductServiceImpl implements IProductService {
    private static final Logger logger = Logger.getLogger(ProductServiceImpl.class);
    @Autowired
    IProductDao productDao;

    public int createProduct(Product product) {
        return productDao.insert(product);
    }

    public Product getProductById(String id) {
        return null;
    }

    public List<Product> getProductByIds(List<String> ids) {
        return null;
    }
}
