package com.qdingnet.pcloud.dao.billing;

import com.qdingnet.pcloud.entity.billing.Product;
import com.qdingnet.pcloud.entity.billing.ProductInstance;

import java.util.List;

/**
 * Created by QDHL on 2017/1/24.
 */
public interface IProductInstanceDao {
    int deleteByPrimaryKey(String id);

    int insert(ProductInstance record);

    int insertSelective(ProductInstance record);

    ProductInstance selectByPrimaryKey(String id);
    List<ProductInstance> getProductInstancesByClientId(String clientId);
    List<ProductInstance> getProductInstancesByClientName(String clientnName);

    int updateByPrimaryKeySelective(ProductInstance record);

    int updateByPrimaryKey(ProductInstance record);
}
