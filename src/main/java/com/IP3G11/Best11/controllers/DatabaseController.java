package com.IP3G11.Best11.controllers;

import com.IP3G11.Best11.services.DatabaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.text.ParseException;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class DatabaseController {

    @Autowired
    DatabaseService databaseService;

    @GetMapping("database/load")
    public String loadDatabase() throws IOException, ParseException, InterruptedException {
        try{
            databaseService.loadDatabase();
        }
        catch(IOException | ParseException | InterruptedException e){
            return "The system encountered an error.";
        }
        return "Database loaded successfully.";
    }

    @GetMapping("database/loadfixtures")
    public void loadFixtures() throws IOException, ParseException, InterruptedException {
            databaseService.loadFixtures();
    }

}