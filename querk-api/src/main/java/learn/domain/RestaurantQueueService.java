package learn.domain;

import learn.data.RestaurantsQueueRepository;
import learn.models.RestaurantQueue;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RestaurantQueueService {
    private final RestaurantsQueueRepository repository;

    public RestaurantQueueService(RestaurantsQueueRepository repository) {
        this.repository = repository;
    }

    public List<RestaurantQueue> findAllByRestaurantId(Integer restaurantId){
        return repository.findAllByRestaurantId(restaurantId);
    }

    public List<RestaurantQueue> findAllNonExpiredByRestaurantId(Integer restaurantId){
        return repository.findAllNonExpiredByRestaurantId(restaurantId);
    }

    

}
