package com.qdingnet.pcloud.entity.billing;

import com.qdingnet.pcloud.common.BaseObject;

import java.util.Date;

public class ClientRef  extends BaseObject {
    private String id;

    private String clientId;

    private String clientName;

    private String role;

    private String name;

    private String phone;

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

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role == null ? null : role.trim();
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name == null ? null : name.trim();
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone == null ? null : phone.trim();
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
        return "ClientRef{" +
                "id='" + id + '\'' +
                ", clientId='" + clientId + '\'' +
                ", clientName='" + clientName + '\'' +
                ", role='" + role + '\'' +
                ", name='" + name + '\'' +
                ", phone='" + phone + '\'' +
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