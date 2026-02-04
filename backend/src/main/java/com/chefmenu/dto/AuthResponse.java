package com.chefmenu.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AuthResponse {

    private String token;
    private String tipo = "Bearer";
    private Long usuarioId;
    private String email;
    private String nombre;
    private String planTipo;
}