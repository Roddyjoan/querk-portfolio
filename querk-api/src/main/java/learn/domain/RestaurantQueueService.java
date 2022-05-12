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


    public RestaurantQueue findById (Integer restaurantId){
        return repository.findById(restaurantId);
    }

    public List<RestaurantQueue> findByUserId (Integer userId) { return repository.findAllNonExpiredByUserId(userId);}

    public Result<RestaurantQueue> add(RestaurantQueue restaurantQueue){
        Result<RestaurantQueue> result = validate(restaurantQueue);

        if (!result.isSuccess()) {
            return result;
        }

        if (restaurantQueue.getEntryId() != null){
            result.addMessage("entryID cannot be set for an add operation", ResultType.INVALID);
            return result;
        }

        restaurantQueue = repository.add(restaurantQueue);
        result.setPayload(restaurantQueue);
        return result;
    }

    public Result<RestaurantQueue> makeExpired(RestaurantQueue restaurantQueue){
        Result<RestaurantQueue> result = validateUpdate(restaurantQueue);
        if (!result.isSuccess()){
            return result;
        }

        if (restaurantQueue.getEntryId() <= 0){
            result.addMessage("Entry Id Must be set for an update operation", ResultType.INVALID);
            return result;
        }

        if (!repository.makeExpired(restaurantQueue)){
            String msg = String.format("Customer ID : %s not found ", restaurantQueue.getUserId());
            result.addMessage(msg, ResultType.NOT_FOUND);
        }
        return result;
    }

    public Result<RestaurantQueue> makeReady(RestaurantQueue restaurantQueue){
        Result<RestaurantQueue> result = validateUpdate(restaurantQueue);
        if (!result.isSuccess()){
            return result;
        }

        if (restaurantQueue.getEntryId() <= 0){
            result.addMessage("Entry Id Must be set for an update operation", ResultType.INVALID);
            return result;
        }

        if (!repository.makeReady(restaurantQueue)){
            String msg = String.format("Customer ID : %s not found ", restaurantQueue.getUserId());
            result.addMessage(msg, ResultType.NOT_FOUND);
        }
        return result;
    }

    private Result<RestaurantQueue> validateUpdate(RestaurantQueue restaurantQueue) {
        Result<RestaurantQueue> result = new Result<>();

        if (restaurantQueue == null){
            result.addMessage("restaurant Queue cannot be null", ResultType.INVALID);
            return result;
        }

        if (restaurantQueue.getRestaurantId() == null) {
            result.addMessage("restaurant Queue must contain a restaurant ID", ResultType.INVALID);
            return result;
        }

        if (restaurantQueue.getUserId() == null){
            result.addMessage("restaurant Queue must contain a customer ID", ResultType.INVALID);
            return result;
        }


        return result;

    }


    private Result<RestaurantQueue> validate(RestaurantQueue restaurantQueue) {
        Result<RestaurantQueue> result = new Result<>();
        List<RestaurantQueue> all = repository.findAllNonExpiredByRestaurantId(restaurantQueue.getRestaurantId());

        for (RestaurantQueue rq: all){
            if (restaurantQueue.getRestaurantId() == rq.getRestaurantId()
            && !rq.isExpired()
            && (rq.getUserId() == restaurantQueue.getUserId())){
                result.addMessage("cannot add duplicate entry", ResultType.INVALID);
                return result;
            }
        }

        List<RestaurantQueue> allNon = repository.findAllNonExpired();

        for (RestaurantQueue queue: allNon){
            if (restaurantQueue.getRestaurantId() == queue.getRestaurantId()
                    && !queue.isExpired()
                    && (queue.getUserId() == restaurantQueue.getUserId())){
                result.addMessage("cannot add duplicate entry", ResultType.INVALID);
                return result;
            }
        }


        if (restaurantQueue == null){
            result.addMessage("restaurant Queue cannot be null", ResultType.INVALID);
            return result;
        }

        if (restaurantQueue.getRestaurantId() == null) {
            result.addMessage("restaurant Queue must contain a restaurant ID", ResultType.INVALID);
            return result;
        }

        if (restaurantQueue.getUserId() == null){
            result.addMessage("restaurant Queue must contain a customer ID", ResultType.INVALID);
            return result;
        }


        return result;

    }

    public boolean deleteByEntryId(Integer entryId) {
        return repository.delete(entryId);
    }


}
