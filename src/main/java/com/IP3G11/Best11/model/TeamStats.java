package com.IP3G11.Best11.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
//Contains data of team stats, used for all, home and away to minimise bloat of Team class
@Entity
@Data

@NoArgsConstructor
@AllArgsConstructor
public class TeamStats {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private int season;
    private String type;
    private int matchesPlayed;
    private int matchesWon;
    private int matchesDrew;
    private int matchesLost;
    private int goalsFor;
    private int goalsAgainst;
    private int goalDifference;
    private int points;

    public TeamStats(int season, String type, int matchesPlayed, int matchesWon, int matchesDrew, int matchesLost, int goalsFor, int goalsAgainst, int goalDifference, int points) {
        this.season = season;
        this.type = type;
        this.matchesPlayed = matchesPlayed;
        this.matchesWon = matchesWon;
        this.matchesDrew = matchesDrew;
        this.matchesLost = matchesLost;
        this.goalsFor = goalsFor;
        this.goalsAgainst = goalsAgainst;
        this.goalDifference = goalDifference;
        this.points = points;
    }
}
