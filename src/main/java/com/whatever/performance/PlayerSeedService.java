package com.whatever.performance;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

import org.springframework.stereotype.Service;

import com.whatever.entity.Player;
import com.whatever.repository.PlayerRepository;

@SuppressWarnings("null")
@Service
public class PlayerSeedService {

    private final PlayerRepository playerRepository;

    public PlayerSeedService(PlayerRepository playerRepository) {
        this.playerRepository = playerRepository;
    }

    public boolean isSeedAlreadyExecuted() {
        return playerRepository.count() > 0;
    }

    public List<Player> generateAndSavePlayers(int quantity) {
        List<Player> players = generatePlayers(quantity);
        playerRepository.saveAll(players);
        return players;
    }

    private List<Player> generatePlayers(int quantity) {
        List<Player> players = new ArrayList<>();
        Random random = new Random();

        for (int i = 0; i < quantity; i++) {
            int partidas = random.nextInt(0, 50);
            int pontuacaoRandom = random.nextInt(0, 50);

            if (pontuacaoRandom > partidas || partidas == 0) {
                pontuacaoRandom = partidas;
            }

            Player player = new Player();
            player.setNome("Player " + (i + 1));
            player.setPartidas(partidas);
            player.setPontuacao(pontuacaoRandom);
            players.add(player);
        }

        return players;
    }
}
