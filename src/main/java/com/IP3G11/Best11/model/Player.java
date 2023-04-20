package com.IP3G11.Best11.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.Period;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Inheritance(strategy = InheritanceType.JOINED)
@DiscriminatorColumn(name="player_type",
        discriminatorType = DiscriminatorType.STRING)
public class Player {

    @Id
    private int id;
    private int teamId;
    private String firstName;
    private String lastName;
    private int age;
    private LocalDate dateOfBirth;
    private String photoUrl;
    private String team;
    private String position;
    private String positionType;
    private int matchesPlayed;
    private boolean isCaptain;
    private double rating;
    private int foulsCommitted;
    private int yellowCards;
    private int redCards;
    private int passes;
    private double passAccuracy;
    private int duels;
    private int duelsWon;
    private int penaltiesTaken;
    private int penaltiesScored;
    private int dribblesAttempted;
    private int successfulDribbles;
    private int assists;
    private int goals;
    private int shotsOnTarget;
    private int shots;

    public void setAge(){
        age = Period.between(dateOfBirth, LocalDate.now()).getYears();
        System.out.println(age);
    }

    @Override
    public boolean equals(Object o){
        Player p = (Player) o;
        return p.getFirstName().equals(this.firstName) && p.getLastName().equals(this.lastName);
    }
}