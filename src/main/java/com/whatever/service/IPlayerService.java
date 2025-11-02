package com.whatever.service;

import java.util.List;

import com.whatever.entity.Player;

public interface IPlayerService {

    Player create(Player player);

    List<Player> findAll();

    Player findById(Long id);

    Player update(Player player, Long id);

    void delete(Long id);
}
