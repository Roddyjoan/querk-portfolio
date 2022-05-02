package learn.domain;

import learn.models.Customer;
import learn.models.Item;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.mockito.Mock;

import java.math.BigDecimal;

import static org.mockito.Mockito.when;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.NONE)
class ItemServiceTest {

    @Autowired
    ItemService service;

    @Test
    void add() {
        Item item = makeItem();
        Result<Item> result = service.add(item);
        assertEquals(ResultType.SUCCESS, result.getType());
    }

    @Test
    void shouldNotAddNullItem() {
        Result<Item> result = service.add(null);
        assertEquals(ResultType.INVALID, result.getType());
    }

    @Test
    void shouldNotAddBlankName() {
        Item item = makeItem();
        Result<Item> result = service.add(item);
        assertEquals(ResultType.INVALID, result.getType());
    }

    @Test
    void shouldNotAddNullName() {
        Item item = makeItem();
        item.setName(null);
        Result<Item> result = service.add(item);
        assertEquals(ResultType.INVALID, result.getType());
    }

    @Test
    void shouldNotAddBlankCategory() {
        Item item = makeItem();
        item.setCategory("");
        Result<Item> result = service.add(item);
        assertEquals(ResultType.INVALID, result.getType());
    }

    @Test
    void shouldNotAddNullCategory() {
        Item item = makeItem();
        item.setCategory(null);
        Result<Item> result = service.add(item);
        assertEquals(ResultType.INVALID, result.getType());
    }

    @Test
    void shouldNotAddNullPrice() {
        Item item = makeItem();
        item.setPrice(null);
        Result<Item> result = service.add(item);
        assertEquals(ResultType.INVALID, result.getType());
    }

    @Test
    void shouldNotAddWithId() {
        Item item = makeItem();
        item.setItemId(1);
        Result<Item> result = service.add(item);
        assertEquals(ResultType.INVALID, result.getType());
    }

    @Test
    void update() {
        Item item = makeItem();
        item.setItemId(1);
        Result<Item> result = service.update(item);
        assertEquals(ResultType.SUCCESS, result.getType());
    }

    @Test
    void shouldNotUpdateWithoutId() {
        Item item = makeItem();
        Result<Item> result = service.update(item);
        assertEquals(ResultType.INVALID, result.getType());
    }

    @Test
    void shouldNotUpdateNonexistent() {
        Item item = makeItem();
        Result<Item> result = service.update(item);
        assertEquals(ResultType.NOT_FOUND, result.getType());
    }

    private Item makeItem(){
        Item item = new Item();
        item.setRestaurantId(3);
        item.setName("HYUN-makase");
        item.setCategory("entree");
        item.setPrice(BigDecimal.valueOf(130.00));
        item.setDescription("daily special cuts selected by the chef");
        return item;
    }
}