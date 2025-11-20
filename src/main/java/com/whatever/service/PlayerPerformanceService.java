package com.whatever.service;

import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.util.StopWatch;

import com.whatever.dto.PlayerResponse;
import com.whatever.mapper.PlayerMapper;
import com.whatever.repository.PlayerRepository;

@Service
@SuppressWarnings("null")
public class PlayerPerformanceService implements IPlayerPerformanceService {

    private final PlayerRepository playerRepository;

    public PlayerPerformanceService(PlayerRepository playerRepository) {
        this.playerRepository = playerRepository;
    }

    @Override
    public Page<PlayerResponse> findAllWithPagination(Pageable pageable) {
        StopWatch stopWatch = new StopWatch();
        stopWatch.start();

        Page<PlayerResponse> players = playerRepository.findAll(pageable)
                .map(PlayerMapper::toResponse);

        stopWatch.stop();
        System.out.println("Tempo gasto com paginação: " + stopWatch.getTotalTimeMillis() + " ms");

        return players;
    }

    @Cacheable(value = "playersWithoutPagination", key = "#pageable.pageNumber + '-' + #pageable.pageSize + '-' + #pageable.sort.toString()")
    @Override
    public Page<PlayerResponse> findAllWithCache(Pageable pageable) {
        StopWatch stopWatch = new StopWatch();
        stopWatch.start();

        Page<PlayerResponse> players = playerRepository.findAll(pageable)
                .map(PlayerMapper::toResponse);

        stopWatch.stop();
        System.out.println("Tempo gasto com cache: " + stopWatch.getTotalTimeMillis() + " ms");

        return players;
    }
}
