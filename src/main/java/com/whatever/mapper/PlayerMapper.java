package com.whatever.mapper;

import com.whatever.dto.PlayerRequest;
import com.whatever.dto.PlayerResponse;
import com.whatever.dto.PlayerUpdateRequest;
import com.whatever.entity.Player;

public class PlayerMapper {

    private PlayerMapper() {
        // Construtor privado para classe utilitária
    }

    public static PlayerResponse toResponse(Player player) {
        if (player == null)
            return null;

        return new PlayerResponse(player.getId(), player.getNome(), player.getPartidas(), player.getPontuacao());
    }

    public static Player toModel(PlayerRequest request) {
        if (request == null)
            return null;

        Player player = new Player();
        player.setNome(request.nome());
        player.setPartidas(0); // Inicia com 0 partidas
        player.setPontuacao(0); // Inicia com 0 pontos

        return player;
    }

    public static Player toModel(PlayerUpdateRequest request) {
        if (request == null)
            return null;

        Player player = new Player();
        player.setNome(request.nome());
        player.setPartidas(request.partidas());
        player.setPontuacao(request.pontuacao());

        return player;
    }
}
