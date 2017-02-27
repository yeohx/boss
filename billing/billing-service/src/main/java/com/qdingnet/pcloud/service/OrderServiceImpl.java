package com.qdingnet.pcloud.service;

import com.qdingnet.pcloud.dao.billing.IClientChildDao;
import com.qdingnet.pcloud.dao.billing.IOrderDao;
import com.qdingnet.pcloud.dao.billing.IProductInstanceDao;
import com.qdingnet.pcloud.entity.billing.Client;
import com.qdingnet.pcloud.entity.billing.ClientChild;
import com.qdingnet.pcloud.entity.billing.Order;
import com.qdingnet.pcloud.entity.billing.ProductInstance;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Date;
import java.util.UUID;

/**
 * Created by QDHL on 2017/1/24.
 */
public class OrderServiceImpl implements IOrderService {
    private static final Logger logger = Logger.getLogger(OrderServiceImpl.class);
    @Autowired
    IOrderDao orderDao;
    @Autowired
    IProductInstanceDao productInstanceDao;
    @Autowired
    IClientChildDao clientChildDao;

    /**
     *
     * @param order
     * @return 返回值暂时定义成orderid。id不是在方法里创建应该返回 写入是否成功 ？？？ TODO
     */
    public String createOrder(Order order) {
        int ret = orderDao.insert(order);
        if(ret > 0){
            return order.getId();
        }
        return null;
    }

    /**
     * 这里传入的productInstance 不完成。
     * 根据client 和 productInstance 的部分参数封装完成的productInstance.写入数据库
     * 然后根据 productInstance 创建默认的订单。订单状态未激活。productInstance状态未计费
     * @param client 订购人
     * @param productInstance 产品实例
     *                        注：目前没有定义价格计划模型。价格计划暂时由用户传入。
     *                        未来改进：定义价格计划。方法参数修改成：订购人（账号），产品（product），产品价格计划（orderplan）
     * @return
     */
    public String createOrderProduct(Client client, ProductInstance productInstance) {
        Order order = new Order();
        order.setId(UUID.randomUUID().toString());
        order.setClientChildId(productInstance.getClientChildId());
        order.setCreateTime(new Date());
        order.setProductInstanceId(productInstance.getId());
        order.setState(new Byte("0"));
        orderDao.insert(order);
        return order.getId();
    }

    /**
     * 产品订单生效
     * 创建的产品实例状态修改成计费创建
     * @param id 订单id
     *
     * @return
     */
    public String actionOrder(String id) {
        Order order = orderDao.selectByPrimaryKey(id);
        order.setState(new Byte("1"));
        orderDao.updateByPrimaryKeySelective(order);
        String productInstaceId = order.getProductInstanceId();
        ProductInstance productInstance = productInstanceDao.selectByPrimaryKey(productInstaceId);
        productInstance.setState(new Byte("1"));
        productInstanceDao.updateByPrimaryKeySelective(productInstance);
        return order.getId();
    }

    public String payOrder(String id) {
        return null;
    }

    /**
     * 充值订单
     * 创建充值订单，修改子账号余额
     * @param order
     * @return
     */
    public String rechargeOrder(Order order) {
        int ret = orderDao.insert(order);
        float payCount = order.getPayCount();
        String clientChildId = order.getClientChildId();
        ClientChild clientChild = clientChildDao.selectByPrimaryKey(clientChildId);

        float balance = clientChild.getBalance();

        clientChild.setBalance(balance + payCount);

        clientChildDao.updateByPrimaryKeySelective(clientChild);
        return order.getId();
    }
}
