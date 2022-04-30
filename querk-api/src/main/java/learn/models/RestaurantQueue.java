package learn.models;

import java.sql.Time;

public class RestaurantQueue {
    private Integer customerId;
    private Integer restaurantId;
    private Integer entryId;
    private Time createTime;
    private boolean orderedAhead;
    private boolean expired;

    public RestaurantQueue() {
    }

    public RestaurantQueue(Integer customerId, Integer restaurantId, Integer entryId, Time createTime, boolean orderedAhead, boolean expired) {
        this.customerId = customerId;
        this.restaurantId = restaurantId;
        this.entryId = entryId;
        this.createTime = createTime;
        this.orderedAhead = orderedAhead;
        this.expired = expired;
    }

    public Integer getCustomerId() {
        return customerId;
    }

    public void setCustomerId(Integer customerId) {
        this.customerId = customerId;
    }

    public Integer getRestaurantId() {
        return restaurantId;
    }

    public void setRestaurantId(Integer restaurantId) {
        this.restaurantId = restaurantId;
    }

    public Integer getEntryId() {
        return entryId;
    }

    public void setEntryId(Integer entryId) {
        this.entryId = entryId;
    }

    public Time getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Time createTime) {
        this.createTime = createTime;
    }

    public boolean isOrderedAhead() {
        return orderedAhead;
    }

    public void setOrderedAhead(boolean orderedAhead) {
        this.orderedAhead = orderedAhead;
    }

    public boolean isExpired() {
        return expired;
    }

    public void setExpired(boolean expired) {
        this.expired = expired;
    }
}
