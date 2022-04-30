package data;

import data.mappers.CustomerMapper;
import models.Customer;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Date;
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
        final String sql = "select `name`, phone_num, email ";
        return template.query(sql, new CustomerMapper());
    }

    @Override
    public Customer findById(int customerId){
    final String sql = "select `name`, phone_num, email " +
            " from customer " +
            " where customer_id = ?";

        Customer customer = template.query(sql, new CustomerMapper(), customerId).stream()
                .findFirst().orElse(null);

        return customer;
    }


    @Override
    public Customer add(Customer customer) {

        final String sql = " insert into customer (`name`, phone_num, email) " +
                " values (?,?,?) ";

        KeyHolder keyHolder = new GeneratedKeyHolder();
        int rowsAffected = template.update(connection -> {
            PreparedStatement ps = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setString(1, customer.getName());
            ps.setString(2, customer.getPhoneNum());
            ps.setString(3, customer.getEmail());
            return ps;
        }, keyHolder);

        if (rowsAffected <= 0) {
            return null;
        }

        customer.setCustomerId(keyHolder.getKey().intValue());
        return customer;
    }

    @Override
    public boolean update(Customer customer) {
       final String sql = " update customer set " +
               " `name` = ?, " +
               " phone_num = ?, " +
               " email = ? " +
               " where customer_id = ?;";

       return template.update(sql,
               customer.getName(),
               customer.getPhoneNum(),
               customer.getEmail(),
               customer.getCustomerId()) > 0;
    }

    @Override
    @Transactional
    public boolean deleteById(int customerId) {
        template.update( "delete from customer where customer_id = ?;", customerId);
        return template.update("delete from customer where customer_id = ?;", customerId) > 0;
    }

}
