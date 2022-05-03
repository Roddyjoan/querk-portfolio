package learn.domain;

import learn.data.RestaurantRepository;
import learn.models.Item;
import learn.models.Restaurant;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.math.BigDecimal;
import java.sql.Time;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class RestaurantServiceTest {

    @Autowired
    RestaurantService service;

    @MockBean
    RestaurantRepository repo;

    @Test
    void findById() {
        Restaurant resToTest = service.findById(2);
        assertEquals(2, resToTest.getRestaurantId());
        assertEquals("Ichiran", resToTest.getName());
        assertEquals("132 W 31st St, New York, NY 10001", resToTest.getAddress());
    }

    @Test
    void add() {
        Restaurant newRestaurant = makeRestaurant();
        Result<Restaurant> result = service.add(newRestaurant);
        assertEquals(ResultType.SUCCESS, result.getType());
    }

    @Test
    void shouldNotAddBlankName() {
        Restaurant test = makeRestaurant();
        test.setName(" ");
        Result<Restaurant> result = service.add(test);
        assertEquals(ResultType.INVALID, result.getType());
    }

    @Test
    void shouldNotAddNullName() {
        Restaurant test = makeRestaurant();
        test.setName(null);
        Result<Restaurant> result = service.add(test);
        assertEquals(ResultType.INVALID, result.getType());
    }

    @Test
    void shouldNotAddBlankAddress() {
        Restaurant test = makeRestaurant();
        test.setAddress(" ");
        Result<Restaurant> result = service.add(test);
        assertEquals(ResultType.INVALID, result.getType());
    }

    @Test
    void shouldNotAddNullAddress() {
        Restaurant test = makeRestaurant();
        test.setAddress(null);
        Result<Restaurant> result = service.add(test);
        assertEquals(ResultType.INVALID, result.getType());
    }

    @Test
    void update() {
        Restaurant testRes = makeRestaurant();
        testRes.setRestaurantId(1);
        Result<Restaurant> result = service.update(testRes);
        assertEquals(ResultType.SUCCESS, result.getType());
    }

    @Test
    void shouldNotUpdateWithoutId() {
        Restaurant res = makeRestaurant();
        Result<Restaurant> result = service.update(res);
        assertEquals(ResultType.INVALID, result.getType());
    }

    private Restaurant makeRestaurant(){
        Restaurant restaurant = new Restaurant();
        restaurant.setRestaurantId(3);
        restaurant.setName("THEE RESTAURANT");
        restaurant.setAddress("timbucktoo");
        restaurant.setTimeEstimate(10);
        return restaurant;
    }

}