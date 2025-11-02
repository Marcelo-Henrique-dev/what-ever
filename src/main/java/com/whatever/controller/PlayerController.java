package com.whatever.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.whatever.dto.ApiResponse;
import com.whatever.dto.PlayerRequest;
import com.whatever.dto.PlayerResponse;
import com.whatever.dto.PlayerUpdateRequest;
import com.whatever.entity.Player;
import com.whatever.mapper.PlayerMapper;
import com.whatever.service.IPlayerService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/players")
public class PlayerController {

    private final IPlayerService playerService;

    // Constructor Injection (melhor prática)
    public PlayerController(IPlayerService playerService) {
        this.playerService = playerService;
    }

    @PostMapping
    public ResponseEntity<ApiResponse<PlayerResponse>> save(@RequestBody @Valid PlayerRequest playerRequest) {
        Player player = PlayerMapper.toModel(playerRequest);
        Player savedPlayer = playerService.create(player);
        PlayerResponse response = PlayerMapper.toResponse(savedPlayer);

        ApiResponse<PlayerResponse> apiResponse = new ApiResponse<>(
                "Player criado com sucesso!",
                response);

        return ResponseEntity.status(HttpStatus.CREATED).body(apiResponse);
    }

    @GetMapping("/findAll")
    public ResponseEntity<ApiResponse<List<PlayerResponse>>> findAll() {
        List<Player> players = playerService.findAll();
        List<PlayerResponse> response = players.stream()
                .map(PlayerMapper::toResponse)
                .collect(Collectors.toList());

        ApiResponse<List<PlayerResponse>> apiResponse = new ApiResponse<>(
                "Lista de players recuperada com sucesso!",
                response);

        return ResponseEntity.ok(apiResponse);
    }

    @GetMapping("/findById/{id}")
    public ResponseEntity<ApiResponse<PlayerResponse>> findById(@PathVariable Long id) {
        Player player = playerService.findById(id);
        PlayerResponse response = PlayerMapper.toResponse(player);

        ApiResponse<PlayerResponse> apiResponse = new ApiResponse<>(
                "Player encontrado com sucesso!",
                response);

        return ResponseEntity.ok(apiResponse);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<ApiResponse<PlayerResponse>> update(@PathVariable Long id,
            @RequestBody @Valid PlayerUpdateRequest updateRequest) {
        // Usa o Mapper em vez de fazer conversão manual
        Player player = PlayerMapper.toModel(updateRequest);
        Player updatedPlayer = playerService.update(player, id);
        PlayerResponse response = PlayerMapper.toResponse(updatedPlayer);

        ApiResponse<PlayerResponse> apiResponse = new ApiResponse<>(
                "Player atualizado com sucesso!",
                response);

        return ResponseEntity.ok(apiResponse);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable Long id) {
        playerService.delete(id);

        ApiResponse<Void> apiResponse = new ApiResponse<>(
                "Player deletado com sucesso!");

        return ResponseEntity.ok(apiResponse);
    }

}
