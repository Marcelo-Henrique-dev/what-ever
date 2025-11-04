package com.whatever.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.whatever.entity.Player;
import com.whatever.service.PlayerService;

@RestController
@RequestMapping("/player")
@CrossOrigin("*")
public class PlayerController {

    @Autowired
    private PlayerService playerService;

    @PostMapping("/save")
    public ResponseEntity<String> save(@RequestBody Player player){
        try {
            String retorno = this.playerService.save(player);
            return new ResponseEntity<>(retorno, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/findAll")
    public ResponseEntity<List<Player>> findAll(){
        try{
            List<Player> retorno = this.playerService.findAll();
            return new ResponseEntity<>(retorno, HttpStatus.OK);
        }catch (Exception e){
            throw new EmptyResultDataAccessException(e.getMessage(), 0);
        }
    }

    @GetMapping("/findById/{id}")
    public ResponseEntity<Player> findById(@PathVariable Long id){
        try{
            Player retorno = this.playerService.findById(id);
            return new ResponseEntity<>(retorno, HttpStatus.OK);
        }catch(Exception e){
            throw new IllegalArgumentException(e.getMessage());
        }
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<String> update(@PathVariable Long id, @RequestBody Player player){
        try{
            String retorno = this.playerService.update(player, id);
            return new ResponseEntity<>(retorno, HttpStatus.OK);
        }catch(Exception e){
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id){
        try{
            String retorno = this.playerService.delete(id);
            return new ResponseEntity<>(retorno, HttpStatus.OK);
        }catch(Exception e){
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

}
