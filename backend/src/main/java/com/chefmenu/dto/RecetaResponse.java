package com.chefmenu.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RecetaResponse {

    private Long id;
    private String nombre;
    private String fotoUrl;
    private String descripcion;
    private Integer porcionesBase;
    private Integer tiempoPreparacion;
    private String dificultad;
    private BigDecimal costeTotal;
    private BigDecimal costePorPorcion;
    private List<RecetaIngredienteResponse> ingredientes;
    private List<PasoRecetaResponse> pasos;
    private String fechaCreacion;
}