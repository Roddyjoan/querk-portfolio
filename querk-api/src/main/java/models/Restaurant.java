package models;

import java.util.List;

public class Restaurant {
    private String name;
    private String address;
    private int restaurantId;
    private int timeEstimate;
    private List<Item> items;

    public Restaurant(String name, String address, int restaurantId, int timeEstimate) {
        this.name = name;
        this.address = address;
        this.restaurantId = restaurantId;
        this.timeEstimate = timeEstimate;
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

    public int getTimeEstimate() {
        return timeEstimate;
    }

    public void setTimeEstimate(int timeEstimate) {
        this.timeEstimate = timeEstimate;
    }
}
