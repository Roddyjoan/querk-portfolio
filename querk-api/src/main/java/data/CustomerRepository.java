package data;

import models.Customer;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface CustomerRepository {
    List<Customer> findAll();

    Customer findById(int customerId);

    Customer add(Customer customer);

    boolean deleteById(int customerId);

}
