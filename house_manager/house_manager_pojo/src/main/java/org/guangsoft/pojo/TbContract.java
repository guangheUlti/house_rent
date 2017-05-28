package org.guangsoft.pojo;

import java.util.Date;
import org.springframework.format.annotation.DateTimeFormat;

public class TbContract {
    private Long id;

    private Long member;

    private Long rival;

    private Long house;

    private Long review;

    private Long trade;

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

    public Long getMember() {
        return member;
    }

    public void setMember(Long member) {
        this.member = member;
    }

    public Long getRival() {
        return rival;
    }

    public void setRival(Long rival) {
        this.rival = rival;
    }

    public Long getHouse() {
        return house;
    }

    public void setHouse(Long house) {
        this.house = house;
    }

    public Long getReview() {
        return review;
    }

    public void setReview(Long review) {
        this.review = review;
    }

    public Long getTrade() {
        return trade;
    }

    public void setTrade(Long trade) {
        this.trade = trade;
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