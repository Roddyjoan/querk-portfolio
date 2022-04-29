package models;

import java.util.List;

public class Restaurant {

    private int restaurantId;
    private String name;
    private String address;
    private int timeEstimate;
    private List<Item> items;

    public Restaurant(int restaurantId, String name, String address, int timeEstimate) {
        this.restaurantId = restaurantId;
        this.name = name;
        this.address = address;
        this.timeEstimate = timeEstimate;
    }

    public Restaurant(){
    }

    public int getRestaurantId() {
        return restaurantId;
    }

    public void setRestaurantId(int restaurantId) {
        this.restaurantId = restaurantId;
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

    public int getTimeEstimate() {
        return timeEstimate;
    }

    public void setTimeEstimate(int timeEstimate) {
        this.timeEstimate = timeEstimate;
    }

    public List<Item> getItems() {
        return items;
    }

    public void setItems(List<Item> items) {
        this.items = items;
    }

}
