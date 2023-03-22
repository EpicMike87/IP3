package com.IP3G11.Best11.services;

import com.IP3G11.Best11.model.Player;
import com.IP3G11.Best11.model.Team;
import com.IP3G11.Best11.repositories.TeamRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;

@Service
public class TeamService {

    @Autowired
    private TeamRepo teamRepo;

    private List<Team> teams;

    public TeamService() throws IOException, InterruptedException {
    }


    public List<Team> getTeams(){
        return teams;
    }

    public Team getTeamByName(String name){
        for(Team t : teams){
            if(t.getTeamName().equalsIgnoreCase(name)) return t;
        }
        return null;
    }

    public List<Player> getAllPlayers(){
        return teamRepo.getAllPlayers();
    }
}
