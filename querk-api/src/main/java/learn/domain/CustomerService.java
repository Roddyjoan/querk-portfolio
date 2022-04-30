package learn.domain;

import learn.data.CustomerRepository;
import learn.models.Customer;
import org.springframework.stereotype.Service;

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

    public Result<Customer> update(Customer customer){
        Result<Customer> result = validate(customer);
        if(!result.isSuccess()){
            return result;
        }

        if (customer.getCustomerId() <= 0) {
            result.addMessage("customerId must be set for `update` operation", ResultType.INVALID);
            return result;
        }

        if (!repository.update(customer)) {
            String msg = String.format("customerId: %s, not found", customer.getCustomerId());
            result.addMessage(msg, ResultType.NOT_FOUND);
        }

        return result;

    }
    public Boolean deleteById(int customerId) { return repository.deleteById(customerId);}


    private Result<Customer> validate(Customer customer) {
        Result<Customer> result = new Result<>();
        if (customer == null) {
            result.addMessage("customer cannot be null", ResultType.INVALID);
            return result;
        }

        if (customer.getName() == null){
            result.addMessage("Customer must have a name",  ResultType.INVALID);
            return result;
        }

        if (customer.getPhoneNum() == null){
            result.addMessage("Customer must have a phone number", ResultType.INVALID);
            return result;
        }

        //TODO: Can't have one userId for multiple customers
        if( repository.findAll().stream().anyMatch(customer1 -> customer.getUserId() == customer1.getUserId()) ){
            result.addMessage("Customer must have a unique userId", ResultType.INVALID);
            return result;
        }

        return result;
    }

}
