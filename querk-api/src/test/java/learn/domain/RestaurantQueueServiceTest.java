package learn.domain;

import learn.data.RestaurantsQueueRepository;
import learn.models.Item;
import learn.models.RestaurantQueue;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.sql.Time;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

@SpringBootTest
class RestaurantQueueServiceTest {

    @Autowired
    RestaurantQueueService service;

    @MockBean
    RestaurantsQueueRepository repo;

    @Test
    void findAllByRestaurantId() {
        List<RestaurantQueue> queues = service.findAllByRestaurantId(1);
        assertTrue(queues.size() == 3);
    }

    @Test
    void findAllNonExpiredByRestaurantId() {
        List<RestaurantQueue> queue = service.findAllNonExpiredByRestaurantId(1);
        assertTrue( queue.size() == 3);

    }

    @Test
    void add() {
        RestaurantQueue test = makeQueue();
        Result<RestaurantQueue> result = service.add(test);
        assertEquals(ResultType.SUCCESS, result.getType());
    }


    private RestaurantQueue makeQueue() {
        RestaurantQueue queue = new RestaurantQueue();
        queue.setRestaurantId(1);
        queue.setCreateTime(Time.valueOf("01:11 pm"));
        queue.setExpired(true);
        queue.setOrderedAhead(true);
        return queue;
    }

}