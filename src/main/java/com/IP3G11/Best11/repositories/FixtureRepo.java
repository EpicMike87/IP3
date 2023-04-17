package com.IP3G11.Best11.repositories;

import com.IP3G11.Best11.model.Fixture;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface FixtureRepo extends JpaRepository<Fixture, Integer> {

    //Saves/updates fixture in database
    Fixture save(Fixture f);
    //Used to get fixture from db. Only uses home team name and date as combination of these two will be unique to each fixture
    Fixture findByHomeTeamNameAndDateTime(String homeTeamName, Date dateTime);
    //Returns fixture with provided ID
    Fixture findById(int id);
    //Used to check fixture exists in db. Only uses home team name and date as combination of these two will be unique to each fixture
    boolean existsByHomeTeamNameAndDateTime(String homeTeamName, Date dateTime);
    //Used to get a team's future fixtures, checks both date and home and away team names to find matching fixtures
    List<Fixture> findByDateTimeAfterAndHomeTeamNameOrDateTimeAfterAndAwayTeamNameOrderByDateTimeDesc(Date date, String homeName, Date date2, String awayName);
    //Used to get a team's past 5 fixtures, checks both date and home and away team names to find matching fixtures
    List<Fixture> findTop5ByDateTimeBeforeAndHomeTeamNameOrDateTimeBeforeAndAwayTeamNameOrderByDateTimeDesc(Date date, String homeName,Date date2, String awayName);
}
