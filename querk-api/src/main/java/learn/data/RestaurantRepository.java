package learn.data;

import learn.models.Restaurant;

import java.util.List;


public interface RestaurantRepository {
    List<Restaurant> findAll();

    Restaurant findById(int restaurantId);

    Restaurant add(Restaurant restaurant);

    boolean update(Restaurant restaurant);

    boolean deleteById(int restaurantId);


}
