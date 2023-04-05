package com.IP3G11.Best11.tools;

import com.IP3G11.Best11.model.Fixture;
import com.IP3G11.Best11.model.Team;
import lombok.Data;

import java.text.DecimalFormat;
import java.util.*;

@Data
public class TeamStrengthTool {

    private List<Fixture> fixtures;
    private List<Team> teams;

    private Double leagueLast20AvgHomeFor;
    private Double leagueLast20AvgAwayFor;
    private Double leagueLast20AvgHomeAgainst;
    private Double leagueLast20AvgAwayAgainst;
    private Double leagueLast10AvgHomeFor;
    private Double leagueLast10AvgAwayFor;
    private Double leagueLast10AvgHomeAgainst;
    private Double leagueLast10AvgAwayAgainst;

    private static final DecimalFormat decfor = new DecimalFormat("0.00");

    public static HashMap<String, Double> getSeasonAverages(List<Team> teams){
        double goalsScoredAll = 0;
        double goalsScoredHome = 0;
        double goalsScoredAway = 0;
        int matchesPlayed = 0;
        int homeMatchesPlayed = 0;
        int awayMatchesPlayed = 0;

        for(Team t : teams){
            goalsScoredAll += t.getTeamStats().get(0).getGoalsFor();
            goalsScoredHome += t.getTeamStats().get(1).getGoalsFor();
            goalsScoredAway += t.getTeamStats().get(2).getGoalsFor();
            matchesPlayed += t.getTeamStats().get(0).getMatchesPlayed();
            homeMatchesPlayed += t.getTeamStats().get(1).getMatchesPlayed();
            awayMatchesPlayed += t.getTeamStats().get(2).getMatchesPlayed();
        }
        HashMap<String, Double> averages = new HashMap<>();
        averages.put("Total Average", Double.valueOf((decfor.format(goalsScoredAll/matchesPlayed))));
        averages.put("Home Average", Double.valueOf(decfor.format(goalsScoredHome/homeMatchesPlayed)));
        averages.put("Away Average", Double.valueOf(decfor.format(goalsScoredAway/awayMatchesPlayed)));

        return averages;
    }

    public void setFixtures(List<Fixture> fixtures) {
        this.fixtures = fixtures;
    }

    public void setTeams(List<Team> teams) {
        this.teams = teams;
    }

    public void setLeagueAvgs() {

        ArrayList<HashMap<Team, Double>> last10Avgs = getLastXAvgs(10);
        ArrayList<HashMap<Team, Double>> last20Avgs = getLastXAvgs(20);

        HashMap<Team, Double> last10HomeFor = last10Avgs.get(0);
        HashMap<Team, Double> last10HomeAgainst = last10Avgs.get(1);
        HashMap<Team, Double> last10AwayFor = last10Avgs.get(2);
        HashMap<Team, Double> last10AwayAgainst = last10Avgs.get(3);

        HashMap<Team, Double> last10HomeForm = last10Avgs.get(4);
        HashMap<Team, Double> last10AwayForm = last10Avgs.get(5);

        HashMap<Team, Double> last20HomeFor = last20Avgs.get(0);
        HashMap<Team, Double> last20HomeAgainst = last20Avgs.get(1);
        HashMap<Team, Double> last20AwayFor = last20Avgs.get(2);
        HashMap<Team, Double> last20AwayAgainst = last20Avgs.get(3);

        HashMap<Team, Double> last20HomeForm = last20Avgs.get(4);
        HashMap<Team, Double> last20AwayForm = last20Avgs.get(5);

        leagueLast10AvgHomeFor = getAvgFromMap(last10HomeFor);
        leagueLast10AvgHomeAgainst = getAvgFromMap(last10HomeAgainst);
        leagueLast10AvgAwayFor = getAvgFromMap(last10AwayFor);
        leagueLast10AvgAwayAgainst = getAvgFromMap(last10AwayAgainst);
        leagueLast20AvgHomeFor = getAvgFromMap(last20HomeFor);
        leagueLast20AvgHomeAgainst = getAvgFromMap(last20HomeAgainst);
        leagueLast20AvgAwayFor = getAvgFromMap(last20AwayFor);
        leagueLast20AvgAwayAgainst = getAvgFromMap(last20AwayAgainst);

        for(Map.Entry<Team, Double> entry : last10HomeFor.entrySet()){
            Team team = entry.getKey();
            team.setHomeAttStrLast10(entry.getValue() / leagueLast10AvgHomeFor);
        }

        for(Map.Entry<Team, Double> entry : last10HomeAgainst.entrySet()){
            Team team = entry.getKey();
            team.setHomeDefStrLast10(entry.getValue() / leagueLast10AvgHomeAgainst);
        }

        for(Map.Entry<Team, Double> entry : last10AwayAgainst.entrySet()){
            Team team = entry.getKey();
            team.setAwayDefStrLast10(entry.getValue() / leagueLast10AvgAwayAgainst);
        }

        for(Map.Entry<Team, Double> entry : last10AwayFor.entrySet()){
            Team team = entry.getKey();
            team.setAwayAttStrLast10(entry.getValue() / leagueLast10AvgAwayFor);
        }

        for(Map.Entry<Team, Double> entry : last10HomeForm.entrySet()){
            Team team = entry.getKey();
            team.setHomeFormLast10(entry.getValue());
        }

        for(Map.Entry<Team, Double> entry : last10AwayForm.entrySet()){
            Team team = entry.getKey();
            team.setAwayFormLast10(entry.getValue());
        }

        for(Map.Entry<Team, Double> entry : last20HomeFor.entrySet()){
            Team team = entry.getKey();
            team.setHomeAttStrLast20(entry.getValue() / leagueLast20AvgHomeFor);
        }

        for(Map.Entry<Team, Double> entry : last20HomeAgainst.entrySet()){
            Team team = entry.getKey();
            team.setHomeDefStrLast20(entry.getValue() / leagueLast20AvgHomeAgainst);
        }

        for(Map.Entry<Team, Double> entry : last20AwayAgainst.entrySet()){
            Team team = entry.getKey();
            team.setAwayDefStrLast20(entry.getValue() / leagueLast20AvgAwayAgainst);
        }

        for(Map.Entry<Team, Double> entry : last20AwayFor.entrySet()){
            Team team = entry.getKey();
            team.setAwayAttStrLast20(entry.getValue() / leagueLast20AvgAwayFor);
        }

        for(Map.Entry<Team, Double> entry : last20HomeForm.entrySet()){
            Team team = entry.getKey();
            team.setHomeFormLast20(entry.getValue());
        }

        for(Map.Entry<Team, Double> entry : last20AwayForm.entrySet()){
            Team team = entry.getKey();
            team.setAwayFormLast20(entry.getValue());
        }

    }

