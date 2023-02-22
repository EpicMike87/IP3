package com.IP3G11.Best11;

import com.IP3G11.Best11.services.PlayerService;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;

import java.io.IOException;

@SpringBootApplication(exclude = {DataSourceAutoConfiguration.class})
public class Best11Application {

    public static void main(String[] args) throws IOException, InterruptedException {
        SpringApplication.run(Best11Application.class, args);
        PlayerService service = new PlayerService();
        System.out.println(service.getTeamId("hearts"));
    }

}
