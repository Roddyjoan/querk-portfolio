package data;

import data.mappers.ItemMapper;
import models.Item;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import java.sql.PreparedStatement;
import java.sql.Statement;
import java.util.List;

@Repository
public class ItemJdbcTemplateRepository implements  ItemRepository{

    private final JdbcTemplate template;

    public ItemJdbcTemplateRepository (JdbcTemplate template){
        this.template=template;
    }

    @Override
    public List<Item> findAll() {
        final String sql = "select * from items;";

        return template.query(sql, new ItemMapper());
    }

    @Override
    public List<Item> findByRestaurantId(Integer restaurantId) {
        final String sql = "select i.item_id,i.restaurant_id, i.`name`, i.category,i.price,i.description from items i "
                + "inner join restaurants r on i.restaurant_id=r.restaurant_id where i.restaurant_id = ? order by i.category ;";

        return template.query(sql, new ItemMapper(), restaurantId);
    }

    @Override
    public Item findById(int itemId) {
        final String sql= "select * from items where item_id=?;";

        Item item = template.query(sql, new ItemMapper(), itemId).stream()
                .findFirst().orElse(null);

        return item;

    }

    @Override
    public List<Item> findByCategory(String category) {
        final String sql= "select * from items where category=?;";
        return template.query(sql, new ItemMapper(), category);
    }

    @Override
    public Item add(Item item) {
        final String sql= "insert into items (restaurant_id, `name`, category, price, `description`) values (?,?,?,?,?);";
        KeyHolder keyHolder = new GeneratedKeyHolder();
        int rowsAffected = template.update(connection -> {
            PreparedStatement ps = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setInt(1,item.getRestaurantId());
            ps.setString(2,item.getName());
            ps.setString(3,item.getCategory());
            ps.setBigDecimal(4,item.getPrice());
            ps.setString(5,item.getDescription());
            return ps;
        }, keyHolder);

        if(rowsAffected <= 0){
            return null;
        }

        item.setItemId(keyHolder.getKey().intValue());
        return item;
    }

    @Override
    public boolean update(Item item) {
        final String sql="update items set "
                + "`name` = ? , "
                + "category = ? "
                + "price = ?, "
                + "description = ? "
                + "where item_id = ?;";

        return template.update(sql,
                item.getName(),
                item.getCategory(),
                item.getPrice(),
                item.getDescription(),
                item.getItemId()) > 0 ;

    }

    @Override
    public boolean deleteById(int itemId) {
        final String sql= "delete from items where itemId=?;";
        return template.update(sql, itemId) > 0;
    }
}
