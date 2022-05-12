package learn.controllers;

import ch.qos.logback.core.pattern.util.RestrictedEscapeUtil;
import learn.domain.RestaurantQueueService;
import learn.domain.Result;
import learn.models.RestaurantQueue;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
//@CrossOrigin (origins = {"http://localhost:3000"})
@CrossOrigin (origins = {"*"})
@RequestMapping ("/api/restaurant/queue")
public class RestaurantQueuesController {
    private final RestaurantQueueService service;

    public RestaurantQueuesController(RestaurantQueueService service) {
        this.service = service;
    }

    @GetMapping("/{restaurantId}")
    public List<RestaurantQueue> findAll(@PathVariable Integer restaurantId) {
        List<RestaurantQueue> list = service.findAllByRestaurantId(restaurantId);
        return list;
    }

    @GetMapping("/current/{restaurantId}")
    public List<RestaurantQueue> findAllNonExpired(@PathVariable Integer restaurantId) {
        List<RestaurantQueue> list = service.findAllNonExpiredByRestaurantId(restaurantId);
        return list;
    }

    @GetMapping("/user/{userId}")
    public List<RestaurantQueue> findAllNonExpiredByCustomerId(@PathVariable Integer userId) {
        List<RestaurantQueue> list = service.findByUserId(userId);
        return list;
    }


    @PutMapping("/update/{userId}")
    public ResponseEntity<Object> changeToExpired(@PathVariable Integer userId, @RequestBody RestaurantQueue restaurantQueue){
        if (userId != restaurantQueue.getUserId()) {
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }

        Result<RestaurantQueue> result = service.makeExpired(restaurantQueue);
        if (result.isSuccess()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }

        return ErrorResponse.build(result);
    }

    @PutMapping("/ready/{userId}")
    public ResponseEntity<Object> changeToReady(@PathVariable Integer userId, @RequestBody RestaurantQueue restaurantQueue){
        if (userId != restaurantQueue.getUserId()) {
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }

        Result<RestaurantQueue> result = service.makeReady(restaurantQueue);
        if (result.isSuccess()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }

        return ErrorResponse.build(result);
    }

    @PostMapping
    public ResponseEntity<Object> add(@RequestBody RestaurantQueue restaurantQueue){
        Result<RestaurantQueue> result = service.add(restaurantQueue);
        if (result.isSuccess()){
            return new ResponseEntity<>(result.getPayload(), HttpStatus.CREATED);
        }
        return ErrorResponse.build(result);

    }
    @DeleteMapping("/{entryId}")
    public ResponseEntity<Void> deleteByEntryId(@PathVariable Integer entryId) {
        if (service.deleteByEntryId(entryId)) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }

        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
