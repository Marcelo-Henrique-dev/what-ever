package com.whatever.performance;

import java.util.List;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.whatever.entity.Player;

@Component
public class WhatEverSeeder implements CommandLineRunner {

    private final PlayerSeedService playerSeedService;

    public WhatEverSeeder(PlayerSeedService playerSeedService) {
        this.playerSeedService = playerSeedService;
    }

    @Override
    public void run(String... args) throws Exception {
        if (playerSeedService.isSeedAlreadyExecuted()) {
            System.out.println("Seed já foi executado anteriormente. Pulando...");
            return;
        }

        System.out.println("Iniciando o gerador de seed");

        List<Player> players = playerSeedService.generateAndSavePlayers(15);

        System.out.println("Finalizando o gerador de seed - " + players.size() + " players criados");
    }
}
