        package com.IP3G11.Best11.tools;

        import com.IP3G11.Best11.model.Player;

        import java.util.HashMap;
        import java.util.List;

public class PlayerNLG {

    static String ordinal;
    static String leaguePositionText;
    static String additionalPositionText;
    HashMap<String, Double> averages;
    double goalsAvg;
    double concededAvg;

    public PlayerNLG(List<Player> player) {
        goalsAvg = averages.get("Total Average");
        concededAvg = averages.get("Total Average");
    }

    public String playerText(Player player) {
      /*
      The following is the logic to use the correct ordinal (2nd, 3rd, 4th etc) when referring to the team's position.
      It will also use the terms "top of the league" and "bottom of the league" to refer to the teams in 1st and 12th.
      */

        String playerGoals = String.format("%s has scored 20 in %1s appearances this season", player.getLastName(), player.getMatchesPlayed());
        String playerRating = String.format("they have an average rating of %1s", player.getRating());


        String playerNLGString = playerGoals + playerRating;
        System.out.println(playerNLGString);
        return playerNLGString;
    }
}