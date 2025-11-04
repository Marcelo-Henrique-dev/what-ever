package com.whatever.performance;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StopWatch;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.whatever.entity.Player;
import com.whatever.repository.PlayerRepository;

@EnableCaching
@RestController
@RequestMapping("/what-ever/performance")
public class WhatEverPerformance {
    
    @Autowired
    private PlayerRepository playerRepository;

    @GetMapping("/com-paginacao")
    public ResponseEntity<Page<Player>> listaComPaginacao(Pageable pageable){
        StopWatch stopWatch = new StopWatch();
        stopWatch.start();

        // resolver se o pageable retornar null, fazer tratamento do null
        var players = playerRepository.findAll(pageable);
        stopWatch.stop();
        
        System.out.println("Tempo gasto com paginação: " + stopWatch.getTotalTimeMillis() + " ms");
        return ResponseEntity.ok(players);
    }
    
    @Cacheable(value = "playersWithoutPagination", key = "#pageable.pageNumber + '-' + #pageable.pageSize + '-' + #pageable.sort.toString()")
    @GetMapping("/cache")
    public ResponseEntity<Page<Player>> listaComCache(Pageable pageable){
        StopWatch stopWatch = new StopWatch();
        stopWatch.start();
        
        // resolver se o pageable retornar null, fazer tratamento do null
        var players = playerRepository.findAll(pageable);
        stopWatch.stop();

        System.out.println("Tempo gasto com cache: " + stopWatch.getTotalTimeMillis() + " ms");
        return ResponseEntity.ok(players);
    }
}
