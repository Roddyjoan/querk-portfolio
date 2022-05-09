package learn.data;

import learn.data.mappers.RestaurantQueueMapper;
import learn.models.Restaurant;
import learn.models.RestaurantQueue;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.Statement;
import java.sql.Time;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

@Repository
public class RestaurantQueueJdbcTemplateRepository implements RestaurantsQueueRepository{

    private final JdbcTemplate template;

    public RestaurantQueueJdbcTemplateRepository(JdbcTemplate template) {
        this.template = template;
    }

    @Override
    public List<RestaurantQueue> findAllByRestaurantId(Integer restaurantId) {
        final String sql="select * from customers c " +
                "inner join restaurants_customers rc on c.customer_id=rc.customer_id where rc.restaurant_id=?;";
        return template.query(sql,new RestaurantQueueMapper(), restaurantId);
    }

    @Override
    public RestaurantQueue findById(Integer entryId) {
        final String sql="select * from restaurants_customers where entry_id =?;";

        return template.query(sql,new RestaurantQueueMapper(), entryId).stream().findFirst().orElse(null);
    }

    @Override
    public RestaurantQueue add(RestaurantQueue restaurantQueue) {
        final String sql = "insert into restaurants_customers (customer_id, restaurant_id, create_time, ordered_ahead, expired) "
                + "values (?,?,now(),?,?);";
        KeyHolder keyHolder = new GeneratedKeyHolder();
        int rowsAffected = template.update(connection -> {
            PreparedStatement ps = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setInt(1,restaurantQueue.getCustomerId());
            ps.setInt(2,restaurantQueue.getRestaurantId());
            ps.setBoolean(3,restaurantQueue.isOrderedAhead());
            ps.setBoolean(4,restaurantQueue.isExpired());
            return ps;
        }, keyHolder);

        if (rowsAffected <= 0){
            return null;
        }

        restaurantQueue.setEntryId(keyHolder.getKey().intValue());
        restaurantQueue.setCreateTime(Time.valueOf(LocalTime.now()));
        return restaurantQueue;

    }

    @Override
    public List<RestaurantQueue> findAllNonExpiredByRestaurantId(Integer restaurantId) {
        final String sql="select * from customers c " +
                "inner join restaurants_customers rc on c.customer_id=rc.customer_id where rc.expired = false and rc.restaurant_id=?;";
        return template.query(sql,new RestaurantQueueMapper(), restaurantId);
    }

    @Override
    public boolean makeExpired(RestaurantQueue restaurantQueue) {
        final String sql = "update restaurants_customers set expired = true where customer_id = ?;";
        return template.update(sql, restaurantQueue.getRestaurantId()) >0 ;
    }

    // insert into restaurants_customers (customer_id, restaurant_id, create_time, ordered_ahead, expired)
    @Override
    public boolean update(RestaurantQueue restaurantQueue) {
        final String sql = "update restaurants_customers set "
                + "customer_id = ?, "
                + "restaurant_id = ?, "
                + "create_time = ?, "
                + "ordered_ahead = ?, "
                + "expired = ? "
                + "where restaurant_id=?;";
        return template.update(sql,restaurantQueue.getCustomerId(),restaurantQueue.getRestaurantId(),restaurantQueue.getCreateTime(),restaurantQueue.isOrderedAhead(), restaurantQueue.isExpired(), restaurantQueue.getEntryId()) > 0;
    }


    @Override
    public boolean delete(Integer entryId) {
        final String sql = "delete from restaurants_customers where entry_id = ?;";

        return template.update(sql, entryId) > 0;
    }
}
