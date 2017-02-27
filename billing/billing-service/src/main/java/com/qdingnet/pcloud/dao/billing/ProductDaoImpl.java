package com.qdingnet.pcloud.dao.billing;

import com.qdingnet.pcloud.entity.billing.Product;
import com.qdingnet.pcloud.mapper.billing.ProductMapper;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by QDHL on 2017/1/24.
 */
@Service("iProductDao")
public class ProductDaoImpl implements IProductDao {
    private static final Logger logger = Logger.getLogger(ProductDaoImpl.class);
    @Autowired
    ProductMapper productMapper;

    public int deleteByPrimaryKey(String id) {
        return productMapper.deleteByPrimaryKey(id);
    }

    public int insert(Product record) {
        return productMapper.insert(record);
    }

    public int insertSelective(Product record) {
        return productMapper.insertSelective(record);
    }

    public Product selectByPrimaryKey(String id) {
        return productMapper.selectByPrimaryKey(id);
    }

    public Product selectByName(String name) {
        return productMapper.getProductByName(name);
    }

    public List<Product> getProductNotDel() {
        return productMapper.getProductNotDel();
    }

    public List<Product> getAllProduct() {
        return productMapper.getAllProduct();
    }

    public int updateByPrimaryKeySelective(Product record) {
        return productMapper.updateByPrimaryKeySelective(record);
    }

    public int updateByPrimaryKey(Product record) {
        return productMapper.updateByPrimaryKey(record);
    }
}
