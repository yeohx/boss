package com.qdingnet.pcloud.dao.billing;

import com.qdingnet.pcloud.dto.ClientChildDto;
import com.qdingnet.pcloud.entity.billing.ClientChild;
import com.qdingnet.pcloud.mapper.billing.ClientChildMapper;
import com.qdingnet.pcloud.mapper.billing.ClientMapper;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by QDHL on 2017/1/24.
 */
@Service("iClientChildDao")
public class ClientChildDaoImpl implements IClientChildDao {
    private static final Logger logger = Logger.getLogger(ClientChildDaoImpl.class);
    @Autowired
    ClientChildMapper clientChildMapper;

    public int deleteByPrimaryKey(String id) {
        return clientChildMapper.deleteByPrimaryKey(id);
    }

    public int insert(ClientChild record) {
        return clientChildMapper.insert(record);
    }

    public int insertSelective(ClientChild record) {
        return clientChildMapper.insertSelective(record);
    }

    public ClientChild selectByPrimaryKey(String id) {
        return clientChildMapper.selectByPrimaryKey(id);
    }

    public List<ClientChildDto> getClientChildDtoByClientId(String clientId) {
        return null;
    }

    public ClientChild getClientChildByClientIdAndProductId(String clientId, String productId) {
        //这里有风险 参数错误和查不到返回一样的结果？？？
//        if((clientId == null || "".equals(clientId)) || (productId == null || "".equals(productId))){
//            return null;
//        }
        return clientChildMapper.getClientChildByClientIdAndProductId(clientId,productId);
    }

    public int updateByPrimaryKeySelective(ClientChild record) {
        return clientChildMapper.updateByPrimaryKeySelective(record);
    }

    public int updateByPrimaryKey(ClientChild record) {
        return clientChildMapper.updateByPrimaryKey(record);
    }
}
