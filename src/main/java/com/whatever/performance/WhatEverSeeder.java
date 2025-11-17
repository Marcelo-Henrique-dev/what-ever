package com.whatever.performance;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.whatever.entity.Player;
import com.whatever.repository.PlayerRepository;

@Component
public class WhatEverSeeder implements CommandLineRunner {

    private final PlayerRepository playerRepository;

    public WhatEverSeeder(PlayerRepository playerRepository) {
        this.playerRepository = playerRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        if (playerRepository.count() > 0) {
            System.out.println("Seed já foi executado anteriormente. Pulando...");
            return;
        }

        List<Player> players = new ArrayList<>();

        System.out.println("Iniciando o gerador de seed");

        Random random = new Random();
        int pontuacaoRandom;
        int partidas;

        
        for (int i = 0; i < 1; i++) {
            pontuacaoRandom = random.nextInt(0, 50);
            partidas = random.nextInt(0, 10);
            Player player = new Player();
            player.setNome("Player " + (i + 1));
            player.setPartidas(partidas);
            player.setPontuacao(pontuacaoRandom);
            players.add(player);
        }

        playerRepository.saveAll(players);
        System.out.println("Finalizando o gerador de seed - " + players.size() + " players criados");
    }


}
