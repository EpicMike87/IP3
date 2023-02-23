package com.IP3G11.Best11.controllers;

import com.IP3G11.Best11.model.Player;
import com.IP3G11.Best11.model.Team;
import com.IP3G11.Best11.services.PlayerService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@RestController
public class PlayerController {

    private List<Team> teams = new ArrayList<>();
    private Player player = new Player();
    private PlayerService service = new PlayerService();

    public PlayerController() throws IOException, InterruptedException {
    }

    @GetMapping("/teams")
    public List<Team> getTeams() throws IOException, InterruptedException {
        List<Team> teams = service.getTeams();
        for(Team team: teams){
            System.out.println("Team:  " + team);
        }
        return teams;
    }

    @GetMapping("/search-player/{name}")
    public Player searchPlayerByName(@PathVariable String name) throws IOException, InterruptedException {
        Player player = service.getPlayerByName(name);
        return player;

    }
}
