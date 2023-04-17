package com.IP3G11.Best11.services;

import com.IP3G11.Best11.model.Fixture;
import com.IP3G11.Best11.model.Team;
import com.IP3G11.Best11.repositories.PlayerRepo;
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
    private TeamRepo teamRepo;

    @Autowired
    private FixtureService fixtureService;

    @Autowired
    private PlayerRepo playerRepo;

    //Uses TeamDataReader to gather Team information from API-Football (and playerdata json files) and populate database
    public void loadDatabase() throws IOException, InterruptedException, ParseException {
        TeamDataReader db = new TeamDataReader();
        List<Team> teams = db.getTeams();
        Set<Team> setTeams = new HashSet<>(teams);
        for(Team t : setTeams){
            try{teamRepo.save(t);}
            catch(IllegalStateException e){
                System.out.println("Entry may already exist.");
            }
        }
    }

    //Loads fixtures in from CSV, gets upcoming fixtures from API-Football and adds team strength data, saves to db
    public void loadFixtures() throws Exception {

        try {
            FixtureCsvTool.getCSV();
        }
        catch(Exception e){
            e.printStackTrace();
        }

        List<Team> teams = teamRepo.findAll();
        List<Fixture> fixtures = FixtureCsvTool.getFixturesFromCsv("./fixturedata/fixture-data.csv", teams);
        TeamStrengthTool tsc = new TeamStrengthTool();
        tsc.setFixtures(fixtures);
        tsc.setTeams(teams);
        tsc.setLeagueAvgs();
        Set<Fixture> fixSet = new HashSet<>(fixtures);
        Set<Fixture> upcomingFixSet = FixtureApiTool.getFutureXFixtures(10, teams);
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
