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
@Table(name="Goalkeeper_Stats")
@DiscriminatorValue("Goalkeeper")
public class Goalkeeper extends Player{

    private int saves;
    private int goalsConceded;

}