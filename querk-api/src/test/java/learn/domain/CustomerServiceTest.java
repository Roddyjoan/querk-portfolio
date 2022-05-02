package learn.domain;

import learn.data.CustomerRepository;
import learn.models.Customer;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.mockito.Mock;
import static org.mockito.Mockito.when;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.NONE)
class CustomerServiceTest {

    @Autowired
    CustomerService service;

    @MockBean
    CustomerRepository repo;

    @Test
    void add() {
        Customer customer = makeCustomer();
        Result<Customer> result = service.add(customer);
        assertEquals(ResultType.SUCCESS, result.getType());
    }

    @Test
    void shouldNotAddNullCustomer(){
        Result<Customer> result = service.add(null);
        assertEquals(ResultType.INVALID, result.getType());
    }

    @Test
    void shouldNotAddWithoutName(){
        Customer customer = makeCustomer();
        customer.setName(null);
        Result<Customer> result = service.add(customer);
        assertEquals(ResultType.INVALID, result.getType());
    }

    @Test
    void shouldNotAddWithoutPhoneNum(){
        Customer customer = makeCustomer();
        customer.setPhoneNum(null);
        Result<Customer> result = service.add(customer);
        assertEquals(ResultType.INVALID, result.getType());
    }

    @Test
    void shouldNotAddDupeUserId(){
        Customer customer = makeCustomer();
        customer.setUserId(1);
        Customer roddy = service.findById(1);
        roddy.setUserId(1);
        customer.setUserId(1);
        Result<Customer> result = service.add(customer);
        assertEquals(ResultType.INVALID, result.getType());
    }

    @Test
    void shouldNotAddWithId(){
        Customer customer = makeCustomer();
        customer.setCustomerId(1);
        Result<Customer> result = service.add(customer);
        assertEquals(ResultType.INVALID, result.getType());
    }

    @Test
    void update() {
        Customer customer = makeCustomer();
        customer.setCustomerId(1);
        Result<Customer> result = service.update(customer);
        assertEquals(ResultType.SUCCESS, result.getType());
    }

    @Test
    void shouldNotUpdateWithoutId() {
        Customer customer = makeCustomer();
        Result<Customer> result = service.update(customer);
        assertEquals(ResultType.INVALID, result.getType());
    }

    @Test
    void shouldNotUpdateNonexistent() {
        Customer customer = makeCustomer();
        customer.setCustomerId(1000);
        Result<Customer> result = service.update(customer);
        assertEquals(ResultType.NOT_FOUND, result.getType());
    }

    private Customer makeCustomer(){
        Customer customer = new Customer();
        customer.setName("bobbo");
        customer.setPhoneNum("1231231230");
        customer.setEmail("bobbo@bobbo.com");
        return customer;
    }
}