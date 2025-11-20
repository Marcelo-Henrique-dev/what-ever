package com.whatever.mapper;

import com.whatever.dto.PlayerRequest;
import com.whatever.dto.PlayerResponse;
import com.whatever.dto.PlayerUpdateRequest;
import com.whatever.entity.Player;

public class PlayerMapper {

    private PlayerMapper() {

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
        player.setPartidas(0);
        player.setPontuacao(0);

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
