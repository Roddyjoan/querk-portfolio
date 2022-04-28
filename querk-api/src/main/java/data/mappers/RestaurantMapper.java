package data.mappers;

import models.Restaurant;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class RestaurantMapper implements RowMapper<Restaurant> {

    @Override
    public Restaurant mapRow(ResultSet rs, int rowNum) throws SQLException {
        Restaurant restaurant = new Restaurant();

    }
}
