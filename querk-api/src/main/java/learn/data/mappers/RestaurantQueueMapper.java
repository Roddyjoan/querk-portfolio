package learn.data.mappers;


import learn.models.RestaurantQueue;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class RestaurantQueueMapper implements RowMapper<RestaurantQueue> {
    @Override
    public RestaurantQueue mapRow(ResultSet rs, int rowNum) throws SQLException {
        RestaurantQueue restaurantQueue = new RestaurantQueue();
        restaurantQueue.setEntryId(rs.getInt("entry_id"));
        restaurantQueue.setRestaurantId(rs.getInt("restaurant_id"));
        restaurantQueue.setUserId(rs.getInt("user_id"));
        restaurantQueue.setCreateTime(rs.getTime("create_time"));
        restaurantQueue.setOrderedAhead(rs.getBoolean("ordered_ahead"));
        restaurantQueue.setExpired(rs.getBoolean("expired"));
        return restaurantQueue;
    }
}
