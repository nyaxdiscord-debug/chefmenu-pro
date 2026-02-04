package com.chefmenu.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class IngredienteResponse {

    private Long id;
    private String nombre;
    private BigDecimal precioUnit;
    private String unidad;
    private BigDecimal stockActual;
    private BigDecimal alertaStock;
    private String proveedor;
    private Boolean stockBajo;
}