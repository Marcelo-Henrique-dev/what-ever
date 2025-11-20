package com.whatever.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record PlayerRequest(
        @NotBlank(message = "Nome é obrigatório") @Size(min = 3, max = 50, message = "Nome deve ter entre 3 e 50 caracteres") String nome) {
}
