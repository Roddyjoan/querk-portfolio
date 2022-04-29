package domain;

import data.CustomerRepository;
import models.Customer;
import org.springframework.boot.autoconfigure.validation.ValidationAutoConfiguration;
import org.springframework.stereotype.Service;

import javax.validation.Validation;
import java.time.LocalDate;
import java.util.List;


@Service
public class CustomerService {

    private final CustomerRepository repository;

    public CustomerService(CustomerRepository repository) {
        this.repository = repository;
    }

    public List<Customer> findAll() { return repository.findAll(); }

    public Customer findById(int customerId){ return repository.findById(customerId); }

    public Result<Customer> add(Customer customer) {
        Result<Customer> result = validate(customer);
        if (!result.isSuccess()) {
            return result;
        }

        if (customer.getCustomerId() != 0) {
            result.addMessage("customerId cannot be set for `add` operation", ResultType.INVALID);
            return result;
        }

        customer = repository.add(customer);
        result.setPayload(customer);
        return result;
    }


    private Result<Customer> validate(Customer customer) {
        Result<Customer> result = new Result<>();
        if (customer == null) {
            result.addMessage("customer cannot be null", ResultType.INVALID);
            return result;
        }

        return result;

    }

}
