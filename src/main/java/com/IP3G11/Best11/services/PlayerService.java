package com.IP3G11.Best11.services;

import com.IP3G11.Best11.model.Player;
import com.IP3G11.Best11.repositories.PlayerApiRepo;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Service
public class PlayerService {

    private final PlayerApiRepo repo;
    private final Heapsort heapsort;


    public PlayerService(){
        repo = new PlayerApiRepo();
        heapsort = new Heapsort();
    }

    //Changed to return list as multiple players may match search if firstname not provided
    public List<Player> getPlayerByName(String name) throws IOException, InterruptedException {
        return repo.getPlayerByName(name);
    }

    public List<Player> getAllPlayerInLeague() throws IOException, InterruptedException {
        List<Player> players = repo.getAllPlayersInLeague();

        List<Player> midfielders = new ArrayList<>();
        List<Player> attackers = new ArrayList<>();
        List<Player> defenders = new ArrayList<>();
        List<Player> goalkeepers = new ArrayList<>();

        for(Player player: players) {
            if(player.getPosition().equalsIgnoreCase("midfielder")){
                midfielders.add(player);
            } else if(player.getPosition().equalsIgnoreCase("attacker")){
                attackers.add(player);
            } else if (player.getPosition().equalsIgnoreCase("defender")){
                defenders.add(player);
            } else if (player.getPosition().equalsIgnoreCase("goalkeeper")){
                goalkeepers.add(player);
            }
//            System.out.println("This player is a midfielder");
        }
//        System.out.println("THis is the list of midfielders " + "\n" + midfielders);
//        System.out.println("THis is the list of players " + "\n" + players);


        return players;
    }

}
