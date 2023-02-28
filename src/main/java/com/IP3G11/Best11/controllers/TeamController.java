package com.IP3G11.Best11.controllers;

import com.IP3G11.Best11.model.Player;
import com.IP3G11.Best11.model.Team;
import com.IP3G11.Best11.repositories.TeamRepo;
import com.IP3G11.Best11.services.TeamService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@RestController
public class TeamController {

    private TeamService teamService = new TeamService(new TeamRepo());

    public TeamController() throws IOException, InterruptedException {
    }

    @GetMapping("/teams")
    public List<Team> getTeams() throws IOException, InterruptedException {
        return teamService.getTeams();
    }

    @GetMapping("/team/{name}")
    public Team getTeamByName(@PathVariable String name){
        return teamService.getTeamByName(name);
    }
}
