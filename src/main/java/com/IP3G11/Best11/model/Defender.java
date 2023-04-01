package com.IP3G11.Best11.model;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Entity
@Data
@EqualsAndHashCode(callSuper = true)
@AllArgsConstructor
@NoArgsConstructor
@Table(name="Defender_Stats")
@DiscriminatorValue("Defender")
public class Defender extends Player{

    private int assists;
    private int goals;
    private int shotsOnTarget;
    private int tackles;
    private int blocks;
    private int interceptions;

}