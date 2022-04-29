package data;

import models.Customer;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.NONE)
class CustomerJdbcTemplateRepositoryTest {

    final static int NEXT_ID = 4;

    @Autowired
    CustomerJdbcTemplateRepository repository;

    @Autowired
    KnownGoodState knownGoodState;

    @BeforeEach
    void setup() {
        knownGoodState.set();
    }

    @Test
    void findAll() {
        List<Customer> customers = repository.findAll();
        assertNotNull(customers);
    }

    @Test
    void findById() {
        Customer roddy = repository.findById(1);
        assertEquals("roddy", roddy.getName());
        assertEquals("1231231234", roddy.getPhoneNum());
        assertEquals("roddy@gamil.com", roddy.getEmail());
    }

    @Test
    void shouldNotFindById() {
        Customer nope = repository.findById(100000);
        assertNull(nope);
    }

    @Test
    void add() {
        Customer customer= makeCustomer();
        Customer actual = repository.add(customer);
        assertNotNull(actual);
        assertEquals(NEXT_ID, actual.getCustomerId());
    }

    @Test
    void shouldNotAdd() {
        Customer customer = makeCustomer();
        customer.setPhoneNum(null);
        Customer actual = repository.add(customer);

    }

    @Test
    void deleteById() {
    }

    @Test
    void shouldNotDeleteById() {
    }

    private Customer makeCustomer(){
        Customer customer = new Customer();
        customer.setName("bobbo");
        customer.setPhoneNum("1231231230");
        customer.setEmail("bobbo@bobbo.com");
        return customer;
    }
}