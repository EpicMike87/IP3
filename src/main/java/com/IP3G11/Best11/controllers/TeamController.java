package com.IP3G11.Best11.controllers;

import com.IP3G11.Best11.model.Player;
import com.IP3G11.Best11.model.Team;
import com.IP3G11.Best11.model.TeamStats;
import com.IP3G11.Best11.repositories.TeamRepo;
import com.IP3G11.Best11.services.TeamService;
import com.IP3G11.Best11.tools.APIUtility;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class TeamController {
    private static final int LEAGUE_ID = 179;
    private static final int SEASON = 2022;
    private final TeamService teamService = new TeamService();

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
        List<Player> players;
        List<Player> attackers = new ArrayList<>();
        List<Player> midfielders = new ArrayList<>();
        List<Player> defenders = new ArrayList<>();
        List<Player> goalkeepers = new ArrayList<>();

        for (Team team : teams) {
            players = team.getPlayers();
            for (Player player : players) {
                if (player.getPosition().equalsIgnoreCase("attacker") && !attackers.contains(player)) {
                    attackers.add(player);
                } else if (player.getPosition().equalsIgnoreCase("midfielder") && !midfielders.contains(player)) {
                    midfielders.add(player);
                } else if (player.getPosition().equalsIgnoreCase("defender") && !defenders.contains(player)) {
                    defenders.add(player);
                } else if (player.getPosition().equalsIgnoreCase("goalkeeper") && !goalkeepers.contains(player)) {
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

    @GetMapping("/teamstats/league_table")
    public List<Team> getLeagueTable(){
        return teamService.getTeams();
    }

    @GetMapping("/teamstats/comapre_seasons")
    public List<Team>[] getPrevAndCurrentLeagueTable() throws IOException, InterruptedException {

        TeamRepo teamRepo = new TeamRepo();

        List<Team> currentTeam = teamService.getTeams();

        //Get data from API
        JsonArray teamsArray;
        try {
            teamsArray = APIUtility.getResponseAsJsonObject("standings?season=" + (SEASON-1) + "&league=" + LEAGUE_ID)
                    .get("response").getAsJsonArray().get(0).getAsJsonObject().get("league")
                    .getAsJsonObject().get("standings").getAsJsonArray().get(0).getAsJsonArray();
        } catch (Exception e) {
            throw new RuntimeException(e);
        }

        List<Team> prevTeam = new ArrayList<>();

            for (int i = 0; i < teamsArray.size(); i++) {
                JsonObject team = teamsArray.get(i).getAsJsonObject();

                //Get team details (id and name)
                int teamId = team.get("team").getAsJsonObject().get("id").getAsInt();
                String teamName = team.get("team").getAsJsonObject().get("name").toString();

                //Get current league points and rank, goal difference
                int rank = team.get("rank").getAsInt();
                int points = team.get("points").getAsInt();
                int goalDiff = team.get("goalsDiff").getAsInt();

                //Get total matches played, won drawn lost, goals for against
                TeamStats allStats = teamRepo.getTeamStatsObj(team.get("all").getAsJsonObject());
                allStats.setSeason(SEASON-1);

                //Get home matches played, won drawn lost, goals for against
                TeamStats homeStats = teamRepo.getTeamStatsObj(team.get("home").getAsJsonObject());
                homeStats.setSeason(SEASON-1);

                //Get away matches played, won drawn lost, goals for against
                TeamStats awayStats = teamRepo.getTeamStatsObj(team.get("away").getAsJsonObject());
                awayStats.setSeason(SEASON-1);

                Team t = new Team();
                t.setTeamName(teamName.replace("\"", ""));
                t.setId(teamId);
                t.setRank(rank);
                t.setPoints(points);
                t.setGoalDiff(goalDiff);
                t.setAllStats(allStats);
                t.setHomeStats(homeStats);
                t.setAwayStats(awayStats);
                t.setPlayers(new ArrayList<>());
                teamRepo.addPlayersToTeam(t, 1);
                prevTeam.add(t);
            }


        return new List[]{currentTeam, prevTeam};
    }
}
