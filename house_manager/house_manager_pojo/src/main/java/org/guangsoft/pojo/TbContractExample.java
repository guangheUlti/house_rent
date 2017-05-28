package org.guangsoft.pojo;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class TbContractExample {
    protected String orderByClause;

    protected boolean distinct;

    protected List<Criteria> oredCriteria;

    public TbContractExample() {
        oredCriteria = new ArrayList<Criteria>();
    }

    public void setOrderByClause(String orderByClause) {
        this.orderByClause = orderByClause;
    }

    public String getOrderByClause() {
        return orderByClause;
    }

    public void setDistinct(boolean distinct) {
        this.distinct = distinct;
    }

    public boolean isDistinct() {
        return distinct;
    }

    public List<Criteria> getOredCriteria() {
        return oredCriteria;
    }

    public void or(Criteria criteria) {
        oredCriteria.add(criteria);
    }

    public Criteria or() {
        Criteria criteria = createCriteriaInternal();
        oredCriteria.add(criteria);
        return criteria;
    }

    public Criteria createCriteria() {
        Criteria criteria = createCriteriaInternal();
        if (oredCriteria.size() == 0) {
            oredCriteria.add(criteria);
        }
        return criteria;
    }

    protected Criteria createCriteriaInternal() {
        Criteria criteria = new Criteria();
        return criteria;
    }

    public void clear() {
        oredCriteria.clear();
        orderByClause = null;
        distinct = false;
    }

    protected abstract static class GeneratedCriteria {
        protected List<Criterion> criteria;

        protected GeneratedCriteria() {
            super();
            criteria = new ArrayList<Criterion>();
        }

        public boolean isValid() {
            return criteria.size() > 0;
        }

        public List<Criterion> getAllCriteria() {
            return criteria;
        }

        public List<Criterion> getCriteria() {
            return criteria;
        }

        protected void addCriterion(String condition) {
            if (condition == null) {
                throw new RuntimeException("Value for condition cannot be null");
            }
            criteria.add(new Criterion(condition));
        }

        protected void addCriterion(String condition, Object value, String property) {
            if (value == null) {
                throw new RuntimeException("Value for " + property + " cannot be null");
            }
            criteria.add(new Criterion(condition, value));
        }

        protected void addCriterion(String condition, Object value1, Object value2, String property) {
            if (value1 == null || value2 == null) {
                throw new RuntimeException("Between values for " + property + " cannot be null");
            }
            criteria.add(new Criterion(condition, value1, value2));
        }

        public Criteria andIdIsNull() {
            addCriterion("id is null");
            return (Criteria) this;
        }

        public Criteria andIdIsNotNull() {
            addCriterion("id is not null");
            return (Criteria) this;
        }

        public Criteria andIdEqualTo(Long value) {
            addCriterion("id =", value, "id");
            return (Criteria) this;
        }

        public Criteria andIdNotEqualTo(Long value) {
            addCriterion("id <>", value, "id");
            return (Criteria) this;
        }

        public Criteria andIdGreaterThan(Long value) {
            addCriterion("id >", value, "id");
            return (Criteria) this;
        }

        public Criteria andIdGreaterThanOrEqualTo(Long value) {
            addCriterion("id >=", value, "id");
            return (Criteria) this;
        }

        public Criteria andIdLessThan(Long value) {
            addCriterion("id <", value, "id");
            return (Criteria) this;
        }

        public Criteria andIdLessThanOrEqualTo(Long value) {
            addCriterion("id <=", value, "id");
            return (Criteria) this;
        }

        public Criteria andIdIn(List<Long> values) {
            addCriterion("id in", values, "id");
            return (Criteria) this;
        }

        public Criteria andIdNotIn(List<Long> values) {
            addCriterion("id not in", values, "id");
            return (Criteria) this;
        }

        public Criteria andIdBetween(Long value1, Long value2) {
            addCriterion("id between", value1, value2, "id");
            return (Criteria) this;
        }

        public Criteria andIdNotBetween(Long value1, Long value2) {
            addCriterion("id not between", value1, value2, "id");
            return (Criteria) this;
        }

        public Criteria andMemberIsNull() {
            addCriterion("member is null");
            return (Criteria) this;
        }

        public Criteria andMemberIsNotNull() {
            addCriterion("member is not null");
            return (Criteria) this;
        }

        public Criteria andMemberEqualTo(Long value) {
            addCriterion("member =", value, "member");
            return (Criteria) this;
        }

        public Criteria andMemberNotEqualTo(Long value) {
            addCriterion("member <>", value, "member");
            return (Criteria) this;
        }

        public Criteria andMemberGreaterThan(Long value) {
            addCriterion("member >", value, "member");
            return (Criteria) this;
        }

        public Criteria andMemberGreaterThanOrEqualTo(Long value) {
            addCriterion("member >=", value, "member");
            return (Criteria) this;
        }

        public Criteria andMemberLessThan(Long value) {
            addCriterion("member <", value, "member");
            return (Criteria) this;
        }

        public Criteria andMemberLessThanOrEqualTo(Long value) {
            addCriterion("member <=", value, "member");
            return (Criteria) this;
        }

        public Criteria andMemberIn(List<Long> values) {
            addCriterion("member in", values, "member");
            return (Criteria) this;
        }

        public Criteria andMemberNotIn(List<Long> values) {
            addCriterion("member not in", values, "member");
            return (Criteria) this;
        }

        public Criteria andMemberBetween(Long value1, Long value2) {
            addCriterion("member between", value1, value2, "member");
            return (Criteria) this;
        }

        public Criteria andMemberNotBetween(Long value1, Long value2) {
            addCriterion("member not between", value1, value2, "member");
            return (Criteria) this;
        }

        public Criteria andRivalIsNull() {
            addCriterion("rival is null");
            return (Criteria) this;
        }

        public Criteria andRivalIsNotNull() {
            addCriterion("rival is not null");
            return (Criteria) this;
        }

        public Criteria andRivalEqualTo(Long value) {
            addCriterion("rival =", value, "rival");
            return (Criteria) this;
        }

        public Criteria andRivalNotEqualTo(Long value) {
            addCriterion("rival <>", value, "rival");
            return (Criteria) this;
        }

        public Criteria andRivalGreaterThan(Long value) {
            addCriterion("rival >", value, "rival");
            return (Criteria) this;
        }

        public Criteria andRivalGreaterThanOrEqualTo(Long value) {
            addCriterion("rival >=", value, "rival");
            return (Criteria) this;
        }

        public Criteria andRivalLessThan(Long value) {
            addCriterion("rival <", value, "rival");
            return (Criteria) this;
        }

        public Criteria andRivalLessThanOrEqualTo(Long value) {
            addCriterion("rival <=", value, "rival");
            return (Criteria) this;
        }

        public Criteria andRivalIn(List<Long> values) {
            addCriterion("rival in", values, "rival");
            return (Criteria) this;
        }

        public Criteria andRivalNotIn(List<Long> values) {
            addCriterion("rival not in", values, "rival");
            return (Criteria) this;
        }

        public Criteria andRivalBetween(Long value1, Long value2) {
            addCriterion("rival between", value1, value2, "rival");
            return (Criteria) this;
        }

        public Criteria andRivalNotBetween(Long value1, Long value2) {
            addCriterion("rival not between", value1, value2, "rival");
            return (Criteria) this;
        }

        public Criteria andHouseIsNull() {
            addCriterion("house is null");
            return (Criteria) this;
        }

        public Criteria andHouseIsNotNull() {
            addCriterion("house is not null");
            return (Criteria) this;
        }

        public Criteria andHouseEqualTo(Long value) {
            addCriterion("house =", value, "house");
            return (Criteria) this;
        }

        public Criteria andHouseNotEqualTo(Long value) {
            addCriterion("house <>", value, "house");
            return (Criteria) this;
        }

        public Criteria andHouseGreaterThan(Long value) {
            addCriterion("house >", value, "house");
            return (Criteria) this;
        }

        public Criteria andHouseGreaterThanOrEqualTo(Long value) {
            addCriterion("house >=", value, "house");
            return (Criteria) this;
        }

        public Criteria andHouseLessThan(Long value) {
            addCriterion("house <", value, "house");
            return (Criteria) this;
        }

        public Criteria andHouseLessThanOrEqualTo(Long value) {
            addCriterion("house <=", value, "house");
            return (Criteria) this;
        }

        public Criteria andHouseIn(List<Long> values) {
            addCriterion("house in", values, "house");
            return (Criteria) this;
        }

        public Criteria andHouseNotIn(List<Long> values) {
            addCriterion("house not in", values, "house");
            return (Criteria) this;
        }

        public Criteria andHouseBetween(Long value1, Long value2) {
            addCriterion("house between", value1, value2, "house");
            return (Criteria) this;
        }

        public Criteria andHouseNotBetween(Long value1, Long value2) {
            addCriterion("house not between", value1, value2, "house");
            return (Criteria) this;
        }

        public Criteria andReviewIsNull() {
            addCriterion("review is null");
            return (Criteria) this;
        }

        public Criteria andReviewIsNotNull() {
            addCriterion("review is not null");
            return (Criteria) this;
        }

        public Criteria andReviewEqualTo(Long value) {
            addCriterion("review =", value, "review");
            return (Criteria) this;
        }

        public Criteria andReviewNotEqualTo(Long value) {
            addCriterion("review <>", value, "review");
            return (Criteria) this;
        }

        public Criteria andReviewGreaterThan(Long value) {
            addCriterion("review >", value, "review");
            return (Criteria) this;
        }

        public Criteria andReviewGreaterThanOrEqualTo(Long value) {
            addCriterion("review >=", value, "review");
            return (Criteria) this;
        }

        public Criteria andReviewLessThan(Long value) {
            addCriterion("review <", value, "review");
            return (Criteria) this;
        }

        public Criteria andReviewLessThanOrEqualTo(Long value) {
            addCriterion("review <=", value, "review");
            return (Criteria) this;
        }

        public Criteria andReviewIn(List<Long> values) {
            addCriterion("review in", values, "review");
            return (Criteria) this;
        }

        public Criteria andReviewNotIn(List<Long> values) {
            addCriterion("review not in", values, "review");
            return (Criteria) this;
        }

        public Criteria andReviewBetween(Long value1, Long value2) {
            addCriterion("review between", value1, value2, "review");
            return (Criteria) this;
        }

        public Criteria andReviewNotBetween(Long value1, Long value2) {
            addCriterion("review not between", value1, value2, "review");
            return (Criteria) this;
        }

        public Criteria andTradeIsNull() {
            addCriterion("trade is null");
            return (Criteria) this;
        }

        public Criteria andTradeIsNotNull() {
            addCriterion("trade is not null");
            return (Criteria) this;
        }

        public Criteria andTradeEqualTo(Long value) {
            addCriterion("trade =", value, "trade");
            return (Criteria) this;
        }

        public Criteria andTradeNotEqualTo(Long value) {
            addCriterion("trade <>", value, "trade");
            return (Criteria) this;
        }

        public Criteria andTradeGreaterThan(Long value) {
            addCriterion("trade >", value, "trade");
            return (Criteria) this;
        }

        public Criteria andTradeGreaterThanOrEqualTo(Long value) {
            addCriterion("trade >=", value, "trade");
            return (Criteria) this;
        }

        public Criteria andTradeLessThan(Long value) {
            addCriterion("trade <", value, "trade");
            return (Criteria) this;
        }

        public Criteria andTradeLessThanOrEqualTo(Long value) {
            addCriterion("trade <=", value, "trade");
            return (Criteria) this;
        }

        public Criteria andTradeIn(List<Long> values) {
            addCriterion("trade in", values, "trade");
            return (Criteria) this;
        }

        public Criteria andTradeNotIn(List<Long> values) {
            addCriterion("trade not in", values, "trade");
            return (Criteria) this;
        }

        public Criteria andTradeBetween(Long value1, Long value2) {
            addCriterion("trade between", value1, value2, "trade");
            return (Criteria) this;
        }

        public Criteria andTradeNotBetween(Long value1, Long value2) {
            addCriterion("trade not between", value1, value2, "trade");
            return (Criteria) this;
        }

        public Criteria andStatusIsNull() {
            addCriterion("status is null");
            return (Criteria) this;
        }

        public Criteria andStatusIsNotNull() {
            addCriterion("status is not null");
            return (Criteria) this;
        }

        public Criteria andStatusEqualTo(Byte value) {
            addCriterion("status =", value, "status");
            return (Criteria) this;
        }

        public Criteria andStatusNotEqualTo(Byte value) {
            addCriterion("status <>", value, "status");
            return (Criteria) this;
        }

        public Criteria andStatusGreaterThan(Byte value) {
            addCriterion("status >", value, "status");
            return (Criteria) this;
        }

        public Criteria andStatusGreaterThanOrEqualTo(Byte value) {
            addCriterion("status >=", value, "status");
            return (Criteria) this;
        }

        public Criteria andStatusLessThan(Byte value) {
            addCriterion("status <", value, "status");
            return (Criteria) this;
        }

        public Criteria andStatusLessThanOrEqualTo(Byte value) {
            addCriterion("status <=", value, "status");
            return (Criteria) this;
        }

        public Criteria andStatusIn(List<Byte> values) {
            addCriterion("status in", values, "status");
            return (Criteria) this;
        }

        public Criteria andStatusNotIn(List<Byte> values) {
            addCriterion("status not in", values, "status");
            return (Criteria) this;
        }

        public Criteria andStatusBetween(Byte value1, Byte value2) {
            addCriterion("status between", value1, value2, "status");
            return (Criteria) this;
        }

        public Criteria andStatusNotBetween(Byte value1, Byte value2) {
            addCriterion("status not between", value1, value2, "status");
            return (Criteria) this;
        }

        public Criteria andCreateTimeIsNull() {
            addCriterion("create_time is null");
            return (Criteria) this;
        }

        public Criteria andCreateTimeIsNotNull() {
            addCriterion("create_time is not null");
            return (Criteria) this;
        }

        public Criteria andCreateTimeEqualTo(Date value) {
            addCriterion("create_time =", value, "createTime");
            return (Criteria) this;
        }

        public Criteria andCreateTimeNotEqualTo(Date value) {
            addCriterion("create_time <>", value, "createTime");
            return (Criteria) this;
        }

        public Criteria andCreateTimeGreaterThan(Date value) {
            addCriterion("create_time >", value, "createTime");
            return (Criteria) this;
        }

        public Criteria andCreateTimeGreaterThanOrEqualTo(Date value) {
            addCriterion("create_time >=", value, "createTime");
            return (Criteria) this;
        }

        public Criteria andCreateTimeLessThan(Date value) {
            addCriterion("create_time <", value, "createTime");
            return (Criteria) this;
        }

        public Criteria andCreateTimeLessThanOrEqualTo(Date value) {
            addCriterion("create_time <=", value, "createTime");
            return (Criteria) this;
        }

        public Criteria andCreateTimeIn(List<Date> values) {
            addCriterion("create_time in", values, "createTime");
            return (Criteria) this;
        }

        public Criteria andCreateTimeNotIn(List<Date> values) {
            addCriterion("create_time not in", values, "createTime");
            return (Criteria) this;
        }

        public Criteria andCreateTimeBetween(Date value1, Date value2) {
            addCriterion("create_time between", value1, value2, "createTime");
            return (Criteria) this;
        }

        public Criteria andCreateTimeNotBetween(Date value1, Date value2) {
            addCriterion("create_time not between", value1, value2, "createTime");
            return (Criteria) this;
        }

        public Criteria andUpdateTimeIsNull() {
            addCriterion("update_time is null");
            return (Criteria) this;
        }

        public Criteria andUpdateTimeIsNotNull() {
            addCriterion("update_time is not null");
            return (Criteria) this;
        }

        public Criteria andUpdateTimeEqualTo(Date value) {
            addCriterion("update_time =", value, "updateTime");
            return (Criteria) this;
        }

        public Criteria andUpdateTimeNotEqualTo(Date value) {
            addCriterion("update_time <>", value, "updateTime");
            return (Criteria) this;
        }

        public Criteria andUpdateTimeGreaterThan(Date value) {
            addCriterion("update_time >", value, "updateTime");
            return (Criteria) this;
        }

        public Criteria andUpdateTimeGreaterThanOrEqualTo(Date value) {
            addCriterion("update_time >=", value, "updateTime");
            return (Criteria) this;
        }

        public Criteria andUpdateTimeLessThan(Date value) {
            addCriterion("update_time <", value, "updateTime");
            return (Criteria) this;
        }

        public Criteria andUpdateTimeLessThanOrEqualTo(Date value) {
            addCriterion("update_time <=", value, "updateTime");
            return (Criteria) this;
        }

        public Criteria andUpdateTimeIn(List<Date> values) {
            addCriterion("update_time in", values, "updateTime");
            return (Criteria) this;
        }

        public Criteria andUpdateTimeNotIn(List<Date> values) {
            addCriterion("update_time not in", values, "updateTime");
            return (Criteria) this;
        }

        public Criteria andUpdateTimeBetween(Date value1, Date value2) {
            addCriterion("update_time between", value1, value2, "updateTime");
            return (Criteria) this;
        }

        public Criteria andUpdateTimeNotBetween(Date value1, Date value2) {
            addCriterion("update_time not between", value1, value2, "updateTime");
            return (Criteria) this;
        }
    }

    public static class Criteria extends GeneratedCriteria {

        protected Criteria() {
            super();
        }
    }

    public static class Criterion {
        private String condition;

        private Object value;

        private Object secondValue;

        private boolean noValue;

        private boolean singleValue;

        private boolean betweenValue;

        private boolean listValue;

        private String typeHandler;

        public String getCondition() {
            return condition;
        }

        public Object getValue() {
            return value;
        }

        public Object getSecondValue() {
            return secondValue;
        }

        public boolean isNoValue() {
            return noValue;
        }

        public boolean isSingleValue() {
            return singleValue;
        }

        public boolean isBetweenValue() {
            return betweenValue;
        }

        public boolean isListValue() {
            return listValue;
        }

        public String getTypeHandler() {
            return typeHandler;
        }

        protected Criterion(String condition) {
            super();
            this.condition = condition;
            this.typeHandler = null;
            this.noValue = true;
        }

        protected Criterion(String condition, Object value, String typeHandler) {
            super();
            this.condition = condition;
            this.value = value;
            this.typeHandler = typeHandler;
            if (value instanceof List<?>) {
                this.listValue = true;
            } else {
                this.singleValue = true;
            }
        }

        protected Criterion(String condition, Object value) {
            this(condition, value, null);
        }

        protected Criterion(String condition, Object value, Object secondValue, String typeHandler) {
            super();
            this.condition = condition;
            this.value = value;
            this.secondValue = secondValue;
            this.typeHandler = typeHandler;
            this.betweenValue = true;
        }

        protected Criterion(String condition, Object value, Object secondValue) {
            this(condition, value, secondValue, null);
        }
    }
}