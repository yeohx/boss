package com.qdingnet.pcloud.entity.billing;

import com.qdingnet.pcloud.common.BaseObject;

import java.util.Date;

public class ProductInstance  extends BaseObject {
    private String id;

    private String productId;

    private String productName;

    private Integer type;

    private Float unitPrice;

    private Float total;

    private Integer count;

    private Byte state;

    private String clientChildId;

    private String clientChildName;

    private String clientId;

    private String clientName;

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

    public Integer getType() {
        return type;
    }

    public void setType(Integer type) {
        this.type = type;
    }

    public Float getUnitPrice() {
        return unitPrice;
    }

    public void setUnitPrice(Float unitPrice) {
        this.unitPrice = unitPrice;
    }

    public Float getTotal() {
        return total;
    }

    public void setTotal(Float total) {
        this.total = total;
    }

    public Integer getCount() {
        return count;
    }

    public void setCount(Integer count) {
        this.count = count;
    }

    public Byte getState() {
        return state;
    }

    public void setState(Byte state) {
        this.state = state;
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
        return "ProductInstance{" +
                "id='" + id + '\'' +
                ", productId='" + productId + '\'' +
                ", productName='" + productName + '\'' +
                ", type=" + type +
                ", unitPrice=" + unitPrice +
                ", total=" + total +
                ", count=" + count +
                ", state=" + state +
                ", clientChildId='" + clientChildId + '\'' +
                ", clientChildName='" + clientChildName + '\'' +
                ", clientId='" + clientId + '\'' +
                ", clientName='" + clientName + '\'' +
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