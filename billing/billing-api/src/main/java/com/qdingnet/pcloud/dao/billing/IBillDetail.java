package com.qdingnet.pcloud.dao.billing;

import com.qdingnet.pcloud.entity.billing.BillDetail;

/**
 * Created by QDHL on 2017/2/6.
 */
public interface IBillDetail {
    int deleteByPrimaryKey(String id);

    int insert(BillDetail record);

    int insertSelective(BillDetail record);

    BillDetail selectByPrimaryKey(String id);

    int updateByPrimaryKeySelective(BillDetail record);

    int updateByPrimaryKey(BillDetail record);
}
