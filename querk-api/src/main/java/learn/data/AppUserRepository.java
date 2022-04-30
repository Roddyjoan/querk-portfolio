package learn.data;

import learn.models.AppUser;
import org.springframework.transaction.annotation.Transactional;

public interface AppUserRepository {
    @Transactional
    AppUser findByUsername(String username);

    @Transactional
    AppUser create(AppUser user);

    @Transactional
    boolean deleteByUsername(String username);

    @Transactional
    void update(AppUser user);
}
