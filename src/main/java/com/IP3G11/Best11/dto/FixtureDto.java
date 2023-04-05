package com.IP3G11.Best11.dto;

import com.IP3G11.Best11.model.Fixture;
import com.IP3G11.Best11.model.Team;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class FixtureDto implements Comparable<FixtureDto>{

    private int id;

    private String homeTeamName;

    private String homePhotoUrl;

    private String awayTeamName;

    private String awayPhotoUrl;

    private int homeTeamGoals;

    private int awayTeamGoals;

    private Date dateTime;

    private Character fullTimeResult;

    private Character prediction;

    public FixtureDto(Fixture f){
        this.id = f.getId();
        this.homeTeamName = f.getHomeTeamName();
        this.homePhotoUrl = f.getHomeTeam().getPhotoUrl();
        this.awayTeamName = f.getAwayTeamName();
        this.awayPhotoUrl = f.getAwayTeam().getPhotoUrl();
        this.homeTeamGoals = f.getHomeTeamGoals();
        this.awayTeamGoals = f.getAwayTeamGoals();
        this.dateTime = f.getDateTime();
        this.fullTimeResult = f.getFullTimeResult();
        this.prediction = f.getPrediction();
    }

    public static List<FixtureDto> convertList(List<Fixture> fixtures){
        List<FixtureDto> fixtureDtos = new ArrayList<>();
        for(Fixture f : fixtures){
            fixtureDtos.add(new FixtureDto(f));
        }
        return fixtureDtos;
    }

    @Override
    public int compareTo(FixtureDto f) {
        if (f.getDateTime().before(this.dateTime)) return -1;
        else if (f.getDateTime().after(this.dateTime)) return 1;
        return 0;
    }

    @Override
    public boolean equals(Object o) {
        if (!o.getClass().equals(Fixture.class)) return false;
        Fixture f = (Fixture) o;
        return f.getDateTime().equals(this.dateTime) && f.getHomeTeam().equals(this.homeTeamName) && f.getAwayTeam().equals(this.awayTeamName);
    }
}
