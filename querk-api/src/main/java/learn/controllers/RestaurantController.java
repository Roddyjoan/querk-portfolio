package learn.controllers;

import learn.domain.RestaurantService;
import learn.domain.Result;
import learn.models.Restaurant;
import learn.models.RestaurantQueue;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
//@CrossOrigin(origins = {"http://localhost:3000"})
@CrossOrigin (origins = {"*"})
@RequestMapping("/api/restaurants")
public class RestaurantController {
    private final RestaurantService service;

    public RestaurantController(RestaurantService service) {
        this.service = service;
    }

    @GetMapping
    public List<Restaurant> findAll(){
        return service.findAll();
    }

    @GetMapping("/{restaurantId}")
    public ResponseEntity<Restaurant> findById(@PathVariable Integer restaurantId){
        Restaurant toFind = service.findById(restaurantId);
        if (toFind != null) {
            return ResponseEntity.ok(toFind);
        }

        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PostMapping
    public ResponseEntity<Object> add(@RequestBody Restaurant restaurant){
        Result<Restaurant> result = service.add(restaurant);
        if (result.isSuccess()){
            return new ResponseEntity<>(result.getPayload(), HttpStatus.CREATED);
        }
        return ErrorResponse.build(result);
    }

    @PutMapping("/{restaurantId}")
    public ResponseEntity<Object> update(@PathVariable Integer restaurantId, @RequestBody Restaurant restaurant){
        if (restaurantId != restaurant.getRestaurantId()){
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }

        Result<Restaurant> result = service.update(restaurant);
        if (result.isSuccess()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }

        return ErrorResponse.build(result);
    }

    @DeleteMapping("/{restaurantId}")
    public ResponseEntity<Void> deleteById(@PathVariable Integer restaurantId){
        if (service.deleteById(restaurantId)) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
