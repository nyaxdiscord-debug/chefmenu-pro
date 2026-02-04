package com.chefmenu.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PasoRecetaResponse {

    private Long id;
    private Integer pasoNumero;
    private String descripcion;
}