package learn.data;

import learn.models.RestaurantQueue;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.BeforeEach;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.sql.Time;
import java.time.LocalTime;
import java.util.List;
import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.NONE)
class RestaurantQueueJdbcTemplateRepositoryTest {

    final static int NEXT_ID = 10;

    @Autowired
    RestaurantQueueJdbcTemplateRepository repository;

    @Autowired
    KnownGoodState knownGoodState;

    @BeforeEach
    void setup() {
        knownGoodState.set();
    }

    @Test
    void findAllByRestaurantId() {
        List<RestaurantQueue> queue = repository.findAllByRestaurantId(1);
        assertEquals(3, queue.size());
    }

    @Test
    void findById() {
        RestaurantQueue entry = repository.findById(1);
        assertEquals("1", entry.getRestaurantId());
        assertTrue(entry.isOrderedAhead());
        assertFalse(entry.isExpired());
    }

    @Test
    void shouldNotFindById(){
        RestaurantQueue nope = repository.findById(10000);
        assertNull(nope);
    }

    @Test
    void add() {
        RestaurantQueue entry = makeEntry();
        RestaurantQueue actual = repository.add(entry);
        assertNotNull(actual);
        assertEquals(10, actual.getEntryId());
    }

    @Test
    void findAllNonExpiredByRestaurantId() {
        List<RestaurantQueue> entries = repository.findAllNonExpiredByRestaurantId(1);
        assertEquals(2, entries.size());
    }

    @Test
    void makeExpired() {
        List<RestaurantQueue> entries = repository.findAllNonExpiredByRestaurantId(1);
        assertEquals(2, entries.size());
        assertTrue(repository.makeExpired(repository.findById(1)));
        entries = repository.findAllNonExpiredByRestaurantId(1);
        assertEquals(1, entries.size());
    }

    @Test
    void shouldUpdate(){

    }

    @Test
    void delete() {
        assertTrue(repository.delete(1));
    }

    @Test
    void shouldNotDelete(){
        assertFalse(repository.delete(10000));
    }

    private RestaurantQueue makeEntry(){
        RestaurantQueue entry = new RestaurantQueue();
        entry.setRestaurantId(3);
        entry.setCustomerId(1);
        entry.setCreateTime(Time.valueOf(LocalTime.now()));
        entry.setExpired(false);
        entry.setOrderedAhead(true);
        return entry;
    }
}