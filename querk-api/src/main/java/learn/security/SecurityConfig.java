package learn.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    private final JwtConverter converter;

    public SecurityConfig(JwtConverter converter) {
        this.converter = converter;
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.csrf().disable();

        http.cors();

        http.authorizeRequests()
                // TODO add antMatchers here to configure access to specific API endpoints
                // require authentication for any request...

                //LOGIN/SIGNUP
                .antMatchers( HttpMethod.POST, "/api/authenticate/login").permitAll()
                .antMatchers( HttpMethod.POST, "/api/user/customer").permitAll()
                .antMatchers( HttpMethod.POST, "/api/user/restaurant").permitAll()
                .antMatchers( HttpMethod.POST, "/api/customers").permitAll()
                .antMatchers( HttpMethod.POST, "/api/restaurants").permitAll()


                //MENU

                .antMatchers( HttpMethod.GET, "/api/menu").permitAll()
                .antMatchers( HttpMethod.GET, "/api/menu/restaurant/*").permitAll()
                .antMatchers( HttpMethod.POST, "/api/menu").hasAnyRole("OWNER")
                .antMatchers( HttpMethod.PUT, "/api/menu/*").hasAnyRole("OWNER")
                .antMatchers( HttpMethod.DELETE, "/api/menu/*").hasAnyRole("OWNER")


                //RESTAURANT QUEUE
                .antMatchers( HttpMethod.GET, "/api/restaurant/queue/current/*").permitAll()
                .antMatchers( HttpMethod.GET, "/api/restaurant/queue/user/*").permitAll()
                .antMatchers( HttpMethod.POST, "/api/restaurant/queue").hasAnyRole("CUSTOMER")
                .antMatchers(HttpMethod.PUT, "/api/restaurant/queue/update/*").hasAnyRole("OWNER")
                .antMatchers(HttpMethod.PUT, "/api/restaurant/queue/ready/*").hasAnyRole("OWNER")

                //RESTAURANTS
                .antMatchers( HttpMethod.GET, "/api/restaurants").permitAll()
                .antMatchers( HttpMethod.PUT, "/api/restaurants/*").authenticated()
                .antMatchers( HttpMethod.GET, "/api/restaurants/*").permitAll()

                //CUSTOMERS
                .antMatchers( HttpMethod.PUT, "/api/customers/*").authenticated()
                .antMatchers( HttpMethod.GET, "/api/customers/*").hasAnyRole("OWNER")


                .antMatchers( HttpMethod.GET, "/").permitAll()
                .anyRequest().denyAll()
                .and()
                .addFilter(new JwtRequestFilter(authenticationManager(), converter))
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS);
    }

    @Override
    @Bean
    protected AuthenticationManager authenticationManager() throws Exception {
        return super.authenticationManager();
    }

    @Bean
    public PasswordEncoder getEncoder() {
        return new BCryptPasswordEncoder();
    }

}
