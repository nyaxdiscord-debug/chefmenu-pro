package com.chefmenu.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "historial_stock")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class HistorialStock {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ingrediente_id")
    private Ingrediente ingrediente;

    @Column(precision = 8, scale = 2)
    private BigDecimal cantidadAnterior;

    @Column(precision = 8, scale = 2)
    private BigDecimal cantidadNueva;

    @Column(nullable = false)
    private String tipoCambio;

    @CreationTimestamp
    @Column(nullable = false, updatable = false)
    private LocalDateTime fecha;

    private Long referenciaId;
}