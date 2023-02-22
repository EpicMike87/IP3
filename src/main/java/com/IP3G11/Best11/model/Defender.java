package com.IP3G11.Best11.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Defender extends Player{

    private int duels;
    private int duelsWon;
    private int tackles;
    private int blocks;
    private int interceptions;

}