    private ArrayList<HashMap<Team, Double>> getLastXAvgs(int lastX) {
        Collections.sort(fixtures);
        ArrayList<HashMap<Team, Double>> results = new ArrayList<>();

        HashMap<Team, Double> teamAvgsHomeFor = new HashMap<>();
        HashMap<Team, Double> teamAvgsHomeAgainst = new HashMap<>();
        HashMap<Team, Double> teamAvgsAwayFor = new HashMap<>();
        HashMap<Team, Double> teamAvgsAwayAgainst = new HashMap<>();

        HashMap<Team, Double> teamHomeForm = new HashMap<>();
        HashMap<Team, Double> teamAwayForm = new HashMap<>();

        for (Team t : teams) {

            double avgHomeFor = 0.0;
            double avgHomeAgainst = 0.0;
            double avgAwayFor = 0.0;
            double avgAwayAgainst = 0.0;

            double homePoints = 0.0;
            double awayPoints = 0.0;

            List<Fixture> homeFixtures = fixtures.stream().filter(f -> f.getHomeTeam().getTeamName().equalsIgnoreCase(t.getTeamName())).toList();
            List<Fixture> awayFixtures = fixtures.stream().filter(f -> f.getAwayTeam().getTeamName().equalsIgnoreCase(t.getTeamName())).toList();
            Set<Fixture> teamHomeFixtures = new HashSet<>(t.getHomeFixtures());
            Set<Fixture> teamAwayFixtures = new HashSet<>(t.getHomeFixtures());

            teamHomeFixtures.addAll(homeFixtures);
            teamAwayFixtures.addAll(awayFixtures);


            if(homeFixtures.size() > lastX) homeFixtures = homeFixtures.subList(0, lastX);
            if(awayFixtures.size() > lastX) awayFixtures = awayFixtures.subList(0, lastX);


            for (int i = 0; i < homeFixtures.size(); i++) {

                Fixture homeFixture = homeFixtures.get(i);

                avgHomeFor += homeFixture.getHomeTeamGoals();
                avgHomeAgainst += homeFixture.getAwayTeamGoals();

                if(homeFixture.getHomeTeamGoals() > homeFixture.getAwayTeamGoals()) homePoints += 3;
                if(homeFixture.getHomeTeamGoals() == homeFixture.getAwayTeamGoals()) homePoints++;
            }

            avgHomeFor /= homeFixtures.size();
            avgHomeAgainst /= homeFixtures.size();

            for (int i = 0; i < awayFixtures.size(); i++) {

                Fixture awayFixture = awayFixtures.get(i);

                avgAwayFor += awayFixture.getAwayTeamGoals();
                avgAwayAgainst += awayFixture.getHomeTeamGoals();

                if(awayFixture.getAwayTeamGoals() > awayFixture.getHomeTeamGoals()) awayPoints += 3;
                if(awayFixture.getAwayTeamGoals() == awayFixture.getHomeTeamGoals()) awayPoints++;
            }
            avgAwayFor /= awayFixtures.size();
            avgAwayAgainst /= awayFixtures.size();

            homePoints /= homeFixtures.size();
            awayPoints /= awayFixtures.size();

            teamAvgsHomeFor.put(t, avgHomeFor);
            teamAvgsHomeAgainst.put(t, avgHomeAgainst);
            teamAvgsAwayFor.put(t, avgAwayFor);
            teamAvgsAwayAgainst.put(t, avgAwayAgainst);

            teamHomeForm.put(t, homePoints);
            teamAwayForm.put(t, awayPoints);
        }

        results.add(teamAvgsHomeFor);
        results.add(teamAvgsHomeAgainst);
        results.add(teamAvgsAwayFor);
        results.add(teamAvgsAwayAgainst);

        results.add(teamHomeForm);
        results.add(teamAwayForm);

        return results;

    }

    private Double getAvgFromMap(HashMap<Team, Double> entries){
        double property = 0;

        for(Map.Entry<Team, Double> entry: entries.entrySet()){
            property += entry.getValue();
        }
        return (property /= entries.size());
    }
}
