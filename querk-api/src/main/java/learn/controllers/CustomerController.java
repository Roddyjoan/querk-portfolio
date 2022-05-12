package learn.controllers;

import learn.domain.CustomerService;
import learn.domain.Result;
import learn.models.Customer;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
//@CrossOrigin(origins = {"http://localhost:3000"})
@CrossOrigin (origins = {"*"})
@RequestMapping("/api/customers")
public class CustomerController {
    private final CustomerService service;

    public CustomerController(CustomerService service) {
        this.service = service;
    }

    @GetMapping
    public List<Customer> findAll(){
        return service.findAll();
    }

    @GetMapping("/{customerId}")
    public ResponseEntity<Customer> findById(@PathVariable Integer customerId){
        Customer toFind = service.findById(customerId);
        if (toFind != null) {
            return ResponseEntity.ok(toFind);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PostMapping
    public ResponseEntity<Object> add(@RequestBody Customer customer){
        Result<Customer> result = service.add(customer);
        if (result.isSuccess()) {
            return new ResponseEntity<>(result.getPayload(), HttpStatus.CREATED);
        }
        return ErrorResponse.build(result);
    }

    @PutMapping("/{customerId}")
    public ResponseEntity<Object> update(@PathVariable Integer customerId, @RequestBody Customer customer){
        if (customerId != customer.getCustomerId()){
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }
        Result<Customer> result = service.update(customer);
        if (result.isSuccess()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }

        return ErrorResponse.build(result);
    }

    @DeleteMapping("/{customerId}")
    public ResponseEntity<Void> deleteById(@PathVariable Integer customerId){
        if (service.deleteById(customerId)){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

}




