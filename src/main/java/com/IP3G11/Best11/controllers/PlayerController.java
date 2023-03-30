package com.IP3G11.Best11.controllers;

import com.IP3G11.Best11.model.Player;
import com.IP3G11.Best11.services.PlayerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class PlayerController {

    @Autowired
    PlayerService playerService;

    @GetMapping("/search-player/{name}")
    public List<Player> searchPlayerByName(@PathVariable String name){
        return playerService.getPlayerByName(name);
    }

    @GetMapping("/search-player/")
    public List<Player> searchPlayer(){
        return playerService.getAllPlayers();
    }

    @GetMapping("/players/top5/{position}")
    public List<Player> getTop5ByPosition(@PathVariable String position){
        return playerService.getTop5ByPosition(position);
    }

    @GetMapping("/players/id/{id}")
    public List<Player> getById(@PathVariable int id){
        return playerService.getById(id);
    }

    @GetMapping("/players/{position}")
    public List<Player> getByPosition(@PathVariable String position){
        return playerService.getByPosition(position);
    }

    @GetMapping("/players/all")
    public List<Player> getAll(){
        return playerService.getAllPlayers();
    }



}
