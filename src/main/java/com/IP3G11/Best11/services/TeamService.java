package com.IP3G11.Best11.services;

import com.IP3G11.Best11.model.Player;
import com.IP3G11.Best11.model.Team;

import java.util.List;

public interface TeamService {
    List<Team> getTeams();

    Team getTeamByName(String name);

}
