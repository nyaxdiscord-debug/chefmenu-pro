package com.chefmenu.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Entity
@Table(name = "ingredientes")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Ingrediente {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nombre;

    @Column(nullable = false, precision = 8, scale = 2)
    private BigDecimal precioUnit;

    @Column(nullable = false)
    private String unidad;

    @Column(precision = 8, scale = 2)
    private BigDecimal stockActual = BigDecimal.ZERO;

    @Column(precision = 8, scale = 2)
    private BigDecimal alertaStock;

    private String proveedor;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "usuario_id", nullable = false)
    private Usuario usuario;
}