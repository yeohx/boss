package com.qdingnet.pcloud.mapper.billing;

import com.qdingnet.pcloud.entity.billing.BillDetail;
import org.springframework.stereotype.Repository;

@Repository
public interface BillDetailMapper {
    int deleteByPrimaryKey(String id);

    int insert(BillDetail record);

    int insertSelective(BillDetail record);

    BillDetail selectByPrimaryKey(String id);

    int updateByPrimaryKeySelective(BillDetail record);

    int updateByPrimaryKey(BillDetail record);
}