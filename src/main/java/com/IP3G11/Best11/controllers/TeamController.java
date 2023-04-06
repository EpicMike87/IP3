package com.IP3G11.Best11.controllers;

import com.IP3G11.Best11.dto.TeamDto;
import com.IP3G11.Best11.model.Player;
import com.IP3G11.Best11.model.Team;
import com.IP3G11.Best11.model.TeamStats;
import com.IP3G11.Best11.services.TeamService;
import com.IP3G11.Best11.tools.APIUtility;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class TeamController {

    @Autowired
    private TeamService teamService;

    @GetMapping("/team/all")
    public List<TeamDto> getTeams() throws IOException, InterruptedException {
        return teamService.getAllTeams();
    }

    //@GetMapping("/season/averages")
    //public HashMap<String, Double> getSeasonAverages(){
      //  return teamService.getLeagueAverages();
    //}

    @GetMapping("/team/{name}")
    public TeamDto getTeamByName(@PathVariable String name) {
        TeamDto team = teamService.getTeamByName(name);
        System.out.println(team.getPlayers());
        return team;
    }

    @GetMapping("/team/list/{name}")
    public List<TeamDto> getTeamListByName(@PathVariable String name) {
        return teamService.findListByName(name);
    }

    @GetMapping("/team/id/{id}")
    public TeamDto getTeamById(@PathVariable int id) {
        return teamService.getTeam(id);
    }

    @GetMapping("/team/rank/{rank}")
    public TeamDto getTeamByRank(@PathVariable int rank) {
        return teamService.getTeamByRank(rank);
    }
}
