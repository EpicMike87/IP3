package com.IP3G11.Best11.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;

import java.util.List;
import java.util.Set;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Team {
    @Id
    private int id;
    private String teamName;
    private String photoUrl;
    private int teamRank;
    @LazyCollection(LazyCollectionOption.FALSE)
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "homeTeam", cascade = CascadeType.MERGE)
    @JsonManagedReference
    private Set<Fixture> homeFixtures;
    @LazyCollection(LazyCollectionOption.FALSE)
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "awayTeam")
    @JsonManagedReference
    private Set<Fixture> awayFixtures;
    @OneToOne(cascade = {CascadeType.ALL})
    private Ground ground;
    @OneToMany(cascade = {CascadeType.ALL})
    @LazyCollection(LazyCollectionOption.FALSE)

    private List<TeamStats> teamStats;
    @LazyCollection(LazyCollectionOption.FALSE)
    @OneToMany(cascade = {CascadeType.ALL})
    private List<Player> players;

    //These doubles used by ML model to predict outcome of future fixtures
    private double homeAttStrLast20;
    private double awayAttStrLast20;
    private double homeDefStrLast20;
    private double awayDefStrLast20;

    private double homeAttStrLast10;
    private double awayAttStrLast10;
    private double homeDefStrLast10;
    private double awayDefStrLast10;

    private double homeFormLast20;
    private double awayFormLast20;

    private double homeFormLast10;
    private double awayFormLast10;

}
