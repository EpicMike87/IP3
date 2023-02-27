package com.IP3G11.Best11.repositories;

import com.IP3G11.Best11.model.Player;
import com.IP3G11.Best11.model.Team;
import com.IP3G11.Best11.model.TeamStats;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import lombok.NoArgsConstructor;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

// TODO: 27/02/2023 create generic method for API calls
//Gets data for teams and initialises Team objects
@NoArgsConstructor
public class TeamRepo {

    private static final int leagueId = 179;
    private static final int season = 2022;
    private static final String api_token = "9e3324bf83msh34dc07c79189889p1f8c13jsn975dfb9aa4c5";
    private PlayerApiRepo playerRepo = new PlayerApiRepo();
    private List<Team> teams;

    public List<Team> getTeams() throws IOException, InterruptedException {

        //Populate teams list if the function hasn't been called before
        if (teams == null) {
            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create("https://api-football-v1.p.rapidapi.com/v3/standings?season=" + season + "&league=" + leagueId))
                    .header("X-RapidAPI-Key", api_token)
                    .header("X-RapidAPI-Host", "api-football-v1.p.rapidapi.com")
                    .method("GET", HttpRequest.BodyPublishers.noBody())
                    .build();
            HttpResponse<String> response = HttpClient.newHttpClient().send(request, HttpResponse.BodyHandlers.ofString());
            String jsonString = response.body();
            JsonElement jEle = JsonParser.parseString(jsonString);
            JsonObject jObject = jEle.getAsJsonObject();
            JsonArray teamsArray = jObject.getAsJsonArray("response").get(0).getAsJsonObject().get("league")
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

                // TODO: 27/02/2023 Extract total home and away data filling to a method
                //Get total matches played, won drawn lost, goals for against
                int matchesPlayed = team.get("all").getAsJsonObject().get("played").getAsInt();
                int matchesWon = team.get("all").getAsJsonObject().get("win").getAsInt();
                int matchesDrew = team.get("all").getAsJsonObject().get("draw").getAsInt();
                int matchesLost = team.get("all").getAsJsonObject().get("lose").getAsInt();
                int goalsFor = team.get("all").getAsJsonObject().get("goals").getAsJsonObject().get("for").getAsInt();
                int goalsAgainst = team.get("all").getAsJsonObject().get("goals").getAsJsonObject().get("against").getAsInt();
                TeamStats allStats = new TeamStats(matchesPlayed, matchesWon, matchesDrew, matchesLost, goalsFor, goalsAgainst);

                //Get home matches played, won drawn lost, goals for against
                int homeMatchesPlayed = team.get("home").getAsJsonObject().get("played").getAsInt();
                int homeMatchesWon = team.get("home").getAsJsonObject().get("win").getAsInt();
                int homeMatchesDrew = team.get("home").getAsJsonObject().get("draw").getAsInt();
                int homeMatchesLost = team.get("home").getAsJsonObject().get("lose").getAsInt();
                int homeGoalsFor = team.get("home").getAsJsonObject().get("goals").getAsJsonObject().get("for").getAsInt();
                int homeGoalsAgainst = team.get("home").getAsJsonObject().get("goals").getAsJsonObject().get("against").getAsInt();
                TeamStats homeStats = new TeamStats(homeMatchesPlayed, homeMatchesWon, homeMatchesDrew, homeMatchesLost, homeGoalsFor, homeGoalsAgainst);

                //Get away matches played, won drawn lost, goals for against
                int awayMatchesPlayed = team.get("away").getAsJsonObject().get("played").getAsInt();
                int awayMatchesWon = team.get("away").getAsJsonObject().get("win").getAsInt();
                int awayMatchesDrew = team.get("away").getAsJsonObject().get("draw").getAsInt();
                int awayMatchesLost = team.get("away").getAsJsonObject().get("lose").getAsInt();
                int awayGoalsFor = team.get("away").getAsJsonObject().get("goals").getAsJsonObject().get("for").getAsInt();
                int awayGoalsAgainst = team.get("away").getAsJsonObject().get("goals").getAsJsonObject().get("against").getAsInt();
                TeamStats awayStats = new TeamStats(awayMatchesPlayed, awayMatchesWon, awayMatchesDrew, awayMatchesLost, awayGoalsFor, awayGoalsAgainst);

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
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create("https://api-football-v1.p.rapidapi.com/v3/players?team=" + team.getId() + "&season=" + season + "&page=" + pageNo))
                .header("X-RapidAPI-Key", api_token)
                .header("X-RapidAPI-Host", "api-football-v1.p.rapidapi.com")
                .method("GET", HttpRequest.BodyPublishers.noBody())
                .build();
        HttpResponse<String> response = HttpClient.newHttpClient().send(request, HttpResponse.BodyHandlers.ofString());

        String jsonString = response.body();
        JsonElement json = JsonParser.parseString(jsonString);
        JsonObject jsonObject = json.getAsJsonObject();
        JsonArray playersJson = jsonObject.getAsJsonArray("response");

        //Number of pages of results, 1 API call returns 1 page so determines number of calls to be made to get all players
        int pages = jsonObject.get("paging").getAsJsonObject().get("total").getAsInt();

        List<Player> playersList = team.getPlayers();

        //Get id numbers of players currently in squad
        Set<Integer> squadIds = getSquadMemberIds(team.getId());

        for(int i = 0; i < playersJson.size(); i++){
            //Only add player to player list if in current squad
            int playerId = playersJson.get(i).getAsJsonObject().get("player").getAsJsonObject().get("id").getAsInt();
            if(squadIds.contains(playerId)) playersList.add(playerRepo.populateFieldsOfPlayer(playersJson.get(i).getAsJsonObject()));
        }
        team.setPlayers(playersList);
        System.out.println("Added players to " + team.getTeamName() + ": Page " + pageNo + "/" + pages);

        //recursion to move to next page of results from API to add more players
        if(pageNo < pages) addPlayersToTeam(team, ++pageNo);
    }

    //As API returns details of players who are left when making a call to get all players in a team, squad IDs will be stored to check players returned against
    //to ensure that only current players are added to the team object. This is achieved by a call to the squad API using the team ID.
    private Set<Integer> getSquadMemberIds(int teamId) throws IOException, InterruptedException {
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create("https://api-football-v1.p.rapidapi.com/v3/players/squads?team=" + teamId))
                .header("X-RapidAPI-Key", "9e3324bf83msh34dc07c79189889p1f8c13jsn975dfb9aa4c5")
                .header("X-RapidAPI-Host", "api-football-v1.p.rapidapi.com")
                .method("GET", HttpRequest.BodyPublishers.noBody())
                .build();
        HttpResponse<String> response = HttpClient.newHttpClient().send(request, HttpResponse.BodyHandlers.ofString());
        String jsonString = response.body();
        JsonElement json = JsonParser.parseString(jsonString);
        JsonObject jsonObject = json.getAsJsonObject();
        JsonArray squadPlayersJson = jsonObject.getAsJsonArray("response").get(0).getAsJsonObject().get("players").getAsJsonArray();

        HashSet ids = new HashSet();

        for(int i = 0; i < squadPlayersJson.size(); i++){
            System.out.println(squadPlayersJson.get(i).getAsJsonObject());
            ids.add(squadPlayersJson.get(i).getAsJsonObject().get("id").getAsInt());
        }
        return ids;
    }

}
