package learn.domain;

import learn.data.ItemRepository;
import learn.models.Item;
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

        if (!result.isSuccess()){
            return result;
        }

        if (item.getItemId() != 0) {
            result.addMessage("itemId cannot be set for an add operation", ResultType.INVALID);
            return result;
        }

        item = itemRepo.add(item);
        result.setPayload(item);
        return result;

    }

    public Result<Item> update(Item item){
        Result<Item> result = validate(item);

        if (!result.isSuccess()){
            return result;
        }

        if (item.getItemId() <= 0) {
            result.addMessage("itemID must be set for `update` operations", ResultType.INVALID);
            return result;
        }

        if (!itemRepo.update(item)){
            String error = String.format("Item ID %s not found", item.getItemId());
            result.addMessage(error, ResultType.NOT_FOUND);
        }

        return result;
    }

    public boolean deleteById (int itemId){
        return itemRepo.deleteById(itemId);
    }

    private Result<Item> validate(Item item) {

        Result<Item> result = new Result<>();
        if (item == null){
            result.addMessage("item cannot be null", ResultType.INVALID);
            return result;
        }

        if (item.getRestaurantId() == null){
            result.addMessage("restaurant ID cannot be null", ResultType.INVALID);
        }

        if (item.getName().isBlank() || item.getName().isEmpty()){
            result.addMessage("item must have a name", ResultType.INVALID);
            return result;
        }

        if (item.getCategory().isEmpty()){
            result.addMessage("item must have a category", ResultType.INVALID);
            return result;
        }

        if (item.getPrice() == null){
            result.addMessage("item must have a price",ResultType.INVALID);
            return result;
        }

        return result;

    }
}
