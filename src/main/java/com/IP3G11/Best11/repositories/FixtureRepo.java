package com.IP3G11.Best11.repositories;

import com.IP3G11.Best11.model.Fixture;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

@Repository
public interface FixtureRepo extends JpaRepository<Fixture, Integer> {

    Fixture save(Fixture f);
    Fixture findByHomeTeamNameAndDateTime(String homeTeamName, Date dateTime);
    Fixture findById(int id);
    boolean existsByHomeTeamNameAndDateTime(String homeTeamName, Date dateTime);
    List<Fixture> findTop3ByHomeTeamNameOrAwayTeamNameOrderByDateTimeDesc(String homeName, String awayName);
    List<Fixture> findTop5ByHomeTeamNameOrAwayTeamNameAndDateTimeBeforeOrderByDateTimeDesc(String homeName, String awayName, Date date);
}
