package models;

import java.sql.Time;
import java.util.List;

public class Restaurant {
    private String name;
    private String address;
    private int restaurantId;
    private Time timeEstimate;
    private List<Item> items;

    public Restaurant(String name, String address, int restaurantId, Time timeEstimate) {
        this.name = name;
        this.address = address;
        this.restaurantId = restaurantId;
        this.timeEstimate = timeEstimate;
    }

    public Restaurant() {

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

    public int getRestaurantId() {
        return restaurantId;
    }

    public void setRestaurantId(int restaurantId) {
        this.restaurantId = restaurantId;
    }

    public Time getTimeEstimate() {
        return timeEstimate;
    }

    public void setTimeEstimate(Time timeEstimate) {
        this.timeEstimate = timeEstimate;
    }
}
