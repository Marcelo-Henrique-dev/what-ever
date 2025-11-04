package com.whatever.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.whatever.entity.Player;
import com.whatever.repository.PlayerRepository;

@Service
public class PlayerService implements IPlayerService {

    private final PlayerRepository playerRepository;

    // Constructor Injection (melhor prática)
    public PlayerService(PlayerRepository playerRepository) {
        this.playerRepository = playerRepository;
    }

    @Override
    public Player create(Player player) {
        validatePlayerName(player.getNome());

        if (playerRepository.findByNome(player.getNome()) != null) {
            throw new IllegalArgumentException("Jogador já cadastrado com este nome!");
        }

        return playerRepository.save(player);
    }

    @Override
    public List<Player> findAll() {
        return playerRepository.findAll();
    }

    @Override
    public Player findById(Long id) {
        // Fazer tratamento se o id for null
        return playerRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Player não encontrado com o ID: " + id));
    }

    @Override
    public Player update(Player player, Long id) {
        // Verifica se o player existe
        Player existingPlayer = findById(id);

        validatePlayerName(player.getNome());

        // Verifica se já existe outro player com o mesmo nome
        Player playerComMesmoNome = playerRepository.findByNome(player.getNome());
        if (playerComMesmoNome != null && !playerComMesmoNome.getId().equals(id)) {
            throw new IllegalArgumentException("Já existe um player com este nome!");
        }

        // Atualiza os dados
        existingPlayer.setNome(player.getNome());
        existingPlayer.setPartidas(player.getPartidas());
        existingPlayer.setPontuacao(player.getPontuacao());

        return playerRepository.save(existingPlayer);
    }

    @Override
    public void delete(Long id) {
        findById(id); // Valida se existe
        // Fazer tratamento se o id for null
        playerRepository.deleteById(id);
    }

    // Método privado para validação (SRP)
    private void validatePlayerName(String nome) {
        if (nome == null || nome.trim().isEmpty()) {
            throw new IllegalArgumentException("Nome obrigatório para o jogador!");
        }
    }
}
