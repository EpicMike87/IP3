package com.IP3G11.Best11.repositories;

import com.IP3G11.Best11.model.*;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

// TODO: 23/02/2023 Populate team objects with players in getTeams
public class PlayerApiRepo {

    //SPL League ID
    private static final int leagueId = 179;
    private final List<Team> teams = getTeams();

    public PlayerApiRepo() throws IOException, InterruptedException {
    }

    //Get ID for team from team name supplied
    public int getTeamId(String teamName) throws IOException, InterruptedException {
        List<Team> teams = getTeams();
        for (Team t : teams) {
            if (t.getTeamName().equalsIgnoreCase(teamName)) {
                return t.getId();
            }
        }
        return 0;
    }

    public List<Team> getTeams() throws IOException, InterruptedException {
        if (teams == null) {
            HttpRequest request = HttpRequest.newBuilder().uri(URI.create("https://api-football-v1.p.rapidapi.com/v3/teams?league=" + leagueId + "&season=2022"))
                    .header("X-RapidAPI-Key", "9e3324bf83msh34dc07c79189889p1f8c13jsn975dfb9aa4c5")
                    .header("X-RapidAPI-Host", "api-football-v1.p.rapidapi.com")
                    .method("GET", HttpRequest.BodyPublishers.noBody()).build();
            HttpResponse response = HttpClient.newHttpClient().send(request, HttpResponse.BodyHandlers.ofString());
            String jsonString = response.body().toString();
            JsonElement jEle = JsonParser.parseString(jsonString);
            JsonObject jObject = jEle.getAsJsonObject();
            JsonArray teams = jObject.getAsJsonArray("response");
            List<Team> teamsList = new ArrayList<>();

            for (int i = 0; i < teams.size(); i++) {
                JsonObject team = teams.get(i).getAsJsonObject();
//            System.out.println(team);
                String teamName = team.get("team").getAsJsonObject().get("name").toString();
                int teamId = team.get("team").getAsJsonObject().get("id").getAsInt();
                Team t = new Team();
                t.setTeamName(teamName.replace("\"", ""));
                t.setId(teamId);
                teamsList.add(t);
                System.out.println(t);
            }

            return teamsList;
        }
        return teams;
    }

    public Player getPlayerByName(String name) throws IOException, InterruptedException, NullPointerException {

        //playerName needs spaces replaced in between first and last name with %20 as required by API
        String playerName = name;
        playerName = playerName.replace(" ", "%20");

        //Make API request and get response
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create("https://api-football-v1.p.rapidapi.com/v3/players?league=" + leagueId + "&season=2022&search=" + playerName))
                .header("X-RapidAPI-Key", "9e3324bf83msh34dc07c79189889p1f8c13jsn975dfb9aa4c5")
                .header("X-RapidAPI-Host", "api-football-v1.p.rapidapi.com")
                .method("GET", HttpRequest.BodyPublishers.noBody())
                .build();
        HttpResponse<String> response = HttpClient.newHttpClient().send(request, HttpResponse.BodyHandlers.ofString());

        String jsonString = response.body();
        JsonElement json = JsonParser.parseString(jsonString);
        JsonObject jsonObject = json.getAsJsonObject();
        JsonArray playerInfo = jsonObject.getAsJsonArray("response");

        JsonObject player = playerInfo.get(0).getAsJsonObject();

        //Determines subclass and populates all fields from API data
        Player player1 = populateFieldsOfPlayer(player);

