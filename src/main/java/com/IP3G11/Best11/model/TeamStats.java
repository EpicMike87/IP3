package com.IP3G11.Best11.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

//Contains data of team stats, used for all, home and away to minimise bloat of Team class
@Data
@NoArgsConstructor
@AllArgsConstructor
public class TeamStats {

    private int season;
    private int matchesPlayed;
    private int matchesWon;
    private int matchesDrew;
    private int matchesLost;
    private int goalsFor;
    private int goalsAgainst;
    private int goalDifference;
    private int points;

}
