package learn.data;

import learn.data.RestaurantJdbcTemplateRepository;
import learn.models.Restaurant;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class RestaurantJdbcTemplateRepositoryTest {

    final static int NEXT_ID = 4;

    @Autowired
    RestaurantJdbcTemplateRepository repository;

    @Autowired
    KnownGoodState knownGoodState;

    @BeforeEach
    void setup() {
        knownGoodState.set();
    }

    @Test
    void findAll() {
        List<Restaurant> restaurant = repository.findAll();
        //assertEquals(restaurant.stream().filter());
        assertNotNull(restaurant);
    }

    @Test
    void findById() {
        Restaurant resToTest = repository.findById(2);
        assertEquals(2, resToTest.getRestaurantId());
        assertEquals("Ichiran", resToTest.getName());
        assertEquals("132 W 31st St, New York, NY 10001", resToTest.getAddress());
    }

    @Test
    void shouldNotFindById(){
        Restaurant nope = repository.findById(123);
        assertNull(nope);
    }

    @Test
    void add() {
        Restaurant restaurant = makeRestaurant();
        Restaurant actual = repository.add(restaurant);
        assertNotNull(actual);
        assertEquals(NEXT_ID, actual.getRestaurantId());
    }


    @Test
    void shouldUpdate() {
        Restaurant restaurant = makeRestaurant();
        restaurant.setRestaurantId(1);
        assertTrue(repository.update(restaurant));
    }

    @Test
    void shouldNotUpdate() {
        Restaurant restaurant = makeRestaurant();
        restaurant.setRestaurantId(100000);
        assertFalse(repository.update(restaurant));
    }

    @Test
    void shouldDeleteById() {
       assertTrue(repository.deleteById(2));
    }

    @Test
    void shouldNotDeleteById() {
       assertFalse(repository.deleteById(10000));
    }

    private Restaurant makeRestaurant(){
        Restaurant restaurant = new Restaurant();
        restaurant.setName("WeSellFood");
        restaurant.setAddress("100 OverThere Place");
        return restaurant;
    }
}