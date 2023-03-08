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

    @GetMapping("/team/all")
    public List<Team> getTeams() throws IOException, InterruptedException {
        return teamService.getTeams();
    }

    @GetMapping("/team/{name}")
    public Team getTeamByName(@PathVariable String name){
        return teamService.getTeamByName(name);
    }

    @GetMapping("/players/{position}")
    public List<Player> getPlayersByPosition(@PathVariable String position){
        List<Team> teams = teamService.getTeams();
        List<Player> players = new ArrayList<>();
        List<Player> attackers = new ArrayList<>();
        List<Player> midfielders = new ArrayList<>();
        List<Player> defenders = new ArrayList<>();
        List<Player> goalkeepers = new ArrayList<>();

        for(int i = 0; i<teams.size(); i++){
            players = teams.get(i).getPlayers();
            for(Player player: players){
                if(player.getPosition().equalsIgnoreCase("attacker") && !attackers.contains(player)){
                    attackers.add(player);
                }else if(player.getPosition().equalsIgnoreCase("midfielder") && !midfielders.contains(player)){
                    midfielders.add(player);
                }else if(player.getPosition().equalsIgnoreCase("defender") && !defenders.contains(player)){
                    defenders.add(player);
                }else if(player.getPosition().equalsIgnoreCase("goalkeeper") && !goalkeepers.contains(player)){
                    goalkeepers.add(player);
                }
            }
        }

        if(position.equalsIgnoreCase("attackers")){
            return attackers;
        } else if(position.equalsIgnoreCase("midfielders")){
            return midfielders;
        } else if(position.equalsIgnoreCase("defenders")){
            return defenders;
        } else if(position.equalsIgnoreCase("goalkeepers")){
            return goalkeepers;
        }

        return null;

    }

    @GetMapping("/players/all")
    public List<Player> getAllPlayers(){
        return teamService.getAllPlayers();
    }
}
