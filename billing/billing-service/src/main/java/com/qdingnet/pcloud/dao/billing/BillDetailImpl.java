package com.qdingnet.pcloud.dao.billing;

import com.qdingnet.pcloud.entity.billing.BillDetail;
import com.qdingnet.pcloud.mapper.billing.BillDetailMapper;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Created by QDHL on 2017/2/6.
 */
@Service("iBillDetail")
public class BillDetailImpl implements IBillDetail {
    private static final Logger logger = Logger.getLogger(BillDetailImpl.class);
    @Autowired
    BillDetailMapper billDetailMapper;
    public int deleteByPrimaryKey(String id) {
        return billDetailMapper.deleteByPrimaryKey(id);
    }

    public int insert(BillDetail record) {
        return billDetailMapper.insert(record);
    }

    public int insertSelective(BillDetail record) {
        return billDetailMapper.insertSelective(record);
    }

    public BillDetail selectByPrimaryKey(String id) {
        return billDetailMapper.selectByPrimaryKey(id);
    }

    public int updateByPrimaryKeySelective(BillDetail record) {
        return billDetailMapper.updateByPrimaryKeySelective(record);
    }

    public int updateByPrimaryKey(BillDetail record) {
        return billDetailMapper.updateByPrimaryKey(record);
    }
}
