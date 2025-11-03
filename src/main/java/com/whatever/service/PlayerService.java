package com.whatever.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;

import com.whatever.entity.Player;
import com.whatever.repository.PlayerRepository;

@Service
public class PlayerService {

    @Autowired
    private PlayerRepository playerRepository;

    public String save(Player player){
        Player playerExistente = this.playerRepository.findByNome(player.getNome());
        if(playerExistente != null){
            return "Jogador já cadastrado com este nome!";
        }else{
            if(player == null || player.getNome().trim().isEmpty()){
                return "Nome obrigatório para o jogador!";
            }else{
                this.playerRepository.save(player);
                return "Player Salvo com sucesso!";
            }
        }
    }

    public List<Player> findAll(){
        List<Player> lista = this.playerRepository.findAll();
        if(lista.size() <= 0){
            throw new EmptyResultDataAccessException("Nenhum Player Encontrado", lista.size()+1);
        }else{
            return lista;
        }
    }

    public Player findById(Long id){
        int ultimoId = this.playerRepository.findAll().size();
        if(id > ultimoId){
            throw new IllegalArgumentException("Player não encontrado com este ID");
        }else{
            return this.playerRepository.findById(id).get();
        }
    }

    public String update(Player player, Long id){
        Player playerExistente = this.playerRepository.findByNome(player.getNome());
        if(playerExistente == null){
            player.setId(id);
            this.playerRepository.save(player);
            return "Player Atualizado com sucesso!";
        }else{
            return "Já existe um player com este nome!";
        }
    }

    public String delete(Long id){
        Player playerExists = this.findById(id);
        if(playerExists == null){
            return "Nenhum player encontrado com o Id mencionado!";
        }else{
            if(id.equals(null)){
                return "Player sem Id";
            }else{
                this.playerRepository.deleteById(id);
                return "Player deletado com sucesso!";
            }
        }
    }

}
