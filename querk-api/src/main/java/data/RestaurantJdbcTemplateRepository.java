package data;

import models.Restaurant;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class RestaurantJdbcTemplateRepository implements RestaurantRepository {

    private final JdbcTemplate template;

    public RestaurantJdbcTemplateRepository(JdbcTemplate template) {
        this.template = template;
    }


    @Override
    public List<Restaurant> findAll() {
        return null;
    }

    @Override
    public Restaurant findById(int restaurantId) {
        return null;
    }

    @Override
    public Restaurant add(Restaurant restaurant) {
        return null;
    }

    @Override
    public boolean deleteById(int restaurantId) {
        return false;
    }
}


