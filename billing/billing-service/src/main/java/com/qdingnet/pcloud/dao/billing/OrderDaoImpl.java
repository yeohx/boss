package com.qdingnet.pcloud.dao.billing;

import com.qdingnet.pcloud.entity.billing.Order;
import com.qdingnet.pcloud.mapper.billing.OrderMapper;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Created by QDHL on 2017/1/24.
 */
@Service("iOrderDao")
public class OrderDaoImpl implements IOrderDao {
    private static final Logger logger = Logger.getLogger(OrderDaoImpl.class);
    @Autowired
    OrderMapper orderMapper;

    public int deleteByPrimaryKey(String id) {
        return orderMapper.deleteByPrimaryKey(id);
    }

    public int insert(Order record) {
        return orderMapper.insert(record);
    }

    public int insertSelective(Order record) {
        return orderMapper.insertSelective(record);
    }

    public Order selectByPrimaryKey(String id) {
        return orderMapper.selectByPrimaryKey(id);
    }

    public int updateByPrimaryKeySelective(Order record) {
        return orderMapper.updateByPrimaryKeySelective(record);
    }

    public int updateByPrimaryKey(Order record) {
        return orderMapper.updateByPrimaryKey(record);
    }
}
