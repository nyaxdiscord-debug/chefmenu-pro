package com.chefmenu.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "pasos_receta")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PasoReceta {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "receta_id", nullable = false)
    private Receta receta;

    @Column(nullable = false)
    private Integer pasoNumero;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String descripcion;
}