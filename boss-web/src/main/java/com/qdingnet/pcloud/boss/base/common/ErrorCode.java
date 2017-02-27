package com.qdingnet.pcloud.boss.base.common;

/**
 * Created by QDHL on 2017/2/13.
 * 公共 code 100***
 * client code 200***
 * client ref code 210***
 * product instance code 220***
 */
public class ErrorCode {

    private static final int CODE_PARAMETER_NULL = 100001;
    private static final String MSG_PARAMETER_NULL = "缺少参数";

    private static final int CODE_JSONTOSTRING_ERROR = 100002;
    private static final String MSG_JSONTOSTRING_ERROR = "json to string error";
    private static final int CODE_STRINGTOJSON_ERROR = 100003;
    private static final String MSG_STRINGTOJSON_ERROR = "string to json error";

    private static final int CODE_CREATE_CLIENTREF_ERROR = 210001;
    private static final String MSG_CREATE_CLIENTERF_ERROR = "创建相关人员失败";

    private static final int CODE_CREATE_PRODUCTINSTANCE_ERROR = 22001;
    private static final String MSG_CREATE_PRODUCTINSTANCE_ERROR = "创建商品实例失败";

    public static String getMsgParameterNull() {
        return MSG_PARAMETER_NULL;
    }

    public static int getCodeParameterNull() {
        return CODE_PARAMETER_NULL;
    }

    public static int getCodeJsontostringError() {
        return CODE_JSONTOSTRING_ERROR;
    }

    public static String getMsgJsontostringError() {
        return MSG_JSONTOSTRING_ERROR;
    }

    public static int getCodeCreateClientrefError() {
        return CODE_CREATE_CLIENTREF_ERROR;
    }

    public static String getMsgCreateClienterfError() {
        return MSG_CREATE_CLIENTERF_ERROR;
    }

    public static int getCodeStringtojsonError() {
        return CODE_STRINGTOJSON_ERROR;
    }

    public static String getMsgStringtojsonError() {
        return MSG_STRINGTOJSON_ERROR;
    }

    public static int getCodeCreateProductinstanceError() {
        return CODE_CREATE_PRODUCTINSTANCE_ERROR;
    }

    public static String getMsgCreateProductinstanceError() {
        return MSG_CREATE_PRODUCTINSTANCE_ERROR;
    }
}
