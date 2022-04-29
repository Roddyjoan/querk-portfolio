package domain;

import data.RestaurantRepository;
import models.Restaurant;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RestaurantService {

    private final RestaurantRepository repository;

    public RestaurantService(RestaurantRepository repository) {
        this.repository = repository;
    }

    public List<Restaurant> findAll(){ return repository.findAll(); }

    public Restaurant findById(int restaurantId){ return repository.findById(restaurantId); }

    public Result<Restaurant> add(Restaurant restaurant){
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

    private Result<Restaurant> validate(Restaurant restaurant){

        Result<Restaurant> result = new Result<>();
        if (restaurant == null) {
            result.addMessage("customer cannot be null", ResultType.INVALID);
            return result;
        }
        return result;
    }

}
