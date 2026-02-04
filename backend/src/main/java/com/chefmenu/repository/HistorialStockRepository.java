package com.chefmenu.repository;

import com.chefmenu.model.HistorialStock;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface HistorialStockRepository extends JpaRepository<HistorialStock, Long> {

    List<HistorialStock> findByIngredienteIdOrderByFechaDesc(Long ingredienteId);

    List<HistorialStock> findByFechaBetweenAndIngredienteUsuarioId(LocalDateTime inicio, LocalDateTime fin, Long usuarioId);

    @Query("SELECT h FROM HistorialStock h WHERE h.fecha >= :inicio AND h.fecha <= :fin AND h.ingrediente.usuario.id = :usuarioId ORDER BY h.fecha DESC")
    List<HistorialStock> findHistorialSemanal(Long usuarioId, LocalDateTime inicio, LocalDateTime fin);
}