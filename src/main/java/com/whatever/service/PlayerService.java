package com.whatever.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.whatever.dto.PlayerRequest;
import com.whatever.dto.PlayerResponse;
import com.whatever.dto.PlayerUpdateRequest;
import com.whatever.entity.Player;
import com.whatever.mapper.PlayerMapper;
import com.whatever.repository.PlayerRepository;

@Service
@SuppressWarnings("null")
public class PlayerService implements IPlayerService {

    private final PlayerRepository playerRepository;

    public PlayerService(PlayerRepository playerRepository) {
        this.playerRepository = playerRepository;
    }

    @Override
    public PlayerResponse create(PlayerRequest request) {
        validatePlayerName(request.nome());

        if (playerRepository.findByNome(request.nome()) != null) {
            throw new IllegalArgumentException("Jogador já cadastrado com este nome!");
        }

        Player player = PlayerMapper.toModel(request);
        Player savedPlayer = playerRepository.save(player);

        return PlayerMapper.toResponse(savedPlayer);
    }

    @Override
    public List<PlayerResponse> findAll() {
        return playerRepository.findAll().stream()
                .map(PlayerMapper::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    public PlayerResponse findById(Long id) {
        Player player = playerRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Player não encontrado com o ID: " + id));

        return PlayerMapper.toResponse(player);
    }

    @Override
    public PlayerResponse update(PlayerUpdateRequest updateRequest, Long id) {
        Player existingPlayer = playerRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Player não encontrado com o ID: " + id));

        validatePlayerName(updateRequest.nome());

        Player playerComMesmoNome = playerRepository.findByNome(updateRequest.nome());
        if (playerComMesmoNome != null && !playerComMesmoNome.getId().equals(id)) {
            throw new IllegalArgumentException("Já existe um player com este nome!");
        }

        existingPlayer.setNome(updateRequest.nome());
        existingPlayer.setPartidas(updateRequest.partidas());
        existingPlayer.setPontuacao(updateRequest.pontuacao());

        Player updatedPlayer = playerRepository.save(existingPlayer);

        return PlayerMapper.toResponse(updatedPlayer);
    }

    @Override
    public void delete(Long id) {
        playerRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Player não encontrado com o ID: " + id));

        playerRepository.deleteById(id);
    }

    private void validatePlayerName(String nome) {
        if (nome == null || nome.trim().isEmpty()) {
            throw new IllegalArgumentException("Nome obrigatório para o jogador!");
        }
    }
}
