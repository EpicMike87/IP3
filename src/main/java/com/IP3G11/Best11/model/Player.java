package com.IP3G11.Best11.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.Date;
import java.util.Locale;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Player {

    private int idNo;
    private String firstName;
    private String lastName;
    private int age;
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