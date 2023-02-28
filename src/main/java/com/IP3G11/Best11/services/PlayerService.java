package com.IP3G11.Best11.services;

import com.IP3G11.Best11.model.Player;
import com.IP3G11.Best11.repositories.PlayerApiRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;

@Service
public class PlayerService {

    @Autowired
    private PlayerApiRepo playerApiRepo;

    //Changed to return list as multiple players may match search if firstname not provided
    public List<Player> getPlayerByName(String name) throws IOException, InterruptedException {
        return playerApiRepo.getPlayerByName(name);
    }

}
