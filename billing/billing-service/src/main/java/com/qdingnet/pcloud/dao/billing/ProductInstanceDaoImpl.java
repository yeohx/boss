package com.qdingnet.pcloud.dao.billing;

import com.qdingnet.pcloud.entity.billing.ProductInstance;
import com.qdingnet.pcloud.mapper.billing.ProductInstanceMapper;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by QDHL on 2017/1/24.
 */
@Service("iProductInstanceDao")
public class ProductInstanceDaoImpl implements IProductInstanceDao {
    private static final Logger logger = Logger.getLogger(ProductInstanceDaoImpl.class);
    @Autowired
    ProductInstanceMapper productInstanceMapper;

    public int deleteByPrimaryKey(String id) {
        return productInstanceMapper.deleteByPrimaryKey(id);
    }

    public int insert(ProductInstance record) {
        return productInstanceMapper.insert(record);
    }

    public int insertSelective(ProductInstance record) {
        return productInstanceMapper.insertSelective(record);
    }

    public ProductInstance selectByPrimaryKey(String id) {
        return productInstanceMapper.selectByPrimaryKey(id);
    }

    public List<ProductInstance> getProductInstancesByClientId(String clientId) {
        return productInstanceMapper.getProductInstanceByClientId(clientId);
    }

    public List<ProductInstance> getProductInstancesByClientName(String clientName){
        return productInstanceMapper.getProductInstanceByClientName(clientName);
    }

    public int updateByPrimaryKeySelective(ProductInstance record) {
        return productInstanceMapper.updateByPrimaryKeySelective(record);
    }

    public int updateByPrimaryKey(ProductInstance record) {
        return productInstanceMapper.updateByPrimaryKey(record);
    }
}
