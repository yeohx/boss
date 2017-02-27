package com.qdingnet.pcloud.mapper.billing;

import com.qdingnet.pcloud.entity.billing.LogInfo;
import org.springframework.stereotype.Repository;

@Repository
public interface LogInfoMapper {
    int deleteByPrimaryKey(String id);

    int insert(LogInfo record);

    int insertSelective(LogInfo record);

    LogInfo selectByPrimaryKey(String id);

    int updateByPrimaryKeySelective(LogInfo record);

    int updateByPrimaryKey(LogInfo record);
}