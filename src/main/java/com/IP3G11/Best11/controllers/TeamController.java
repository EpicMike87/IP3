package com.IP3G11.Best11.controllers;
import com.IP3G11.Best11.model.Player;
import com.IP3G11.Best11.model.Team;
import com.IP3G11.Best11.services.TeamService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import java.io.IOException;
import java.util.List;


@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequiredArgsConstructor
public class TeamController {

    private final TeamService teamService;

    @GetMapping("/team/all")
    public List<Team> getTeams() throws IOException, InterruptedException {
        return teamService.getTeams();
    }

    @GetMapping("/team/{name}")
    public Team getTeamByName(@PathVariable String name){
        return teamService.getTeamByName(name);
    }

    @GetMapping("/teamstats/league_table")
    public List<Team> getLeagueTable() throws IOException, InterruptedException {
        return teamService.getTeams();
    }

}
