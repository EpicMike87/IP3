package com.IP3G11.Best11.config;

import com.IP3G11.Best11.repositories.PlayerRepository;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@Configuration
@ComponentScan("com.IP3G11.Best11")
@EnableJpaRepositories("com.IP3G11.Best11.repositories")
public class AppConfig {


}
