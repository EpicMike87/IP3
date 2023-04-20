        package com.IP3G11.Best11.tools;

        import com.IP3G11.Best11.model.Player;
        import lombok.NoArgsConstructor;

        import java.util.HashMap;
        import java.util.List;

        import static java.lang.Boolean.FALSE;
        import static java.lang.Boolean.TRUE;

        @NoArgsConstructor
public class PlayerNLG {
    static String appearanceText;
    static String playerRating;
    static String playerGoals;
    static String ageDescriptor;
    static boolean hasPlayed;


    public String playerText(Player player) {

        // This checks if the player has actually made an appearance this season.
        if (player.getMatchesPlayed() == 0) {
            hasPlayed = FALSE;
        }
        else {
            hasPlayed = TRUE;
        }

        // This checks the player age and assigns a descriptor if younger than 24 or older than 30
        if (player.getAge() > 30) {
            ageDescriptor = "veteran";
        }

        else if (player.getAge() < 24) {
            ageDescriptor = "young";
        }

        else {
            ageDescriptor = "";
        }



        if (player.getMatchesPlayed() > 25)
        {
            appearanceText = String.format("%s %s has been a regular starter for %s this season with %1s league appearances, ",
                    player.getFirstName(), player.getLastName(), player.getTeam(), player.getMatchesPlayed());
        }
        else if (player.getMatchesPlayed() >10 && player.getMatchesPlayed() <25)
        {
            appearanceText = String.format("%s %s has made %1s league appearances for %s this season, ",
                    player.getFirstName(), player.getLastName(), player.getMatchesPlayed(), player.getTeam());
        }
        else if (player.getMatchesPlayed() >1 && player.getMatchesPlayed() <10)
        {
            appearanceText = String.format("%s %s has made sporadic appearances for %s this season with %1s league appearances, ",
                    player.getFirstName(), player.getLastName(), player.getTeam(), player.getMatchesPlayed());
        }
        else if (player.getMatchesPlayed() == 0)
        {
            appearanceText = String.format("%s %s is yet to make a league appearance for %1s this season.",
                    player.getFirstName(), player.getLastName(), player.getTeam());
        }

        if (hasPlayed == FALSE) {
            playerGoals = "";
            playerRating = "";

        }
        else {
            playerGoals = String.format("%s %s has scored 20 in %1s appearances this season", player.getFirstName(), player.getLastName(), player.getMatchesPlayed());
            playerRating = String.format("the %s %s has an average rating of %.2f", ageDescriptor, player.getPosition(), player.getRating());
        }

        String playerNLGString = appearanceText + playerRating;
        System.out.println(playerNLGString);
        return playerNLGString;
    }
}