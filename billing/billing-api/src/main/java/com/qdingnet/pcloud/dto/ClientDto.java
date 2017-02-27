package com.qdingnet.pcloud.dto;

import com.qdingnet.pcloud.common.BaseObject;
import com.qdingnet.pcloud.dao.billing.IClientChildDao;
import com.qdingnet.pcloud.entity.billing.ClientChild;
import com.qdingnet.pcloud.entity.billing.ClientRef;
import com.qdingnet.pcloud.entity.billing.ProductInstance;

import java.util.Date;
import java.util.List;

/**
 * Created by QDHL on 2017/2/6.
 */
public class ClientDto extends BaseObject {
    private String id;

    private String clientName;

    private Float balance;

    private String des;

    private String gapId;

    private String gapName;

    private Short state;

    private Integer versionNum;

    private Byte isDel;

    private Date createTime;

    private String createUserId;

    private Date updateTime;

    private String updateUserId;

    private Date timestamp;

    private List<ClientChildDto> clientChildDtos;

    private List<ClientRef> clientRefs;

    private List<ProductInstance> productInstances;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getClientName() {
        return clientName;
    }

    public void setClientName(String clientName) {
        this.clientName = clientName;
    }

    public Float getBalance() {
        return balance;
    }

    public void setBalance(Float balance) {
        this.balance = balance;
    }

    public String getDes() {
        return des;
    }

    public void setDes(String des) {
        this.des = des;
    }

    public String getGapId() {
        return gapId;
    }

    public void setGapId(String gapId) {
        this.gapId = gapId;
    }

    public String getGapName() {
        return gapName;
    }

    public void setGapName(String gapName) {
        this.gapName = gapName;
    }

    public Short getState() {
        return state;
    }

    public void setState(Short state) {
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


    public List<ClientRef> getClientRefs() {
        return clientRefs;
    }

    public void setClientRefs(List<ClientRef> clientRefs) {
        this.clientRefs = clientRefs;
    }

    public List<ClientChildDto> getClientChildDtos() {
        return clientChildDtos;
    }

    public void setClientChildDtos(List<ClientChildDto> clientChildDtos) {
        this.clientChildDtos = clientChildDtos;
    }

    public List<ProductInstance> getProductInstances() {
        return productInstances;
    }

    public void setProductInstances(List<ProductInstance> productInstances) {
        this.productInstances = productInstances;
    }

    @Override
    public String toString() {
        return "ClientDto{" +
                "id='" + id + '\'' +
                ", clientName='" + clientName + '\'' +
                ", balance=" + balance +
                ", des='" + des + '\'' +
                ", gapId='" + gapId + '\'' +
                ", gapName='" + gapName + '\'' +
                ", state=" + state +
                ", versionNum=" + versionNum +
                ", isDel=" + isDel +
                ", createTime=" + createTime +
                ", createUserId='" + createUserId + '\'' +
                ", updateTime=" + updateTime +
                ", updateUserId='" + updateUserId + '\'' +
                ", timestamp=" + timestamp +
                ", clientChildDtos=" + clientChildDtos +
                ", clientRefs=" + clientRefs +
                ", productInstances=" + productInstances +
                '}';
    }
}
