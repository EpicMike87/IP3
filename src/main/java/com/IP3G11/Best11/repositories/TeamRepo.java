package com.IP3G11.Best11.repositories;

import com.IP3G11.Best11.model.Grounds;
import com.IP3G11.Best11.model.Player;
import com.IP3G11.Best11.model.Team;
import com.IP3G11.Best11.model.TeamStats;
import com.IP3G11.Best11.tools.APIUtility;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.*;

//Gets data for teams and initialises Team objects
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

                //Get logo
                String photoUrl = team.get("team").getAsJsonObject().get("logo").getAsString();

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
                t.setPhotoUrl(photoUrl);

                addPlayersToTeam(t, 1);
                teams.add(t);
            }
        }
        addGroundsInfo(teams);
        return teams;
    }

    //Get grounds info from api and apply it to teams objects in list
    private void addGroundsInfo(List<Team> teams) throws IOException, InterruptedException {
        JsonArray teamGroundsInfo = APIUtility.getResponseAsJsonObject("teams?league="
                + LEAGUE_ID + "&season=" + SEASON).get("response").getAsJsonArray();

        //For each result returned by API
        for (int i = 0; i < teamGroundsInfo.size(); i++) {
            JsonElement teamGrounds = teamGroundsInfo.get(i);

            //Get team which matches team name
            Team team = teams.stream().filter(t -> teamGrounds.getAsJsonObject().get("team").getAsJsonObject()
                    .get("name").getAsString().equalsIgnoreCase(t.getTeamName())).findAny().get();

            //Set grounds properties
            String groundsName = teamGrounds.getAsJsonObject().get("venue").getAsJsonObject().get("name").getAsString();
            String city = teamGrounds.getAsJsonObject().get("venue").getAsJsonObject().get("city").getAsString();
            int capacity = teamGrounds.getAsJsonObject().get("venue").getAsJsonObject().get("capacity").getAsInt();
            String photoUrl = teamGrounds.getAsJsonObject().get("venue").getAsJsonObject().get("image").getAsString();
            String address = teamGrounds.getAsJsonObject().get("venue").getAsJsonObject().get("address").getAsString();
            String surface = teamGrounds.getAsJsonObject().get("venue").getAsJsonObject().get("surface").getAsString();

            //Add grounds to team
            team.setGrounds(new Grounds(groundsName, city, address, surface, photoUrl, capacity));
        }
    }


    //Populates team object with players of the team and their stats
    public void addPlayersToTeam(Team team, int pageNo) throws IOException, InterruptedException {

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

        HashSet<Integer> ids = new HashSet<>();

        for (int i = 0; i < squadPlayersJson.size(); i++) {
            ids.add(squadPlayersJson.get(i).getAsJsonObject().get("id").getAsInt());
        }
        return ids;
    }

    public TeamStats getTeamStatsObj(JsonObject stats) {

        int matchesPlayed = stats.get("played").getAsInt();
        int matchesWon = stats.get("win").getAsInt();
        int matchesDrew = stats.get("draw").getAsInt();
        int matchesLost = stats.get("lose").getAsInt();
        int goalsFor = stats.get("goals").getAsJsonObject().get("for").getAsInt();
        int goalsAgainst = stats.get("goals").getAsJsonObject().get("against").getAsInt();
        int goalDifference = goalsFor - goalsAgainst;
        int points = (matchesWon * 3) + matchesDrew;

        return new TeamStats(SEASON, matchesPlayed, matchesWon, matchesDrew, matchesLost, goalsFor, goalsAgainst, goalDifference, points);
    }

    public List<Player> getAllPlayers() {
        List<Player> players = new ArrayList<>();
        for (Team t : teams) {
            players.addAll(t.getPlayers());
        }
        return players;
    }

}
