package learn.data.mappers;

import learn.models.Restaurant;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class RestaurantMapper implements RowMapper<Restaurant> {

    @Override
    public Restaurant mapRow(ResultSet rs, int rowNum) throws SQLException {
        Restaurant restaurant = new Restaurant();
        restaurant.setRestaurantId(rs.getInt("restaurant_id"));
        restaurant.setUserId(rs.getInt("user_id"));
        restaurant.setName(rs.getString("name"));
        restaurant.setAddress(rs.getString("address"));
        restaurant.setTimeEstimate(rs.getInt("est"));
        return restaurant;
    }
}
