package com.IP3G11.Best11.repositories;

import com.IP3G11.Best11.model.*;
import com.IP3G11.Best11.tools.APIUtility;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.time.LocalDate;
import java.time.format.DateTimeParseException;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;

@Component("playerApiRepo")
public class PlayerApiRepo {

    private static final int LEAGUE_ID = 179;
    private static final int SEASON = 2022;

    public List<Player> getPlayerByName(String name) throws IOException, InterruptedException, NullPointerException {

        //Split to get first and last names
        String[] playerNames = name.split(" ");

        //Get data from API and extract array of players
        JsonArray playerInfo = APIUtility.getResponseAsJsonObject("players?league=" + LEAGUE_ID + "&season="
                + SEASON + "&search=" + playerNames[playerNames.length - 1]).get("response").getAsJsonArray();

        List<Player> players = new ArrayList<>();
        for (int i = 0; i < playerInfo.size(); i++) {
            JsonObject player = playerInfo.get(i).getAsJsonObject();

            //Get first and last name from returned api data to check if contains names searched (as may be double barrelled first, second names)
            String playerName = player.get("player").getAsJsonObject().get("firstname").getAsString()
                    + " " + player.get("player").getAsJsonObject().get("lastname").getAsString();

            //If names provided exist within player name returned by api, add to results
            if (doesContainAllNames(playerName, playerNames))
                //Determines subclass and populates all fields from API data
                players.add(populateFieldsOfPlayer(player));
            System.out.println("Added " + playerName + " to search results.");

        }
        return players;

    }

    public Player populateFieldsOfPlayer(JsonObject playerJson) {

        //Get position from API data
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

        player.setIdNo(playerJson.get("player").getAsJsonObject().get("id").getAsInt());
        player.setFirstName(playerJson.get("player").getAsJsonObject().get("firstname").getAsString());
        player.setLastName(playerJson.get("player").getAsJsonObject().get("lastname").getAsString());
        player.setAge(playerJson.get("player").getAsJsonObject().get("age").isJsonNull() ? 0 : playerJson.get("player").getAsJsonObject().get("age").getAsInt());
        String dob = playerJson.get("player").getAsJsonObject().get("birth").getAsJsonObject().get("date").isJsonNull() ? "" :
                playerJson.get("player").getAsJsonObject().get("birth").getAsJsonObject().get("date").getAsString();

        String date = removeQMarks(dob);
        LocalDate playerDob;
        try {
            playerDob = LocalDate.parse(date);
        } catch (DateTimeParseException d) {
            System.out.println("Could not add date of birth for " + player.getIdNo());
            System.out.println(d.getMessage());
            playerDob = LocalDate.now();
        }

        player.setDateOfBirth(playerDob);
        player.setPhotoUrl(playerJson.get("player").getAsJsonObject().get("photo").getAsString());
        player.setTeam(playerJson.get("statistics").getAsJsonArray().get(0).getAsJsonObject().get("team").getAsJsonObject().get("name").getAsString());

        player.setPosition(pos);

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

    //Checks if search names match names of player
    private boolean doesContainAllNames(String name, String[] searchedNames) {
        for (String s : searchedNames) {
            if (!(name.toLowerCase(Locale.ROOT).contains(s.toLowerCase(Locale.ROOT)))) return false;
        }
        return true;
    }

    /**
     * Method removes "" for the date variable
     *
     * @param s
     * @return
     */
    private static String removeQMarks(String s) {

        //Error handling for rare cases when name from API is empty
        if (s.isEmpty()) return "";
        return s.replace("\"", "");
    }


}
