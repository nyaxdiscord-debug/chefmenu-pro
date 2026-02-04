package com.chefmenu.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "suscripciones")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Suscripcion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "usuario_id", nullable = false)
    private Usuario usuario;

    private String stripeCustomerId;

    private String stripeSubscriptionId;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Usuario.PlanTipo planTipo;

    @CreationTimestamp
    @Column(nullable = false, updatable = false)
    private LocalDateTime fechaInicio;

    private LocalDateTime fechaFin;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private EstadoSuscripcion estado = EstadoSuscripcion.ACTIVA;

    public enum EstadoSuscripcion {
        ACTIVA, CANCELADA, EXPIRADA, PENDIENTE
    }
}