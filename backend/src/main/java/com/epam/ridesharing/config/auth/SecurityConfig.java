package com.epam.ridesharing.config.auth;

import org.springframework.boot.autoconfigure.security.Http401AuthenticationEntryPoint;
import org.springframework.context.annotation.Bean;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.data.repository.query.SecurityEvaluationContextExtension;

@EnableWebSecurity(debug = true)
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .authorizeRequests()
                .antMatchers("/css/**").permitAll()
                .antMatchers("/api/**").hasAnyRole("USER", "ADMIN")
                .and()
                .httpBasic()
                .authenticationEntryPoint(getEntryPoint())
                .and()
                .csrf().disable()
                .logout()
                .logoutUrl("/api/logout")
                .and()
                .headers().frameOptions().disable();
    }

    private Http401AuthenticationEntryPoint getEntryPoint() {
        // specifying non-standard entry point allows us to disable 'Basic Auth' browser popup
        return new Http401AuthenticationEntryPoint("ridesharing");
    }

    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public UserDetailsService springDataUserDetailsService() {
        return new BasicUserDetailsService();
    }

    @Bean
    public SecurityEvaluationContextExtension securityEvaluationContextExtension() {
        return new SecurityEvaluationContextExtension();
    }
}
