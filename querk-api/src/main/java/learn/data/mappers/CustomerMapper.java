package learn.data.mappers;


import learn.models.Customer;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class CustomerMapper implements RowMapper<Customer> {

    @Override
    public Customer mapRow(ResultSet resultSet, int i) throws SQLException {
        Customer customer = new Customer();
        customer.setCustomerId(resultSet.getInt("customer_id"));
        customer.setUserId(resultSet.getInt("user_id"));
        customer.setName(resultSet.getString("name"));
        customer.setPhoneNum(resultSet.getString("phone_num"));
        customer.setEmail(resultSet.getString("email"));
        return customer;
    }
}
