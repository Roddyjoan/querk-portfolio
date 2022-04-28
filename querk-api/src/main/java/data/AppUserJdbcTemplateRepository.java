package data;

import models.AppUser;
import org.springframework.stereotype.Repository;

@Repository
public class AppUserJdbcTemplateRepository implements AppUserRepository{
    @Override
    public AppUser findByUsername(String username) {
        return null;
    }

    @Override
    public AppUser create(AppUser user) {
        return null;
    }

    @Override
    public boolean deleteByUsername(String username) {
        return false;
    }

    @Override
    public void update(AppUser user) {

    }
}
