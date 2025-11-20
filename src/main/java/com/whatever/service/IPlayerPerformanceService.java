package com.whatever.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.whatever.dto.PlayerResponse;

public interface IPlayerPerformanceService {

    Page<PlayerResponse> findAllWithPagination(Pageable pageable);

    Page<PlayerResponse> findAllWithCache(Pageable pageable);
}
