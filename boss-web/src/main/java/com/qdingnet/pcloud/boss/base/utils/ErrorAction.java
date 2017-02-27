package com.qdingnet.pcloud.boss.base.utils;

import com.qdingnet.pcloud.boss.ClientController;
import com.qdingnet.pcloud.boss.base.common.ErrorCode;
import org.apache.log4j.Logger;

import javax.servlet.http.HttpServletResponse;

/**
 * Created by QDHL on 2017/2/13.
 */
public class ErrorAction {
    private static final Logger logger = Logger.getLogger(ErrorAction.class);
    public static void errorReturn(HttpServletResponse response,int errorCode,String errorMessage,String outInfo){
        try {
            try {
                response.sendError(errorCode,errorMessage);
                response.getWriter().print(outInfo);
            }catch (Exception e){
                logger.error("error info is " + e);
            }
        }catch (Exception e){
            logger.error("error info is " + e);
        }
    }
}
