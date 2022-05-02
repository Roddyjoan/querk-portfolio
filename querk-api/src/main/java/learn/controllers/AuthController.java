package learn.controllers;

import learn.domain.CustomerService;
import learn.domain.RestaurantService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.web.configurers.oauth2.server.resource.OAuth2ResourceServerConfigurer;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.bind.annotation.*;
import security.JwtConverter;

import java.util.HashMap;
import java.util.Map;

@CrossOrigin(origins = {"http://localhost:3000"})
@RestController
@RequestMapping("/api/authenticate")
public class AuthController {

    AuthenticationManager authenticationManager;
    JwtConverter jwtConverter;
    CustomerService customerService;
    RestaurantService restaurantService;

    public AuthController(AuthenticationManager authenticationManager,
                          JwtConverter jwtConverter,
                          CustomerService customerService,
                          RestaurantService restaurantService) {
        this.authenticationManager = authenticationManager;
        this.jwtConverter = jwtConverter;
        this.customerService = customerService;
        this.restaurantService = restaurantService;
    }

    @PostMapping("/login")
    ResponseEntity login (@RequestBody Map<String, String> credentials ) {
        UsernamePasswordAuthenticationToken token =
                new UsernamePasswordAuthenticationToken( credentials.get("username"), credentials.get("password"));
        try{
            Authentication authResult = authenticationManager.authenticate( token );
            if( authResult.isAuthenticated() ){
                String jwt = jwtConverter.getTokenFromUser( (User) authResult.getPrincipal());
                Map<String, String> tokenWrapper = new HashMap<>();
                tokenWrapper.put("jwt_token",jwt);
                return ResponseEntity.ok( tokenWrapper );
            }
        } catch
        (AuthenticationException ex ){
            ex.printStackTrace( System.err );
        }
        return new ResponseEntity( HttpStatus.FORBIDDEN );
    }

}
