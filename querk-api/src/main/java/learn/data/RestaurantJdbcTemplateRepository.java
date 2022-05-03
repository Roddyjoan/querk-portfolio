package learn.data;

import learn.data.mappers.RestaurantMapper;
import learn.models.Restaurant;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import java.sql.PreparedStatement;
import java.sql.Statement;
import java.util.List;

@Repository
public class RestaurantJdbcTemplateRepository implements RestaurantRepository {

    private final JdbcTemplate template;

    public RestaurantJdbcTemplateRepository(JdbcTemplate template) {
        this.template = template;
    }

    @Override
    public List<Restaurant> findAll() {
        final String sql = "select * from restaurants;";

        return template.query(sql, new RestaurantMapper());
    }

    @Override
    public Restaurant findById(int restaurantId) {
        final String sql = "select * from restaurants where restaurant_id=?;";

        return template.query(sql, new RestaurantMapper(), restaurantId).stream()
                .findFirst().orElse(null);
    }

    @Override
    public Restaurant add(Restaurant restaurant) {
        final String sql = "insert into restaurants (`name`, user_id, address, est) values (?,?,?,?);";
        KeyHolder keyHolder = new GeneratedKeyHolder();
        int rowsAffected = template.update(connection -> {
            PreparedStatement ps = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setString(1, restaurant.getName());
            ps.setInt(2, restaurant.getUserId());
            ps.setString(3, restaurant.getAddress());
            ps.setInt(4,restaurant.getTimeEstimate());
            return ps;
        }, keyHolder);

        if (rowsAffected <= 0) {
            return null;
        }

        restaurant.setRestaurantId(keyHolder.getKey().intValue());

        return restaurant;
    }

    @Override
    public boolean update(Restaurant restaurant) {
        final String sql = "update restaurants set "
                + "`name` = ?, "
                + "address = ?, "
                + "est=? "
                + "where restaurant_id=?;";
        return template.update(sql,restaurant.getName(),restaurant.getAddress(),restaurant.getTimeEstimate(),restaurant.getRestaurantId()) > 0;
    }


    @Override
    public boolean deleteById(int restaurantId) {
        return template.update("delete from restaurants where restaurant_id=?;", restaurantId) > 0;
    }
}


