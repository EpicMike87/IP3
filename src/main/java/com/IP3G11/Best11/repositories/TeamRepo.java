package com.IP3G11.Best11.repositories;

import com.IP3G11.Best11.model.Team;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface TeamRepo extends JpaRepository<Team, Integer> {

    //Saves/updates Team in database
    Team save(Team t);
    //Returns team with matching ID
    Team findById(int id);
    //Returns team with rank number matching the parameter
    Team findByTeamRank(int rank);
    //Returns team that contains string provided
    Team findByTeamNameContainingIgnoreCase(String name);
    //Returns list of teams that contains string provided
    List<Team> findListByTeamNameContainingIgnoreCase(String name);
    //Returns all teams
    List<Team> findAll();
}
