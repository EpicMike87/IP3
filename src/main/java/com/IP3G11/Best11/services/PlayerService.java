package com.IP3G11.Best11.services;

import com.IP3G11.Best11.model.Player;
import com.IP3G11.Best11.repositories.PlayerApiRepo;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;

@Service
public class PlayerService {

    private final PlayerApiRepo repo;


    public PlayerService(){
        repo = new PlayerApiRepo();
    }

    //Changed to return list as multiple players may match search if firstname not provided
    public List<Player> getPlayerByName(String name) throws IOException, InterruptedException {
        return repo.getPlayerByName(name);
    }

}
