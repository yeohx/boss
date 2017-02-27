package com.qdingnet.pcloud.mapper.billing;

import com.qdingnet.pcloud.entity.billing.Product;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface ProductMapper {
    int deleteByPrimaryKey(String id);

    int insert(Product record);

    int insertSelective(Product record);

    Product selectByPrimaryKey(String id);
    Product getProductByName(String name);

    List<Product> getAllProduct();

    List<Product> getProductNotDel();

    int updateByPrimaryKeySelective(Product record);

    int updateByPrimaryKey(Product record);
}