package com.qdingnet.pcloud.dao.billing;

import com.qdingnet.pcloud.entity.billing.LogInfo;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Created by QDHL on 2017/1/24.
 */
@Service("iLogInfoDao")
public class LogInfoDaoImpl implements ILogInfoDao {
    private static final Logger logger = Logger.getLogger(LogInfoDaoImpl.class);
    @Autowired
    ILogInfoDao logInfoDao;
    public int deleteByPrimaryKey(String id) {
        return logInfoDao.deleteByPrimaryKey(id);
    }

    public int insert(LogInfo record) {
        return logInfoDao.insert(record);
    }

    public int insertSelective(LogInfo record) {
        return logInfoDao.insertSelective(record);
    }

    public LogInfo selectByPrimaryKey(String id) {
        return logInfoDao.selectByPrimaryKey(id);
    }

    public int updateByPrimaryKeySelective(LogInfo record) {
        return logInfoDao.updateByPrimaryKeySelective(record);
    }

    public int updateByPrimaryKey(LogInfo record) {
        return logInfoDao.updateByPrimaryKey(record);
    }
}
