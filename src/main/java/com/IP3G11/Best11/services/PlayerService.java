package com.IP3G11.Best11.services;

import com.IP3G11.Best11.model.Player;
import com.IP3G11.Best11.model.Team;
import com.IP3G11.Best11.repositories.PlayerApiRepo;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;

@Service
public class PlayerService {

    private final PlayerApiRepo repo;

    public PlayerService() throws IOException, InterruptedException {
        repo = new PlayerApiRepo();
    }

    public int getTeamId(String teamName) throws IOException, InterruptedException {
        return repo.getTeamId(teamName);
    }

    public Team getTeamByName(String teamName) {
        return null;
    }

    public List<Team> getTeams() throws IOException, InterruptedException {
        return repo.getTeams();
    }

    public Player getPlayerByName(String name) throws IOException, InterruptedException {
        return repo.getPlayerByName(name);
    }

}
