package com.IP3G11.Best11.repositories;

import com.IP3G11.Best11.model.Player;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PlayerRepo extends JpaRepository<Player, Integer> {
    List<Player> findByLastName(String lastName);
    List<Player> findByFirstNameContainingIgnoreCaseAndLastNameContainingIgnoreCase(String firstName, String lastName);
    List<Player> findTop5ByPositionTypeOrderByRatingDesc(String position);
    List<Player> findByPositionType(String position);
    boolean existsById(int id);
    List<Player> findById(int id);
    void deleteByPositionType(String position);
    List<Player> findAllByFirstNameContainingOrLastNameContaining(String fname, String lname);
}