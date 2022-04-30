package data;

import models.Customer;
import models.Item;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.BeforeEach;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.NONE)
class ItemJdbcTemplateRepositoryTest {

    final static int NEXT_ID = 8;

    @Autowired
    ItemJdbcTemplateRepository repository;

    @Autowired
    KnownGoodState knownGoodState;

    @BeforeEach
    void setup() {
        knownGoodState.set();
    }

    @Test
    void findAll() {
        List<Item> items = repository.findAll();
        assertNotNull(items);
    }

    @Test
    void findByRestaurantId() {
        Item item = repository.findById(1);
        assertEquals(1, item.getRestaurantId());
        assertEquals("Small burrito", item.getName());
    }

    @Test
    void shouldNotFindById() {
        Item nope = repository.findById(100000);
        assertNull(nope);
    }

    @Test
    void findById() {
        Item item = repository.findById(1);
        assertEquals(1, item.getRestaurantId());
        assertEquals("Small burrito", item.getName());
    }

    @Test
    void findByCategory() {
        List<Item> entrees = new ArrayList<>();
        entrees = repository.findByCategory("entree");
        assertEquals(4,entrees.size());
    }

    @Test
    void shouldNotFindByCategory() {
        List<Item> entrees = new ArrayList<>();
        entrees = repository.findByCategory("bean");
        assertEquals(0,entrees.size());
    }

    @Test
    void add() {
        Item item = makeItem();
        Item actual = repository.add(item);
        assertNotNull(actual);
        assertEquals(NEXT_ID, actual.getItemId());
    }

    @Test
    void update() {
        Item item = makeItem();
        item.setItemId(3);
        assertTrue(repository.update(item));
    }

    @Test
    void shouldNotUpdate() {
        Item item = makeItem();
        item.setItemId(300);
        assertFalse(repository.update(item));
    }

    @Test
    void deleteById() {
        assertTrue(repository.deleteById(1));
    }

    @Test
    void shouldNotDeleteById() {
        assertTrue(repository.deleteById(1000));
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