package com.IP3G11.Best11.controllers;

import com.IP3G11.Best11.dto.FixtureDto;
import com.IP3G11.Best11.model.Fixture;
import com.IP3G11.Best11.services.FixtureService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collections;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class FixtureController {

    @Autowired
    private FixtureService fixtureService;

    //Returns all fixtures
    @GetMapping("fixtures/all")
    public List<FixtureDto> getAllFixtures(){
        List<FixtureDto> fixtures = fixtureService.getAll();
        Collections.sort(fixtures);
        return fixtures;
    }

    //Returns all upcoming fixtures
    @GetMapping("fixtures/upcoming")
    public List<FixtureDto> getUpcomingFixtures(){
        List<FixtureDto> fixtures = fixtureService.getUpcoming();
        Collections.sort(fixtures);
        return fixtures;
    }

    //Returns all upcoming fixtures
    @GetMapping("fixtures/id/{id}")
    public FixtureDto getById(@PathVariable int id){
        FixtureDto fixture = fixtureService.getById(id);
        return fixture;
    }

    //Returns upcoming fixtures for specific team
    @GetMapping("fixtures/next/{name}")
    public List<FixtureDto> getNext(@PathVariable String name){
        return fixtureService.getNext(name);
    }

    //Returns last 5 concluded fixtures for specific team
    @GetMapping("fixtures/last5/{name}")
    public List<FixtureDto> getLast5(@PathVariable String name){
        return fixtureService.getLast5(name);
    }
}
