package com.IP3G11.Best11.tools;

import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

public class APIUtility {

    private static final String api_token = "9e3324bf83msh34dc07c79189889p1f8c13jsn975dfb9aa4c5";

    //Makes API calls and returns data
    public static JsonObject getResponseAsJsonObject(String uriString) throws IOException, InterruptedException {

        String URIString = "https://api-football-v1.p.rapidapi.com/v3/" + uriString;
        HttpRequest request = HttpRequest.newBuilder()
                //api-football only allows last name search, so only last name is used
                .uri(URI.create(URIString))
                .header("X-RapidAPI-Key", api_token)
                .header("X-RapidAPI-Host", "api-football-v1.p.rapidapi.com")
                .method("GET", HttpRequest.BodyPublishers.noBody())
                .build();
        HttpResponse<String> response = HttpClient.newHttpClient().send(request, HttpResponse.BodyHandlers.ofString());

        String jsonString = response.body();
        JsonElement json = JsonParser.parseString(jsonString);
        return json.getAsJsonObject();
    }

}
