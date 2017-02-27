package com.qdingnet.pcloud.entity.billing;

import com.qdingnet.pcloud.common.BaseObject;

import java.util.Date;

public class Order  extends BaseObject {
    private String id;

    private String productInstanceId;

    private String clientChildId;

    private String clientChildName;

    private String clientId;

    private String clientName;

    private Float payCount;

    private Date startTime;

    private Date endTime;

    private Byte state;

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

    public String getProductInstanceId() {
        return productInstanceId;
    }

    public void setProductInstanceId(String productInstanceId) {
        this.productInstanceId = productInstanceId == null ? null : productInstanceId.trim();
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

    public Float getPayCount() {
        return payCount;
    }

    public void setPayCount(Float payCount) {
        this.payCount = payCount;
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

    public Byte getState() {
        return state;
    }

    public void setState(Byte state) {
        this.state = state;
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
        return "Order{" +
                "id='" + id + '\'' +
                ", productInstanceId='" + productInstanceId + '\'' +
                ", clientChildId='" + clientChildId + '\'' +
                ", clientChildName='" + clientChildName + '\'' +
                ", clientId='" + clientId + '\'' +
                ", clientName='" + clientName + '\'' +
                ", payCount=" + payCount +
                ", startTime=" + startTime +
                ", endTime=" + endTime +
                ", state=" + state +
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