package com.qdingnet.pcloud.service;

import com.qdingnet.pcloud.dao.billing.IBillDetail;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Created by QDHL on 2017/2/6.
 */
@Service("iBillDetailService")
public class BillDetailServiceImpl implements IBillDetailService {
    private static final Logger logger = Logger.getLogger(BillDetailServiceImpl.class);
    @Autowired
    IBillDetail billDetail;

}
