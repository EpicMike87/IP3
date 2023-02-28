package com.IP3G11.Best11;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;

@SpringBootApplication(exclude = {DataSourceAutoConfiguration.class})
public class Best11Application {

    public static void main(String[] args){
        SpringApplication.run(Best11Application.class, args);
    }


}