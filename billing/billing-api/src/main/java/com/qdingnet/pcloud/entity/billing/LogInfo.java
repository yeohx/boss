package com.qdingnet.pcloud.entity.billing;

import com.qdingnet.pcloud.common.BaseObject;

import java.util.Date;

public class LogInfo  extends BaseObject {
    private String id;

    private String action;

    private Float payment;

    private String clientChildId;

    private String productInstanceId;

    private Integer state;

    private String orderId;

    private Integer versionNum;

    private Byte isDel;

    private Date createTime;

    private String createUserId;

    private Date updateTime;

    private String updateUserId;

    private Date timestamp;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id == null ? null : id.trim();
    }

    public String getAction() {
        return action;
    }

    public void setAction(String action) {
        this.action = action == null ? null : action.trim();
    }

    public Float getPayment() {
        return payment;
    }

    public void setPayment(Float payment) {
        this.payment = payment;
    }

    public String getClientChildId() {
        return clientChildId;
    }

    public void setClientChildId(String clientChildId) {
        this.clientChildId = clientChildId == null ? null : clientChildId.trim();
    }

    public String getProductInstanceId() {
        return productInstanceId;
    }

    public void setProductInstanceId(String productInstanceId) {
        this.productInstanceId = productInstanceId == null ? null : productInstanceId.trim();
    }

    public Integer getState() {
        return state;
    }

    public void setState(Integer state) {
        this.state = state;
    }

    public String getOrderId() {
        return orderId;
    }

    public void setOrderId(String orderId) {
        this.orderId = orderId == null ? null : orderId.trim();
    }

    public Integer getVersionNum() {
        return versionNum;
    }

    public void setVersionNum(Integer versionNum) {
        this.versionNum = versionNum;
    }

    public Byte getIsDel() {
        return isDel;
    }

    public void setIsDel(Byte isDel) {
        this.isDel = isDel;
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    public String getCreateUserId() {
        return createUserId;
    }

    public void setCreateUserId(String createUserId) {
        this.createUserId = createUserId == null ? null : createUserId.trim();
    }

    public Date getUpdateTime() {
        return updateTime;
    }

    public void setUpdateTime(Date updateTime) {
        this.updateTime = updateTime;
    }

    public String getUpdateUserId() {
        return updateUserId;
    }

    public void setUpdateUserId(String updateUserId) {
        this.updateUserId = updateUserId == null ? null : updateUserId.trim();
    }

    public Date getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(Date timestamp) {
        this.timestamp = timestamp;
    }

    @Override
    public String toString() {
        return "LogInfo{" +
                "id='" + id + '\'' +
                ", action='" + action + '\'' +
                ", payment=" + payment +
                ", clientChildId='" + clientChildId + '\'' +
                ", productInstanceId='" + productInstanceId + '\'' +
                ", state=" + state +
                ", orderId='" + orderId + '\'' +
                ", versionNum=" + versionNum +
                ", isDel=" + isDel +
                ", createTime=" + createTime +
                ", createUserId='" + createUserId + '\'' +
                ", updateTime=" + updateTime +
                ", updateUserId='" + updateUserId + '\'' +
                ", timestamp=" + timestamp +
                '}';
    }
}