package com.IP3G11.Best11;

import com.IP3G11.Best11.repositories.PlayerApiRepo;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;

import java.io.IOException;

@SpringBootApplication(exclude = {DataSourceAutoConfiguration.class})
public class Best11Application {

	public static void main(String[] args) throws IOException, InterruptedException {
		SpringApplication.run(Best11Application.class, args);
		System.out.println(PlayerApiRepo.getTeamId("Celtic"));
	}

}
