package learn.controllers;

import learn.domain.ItemService;
import learn.domain.Result;
import learn.models.Item;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = {"http://localhost:3000"})
@RequestMapping("/api/menu")
public class ItemController {
    private final ItemService service;

    public ItemController(ItemService service) {
        this.service = service;
    }

    @GetMapping
    public List<Item> findAll(){
        return service.findAll();
    }

    @GetMapping("/restaurant/{restaurantId}")
    public List<Item> findAllByRestaurantId(@PathVariable Integer restaurantId){
        return service.findByRestaurantId(restaurantId);
    }

    @PostMapping
    public ResponseEntity<Object> add(@RequestBody Item item) {
        Result<Item> result = service.add(item);
        if (result.isSuccess()){
            return new ResponseEntity<>(result.getPayload(), HttpStatus.CREATED);
        }
        return ErrorResponse.build(result);
    }

    @PutMapping("/{itemId}")
    public ResponseEntity<Object> update(@PathVariable Integer itemId, @RequestBody Item item){
        if (itemId != item.getItemId()){
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }
        Result<Item> result = service.update(item);
        if (result.isSuccess()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }

        return ErrorResponse.build(result);
    }

    @DeleteMapping("/{itemId}")
    public ResponseEntity<Void> deleteById(@PathVariable Integer itemId){
        if (service.deleteById(itemId)){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

}
