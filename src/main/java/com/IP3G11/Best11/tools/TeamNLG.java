package com.IP3G11.Best11.tools;

import com.IP3G11.Best11.model.Team;

import java.util.HashMap;
import java.util.List;

public class TeamNLG {

    static String ordinal;
    static String leaguePositionText;
    static String additionalPositionText;
    HashMap<String, Double> averages;
    double goalsAvg;
    double concededAvg;

    public TeamNLG(List<Team> teams){
        averages = TeamStrengthTool.getSeasonAverages(teams);
        goalsAvg = averages.get("Total Average");
        concededAvg = averages.get("Total Average");
    }

    public String teamText(Team team)
      /*
      The following is the logic to use the correct ordinal (2nd, 3rd, 4th etc) when referring to the team's position.
      It will also use the terms "top of the league" and "bottom of the league" to refer to the teams in 1st and 12th.
      */
    {
        if (team.getTeamRank() == 1)
        {
            ordinal = "top";
            additionalPositionText = " and will be crowned champions if they remain there.";
        }
        else if (team.getTeamRank()  == 12)
        {
            ordinal = "bottom";
            additionalPositionText = " and face the prospect of relegation to the Scottish Championship.";
        }
        else if (team.getTeamRank()  == 11)
        {
            ordinal = "th";
            additionalPositionText = " and will be competing in the relegation play off to preserve their Premiership status if they remain there.";
        }

        else if (team.getTeamRank() == 2)
        {
            ordinal = "nd";
            additionalPositionText = " and will be rewarded with a place in the Champions League if they can remain there.";
        }
        else if (team.getTeamRank() == 3)
        {
            ordinal = "rd";
            additionalPositionText = " with a potential spot in the Europa Conference league awaiting them.";
        }
        else
        {
            ordinal = "th";
            additionalPositionText = ".";
        }

        if (team.getTeamRank()  == 1||team.getTeamRank()  == 12)  {
            leaguePositionText = String.format("%s of", ordinal);
        }
        else {
            leaguePositionText  = String.format("%1d%s in", team.getTeamRank() , ordinal);
        }

        /*
      The following is the logic to generate the text for assessing a team's attacking performance.
        */

        String stringTeamPosition = String.format("%s are currently %s the league with %1s points", team.getTeamName(), leaguePositionText, team.getTeamStats().get(0).getPoints());
        String stringAttackAnalysis = String.format(" They have scored %1s goals so far, ", team.getTeamStats().get(0).getGoalsFor());
        String stringAttackAnalysis2 = "";
        if (team.getTeamStats().get(0).getGoalsFor() > goalsAvg+3) {
            stringAttackAnalysis2 = String.format("higher than the league average of %.0f indicating a side strong in attack", goalsAvg);
        }
        else if (team.getTeamStats().get(0).getGoalsFor() < goalsAvg-3) {
            stringAttackAnalysis2 = String.format("lower than the league average of %.0f indicating a side weak in attack", goalsAvg);
        }
        else {
            stringAttackAnalysis2 = String.format("inline with the league average of %.0f.", goalsAvg);
        }

        String stringTopScorer = String.format(" with [Player Name] currently their top scorer, with X goals.");
        //String stringTopScorer = String.format(" with %s currently their top scorer with %1d goals.", team.topScorerName, team.topScorerGoals);

         /*
      The following is the logic to generate the text for assessing a team's defensive performance.
        */
        String stringDefenceAnalysis = String.format(" At the other end of the pitch, they have conceded %1s goals so far, ", team.getTeamStats().get(0).getGoalsAgainst());

         /*
      This prompts the text to use the word "also" if team is either below or above average in both attack and defense.
        */
        String alsoQualifier;
        if ((team.getTeamStats().get(0).getGoalsFor() > goalsAvg+3) && (team.getTeamStats().get(0).getGoalsAgainst() < concededAvg+3)||((team.getTeamStats().get(0).getGoalsFor() < goalsAvg+3) && (team.getTeamStats().get(0).getGoalsAgainst() > concededAvg+3))){
            alsoQualifier = " also";
        }
        else{
            alsoQualifier = "";
        }

        String stringDefenceAnalysis2;
        if (team.getTeamStats().get(0).getGoalsAgainst() > concededAvg+3) {
            stringDefenceAnalysis2 = String.format("higher than the league average of %.0f indicating a side%s weak in defence.", concededAvg, alsoQualifier);
        }
        else if (team.getTeamStats().get(0).getGoalsAgainst() < concededAvg-3) {
            stringDefenceAnalysis2 = String.format("lower than the league average of %.0f indicating a side%s strong in defence.", concededAvg, alsoQualifier);
        }
        else {
            stringDefenceAnalysis2 = String.format("inline with the league average of %.0f.", concededAvg);
        }

        String stringBestPlayer = String.format(" Their best player is [position] [name] with an average rating of [x].");
        //String stringBestPlayer = String.format("Their best player is %s %s with an average rating of %1.1f.", team. bestPlayerPosition, team.bestPlayerName, team.bestPayerRating);

        String teamNLGString = stringTeamPosition+additionalPositionText+stringAttackAnalysis
                +stringAttackAnalysis2+stringTopScorer+stringDefenceAnalysis+stringDefenceAnalysis2+stringBestPlayer;

        return teamNLGString;
    }
}
