package com.IP3G11.Best11.services;

import com.IP3G11.Best11.dto.FixtureDto;
import com.IP3G11.Best11.model.Fixture;
import com.IP3G11.Best11.model.Team;
import com.IP3G11.Best11.repositories.FixtureRepo;
import com.IP3G11.Best11.tools.ModelClassifier;
//import com.groupdocs.merger.internal.c.a.i.internal.b.F;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import weka.core.Instances;

import java.util.ArrayList;
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

    public FixtureDto getById(int id) {
        return new FixtureDto(fixtureRepo.findById(id));
    }

    public List<FixtureDto> getAll() {
        List<Fixture> fixtures = fixtureRepo.findAll();
        Collections.sort(fixtures);
        List<FixtureDto> fixturesDto = new ArrayList<>();
        for(Fixture f : fixtures){
            fixturesDto.add(new FixtureDto(f));
        }
        return fixturesDto;
    }

    private void addPrediction(Fixture fixture) {
        Team homeTeam = fixture.getHomeTeam();
        Team awayTeam = fixture.getAwayTeam();

        Instances inst = lc.createInstance(homeTeam.getHomeAttStrLast20(), awayTeam.getAwayAttStrLast20(),
                homeTeam.getHomeDefStrLast20(), awayTeam.getAwayDefStrLast20(), homeTeam.getHomeFormLast20(),
                awayTeam.getAwayFormLast20(), homeTeam.getHomeDefStrLast10(), homeTeam.getHomeFormLast10());
        System.out.println("Home Team: " + homeTeam.getTeamName());
        System.out.println("Away Team: " + awayTeam.getTeamName());
        char prediction = lc.Classify(inst).toCharArray()[0];
        fixture.setPrediction(lc.Classify(inst).toCharArray()[0]);
        System.out.println("Prediction: " + lc.Classify(inst).toCharArray()[0] + "\n\n");
    }

    public List<FixtureDto> getNext(String name){
        List<Fixture> fixtures = fixtureRepo.findByDateTimeAfterAndHomeTeamNameOrDateTimeAfterAndAwayTeamNameOrderByDateTimeDesc(new Date(), name, new Date(), name);
        Collections.sort(fixtures);
        List<FixtureDto> fixturesDto = new ArrayList<>();
        for(Fixture f : fixtures){
            fixturesDto.add(new FixtureDto(f));
        }
        return fixturesDto;
    }

    public List<FixtureDto> getLast5(String name){
        List<Fixture> fixtures = fixtureRepo.findTop5ByDateTimeBeforeAndHomeTeamNameOrDateTimeBeforeAndAwayTeamNameOrderByDateTimeDesc(new Date(), name, new Date(), name);
        System.out.println(new Date().toGMTString());
        Collections.sort(fixtures);
        List<FixtureDto> fixturesDto = new ArrayList<>();
        for(Fixture f : fixtures){
            fixturesDto.add(new FixtureDto(f));
            System.out.println(new Date().after(f.getDateTime()));
        }
        return fixturesDto;
    }
}