package learn.data;

import learn.models.Customer;
import learn.models.Restaurant;
import learn.models.RestaurantQueue;

import java.util.List;

public interface RestaurantsQueueRepository {
    List<RestaurantQueue> findAllByRestaurantId(Integer restaurantId);

    RestaurantQueue findById(Integer entryId);

    RestaurantQueue add(RestaurantQueue restaurantQueue);

    List<RestaurantQueue> findAllNonExpiredByUserId(Integer userId);
    List<RestaurantQueue> findAllNonExpiredByRestaurantId(Integer restaurantId);

    List<RestaurantQueue> findAllNonExpired();
    List<RestaurantQueue> findAllByRestaurantUserId(Integer restaurantUserId);
    boolean makeExpired(RestaurantQueue restaurantQueue);
    boolean makeReady(RestaurantQueue restaurantQueue);
    boolean update(RestaurantQueue restaurantQueue);

    boolean delete(Integer entryId);

}
