package data;

import models.Item;

import java.util.List;

public interface ItemRepository {
    List<Item> findAll();

    List<Item> findByRestaurantId(int restaurantId);

    Item findById(int itemId);

    List<Item> findByCategory(String category);

    Item add(Item item);

    boolean update(Item item);

    boolean deleteById(int itemId);
}
