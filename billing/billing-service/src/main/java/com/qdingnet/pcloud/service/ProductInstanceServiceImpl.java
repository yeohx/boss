package com.qdingnet.pcloud.service;

import com.qdingnet.pcloud.dao.billing.IClientChildDao;
import com.qdingnet.pcloud.dao.billing.IProductDao;
import com.qdingnet.pcloud.dao.billing.IProductInstanceDao;
import com.qdingnet.pcloud.entity.billing.ClientChild;
import com.qdingnet.pcloud.entity.billing.Product;
import com.qdingnet.pcloud.entity.billing.ProductInstance;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.UUID;

/**
 * Created by QDHL on 2017/1/24.
 */
@Service("iProductInstanceService")
public class ProductInstanceServiceImpl implements IProductInstanceService {
    private static final Logger logger = Logger.getLogger(ProductInstanceServiceImpl.class);
    @Autowired
    IProductInstanceDao productInstanceDao;
    @Autowired
    IProductDao productDao;
    @Autowired
    IClientChildDao clientChildDao;


    public List<ProductInstance> getProductInstanceByClientName(String clientName) {
        return null;
    }

    public int deleteProductInstanceById(String productInstanceId) {
        ProductInstance productInstance = productInstanceDao.selectByPrimaryKey(productInstanceId);
        productInstance.setIsDel((byte) 1);
        int ret = productInstanceDao.updateByPrimaryKey(productInstance);
        return ret;
    }


    /**
     * 创建产品实例
     * 产品实例主要关联表：子账号、产品表、冗余的客户表
     * 客户表：id和姓名由前端传入。二者至少有一个。如果二者都有则直接记录表。如果不全则根据一个查找另一个
     * 产品表：id和名称由前端出入。二者至少有一个。如果二者都有则直接记录表。如果不全则根据一个查找另一个
     * 子账号：根据产品id和客户id查询子账号。如果找到则根据子账号查询已经存在的产品实例，逻辑删除已经存在的产品实例（这一步应该前端控制）
     * 一个客户一个产品只能购买一次。
     * 如果没有找到子账号则创建新的子账号
     * 这里可能找到的原因是系统初始化的时候会录入部分产品。在创建账号的时候会根据用户选择的产品自动创建子账号
     *
     * @param productInstance
     * @return
     */
    public ProductInstance createProductInstance(ProductInstance productInstance) {
        logger.info("create product instance input is " + productInstance);
        String productId = productInstance.getProductId();
        String productName = productInstance.getProductName();
        //这两个参数都应该前端传入。这里作为补充 这段代码不应该被执行
        if((productName == null || "".equals(productName)) && (productId == null || "".equals(productId))){
            //如果两个都是则返回 失败
            logger.error("product name is " + productName + " product id is "  + productId);
            return null;
        }
        Product product = null;
        if(productName == null || "".equals(productName)){
            product = productDao.selectByPrimaryKey(productId);
            if(product == null){
                logger.error("can not find product");
                return null;
            }
            productInstance.setProductName(product.getName());
        }
        if(productId == null || "".equals(productId)){
            product = productDao.selectByName(productName);
            if(product == null){
                logger.error("can not find product");
                return null;
            }
            productInstance.setProductId(product.getId());
        }

        String clientId = productInstance.getClientId();
        productId = productInstance.getProductId();

        logger.info("client id is " + clientId + " product id is " + productId);
        ClientChild clientChild = null;
        //根据client id 和 product id 查找子账号 。这里必须保障clientid 和 productid 非空
        if((clientId == null || "".equals(clientId)) || (productId == null || "".equals(productId))){
            //无法创建
            logger.error("create product instance error client id or product id is null");
            return null;
        }else {
            clientChild = clientChildDao.getClientChildByClientIdAndProductId(clientId,productId);
        }
        if(clientChild == null){
            logger.info("can not find client child by client id is " + clientId + " product id is " + productId + " create one now");

            //新建子账号
            clientChild = new ClientChild();
            String id  = UUID.randomUUID().toString();
            clientChild.setId(id);
            clientChild.setProductId(productId);
            clientChild.setBalance(0F);
            clientChild.setClientId(clientId);
            clientChild.setClientName(productInstance.getClientName());
            clientChild.setName(productInstance.getProductName() + productInstance.getClientName());
            clientChild.setIsDel((byte)0);
            clientChild.setCreateTime(new Date());
            clientChildDao.insert(clientChild);
        }

        //默认未启动状态。需要客户手动出发
        productInstance.setState((byte)0);
        productInstance.setClientChildId(clientChild.getId());
        productInstance.setClientChildName(clientChild.getName());
        productInstance.setCreateTime(new Date());
        productInstance.setIsDel((byte)0);
        int ret = productInstanceDao.insert(productInstance);
        if(ret > 0){
            return productInstance;
        }else {
            return null;
        }
    }
}
