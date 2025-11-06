package com.whatever.performance;

import java.util.ArrayList;
import java.util.List;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.whatever.entity.Player;
import com.whatever.repository.PlayerRepository;

@Component
public class WhatEverSeeder implements CommandLineRunner {

    private final PlayerRepository playerRepository;

    // Constructor Injection (melhor prática)
    public WhatEverSeeder(PlayerRepository playerRepository) {
        this.playerRepository = playerRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        // Verifica se já existem players no banco para evitar duplicação
        if (playerRepository.count() > 0) {
            System.out.println("Seed já foi executado anteriormente. Pulando...");
            return;
        }

        List<Player> players = new ArrayList<>();

        System.out.println("Iniciando o gerador de seed");

        for (int i = 0; i < 150; i++) {
            Player player = new Player();
            player.setNome("Player " + (i + 1));
            player.setPartidas(0);
            player.setPontuacao(0);
            players.add(player);
        }

        playerRepository.saveAll(players);
        System.out.println("Finalizando o gerador de seed - " + players.size() + " players criados");
    }


}
