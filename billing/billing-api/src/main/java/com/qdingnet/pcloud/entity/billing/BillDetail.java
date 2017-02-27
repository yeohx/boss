package com.qdingnet.pcloud.entity.billing;

import com.qdingnet.pcloud.common.BaseObject;

import java.util.Date;

public class BillDetail  extends BaseObject {
    private String id;

    private String orderId;

    private String productInstanceId;

    private String productInstanceName;

    private String clientChildId;

    private String clientChildName;

    private String clientId;

    private String clientName;

    private String productId;

    private String productName;

    private Float pay;

    private Integer payState;

    private Date startTime;

    private Date endTime;

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

    public String getOrderId() {
        return orderId;
    }

    public void setOrderId(String orderId) {
        this.orderId = orderId == null ? null : orderId.trim();
    }

    public String getProductInstanceId() {
        return productInstanceId;
    }

    public void setProductInstanceId(String productInstanceId) {
        this.productInstanceId = productInstanceId == null ? null : productInstanceId.trim();
    }

    public String getProductInstanceName() {
        return productInstanceName;
    }

    public void setProductInstanceName(String productInstanceName) {
        this.productInstanceName = productInstanceName == null ? null : productInstanceName.trim();
    }

    public String getClientChildId() {
        return clientChildId;
    }

    public void setClientChildId(String clientChildId) {
        this.clientChildId = clientChildId == null ? null : clientChildId.trim();
    }

    public String getClientChildName() {
        return clientChildName;
    }

    public void setClientChildName(String clientChildName) {
        this.clientChildName = clientChildName == null ? null : clientChildName.trim();
    }

    public String getClientId() {
        return clientId;
    }

    public void setClientId(String clientId) {
        this.clientId = clientId == null ? null : clientId.trim();
    }

    public String getClientName() {
        return clientName;
    }

    public void setClientName(String clientName) {
        this.clientName = clientName == null ? null : clientName.trim();
    }

    public String getProductId() {
        return productId;
    }

    public void setProductId(String productId) {
        this.productId = productId == null ? null : productId.trim();
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName == null ? null : productName.trim();
    }

    public Float getPay() {
        return pay;
    }

    public void setPay(Float pay) {
        this.pay = pay;
    }

    public Integer getPayState() {
        return payState;
    }

    public void setPayState(Integer payState) {
        this.payState = payState;
    }

    public Date getStartTime() {
        return startTime;
    }

    public void setStartTime(Date startTime) {
        this.startTime = startTime;
    }

    public Date getEndTime() {
        return endTime;
    }

    public void setEndTime(Date endTime) {
        this.endTime = endTime;
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
        return "BillDetail{" +
                "id='" + id + '\'' +
                ", orderId='" + orderId + '\'' +
                ", productInstanceId='" + productInstanceId + '\'' +
                ", productInstanceName='" + productInstanceName + '\'' +
                ", clientChildId='" + clientChildId + '\'' +
                ", clientChildName='" + clientChildName + '\'' +
                ", clientId='" + clientId + '\'' +
                ", clientName='" + clientName + '\'' +
                ", productId='" + productId + '\'' +
                ", productName='" + productName + '\'' +
                ", pay=" + pay +
                ", payState=" + payState +
                ", startTime=" + startTime +
                ", endTime=" + endTime +
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