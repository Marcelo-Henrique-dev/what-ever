package com.whatever.service;

import java.util.List;

import com.whatever.dto.PlayerRequest;
import com.whatever.dto.PlayerResponse;
import com.whatever.dto.PlayerUpdateRequest;

public interface IPlayerService {

    PlayerResponse create(PlayerRequest request);

    List<PlayerResponse> findAll();

    PlayerResponse findById(Long id);

    PlayerResponse update(PlayerUpdateRequest updateRequest, Long id);

    void delete(Long id);
}
