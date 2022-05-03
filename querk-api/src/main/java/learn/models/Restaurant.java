package learn.models;

import java.sql.Time;
import java.util.List;

public class Restaurant {
    private int restaurantId;
    private Integer userId;
    private String name;
    private String address;
    private Integer timeEstimate;
    private List<Item> items;

    public Restaurant(int restaurantId, String name, String address, Integer timeEstimate) {
        this.restaurantId = restaurantId;
        this.name = name;
        this.address = address;
        this.timeEstimate = timeEstimate;
    }

    public Restaurant() {
    }

    public int getRestaurantId() {
        return restaurantId;
    }

    public void setRestaurantId(int restaurantId) {
        this.restaurantId = restaurantId;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public List<Item> getItems() {
        return items;
    }

    public void setItems(List<Item> items) {
        this.items = items;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public Integer getTimeEstimate() {
        return timeEstimate;
    }

    public void setTimeEstimate(Integer timeEstimate) {
        this.timeEstimate = timeEstimate;
    }
}
