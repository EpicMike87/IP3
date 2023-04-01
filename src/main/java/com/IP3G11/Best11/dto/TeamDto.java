package com.IP3G11.Best11.dto;

import com.IP3G11.Best11.model.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TeamDto {

    private int id;
    private String teamName;
    private Ground grounds;
    private String photoUrl;
    private int rank;
    private int points;
    private int goalDiff;
    private TeamStats allStats;
    private TeamStats homeStats;
    private TeamStats awayStats;
    private List<Player> players;
    private List<FixtureDto> fixtures;

    public TeamDto(Team t){
        this.id = t.getId();
        this.teamName = t.getTeamName();
        this.grounds = t.getGround();
        this.photoUrl = t.getPhotoUrl();
        this.rank = t.getTeamRank();
        this.points = t.getTeamStats().get(0).getPoints();
        this.goalDiff = t.getTeamStats().get(0).getGoalDifference();
        this.allStats = t.getTeamStats().get(0);
        this.homeStats = t.getTeamStats().get(1);
        this.awayStats = t.getTeamStats().get(2);
        this.players = t.getPlayers();
        setFixtures(t);
    }

    public static List<TeamDto> convertList(List<Team> teams){
        List<TeamDto> teamDtos = new ArrayList<>();
        for(Team t : teams){
            teamDtos.add(new TeamDto(t));
        }
        return teamDtos;
    }

    public void setFixtures(Team t){
        List<Fixture> fixtures = new ArrayList<>();
        fixtures.addAll(t.getHomeFixtures());
        fixtures.addAll(t.getAwayFixtures());
        Collections.sort(fixtures);
        List<FixtureDto> fixturesDto = new ArrayList<>();
        for(Fixture f : fixtures){
            fixturesDto.add(new FixtureDto(f));
        }
        this.fixtures = fixturesDto;
    }
}

