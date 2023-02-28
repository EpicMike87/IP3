package com.IP3G11.Best11.repositories;

import com.IP3G11.Best11.model.Player;
import com.IP3G11.Best11.model.Team;
import com.IP3G11.Best11.model.TeamStats;
import com.IP3G11.Best11.tools.APIUtility;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

//Gets data for teams and initialises Team objects
@Component("teamRepo")
public class TeamRepo {

    private static final int LEAGUE_ID = 179;
    private static final int SEASON = 2022;

    private final PlayerApiRepo playerRepo = new PlayerApiRepo();
    private List<Team> teams;

    public TeamRepo() throws IOException, InterruptedException {
        teams = getTeams();
    }

    public List<Team> getTeams() throws IOException, InterruptedException {

        //Populate teams list if the function hasn't been called before
        if (teams == null) {

            //Get data from API
            JsonArray teamsArray = APIUtility.getResponseAsJsonObject("standings?season=" + SEASON + "&league=" + LEAGUE_ID)
                    .get("response").getAsJsonArray().get(0).getAsJsonObject().get("league")
                    .getAsJsonObject().get("standings").getAsJsonArray().get(0).getAsJsonArray();

            teams = new ArrayList<>();

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
                TeamStats allStats = getTeamStatsObj(team.get("all").getAsJsonObject());

                //Get home matches played, won drawn lost, goals for against
                TeamStats homeStats = getTeamStatsObj(team.get("home").getAsJsonObject());

                //Get away matches played, won drawn lost, goals for against
                TeamStats awayStats = getTeamStatsObj(team.get("away").getAsJsonObject());

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
                addPlayersToTeam(t, 1);
                teams.add(t);
            }
        }
        return teams;
    }

    //Populates team object with players of the team and their stats
    private void addPlayersToTeam(Team team, int pageNo) throws IOException, InterruptedException {

        JsonObject responseObject = APIUtility.getResponseAsJsonObject("players?team=" + team.getId() + "&season=" + SEASON + "&page=" + pageNo);
        JsonArray playersJson = responseObject.get("response").getAsJsonArray();

        //Number of pages of results, 1 API call returns 1 page so determines number of calls to be made to get all players
        int pages = responseObject.get("paging").getAsJsonObject().get("total").getAsInt();

        List<Player> playersList = team.getPlayers();

        //Get id numbers of players currently in squad
        Set<Integer> squadIds = getSquadMemberIds(team.getId());

        for (int i = 0; i < playersJson.size(); i++) {
            //Only add player to player list if in current squad
            int playerId = playersJson.get(i).getAsJsonObject().get("player").getAsJsonObject().get("id").getAsInt();
            if (squadIds.contains(playerId))
                playersList.add(playerRepo.populateFieldsOfPlayer(playersJson.get(i).getAsJsonObject()));
        }
        team.setPlayers(playersList);
        System.out.println("Added players to " + team.getTeamName() + ": Page " + pageNo + "/" + pages);

        //recursion to move to next page of results from API to add more players
        if (pageNo < pages) addPlayersToTeam(team, ++pageNo);
    }

    //As API returns details of players who are left when making a call to get all players in a team, squad IDs will be stored to check players returned against
    //to ensure that only current players are added to the team object. This is achieved by a call to the squad API using the team ID.
    private Set<Integer> getSquadMemberIds(int teamId) throws IOException, InterruptedException {

        JsonObject responseObject = APIUtility.getResponseAsJsonObject("players/squads" + "?team=" + teamId);
        JsonArray squadPlayersJson = responseObject.getAsJsonArray("response").get(0).getAsJsonObject().get("players").getAsJsonArray();

        HashSet ids = new HashSet();

        for (int i = 0; i < squadPlayersJson.size(); i++) {
            ids.add(squadPlayersJson.get(i).getAsJsonObject().get("id").getAsInt());
        }
        return ids;
    }

    private TeamStats getTeamStatsObj(JsonObject stats) {

        int matchesPlayed = stats.get("played").getAsInt();
        int matchesWon = stats.get("win").getAsInt();
        int matchesDrew = stats.get("draw").getAsInt();
        int matchesLost = stats.get("lose").getAsInt();
        int goalsFor = stats.get("goals").getAsJsonObject().get("for").getAsInt();
        int goalsAgainst = stats.get("goals").getAsJsonObject().get("against").getAsInt();

        return new TeamStats(matchesPlayed, matchesWon, matchesDrew, matchesLost, goalsFor, goalsAgainst);
    }

}
