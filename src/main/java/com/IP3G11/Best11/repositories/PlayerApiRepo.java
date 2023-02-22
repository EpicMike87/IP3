package com.IP3G11.Best11.repositories;

import com.IP3G11.Best11.model.Player;
import com.IP3G11.Best11.model.Team;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Locale;

public class PlayerApiRepo {

    //SPL League ID
    private static final int leagueId = 179;

    //Get ID for team from team name supplied
    public static int getTeamId(String teamName) throws IOException, InterruptedException {
        List<Team> teams = getTeams();
        for(Team t : teams){
            if(t.getTeamName().equalsIgnoreCase(teamName)) {
                return t.getId();
            }
        }
        return 0;
    }

    public static List<Team> getTeams() throws IOException, InterruptedException {
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

        for(int i = 0; i < teams.size(); i++){
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

    public static Player getPlayerByName(String name) throws IOException, InterruptedException, NullPointerException {
//        Get Player by Name

//        playerName will have to replace spaces in between first and last with %20

//        String playerName = "Maeda";
        String playerName = name;
        playerName = playerName.replace(" ", "%20");

        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create("https://api-football-v1.p.rapidapi.com/v3/players?league=" + leagueId + "&season=2022&search=" + playerName))
                .header("X-RapidAPI-Key", "9e3324bf83msh34dc07c79189889p1f8c13jsn975dfb9aa4c5")
                .header("X-RapidAPI-Host", "api-football-v1.p.rapidapi.com")
                .method("GET", HttpRequest.BodyPublishers.noBody())
                .build();
        HttpResponse<String> response = HttpClient.newHttpClient().send(request, HttpResponse.BodyHandlers.ofString());
        System.out.println(response.body());
        String jsonString = response.body().toString();
        JsonElement json = JsonParser.parseString(jsonString);
        JsonObject jsonObject = json.getAsJsonObject();
        JsonArray playerInfo = jsonObject.getAsJsonArray("response");
        Player player1 = new Player();

        for(int i = 0; i < playerInfo.size(); i++){
            JsonObject player = playerInfo.get(i).getAsJsonObject();
//            System.out.println(player);
            player1.setIdNo(Integer.parseInt(player.get("player").getAsJsonObject().get("id").toString()));
            player1.setFirstName(player.get("player").getAsJsonObject().get("firstname").getAsString());
            player1.setLastName(player.get("player").getAsJsonObject().get("lastname").getAsString());
            player1.setAge(Integer.parseInt(player.get("player").getAsJsonObject().get("age").toString()));
            String dob = player.get("player").getAsJsonObject().get("birth").getAsJsonObject().get("date").toString();

            // Used to remove "" from the string
            String date = removeQMarks(dob);
//            System.out.println(date);
            LocalDate playerDob = LocalDate.parse(date);
//            System.out.println(playerDob);
            player1.setDateOfBirth(playerDob);
            player1.setPhotoUrl(player.get("player").getAsJsonObject().get("photo").getAsString());
            player1.setTeam(player.get("statistics").getAsJsonArray().get(0).getAsJsonObject().get("team").getAsJsonObject().get("name").getAsString());
//            System.out.println(playerTeam);
            player1.setPosition(player.get("statistics").getAsJsonArray().get(0).getAsJsonObject().get("games").getAsJsonObject().get("position").getAsString());
//            System.out.println("This is position  " + playerPosition);
            player1.setMatchesPlayed(Integer.parseInt(player.get("statistics").getAsJsonArray().get(0).getAsJsonObject().get("games").getAsJsonObject().get("appearences").toString()));
//            System.out.println(player1.getMatchesPlayed());
            player1.setCaptain(Boolean.parseBoolean(player.get("statistics").getAsJsonArray().get(0).getAsJsonObject().get("games").getAsJsonObject().get("captain").toString()));
            double rate = player.get("statistics").getAsJsonArray().get(0).getAsJsonObject().get("games").getAsJsonObject().get("rating").getAsDouble();
//            System.out.println(rate);
            player1.setRating(rate);
            player1.setFoulsCommitted(Integer.parseInt(player.get("statistics").getAsJsonArray().get(0).getAsJsonObject().get("fouls").getAsJsonObject().get("committed").toString()));
            player1.setYellowCards(Integer.parseInt(player.get("statistics").getAsJsonArray().get(0).getAsJsonObject().get("cards").getAsJsonObject().get("yellow").toString()));
            player1.setRedCards(Integer.parseInt(player.get("statistics").getAsJsonArray().get(0).getAsJsonObject().get("cards").getAsJsonObject().get("red").toString()));
            player1.setPasses(Integer.parseInt(player.get("statistics").getAsJsonArray().get(0).getAsJsonObject().get("passes").getAsJsonObject().get("total").toString()));
            player1.setPassAccuracy(player.get("statistics").getAsJsonArray().get(0).getAsJsonObject().get("passes").getAsJsonObject().get("accuracy").getAsDouble());

        }

//        System.out.println(player1);
        return player1;

    }

    /**
     * Method removes "" for the date variable
     * @param s1
     * @return
     */
    public static String removeQMarks(String s1){
        String s2 = s1.substring(1, s1.length() - 1);
        return s2;
    }

}
