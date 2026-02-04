package com.chefmenu.dto;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class IngredienteRequest {

    @NotBlank(message = "El nombre es requerido")
    @Size(max = 100, message = "El nombre no puede exceder 100 caracteres")
    private String nombre;

    @NotNull(message = "El precio es requerido")
    @DecimalMin(value = "0.01", message = "El precio debe ser mayor a 0")
    private BigDecimal precioUnit;

    @NotBlank(message = "La unidad es requerida")
    private String unidad;

    private BigDecimal stockActual = BigDecimal.ZERO;

    private BigDecimal alertaStock;

    @Size(max = 100, message = "El proveedor no puede exceder 100 caracteres")
    private String proveedor;
}