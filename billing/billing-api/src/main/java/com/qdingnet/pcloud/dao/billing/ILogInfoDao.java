package com.qdingnet.pcloud.dao.billing;

import com.qdingnet.pcloud.entity.billing.LogInfo;

/**
 * Created by QDHL on 2017/1/24.
 */
public interface ILogInfoDao {
    int deleteByPrimaryKey(String id);

    int insert(LogInfo record);

    int insertSelective(LogInfo record);

    LogInfo selectByPrimaryKey(String id);

    int updateByPrimaryKeySelective(LogInfo record);

    int updateByPrimaryKey(LogInfo record);
}
