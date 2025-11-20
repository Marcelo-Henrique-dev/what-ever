package com.whatever.performance;

import org.springframework.cache.annotation.EnableCaching;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.whatever.dto.PlayerResponse;
import com.whatever.service.IPlayerPerformanceService;

@EnableCaching
@RestController
@RequestMapping("/performance")
@CrossOrigin("*")
public class WhatEverPerformance {

    private final IPlayerPerformanceService playerPerformanceService;

    public WhatEverPerformance(IPlayerPerformanceService playerPerformanceService) {
        this.playerPerformanceService = playerPerformanceService;
    }

    @GetMapping("/com-paginacao")
    public ResponseEntity<Page<PlayerResponse>> listaComPaginacao(Pageable pageable) {
        Page<PlayerResponse> players = playerPerformanceService.findAllWithPagination(pageable);
        return ResponseEntity.ok(players);
    }

    @GetMapping("/cache")
    public ResponseEntity<Page<PlayerResponse>> listaComCache(Pageable pageable) {
        Page<PlayerResponse> players = playerPerformanceService.findAllWithCache(pageable);
        return ResponseEntity.ok(players);
    }
}