package com.IP3G11.Best11.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "fixture")
public class Fixture implements Comparable<Fixture> {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    @JoinColumn(name = "home_team_id")
    @JsonBackReference
    private Team homeTeam;
    @ManyToOne
    @JoinColumn(name = "away_team_id")
    @JsonBackReference
    private Team awayTeam;

    private String homeTeamName;

    private String awayTeamName;

    private int homeTeamGoals;
    private int awayTeamGoals;

    @Temporal(TemporalType.TIMESTAMP)
    private Date dateTime;

    private Character fullTimeResult;

    private Character prediction;


    @Override
    public int compareTo(Fixture f) {
        if (f.getDateTime().before(this.dateTime)) return -1;
        else if (f.getDateTime().after(this.dateTime)) return 1;
        return 0;
    }

    @Override
    public boolean equals(Object o) {
        if (!o.getClass().equals(Fixture.class)) return false;
        Fixture f = (Fixture) o;
        return f.getDateTime().equals(this.dateTime) && f.getHomeTeam().equals(this.homeTeam) && f.getAwayTeam().equals(this.awayTeam);
    }
}

