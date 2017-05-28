package org.guangsoft.pojo;

import java.util.Date;
import org.springframework.format.annotation.DateTimeFormat;

public class TbHouse {
    private Long id;

    private String brief;

    private String addcode;

    private String address;

    private Byte type;

    private Double area;

    private Integer floor;

    private Integer rooms;

    private String orient;

    private Double rental;

    private Integer lease;

    private String detail;

    private Byte status;

    @DateTimeFormat(pattern="yyyy-MM-dd")
    private Date createTime;

    @DateTimeFormat(pattern="yyyy-MM-dd")
    private Date updateTime;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getBrief() {
        return brief;
    }

    public void setBrief(String brief) {
        this.brief = brief == null ? null : brief.trim();
    }

    public String getAddcode() {
        return addcode;
    }

    public void setAddcode(String addcode) {
        this.addcode = addcode == null ? null : addcode.trim();
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address == null ? null : address.trim();
    }

    public Byte getType() {
        return type;
    }

    public void setType(Byte type) {
        this.type = type;
    }

    public Double getArea() {
        return area;
    }

    public void setArea(Double area) {
        this.area = area;
    }

    public Integer getFloor() {
        return floor;
    }

    public void setFloor(Integer floor) {
        this.floor = floor;
    }

    public Integer getRooms() {
        return rooms;
    }

    public void setRooms(Integer rooms) {
        this.rooms = rooms;
    }

    public String getOrient() {
        return orient;
    }

    public void setOrient(String orient) {
        this.orient = orient == null ? null : orient.trim();
    }

    public Double getRental() {
        return rental;
    }

    public void setRental(Double rental) {
        this.rental = rental;
    }

    public Integer getLease() {
        return lease;
    }

    public void setLease(Integer lease) {
        this.lease = lease;
    }

    public String getDetail() {
        return detail;
    }

    public void setDetail(String detail) {
        this.detail = detail == null ? null : detail.trim();
    }

    public Byte getStatus() {
        return status;
    }

    public void setStatus(Byte status) {
        this.status = status;
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    public Date getUpdateTime() {
        return updateTime;
    }

    public void setUpdateTime(Date updateTime) {
        this.updateTime = updateTime;
    }
}