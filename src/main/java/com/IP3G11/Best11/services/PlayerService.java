package com.IP3G11.Best11.services;

import com.IP3G11.Best11.model.Player;

import java.util.List;

public interface PlayerService {
    List<Player> getAllPlayers();
    List<Player> getPlayersByPosition(String position);
}
