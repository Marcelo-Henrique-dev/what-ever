package com.whatever.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record PlayerUpdateRequest(
        @NotBlank(message = "Nome é obrigatório") @Size(min = 3, max = 50, message = "Nome deve ter entre 3 e 50 caracteres") String nome,

        @NotNull(message = "Partidas não pode ser nulo") @Min(value = 0, message = "Partidas não pode ser negativo") Integer partidas,

        @NotNull(message = "Pontuação não pode ser nulo") @Min(value = 0, message = "Pontuação não pode ser negativo") Integer pontuacao) {

}
