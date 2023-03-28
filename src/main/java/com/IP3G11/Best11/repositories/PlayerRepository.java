package com.IP3G11.Best11.repositories;

import com.IP3G11.Best11.model.Player;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

public interface PlayerRepository extends JpaRepository<Player, Long> {

    List<Player> getPlayersByPosition(String position);

}