        return player1;

    }

    /**
     * Method removes "" for the date variable
     *
     * @param s1
     * @return
     */
    public static String removeQMarks(String s1) {
        String s2 = s1.substring(1, s1.length() - 1);
        return s2;
    }

    private Player populateFieldsOfPlayer(JsonObject playerJson) {

        //Get position from API data
        String pos = playerJson.get("statistics").getAsJsonArray().get(0).getAsJsonObject().get("games").getAsJsonObject().get("position").getAsString();
        Player player;

        //Initialise player subclass
        switch (pos) {
            case "Attacker":
                Attacker attk = new Attacker();
                attk.setAssists(playerJson.get("statistics").getAsJsonArray().get(0).getAsJsonObject().get("goals").getAsJsonObject().get("assists").getAsInt());
                attk.setGoals(playerJson.get("statistics").getAsJsonArray().get(0).getAsJsonObject().get("goals").getAsJsonObject().get("total").getAsInt());
                attk.setShots(playerJson.get("statistics").getAsJsonArray().get(0).getAsJsonObject().get("shots").getAsJsonObject().get("total").getAsInt());
                attk.setShotsOnTarget(playerJson.get("statistics").getAsJsonArray().get(0).getAsJsonObject().get("shots").getAsJsonObject().get("on").getAsInt());
                attk.setPenaltiesScored(playerJson.get("statistics").getAsJsonArray().get(0).getAsJsonObject().get("penalty").getAsJsonObject().get("scored").getAsInt());
                attk.setPenaltiesTaken(attk.getPenaltiesScored() + playerJson.get("statistics").getAsJsonArray().get(0).getAsJsonObject().get("penalty").getAsJsonObject().get("missed").getAsInt());
                player = attk;
                break;
            case "Defender":
                Defender dfnd = new Defender();
                dfnd.setDuels(playerJson.get("statistics").getAsJsonArray().get(0).getAsJsonObject().get("duels").getAsJsonObject().get("total").getAsInt());
                dfnd.setDuelsWon(playerJson.get("statistics").getAsJsonArray().get(0).getAsJsonObject().get("duels").getAsJsonObject().get("won").getAsInt());
                dfnd.setTackles(playerJson.get("statistics").getAsJsonArray().get(0).getAsJsonObject().get("tackles").getAsJsonObject().get("total").getAsInt());
                dfnd.setBlocks(playerJson.get("statistics").getAsJsonArray().get(0).getAsJsonObject().get("tackles").getAsJsonObject().get("blocks").getAsInt());
                dfnd.setInterceptions(playerJson.get("statistics").getAsJsonArray().get(0).getAsJsonObject().get("tackles").getAsJsonObject().get("interceptions").getAsInt());
                player = dfnd;
                break;
            case "Midfielder":
                Midfielder mdfd = new Midfielder();
                mdfd.setAssists(playerJson.get("statistics").getAsJsonArray().get(0).getAsJsonObject().get("goals").getAsJsonObject().get("assists").getAsInt());
                mdfd.setGoals(playerJson.get("statistics").getAsJsonArray().get(0).getAsJsonObject().get("goals").getAsJsonObject().get("total").getAsInt());
                mdfd.setTackles(playerJson.get("statistics").getAsJsonArray().get(0).getAsJsonObject().get("tackles").getAsJsonObject().get("total").getAsInt());
                mdfd.setBlocks(playerJson.get("statistics").getAsJsonArray().get(0).getAsJsonObject().get("tackles").getAsJsonObject().get("blocks").getAsInt());
                mdfd.setInterceptions(playerJson.get("statistics").getAsJsonArray().get(0).getAsJsonObject().get("tackles").getAsJsonObject().get("interceptions").getAsInt());
                player = mdfd;
                break;
            case "Goalkeeper":
                Goalkeeper gkpr = new Goalkeeper();
                gkpr.setSaves(playerJson.get("statistics").getAsJsonArray().get(0).getAsJsonObject().get("goals").getAsJsonObject().get("saves").getAsInt());
                gkpr.setGoalsConceded(playerJson.get("statistics").getAsJsonArray().get(0).getAsJsonObject().get("goals").getAsJsonObject().get("conceded").getAsInt());
                player = gkpr;
                break;
            default:
                player = new Player();
        }

        player.setIdNo(Integer.parseInt(playerJson.get("player").getAsJsonObject().get("id").toString()));
        player.setFirstName(playerJson.get("player").getAsJsonObject().get("firstname").getAsString());
        player.setLastName(playerJson.get("player").getAsJsonObject().get("lastname").getAsString());
        player.setAge(Integer.parseInt(playerJson.get("player").getAsJsonObject().get("age").toString()));
        String dob = playerJson.get("player").getAsJsonObject().get("birth").getAsJsonObject().get("date").toString();

        String date = removeQMarks(dob);

        LocalDate playerDob = LocalDate.parse(date);

        player.setDateOfBirth(playerDob);
        player.setPhotoUrl(playerJson.get("player").getAsJsonObject().get("photo").getAsString());
        player.setTeam(playerJson.get("statistics").getAsJsonArray().get(0).getAsJsonObject().get("team").getAsJsonObject().get("name").getAsString());

        player.setPosition(pos);

        player.setMatchesPlayed(Integer.parseInt(playerJson.get("statistics").getAsJsonArray().get(0).getAsJsonObject().get("games").getAsJsonObject().get("appearences").toString()));

        player.setCaptain(Boolean.parseBoolean(playerJson.get("statistics").getAsJsonArray().get(0).getAsJsonObject().get("games").getAsJsonObject().get("captain").toString()));
        double rate = playerJson.get("statistics").getAsJsonArray().get(0).getAsJsonObject().get("games").getAsJsonObject().get("rating").getAsDouble();

        player.setRating(rate);
        player.setFoulsCommitted(playerJson.get("statistics").getAsJsonArray().get(0).getAsJsonObject().get("fouls")
                .getAsJsonObject().get("committed").isJsonNull() ? 0 :
                playerJson.get("statistics").getAsJsonArray().get(0).getAsJsonObject().get("fouls").getAsJsonObject().get("committed").getAsInt());
        player.setYellowCards(Integer.parseInt(playerJson.get("statistics").getAsJsonArray().get(0).getAsJsonObject().get("cards").getAsJsonObject().get("yellow").toString()));
        player.setRedCards(Integer.parseInt(playerJson.get("statistics").getAsJsonArray().get(0).getAsJsonObject().get("cards").getAsJsonObject().get("red").toString()));
        player.setPasses(Integer.parseInt(playerJson.get("statistics").getAsJsonArray().get(0).getAsJsonObject().get("passes").getAsJsonObject().get("total").toString()));
        player.setPassAccuracy(playerJson.get("statistics").getAsJsonArray().get(0).getAsJsonObject().get("passes").getAsJsonObject().get("accuracy").getAsDouble());

        return player;
    }

}
