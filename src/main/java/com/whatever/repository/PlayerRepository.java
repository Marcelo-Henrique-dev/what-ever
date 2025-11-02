package com.whatever.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.whatever.entity.Player;

@Repository
public interface PlayerRepository extends JpaRepository<Player, Long> {

    public Player findByNome(String nome);

    Page<Player> findByNome(String nome, Pageable pageable);

}
