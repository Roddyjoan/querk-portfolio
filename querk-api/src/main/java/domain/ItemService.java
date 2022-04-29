package domain;

import data.ItemRepository;
import models.Item;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ItemService {

    private final ItemRepository itemRepo;

    public ItemService(ItemRepository itemRepo){
        this.itemRepo=itemRepo;
    }

    public List<Item> findAll(){
        return itemRepo.findAll();
    }

    public List<Item> findByRestaurantId(int restaurantId){
        return itemRepo.findByRestaurantId(restaurantId);
    }

    public Item findById(int itemId){
        return itemRepo.findById(itemId);
    }

    public Result<Item> add(Item item){
        Result<Item> result = validate(item);

    }

    private Result<Item> validate(Item item) {

        Result<Item> result = new Result<>();
        if (item == null){
            result.addMessage("item cannot be null", ResultType.INVALID);
            return result;
        }

        if (item.getRestaurantId() == null){


        }
    }
}
