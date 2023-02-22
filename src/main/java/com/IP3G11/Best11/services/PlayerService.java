package com.IP3G11.Best11.services;

import com.IP3G11.Best11.model.Player;
import com.IP3G11.Best11.model.Team;
import com.IP3G11.Best11.repositories.PlayerApiRepo;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
public class PlayerService {

    private PlayerApiRepo repo;

    public PlayerService() throws IOException, InterruptedException {
        repo = new PlayerApiRepo();
    }

    public int getTeamId(String teamName) throws IOException, InterruptedException {
        return repo.getTeamId(teamName);
    }

    public Team getTeamByName(String teamName){
        return null;
    }

    public Player getPlayerByName(String name){
        return null;
    }

}
