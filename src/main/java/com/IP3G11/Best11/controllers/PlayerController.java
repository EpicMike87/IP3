package com.IP3G11.Best11.controllers;

import com.IP3G11.Best11.model.Player;
import com.IP3G11.Best11.services.PlayerService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.util.List;

@RestController
public class PlayerController {

    private final PlayerService service = new PlayerService();

    @GetMapping("/search-player/{name}")
    public List<Player> searchPlayerByName(@PathVariable String name) throws IOException, InterruptedException {
        return service.getPlayerByName(name);

    }
}
