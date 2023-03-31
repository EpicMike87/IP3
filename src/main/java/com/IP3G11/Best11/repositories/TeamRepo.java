package com.IP3G11.Best11.repositories;

import com.IP3G11.Best11.model.Team;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface TeamRepo extends JpaRepository<Team, Integer> {
    Team save(Team t);
    Team findById(int id);
    Team findByTeamRank(int rank);
    Team findByTeamNameContainingIgnoreCase(String name);
    List<Team> findListByTeamNameContainingIgnoreCase(String name);
    List<Team> findAll();
}
