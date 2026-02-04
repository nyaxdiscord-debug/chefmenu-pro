package com.chefmenu.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RecetaIngredienteResponse {

    private Long id;
    private String nombreIngrediente;
    private BigDecimal cantidad;
    private String unidad;
    private BigDecimal precioUnit;
    private BigDecimal costoTotal;
}