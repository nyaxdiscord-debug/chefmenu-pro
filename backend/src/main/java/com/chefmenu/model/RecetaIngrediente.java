package com.chefmenu.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Entity
@Table(name = "receta_ingredientes")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class RecetaIngrediente {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "receta_id", nullable = false)
    private Receta receta;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ingrediente_id")
    private Ingrediente ingrediente;

    @Column(name = "ingrediente_id", insertable = false, updatable = false)
    private Long ingredienteId;

    @Column(nullable = false, precision = 8, scale = 2)
    private BigDecimal cantidad;

    @Column(nullable = false)
    private String unidad;
}