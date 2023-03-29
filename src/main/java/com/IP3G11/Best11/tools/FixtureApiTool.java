package com.IP3G11.Best11.tools;

import com.IP3G11.Best11.model.Fixture;
import com.IP3G11.Best11.model.Team;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.util.*;

public class FixtureApiTool {

    private static final int LEAGUE_ID = 179;

    public static Set<Fixture> getFutureXFixtures(int number, List<Team> teams) throws IOException, InterruptedException {

        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ssX");
        List<Fixture> fixtures = new ArrayList<>();

        for(Team t : teams){
            JsonArray fixturesArray = APIUtility.getResponseAsJsonObject("fixtures?league=" + LEAGUE_ID + "&team="
                    + t.getId() + "&next=" + number).get("response").getAsJsonArray();

            for(JsonElement jEle : fixturesArray){
                Fixture fixture = new Fixture();

                Date fixDate = java.sql.Timestamp.valueOf(LocalDateTime.parse(jEle.getAsJsonObject().get("fixture").getAsJsonObject().get("date").getAsString().split("\\+")[0]));
                String homeTeamName = jEle.getAsJsonObject().get("teams").getAsJsonObject().get("home").getAsJsonObject().get("name").getAsString();
                String awayTeamName = jEle.getAsJsonObject().get("teams").getAsJsonObject().get("away").getAsJsonObject().get("name").getAsString();

                fixture.setDateTime(fixDate);
                fixture.setFullTimeResult('?');
                fixture.setAwayTeamGoals(0);
                fixture.setHomeTeamGoals(0);
                fixture.setHomeTeamName(homeTeamName);
                fixture.setAwayTeamName(awayTeamName);

                if(homeTeamName.equalsIgnoreCase(t.getTeamName())) fixture.setHomeTeam(t);
                else fixture.setAwayTeam(t);

                if(fixture.getHomeTeam() == null) fixture.setHomeTeam(teams.stream().filter(t1 -> t1.getTeamName().equalsIgnoreCase(homeTeamName)).findAny().get());
                if(fixture.getAwayTeam() == null) fixture.setAwayTeam(teams.stream().filter(t1 -> t1.getTeamName().equalsIgnoreCase(awayTeamName)).findAny().get());

                fixtures.add(fixture);
            }
        }
        return new HashSet<>(fixtures);
    }

}

