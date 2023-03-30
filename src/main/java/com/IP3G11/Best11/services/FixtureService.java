package com.IP3G11.Best11.services;

import com.IP3G11.Best11.model.Fixture;
import com.IP3G11.Best11.model.Team;
import com.IP3G11.Best11.repositories.FixtureRepo;
import com.IP3G11.Best11.tools.ModelClassifier;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import weka.core.Instances;

import java.time.LocalDate;
import java.util.Collections;
import java.util.Date;
import java.util.List;

@Service
public class FixtureService {

    private final FixtureRepo fixtureRepo;
    private final ModelClassifier lc;

    @Autowired
    public FixtureService(FixtureRepo fixtureRepo) {
        this.fixtureRepo = fixtureRepo;
        lc = new ModelClassifier();
    }

    public void save(Fixture f) {

        if(!fixtureRepo.existsByHomeTeamNameAndDateTime(f.getHomeTeamName(), f.getDateTime()))
            fixtureRepo.save(f);
        else {

            if(f.getDateTime().after(new Date()) && f.getPrediction() == null){
                addPrediction(f);
            }

            Fixture fix = fixtureRepo.findByHomeTeamNameAndDateTime(f.getHomeTeamName(), f.getDateTime());
            fix.setFullTimeResult(f.getFullTimeResult());
            fix.setPrediction(f.getPrediction());
            fix.setHomeTeamGoals(f.getHomeTeamGoals());
            fix.setAwayTeamGoals(f.getAwayTeamGoals());
            fixtureRepo.save(fix);
        }
    }

    public Fixture getById(int id) {
        return fixtureRepo.findById(id);
    }

    public List<Fixture> getAll() {
        List<Fixture> fixtures = fixtureRepo.findAll();
        Collections.sort(fixtures);
        return fixtures;
    }

    private void addPrediction(Fixture fixture) {
        Team homeTeam = fixture.getHomeTeam();
        Team awayTeam = fixture.getAwayTeam();

        Instances inst = lc.createInstance(homeTeam.getHomeAttStrLast20(), awayTeam.getAwayAttStrLast20(),
                homeTeam.getHomeDefStrLast20(), awayTeam.getAwayDefStrLast20(), homeTeam.getHomeFormLast20(),
                awayTeam.getAwayFormLast20(), homeTeam.getHomeDefStrLast10(), homeTeam.getHomeFormLast10());
        System.out.println("Home Team: " + homeTeam.getTeamName());
        System.out.println("Away Team: " + awayTeam.getTeamName());
        System.out.println(inst);
        fixture.setPrediction(lc.Classify(inst).toCharArray()[0]);
        System.out.println("Prediction: " + lc.Classify(inst).toCharArray()[0] + "\n\n");
    }

    public List<Fixture> getNext3(String name){
        return fixtureRepo.findTop3ByHomeTeamNameOrAwayTeamNameOrderByDateTimeDesc(name, name);
    }

    public List<Fixture> getLast5(String name){
        return fixtureRepo.findTop5ByHomeTeamNameOrAwayTeamNameAndDateTimeBeforeOrderByDateTimeDesc(name, name, new Date());
    }
}