package com.IP3G11.Best11.tools;

import com.IP3G11.Best11.model.*;
import com.google.gson.JsonObject;

import java.time.LocalDate;
import java.time.Period;
import java.time.format.DateTimeParseException;

public class PlayerDataReader {

    private static final int LEAGUE_ID = 179;
    private static final int SEASON = 2022;

    /**
     * Method removes "" for the date variable
     *
     * @param s
     * @return
     */
    public static String removeQMarks(String s) {

        //Error handling for rare cases when name from API is empty
        if (s.isEmpty()) return "";
        return s.replace("\"", "");
    }

    public Player populateFieldsOfPlayer(JsonObject playerJson) {

        //Get position from API data
        int teamId = playerJson.get("statistics").getAsJsonArray().get(0).getAsJsonObject().get("team").getAsJsonObject().get("id").getAsInt();
        String pos = playerJson.get("statistics").getAsJsonArray().get(0).getAsJsonObject().get("games").getAsJsonObject().get("position").isJsonNull() ? "" :
                playerJson.get("statistics").getAsJsonArray().get(0).getAsJsonObject().get("games").getAsJsonObject().get("position").getAsString();
        Player player;

        //Initialise player subclass
        switch (pos) {
            case "Attacker":
                Attacker attk = new Attacker();
                attk.setAssists(playerJson.get("statistics").getAsJsonArray().get(0).getAsJsonObject().get("goals").getAsJsonObject().get("assists").isJsonNull() ? 0 :
                        playerJson.get("statistics").getAsJsonArray().get(0).getAsJsonObject().get("goals").getAsJsonObject().get("assists").getAsInt());

                attk.setGoals(playerJson.get("statistics").getAsJsonArray().get(0).getAsJsonObject().get("goals").getAsJsonObject().get("total").isJsonNull() ? 0 :
                        playerJson.get("statistics").getAsJsonArray().get(0).getAsJsonObject().get("goals").getAsJsonObject().get("total").getAsInt());

                attk.setShots(playerJson.get("statistics").getAsJsonArray().get(0).getAsJsonObject().get("shots").getAsJsonObject().get("total").isJsonNull() ? 0 :
                        playerJson.get("statistics").getAsJsonArray().get(0).getAsJsonObject().get("shots").getAsJsonObject().get("total").getAsInt());

                attk.setShotsOnTarget(playerJson.get("statistics").getAsJsonArray().get(0).getAsJsonObject().get("shots").getAsJsonObject().get("on").isJsonNull() ? 0 :
                        playerJson.get("statistics").getAsJsonArray().get(0).getAsJsonObject().get("shots").getAsJsonObject().get("on").getAsInt());

                attk.setPenaltiesScored(playerJson.get("statistics").getAsJsonArray().get(0).getAsJsonObject().get("penalty").getAsJsonObject().get("scored").isJsonNull() ? 0 :
                        playerJson.get("statistics").getAsJsonArray().get(0).getAsJsonObject().get("penalty").getAsJsonObject().get("scored").getAsInt());

                attk.setPenaltiesTaken(attk.getPenaltiesScored() + (playerJson.get("statistics").getAsJsonArray().get(0).getAsJsonObject().get("penalty").getAsJsonObject().get("missed").isJsonNull() ? 0 :
                        playerJson.get("statistics").getAsJsonArray().get(0).getAsJsonObject().get("penalty").getAsJsonObject().get("missed").getAsInt()));
                player = attk;
                break;
            case "Defender":
                Defender dfnd = new Defender();

                dfnd.setShotsOnTarget(playerJson.get("statistics").getAsJsonArray().get(0).getAsJsonObject().get("shots").getAsJsonObject().get("on").isJsonNull() ? 0 :
                        playerJson.get("statistics").getAsJsonArray().get(0).getAsJsonObject().get("shots").getAsJsonObject().get("on").getAsInt());

                dfnd.setAssists(playerJson.get("statistics").getAsJsonArray().get(0).getAsJsonObject().get("goals").getAsJsonObject().get("assists").isJsonNull() ? 0 :
                        playerJson.get("statistics").getAsJsonArray().get(0).getAsJsonObject().get("goals").getAsJsonObject().get("assists").getAsInt());

                dfnd.setGoals(playerJson.get("statistics").getAsJsonArray().get(0).getAsJsonObject().get("goals").getAsJsonObject().get("total").isJsonNull() ? 0 :
                        playerJson.get("statistics").getAsJsonArray().get(0).getAsJsonObject().get("goals").getAsJsonObject().get("total").getAsInt());

                dfnd.setDuels(playerJson.get("statistics").getAsJsonArray().get(0).getAsJsonObject().get("duels").getAsJsonObject().get("total").isJsonNull() ? 0 :
                        playerJson.get("statistics").getAsJsonArray().get(0).getAsJsonObject().get("duels").getAsJsonObject().get("total").getAsInt());

                dfnd.setDuelsWon(playerJson.get("statistics").getAsJsonArray().get(0).getAsJsonObject().get("duels").getAsJsonObject().get("won").isJsonNull() ? 0 :
                        playerJson.get("statistics").getAsJsonArray().get(0).getAsJsonObject().get("duels").getAsJsonObject().get("won").getAsInt());

                dfnd.setTackles(playerJson.get("statistics").getAsJsonArray().get(0).getAsJsonObject().get("tackles").getAsJsonObject().get("total").isJsonNull() ? 0 :
                        playerJson.get("statistics").getAsJsonArray().get(0).getAsJsonObject().get("tackles").getAsJsonObject().get("total").getAsInt());

                dfnd.setBlocks(playerJson.get("statistics").getAsJsonArray().get(0).getAsJsonObject().get("tackles").getAsJsonObject().get("blocks").isJsonNull() ? 0 :
                        playerJson.get("statistics").getAsJsonArray().get(0).getAsJsonObject().get("tackles").getAsJsonObject().get("blocks").getAsInt());

                dfnd.setInterceptions(playerJson.get("statistics").getAsJsonArray().get(0).getAsJsonObject().get("tackles").getAsJsonObject().get("interceptions").isJsonNull() ? 0 :
                        playerJson.get("statistics").getAsJsonArray().get(0).getAsJsonObject().get("tackles").getAsJsonObject().get("interceptions").getAsInt());

                player = dfnd;
                break;
            case "Midfielder":
                Midfielder mdfd = new Midfielder();

                mdfd.setShotsOnTarget(playerJson.get("statistics").getAsJsonArray().get(0).getAsJsonObject().get("shots").getAsJsonObject().get("on").isJsonNull() ? 0 :
                        playerJson.get("statistics").getAsJsonArray().get(0).getAsJsonObject().get("shots").getAsJsonObject().get("on").getAsInt());

                mdfd.setAssists(playerJson.get("statistics").getAsJsonArray().get(0).getAsJsonObject().get("goals").getAsJsonObject().get("assists").isJsonNull() ? 0 :
                        playerJson.get("statistics").getAsJsonArray().get(0).getAsJsonObject().get("goals").getAsJsonObject().get("assists").getAsInt());

                mdfd.setGoals(playerJson.get("statistics").getAsJsonArray().get(0).getAsJsonObject().get("goals").getAsJsonObject().get("total").isJsonNull() ? 0 :
                        playerJson.get("statistics").getAsJsonArray().get(0).getAsJsonObject().get("goals").getAsJsonObject().get("total").getAsInt());

                mdfd.setTackles(playerJson.get("statistics").getAsJsonArray().get(0).getAsJsonObject().get("tackles").getAsJsonObject().get("total").isJsonNull() ? 0 :
                        playerJson.get("statistics").getAsJsonArray().get(0).getAsJsonObject().get("tackles").getAsJsonObject().get("total").getAsInt());

                mdfd.setBlocks(playerJson.get("statistics").getAsJsonArray().get(0).getAsJsonObject().get("tackles").getAsJsonObject().get("blocks").isJsonNull() ? 0 :
                        playerJson.get("statistics").getAsJsonArray().get(0).getAsJsonObject().get("tackles").getAsJsonObject().get("blocks").getAsInt());

                mdfd.setInterceptions(playerJson.get("statistics").getAsJsonArray().get(0).getAsJsonObject().get("tackles").getAsJsonObject().get("interceptions").isJsonNull() ? 0 :
                        playerJson.get("statistics").getAsJsonArray().get(0).getAsJsonObject().get("tackles").getAsJsonObject().get("interceptions").getAsInt());

                player = mdfd;
                break;
            case "Goalkeeper":
                Goalkeeper gkpr = new Goalkeeper();
                gkpr.setSaves(playerJson.get("statistics").getAsJsonArray().get(0).getAsJsonObject().get("goals").getAsJsonObject().get("saves").isJsonNull() ? 0 :
                        playerJson.get("statistics").getAsJsonArray().get(0).getAsJsonObject().get("goals").getAsJsonObject().get("saves").getAsInt());

                gkpr.setGoalsConceded(playerJson.get("statistics").getAsJsonArray().get(0).getAsJsonObject().get("goals").getAsJsonObject().get("conceded").isJsonNull() ? 0 :
                        playerJson.get("statistics").getAsJsonArray().get(0).getAsJsonObject().get("goals").getAsJsonObject().get("conceded").getAsInt());

                player = gkpr;
                break;
            default:
                player = new Player();
        }

        player.setId(playerJson.get("player").getAsJsonObject().get("id").getAsInt());
        player.setTeamId(teamId);
        player.setFirstName(playerJson.get("player").getAsJsonObject().get("firstname").getAsString());
        player.setLastName(playerJson.get("player").getAsJsonObject().get("lastname").getAsString());
        String dob = playerJson.get("player").getAsJsonObject().get("birth").getAsJsonObject().get("date").isJsonNull() ? "" :
                playerJson.get("player").getAsJsonObject().get("birth").getAsJsonObject().get("date").getAsString();

        String date = removeQMarks(dob);
        LocalDate playerDob;
        try {
            playerDob = LocalDate.parse(date);
        } catch (DateTimeParseException d) {
            System.out.println("Could not add date of birth for " + player.getId());
            System.out.println(d.getMessage());
            playerDob = LocalDate.now();
        }

        player.setDateOfBirth(playerDob);
        player.setAge(Period.between(playerDob, LocalDate.now()).getYears());
        player.setPhotoUrl(playerJson.get("player").getAsJsonObject().get("photo").getAsString());
        player.setTeam(playerJson.get("statistics").getAsJsonArray().get(0).getAsJsonObject().get("team").getAsJsonObject().get("name").getAsString());

        player.setPosition(pos);
        player.setPositionType(pos);

        player.setMatchesPlayed(playerJson.get("statistics").getAsJsonArray().get(0).getAsJsonObject().get("games").getAsJsonObject().get("appearences").isJsonNull() ? 0 :
                playerJson.get("statistics").getAsJsonArray().get(0).getAsJsonObject().get("games").getAsJsonObject().get("appearences").getAsInt());

        player.setCaptain(Boolean.parseBoolean(playerJson.get("statistics").getAsJsonArray().get(0).getAsJsonObject().get("games").getAsJsonObject().get("captain").toString()));
        double rate = playerJson.get("statistics").getAsJsonArray().get(0).getAsJsonObject().get("games").getAsJsonObject().get("rating").isJsonNull() ? 0 :
                playerJson.get("statistics").getAsJsonArray().get(0).getAsJsonObject().get("games").getAsJsonObject().get("rating").getAsDouble();

        player.setRating(rate);
        player.setFoulsCommitted(playerJson.get("statistics").getAsJsonArray().get(0).getAsJsonObject().get("fouls")
                .getAsJsonObject().get("committed").isJsonNull() ? 0 :
                playerJson.get("statistics").getAsJsonArray().get(0).getAsJsonObject().get("fouls").getAsJsonObject().get("committed").getAsInt());
        player.setYellowCards(playerJson.get("statistics").getAsJsonArray().get(0).getAsJsonObject().get("cards").getAsJsonObject().get("yellow").isJsonNull() ? 0 :
                playerJson.get("statistics").getAsJsonArray().get(0).getAsJsonObject().get("cards").getAsJsonObject().get("yellow").getAsInt());
        player.setRedCards(playerJson.get("statistics").getAsJsonArray().get(0).getAsJsonObject().get("cards").getAsJsonObject().get("red").isJsonNull() ? 0 :
                playerJson.get("statistics").getAsJsonArray().get(0).getAsJsonObject().get("cards").getAsJsonObject().get("red").getAsInt());
        player.setPasses(playerJson.get("statistics").getAsJsonArray().get(0).getAsJsonObject().get("passes").getAsJsonObject().get("total").isJsonNull() ? 0 :
                playerJson.get("statistics").getAsJsonArray().get(0).getAsJsonObject().get("passes").getAsJsonObject().get("total").getAsInt());
        player.setPassAccuracy(playerJson.get("statistics").getAsJsonArray().get(0).getAsJsonObject().get("passes").getAsJsonObject().get("accuracy").isJsonNull() ? 0 :
                playerJson.get("statistics").getAsJsonArray().get(0).getAsJsonObject().get("passes").getAsJsonObject().get("accuracy").getAsDouble());

        return player;
    }


}
