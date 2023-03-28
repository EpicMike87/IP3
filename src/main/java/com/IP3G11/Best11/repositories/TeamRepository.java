package com.IP3G11.Best11.repositories;

import com.IP3G11.Best11.model.Team;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TeamRepository extends JpaRepository<Team, Long> {

    Team findTeamByTeamName(String name);

}
