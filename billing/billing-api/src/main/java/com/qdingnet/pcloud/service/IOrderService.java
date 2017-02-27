package com.qdingnet.pcloud.service;

import com.qdingnet.pcloud.entity.billing.Client;
import com.qdingnet.pcloud.entity.billing.Order;
import com.qdingnet.pcloud.entity.billing.Product;
import com.qdingnet.pcloud.entity.billing.ProductInstance;

/**
 * Created by QDHL on 2017/1/24.
 */
public interface IOrderService {
    public String createOrder(Order order);

    /**
     * 创建一个产品的订购单
     *
     * @param client 订购人
     * @param productInstance 产品实例
     *                        注：目前没有定义价格计划模型。价格计划暂时由用户传入。
     *                        未来改进：定义价格计划。方法参数修改成：订购人（账号），产品（product），产品价格计划（orderplan）
     * @return
     */
    public String createOrderProduct(Client client, ProductInstance productInstance);


    /**
     * 指定订单生效
     * 修改产品实例状态，开始计费
     * @param id
     * @return
     */
    public String actionOrder(String id);

    public String payOrder(String id);

    /**
     * 为指定产品（子账号） 充值
     * 产生一个充值账单
     * 即时生效 账号余额即时增加
     * @param order
     * @return
     */
    public String rechargeOrder(Order order);
}
