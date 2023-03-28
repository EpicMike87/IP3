package com.IP3G11.Best11.services;

import com.IP3G11.Best11.model.Fixture;
import com.IP3G11.Best11.model.Team;
import com.IP3G11.Best11.repositories.FixtureRepo;
import com.IP3G11.Best11.repositories.TeamRepo;
import com.IP3G11.Best11.tools.FixtureApiTool;
import com.IP3G11.Best11.tools.FixtureCsvTool;
import com.IP3G11.Best11.tools.TeamDataReader;
import com.IP3G11.Best11.tools.TeamStrengthTool;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.text.ParseException;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class DatabaseService {

    @Autowired
    private TeamRepo teamRepo2;

    @Autowired
    private FixtureService fixtureService;

    public void loadDatabase() throws IOException, InterruptedException, ParseException {
        TeamDataReader db = new TeamDataReader();
        List<Team> teams = db.getTeams();
        Set<Team> setTeams = new HashSet<>(teams);
        for(Team t : setTeams){
            try{teamRepo2.save(t);}
            catch(IllegalStateException e){
                System.out.println("Entry may already exist.");
            }
        }
    }

    public void loadFixtures() throws IOException, ParseException, InterruptedException {

        /*FixtureCsvTool.getCSV();*/

        List<Team> teams = teamRepo2.findAll();
        List<Fixture> fixtures = FixtureCsvTool.getFixturesFromCsv("./fixturedata/seasonFixtures.csv", teams);
        TeamStrengthTool tsc = new TeamStrengthTool();
        tsc.setFixtures(fixtures);
        tsc.setTeams(teams);
        tsc.setLeagueAvgs();
        Set<Fixture> fixSet = new HashSet<>(fixtures);
        Set<Fixture> upcomingFixSet = FixtureApiTool.getFutureXFixtures(3, teams);
        fixSet.addAll(upcomingFixSet);
        for(Fixture f : fixSet){
            try {
                fixtureService.save(f);
            }
            catch(Exception e){
                System.out.println("Unable to save.");
            }
        }
    }
}
