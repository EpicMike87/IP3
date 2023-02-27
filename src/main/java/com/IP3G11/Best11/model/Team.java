package com.IP3G11.Best11.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class Team {

    private int id;
    private String teamName;
    private int rank;
    private int points;
    private int goalDiff;
    private TeamStats allStats;
    private TeamStats homeStats;
    private TeamStats awayStats;
    private List<Player> players;

}
