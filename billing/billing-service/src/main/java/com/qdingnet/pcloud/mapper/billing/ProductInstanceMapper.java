package com.qdingnet.pcloud.mapper.billing;

import com.qdingnet.pcloud.entity.billing.ProductInstance;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductInstanceMapper {
    int deleteByPrimaryKey(String id);

    int insert(ProductInstance record);

    int insertSelective(ProductInstance record);

    ProductInstance selectByPrimaryKey(String id);

    List<ProductInstance> getProductInstanceByClientId(String clientId);

    List<ProductInstance> getProductInstanceByClientName(String clientName);

    int updateByPrimaryKeySelective(ProductInstance record);

    int updateByPrimaryKey(ProductInstance record);
}