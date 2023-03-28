package com.IP3G11.Best11.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
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
    private LocalDate dateOfBirth;
    private String photoUrl;
    private String team;
    private String position;
    private int matchesPlayed;
    private boolean isCaptain;
    private double rating;
    private int foulsCommitted;
    private int yellowCards;
    private int redCards;
    private int passes;
    private double passAccuracy;
}
