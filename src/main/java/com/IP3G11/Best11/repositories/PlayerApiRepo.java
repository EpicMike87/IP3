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
import java.util.ArrayList;
import java.util.List;

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

}
