package com.chefmenu.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PasoRecetaRequest {

    @NotNull(message = "El número de paso es requerido")
    private Integer pasoNumero;

    @NotBlank(message = "La descripción es requerida")
    private String descripcion;
}