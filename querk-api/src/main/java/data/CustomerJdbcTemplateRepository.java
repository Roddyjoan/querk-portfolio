package data;

import models.Customer;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class CustomerJdbcTemplateRepository implements CustomerRepository{
    private final JdbcTemplate template;

    public CustomerJdbcTemplateRepository(JdbcTemplate template){
        this.template = template;
    }


    @Override
    public List<Customer> findAll() {
        return null;
    }

    @Override
    public Customer findById(int customerId) {
        return null;
    }

    @Override
    public Customer add(Customer customer) {
        return null;
    }

    @Override
    public boolean deleteById(int customerId) {
        return false;
    }
}
