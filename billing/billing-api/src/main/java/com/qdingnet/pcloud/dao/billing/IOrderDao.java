package com.qdingnet.pcloud.dao.billing;

import com.qdingnet.pcloud.entity.billing.Order;

/**
 * Created by QDHL on 2017/1/24.
 */
public interface IOrderDao {
    int deleteByPrimaryKey(String id);

    int insert(Order record);

    int insertSelective(Order record);

    Order selectByPrimaryKey(String id);

    int updateByPrimaryKeySelective(Order record);

    int updateByPrimaryKey(Order record);
}
