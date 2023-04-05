package com.IP3G11.Best11.tools;

import com.IP3G11.Best11.model.Team;
import com.IP3G11.Best11.repositories.TeamRepo;
import com.IP3G11.Best11.services.PlayerService;
import com.IP3G11.Best11.services.TeamService;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.HashMap;
import java.util.List;

public class TestClass {

    List<Team> teams;

    public TestClass(List<Team> teams){
        this.teams = teams;
    }

    public String NLGMessage(){
        HashMap<String, Double> averages = TeamStrengthTool.getSeasonAverages(teams);
        double homeFor = averages.get("Home For");
        System.out.println(homeFor);
        return "home for is " + homeFor;
    }
}
