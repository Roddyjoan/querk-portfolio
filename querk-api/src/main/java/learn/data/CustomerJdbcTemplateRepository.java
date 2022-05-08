package learn.data;

import learn.data.mappers.CustomerMapper;
import learn.models.Customer;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.sql.PreparedStatement;
import java.sql.Statement;
import java.util.List;

@Repository
public class CustomerJdbcTemplateRepository implements CustomerRepository{
    private final JdbcTemplate template;

    public CustomerJdbcTemplateRepository(JdbcTemplate template){
        this.template = template;
    }

    @Override
    public List<Customer> findAll() {
        final String sql = "select * from customers;";
        return template.query(sql, new CustomerMapper());
    }

    @Override
    public Customer findById(int customerId){
    final String sql = "select * " +
            " from customers " +
            " where customer_id = ?";

        Customer customer = template.query(sql, new CustomerMapper(), customerId).stream()
                .findFirst().orElse(null);

        return customer;
    }

    @Transactional
    @Override
    public Customer add(Customer customer) {
        final String sql = " insert into customers (`name`, user_id, phone_num, email) " +
                " values (?,?,?,?) ";

        KeyHolder keyHolder = new GeneratedKeyHolder();
        int rowsAffected = template.update(connection -> {
            PreparedStatement ps = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setString(1, customer.getName());
            ps.setInt(2, customer.getUserId());
            ps.setString(3, customer.getPhoneNum());
            ps.setString(4, customer.getEmail());
            return ps;
        }, keyHolder);

        if (rowsAffected <= 0) {
            return null;
        }

        customer.setCustomerId(keyHolder.getKey().intValue());
        return customer;
    }


    @Transactional
    @Override
    public boolean update(Customer customer) {
       final String sql = " update customers set " +
               " `name` = ?, " +
               " phone_num = ?, " +
               " email = ? " +
               " where customer_id = ?;";

       template.update("delete from restaurants_customers where customer_id=?;", customer.getCustomerId());
       return template.update(sql,
               customer.getName(),
               customer.getPhoneNum(),
               customer.getEmail(),
               customer.getCustomerId()) > 0;
    }

    @Override
    @Transactional
    public boolean deleteById(int customerId) {
        template.update( "delete from restaurants_customers where customer_id = ?;", customerId);
        return template.update("delete from customers where customer_id = ?;", customerId) > 0;
    }

}
