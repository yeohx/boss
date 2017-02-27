package com.qdingnet.pcloud.dao.billing;

import com.qdingnet.pcloud.entity.billing.Product;

import java.util.List;

/**
 * Created by QDHL on 2017/1/24.
 */
public interface IProductDao {
    int deleteByPrimaryKey(String id);

    int insert(Product record);

    int insertSelective(Product record);

    Product selectByPrimaryKey(String id);
    Product selectByName(String name);

    List<Product> getProductNotDel();

    List<Product> getAllProduct();

    int updateByPrimaryKeySelective(Product record);

    int updateByPrimaryKey(Product record);
}
