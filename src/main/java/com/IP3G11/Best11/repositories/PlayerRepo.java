package com.IP3G11.Best11.repositories;

import com.IP3G11.Best11.model.Player;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PlayerRepo extends JpaRepository<Player, Integer> {

    //Returns list of players with matching last name
    List<Player> findByLastName(String lastName);
    // Used in search feature to return players which have names that contain the first and last names specified
    // Useful as players may often have middle names or more than one last name spread between the two fields
    List<Player> findByFirstNameContainingIgnoreCaseAndLastNameContainingIgnoreCase(String firstName, String lastName);
    //Returns top 5 by rating for each position in descending order
    List<Player> findTop5ByPositionTypeOrderByRatingDesc(String position);
    //Returns players with a matching position type (Attacker, Defender etc)
    List<Player> findByPositionType(String position);
    //Check if player with ID exists in database
    boolean existsById(int id);
    //Return players with matching ID (should only be one in list)
    List<Player> findById(int id);
    //Delete players with matching position type
    void deleteByPositionType(String position);
    List<Player> findAllByFirstNameContainingOrLastNameContaining(String fname, String lname);
}