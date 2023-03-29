package com.IP3G11.Best11.controllers;

import com.IP3G11.Best11.model.Fixture;
import com.IP3G11.Best11.services.FixtureService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collections;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class FixtureController {

    @Autowired
    private FixtureService fixtureService;

    @GetMapping("fixtures/all")
    public List<Fixture> getAllFixtures(){
        List<Fixture> fixtures = fixtureService.getAll();
        Collections.sort(fixtures);
        return fixtures;
    }
}