package learn.domain;

import learn.data.AppUserRepository;
import learn.models.AppUser;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.validation.ValidationException;
import java.util.List;

@Service
public class AppUserService implements UserDetailsService {
    private final AppUserRepository repository;
    private final PasswordEncoder encoder;

    public AppUserService(AppUserRepository repository, PasswordEncoder encoder) {
        this.repository = repository;
        this.encoder = encoder;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        AppUser appUser = repository.findByUsername(username);

        if (appUser == null || !appUser.isEnabled()){
            throw new UsernameNotFoundException(username + " not found");
        }

        return appUser;
    }

    public Result<AppUser> addCustomer(AppUser appUser){
        Result<AppUser> result=validate(appUser);
        if (!result.isSuccess()){
            return result;
        }

        if (appUser.getAppUserId() != 0) {
            result.addMessage("id cannot be set for add", ResultType.INVALID);
            return result;
        }

        AppUser toCreate = create(appUser.getUsername(), appUser.getPassword());
        result.setPayload(toCreate);
        return result;

    }

    public Result<AppUser> addRestaurant(AppUser appUser){
        Result<AppUser> result=validate(appUser);
        if (!result.isSuccess()){
            return result;
        }

        if (appUser.getAppUserId() != 0) {
            result.addMessage("id cannot be set for add", ResultType.INVALID);
            return result;
        }

        appUser = repository.createRestaurantUser(appUser);
        result.setPayload(appUser);
        return result;

    }

    public Result<AppUser> update(AppUser appUser){
        Result<AppUser> result = validate(appUser);
        if (!result.isSuccess()){
            return result;
        }

        if (appUser.getAppUserId() <= 0){
            result.addMessage("id must be set for update", ResultType.INVALID);
            return result;
        }

        if (!repository.update(appUser)) {
            String msg = String.format("AppUser: %s, not found", appUser.getAppUserId());
            result.addMessage(msg, ResultType.NOT_FOUND);
        }

        return result;
    }

    private Result<AppUser> validate(AppUser appUser) {
        Result<AppUser> result = new Result<>();
        if (appUser == null){
            result.addMessage("appUser cannot be null", ResultType.INVALID);
            return result;
        }

        if (appUser.getUsername().isBlank() || appUser.getUsername().isEmpty()){
            result.addMessage("username must be filled out", ResultType.INVALID);
            return result;
        }

        if (appUser.getPassword().isEmpty() || appUser.getPassword().isBlank()){
            result.addMessage("password must be filled out", ResultType.INVALID);
            return result;
        }
        return result;
    }

    public AppUser create(String username,String password){
        validateUsername(username);
        validatePassword(password);

        password = encoder.encode(password);
        AppUser appUser = new AppUser(0,username, password,false, List.of("User"));

        return repository.create(appUser);
    }

    private void validatePassword(String password) {
        if (password == null || password.length() < 8) {
            throw new ValidationException("password must be at least 8 characters");
        }

        int digits = 0;
        int letters = 0;
        for (char c : password.toCharArray()) {
            if (Character.isDigit(c)) {
                digits++;
            } else if (Character.isLetter(c)) {
                letters++;
            }
        }

        if (digits == 0 || letters == 0 ) {
            throw new ValidationException("password must contain at least one digit and at least one letter");
        }
    }

    private void validateUsername(String username) {
        if (username == null || username.isBlank()) {
            throw new ValidationException("username is required");
        }

        if (username.length() > 50) {
            throw new ValidationException("username must be less than 50 characters");
        }
    }
}
