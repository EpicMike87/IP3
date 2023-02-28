package com.IP3G11.Best11.services;

import com.IP3G11.Best11.model.Team;
import com.IP3G11.Best11.repositories.TeamRepo;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;

public class TeamService {

    private final TeamRepo teamRepo;
    private final List<Team> teams;

    public TeamService(TeamRepo teamRepo) throws IOException, InterruptedException {
        teams = teamRepo.getTeams();
        this.teamRepo = teamRepo;
    }

    public List<Team> getTeams() throws IOException, InterruptedException {
        return teams;
    }

    public Team getTeamByName(String name){
        for(Team t : teams){
            if(t.getTeamName().equalsIgnoreCase(name)) return t;
        }
        return null;
    }
}
