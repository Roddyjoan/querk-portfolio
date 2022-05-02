package learn.domain;

import learn.data.CustomerRepository;
import learn.models.Customer;
import learn.models.Restaurant;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.time.LocalDate;

import static org.junit.jupiter.api.Assertions.assertEquals;
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
    }

    @Test
    void shouldNotAddWithoutPhoneNum(){
        Customer customer = makeCustomer();
    }

    @Test
    void shouldNotAddDupeUserId(){
        Customer customer = makeCustomer();
    }

    @Test
    void shouldNotAddWithId(){
        Customer customer = makeCustomer();
    }

    @Test
    void update() {
    }

    @Test
    void shouldNotUpdateWithoutId() {
    }

    @Test
    void shouldNotUpdateNonexistent() {
    }

    private Customer makeCustomer(){
        Customer customer = new Customer();
        customer.setName("bobbo");
        customer.setPhoneNum("1231231230");
        customer.setEmail("bobbo@bobbo.com");
        return customer;
    }
}