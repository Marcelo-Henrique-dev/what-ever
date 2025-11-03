package com.whatever.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.whatever.entity.Player;

public interface PlayerRepository extends JpaRepository<Player, Long> {

    public Player findByNome(String nome);

}
