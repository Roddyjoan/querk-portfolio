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
                .antMatchers( HttpMethod.GET, "/api/restaurant/*").permitAll()
                .antMatchers( HttpMethod.GET, "/api/restaurants").permitAll()
                .antMatchers( HttpMethod.POST, "/api/security/login").permitAll()
                .antMatchers( HttpMethod.POST, "/api/user/customer").permitAll()
                .antMatchers( HttpMethod.POST, "/api/user/restaurant").permitAll()
                .antMatchers( HttpMethod.POST, "/api/customer").permitAll()
                .antMatchers( HttpMethod.POST, "/api/restaurants").authenticated()
                .antMatchers( HttpMethod.PUT, "/api/customer/*").authenticated()
                .antMatchers( HttpMethod.PUT, "/api/restaurants/*").authenticated()
                .antMatchers( HttpMethod.GET, "/api/restaurants/*").permitAll()

                .antMatchers( HttpMethod.GET,"/api/customer").authenticated()
                .antMatchers( HttpMethod.GET,"/api/customers").authenticated()
                .antMatchers( HttpMethod.GET,"/api/restaurants").authenticated()
                .antMatchers( HttpMethod.DELETE, "/api/customer/*").authenticated()
                .antMatchers( HttpMethod.DELETE, "/api/restaurants/*").authenticated()
                .anyRequest().permitAll()
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
