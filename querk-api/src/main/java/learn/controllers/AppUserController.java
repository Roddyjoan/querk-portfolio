package learn.controllers;

import learn.domain.AppUserService;
import learn.domain.Result;
import learn.models.AppUser;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = {"http://localhost:3000"})
@RequestMapping("/api/user")
public class AppUserController {
    private final AppUserService service;

    public AppUserController(AppUserService service) {
        this.service = service;
    }

    @PostMapping("/customer")
    public ResponseEntity<Object> add(@RequestBody AppUser appUser){
            Result<AppUser> result = service.addCustomer(appUser);
        if (result.isSuccess()) {
            return new ResponseEntity<>(result.getPayload(), HttpStatus.CREATED);
        }
        return ErrorResponse.build(result);
    }

    @PostMapping("/restaurant")
    public ResponseEntity<Object> addRestaurant(@RequestBody AppUser appUser){
        Result<AppUser> result = service.addRestaurant(appUser);
        if (result.isSuccess()) {
            return new ResponseEntity<>(result.getPayload(), HttpStatus.CREATED);
        }
        return ErrorResponse.build(result);
    }



}
