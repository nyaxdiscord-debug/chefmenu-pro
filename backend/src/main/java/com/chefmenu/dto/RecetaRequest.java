package com.chefmenu.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RecetaRequest {

    @NotBlank(message = "El nombre es requerido")
    @Size(max = 200, message = "El nombre no puede exceder 200 caracteres")
    private String nombre;

    private String fotoUrl;

    @Size(max = 500, message = "La descripción no puede exceder 500 caracteres")
    private String descripcion;

    @NotNull(message = "Las porciones base son requeridas")
    @Positive(message = "Las porciones deben ser mayores a 0")
    private Integer porcionesBase = 4;

    private Integer tiempoPreparacion;

    private String dificultad;

    @NotNull(message = "Los ingredientes son requeridos")
    private List<RecetaIngredienteRequest> ingredientes;

    private List<PasoRecetaRequest> pasos;
}