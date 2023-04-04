package com.IP3G11.Best11.services;

import com.IP3G11.Best11.dto.TeamDto;
import com.IP3G11.Best11.model.Team;
import com.IP3G11.Best11.repositories.TeamRepo;
import com.IP3G11.Best11.tools.TeamDataReader;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class TeamService {

    private final TeamRepo teamRepo;

    @Autowired
    public TeamService(TeamRepo teamRepo){
        this.teamRepo = teamRepo;
    }

    public void save() throws IOException, InterruptedException {
        TeamDataReader db = new TeamDataReader();
        List<Team> teams = db.getTeams();
        Set<Team> setTeams = new HashSet<>(teams);
        for(Team t : setTeams){
            teamRepo.save(t);
        }
    }

    public void saveTeam(Team t){
        teamRepo.save(t);
    }

    public TeamDto getTeamByName(String teamName){
//        teamName = teamName.substring(0, 1).toUpperCase() + teamName.substring(1);
        return new TeamDto(teamRepo.findByTeamNameContainingIgnoreCase(teamName));
    }

    public List<TeamDto> findListByName(String teamName){
        teamName = teamName.substring(0, 1).toUpperCase() + teamName.substring(1);
        List<Team> teams = teamRepo.findListByTeamNameContainingIgnoreCase(teamName);
        List<TeamDto> teamsDto = new ArrayList<>();
        for(Team t : teams){
            teamsDto.add(new TeamDto(t));
        }
        return teamsDto;
    }

    public TeamDto getTeam(int teamId){
        return new TeamDto(teamRepo.findById(teamId));
    }

    public TeamDto getTeamByRank(int rank){
        return new TeamDto(teamRepo.findByTeamRank(rank));
    }

    public List<TeamDto> getAllTeams(){
        return TeamDto.convertList(teamRepo.findAll());
    }

}
