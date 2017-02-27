package com.qdingnet.pcloud.dto;

import com.qdingnet.pcloud.common.BaseObject;

import java.util.Date;

/**
 * Created by QDHL on 2017/2/6.
 * 子账号DTO关联产品信息（子账号和产品信息一一对应）
 */
public class ClientChildDto extends BaseObject {

    private String id;

    private String clientId;

    private String name;

    private Float balance;

    private Integer versionNum;

    private Byte isDel;

    private Date createTime;

    private String createUserId;

    private Date updateTime;

    private String updateUserId;

    private Date timestamp;

    private String productId;

    private String productName;

    private Integer type;

    private Float unitPrice;

    private Float total;

    private Integer count;

    private Byte state;

    private String clientChildId;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getClientId() {
        return clientId;
    }

    public void setClientId(String clientId) {
        this.clientId = clientId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Float getBalance() {
        return balance;
    }

    public void setBalance(Float balance) {
        this.balance = balance;
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
        this.createUserId = createUserId;
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
        this.updateUserId = updateUserId;
    }

    public Date getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(Date timestamp) {
        this.timestamp = timestamp;
    }

    public String getProductId() {
        return productId;
    }

    public void setProductId(String productId) {
        this.productId = productId;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
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
        this.clientChildId = clientChildId;
    }

    @Override
    public String toString() {
        return "ClientChildDto{" +
                "id='" + id + '\'' +
                ", clientId='" + clientId + '\'' +
                ", name='" + name + '\'' +
                ", balance=" + balance +
                ", versionNum=" + versionNum +
                ", isDel=" + isDel +
                ", createTime=" + createTime +
                ", createUserId='" + createUserId + '\'' +
                ", updateTime=" + updateTime +
                ", updateUserId='" + updateUserId + '\'' +
                ", timestamp=" + timestamp +
                ", productId='" + productId + '\'' +
                ", productName='" + productName + '\'' +
                ", type=" + type +
                ", unitPrice=" + unitPrice +
                ", total=" + total +
                ", count=" + count +
                ", state=" + state +
                ", clientChildId='" + clientChildId + '\'' +
                '}';
    }
}
