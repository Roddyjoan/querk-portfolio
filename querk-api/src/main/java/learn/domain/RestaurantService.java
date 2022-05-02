package learn.domain;

import learn.data.RestaurantRepository;
import learn.models.Restaurant;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RestaurantService {

    private final RestaurantRepository repository;

    public RestaurantService(RestaurantRepository repository) {
        this.repository = repository;
    }

    public List<Restaurant> findAll() {
        return repository.findAll();
    }

    public Restaurant findById(int restaurantId) {
        return repository.findById(restaurantId);
    }

    public Result<Restaurant> add(Restaurant restaurant) {
        Result<Restaurant> result = validate(restaurant);
        if (!result.isSuccess()) {
            return result;
        }

        if (restaurant.getRestaurantId() != 0) {
            result.addMessage("RestaurantId cannot be set for `add` operation", ResultType.INVALID);
            return result;
        }

        restaurant = repository.add(restaurant);
        result.setPayload(restaurant);
        return result;
    }

    public Result<Restaurant> update(Restaurant restaurant) {
        Result<Restaurant> result = validate(restaurant);
        if (!result.isSuccess()) {
            return result;
        }

        if (restaurant.getRestaurantId() <= 0) {
            result.addMessage("RestaurantId must be set for `update` operation", ResultType.INVALID);
            return result;
        }

        if (!repository.update(restaurant)) {
            String msg = String.format("RestaurantId: %s, not found", restaurant.getRestaurantId());
            result.addMessage(msg, ResultType.NOT_FOUND);
        }

        return result;
    }

    public boolean deleteById(Integer restaurantId){
        return repository.deleteById(restaurantId);
    }

    private Result<Restaurant> validate(Restaurant restaurant) {

        Result<Restaurant> result = new Result<>();
        if (restaurant == null) {
            result.addMessage("restaurant cannot be null", ResultType.INVALID);
            return result;
        }

        if (restaurant.getName() == null) {
            result.addMessage("restaurant must have a name", ResultType.INVALID);
            return result;
        }

        if (restaurant.getAddress() == null) {
            result.addMessage("restaurant must have a valid address", ResultType.INVALID);
        }

        return result;

    }
}
