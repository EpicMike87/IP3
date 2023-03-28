package com.IP3G11.Best11.services;

import com.IP3G11.Best11.repositories.FixtureRepository;
import com.IP3G11.Best11.repositories.TeamRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class FixtureServiceImplementation implements FixtureService{

    private final FixtureRepository fixtureRepository;

}
