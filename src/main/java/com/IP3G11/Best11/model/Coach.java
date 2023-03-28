package com.IP3G11.Best11.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Coach {

    @Id
    private int id;
    private String firstName;
    private String lastName;
    private String teamName;
    private LocalDate dateOfBirth;
    private String nationality;
    private String photoUrl;
}
