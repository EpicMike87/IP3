package com.IP3G11.Best11.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Attacker extends Player{

    private int assists;
    private int goals;
    private int shots;
    private int shotsOnTarget;
    private int penaltiesTaken;
    private int penaltiesScored;

}
