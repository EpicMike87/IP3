package com.IP3G11.Best11.services;

import com.IP3G11.Best11.model.Player;
import com.IP3G11.Best11.repositories.PlayerRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;

@Service
public class PlayerService {

    private PlayerRepo playerRepo;

    @Autowired
    public PlayerService(PlayerRepo playerRepo){
        this.playerRepo = playerRepo;
    }

    public List<Player> getAllPlayers(){
        return playerRepo.findAll();
    }

    public List<Player> getPlayerByName(String lastName){
        return playerRepo.findByLastName(lastName);
    }

    public List<Player> getPlayerByNames(String firstName, String lastName) {
        return playerRepo.findByFirstNameContainingIgnoreCaseAndLastNameContainingIgnoreCase(firstName, lastName);
    }

    public List<Player> getTop5ByPosition(String position){
        return playerRepo.findTop5ByPositionOrderByRatingDesc(position);
    }

    public List<Player> getByPosition(String position){
        return playerRepo.findByPosition(position);
    }

}
