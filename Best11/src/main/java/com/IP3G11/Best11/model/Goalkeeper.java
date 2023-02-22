package com.IP3G11.Best11.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Goalkeeper extends Player{

    private int saves;
    private int goalsConceded;

}
