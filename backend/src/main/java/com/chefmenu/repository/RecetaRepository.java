package com.chefmenu.repository;

import com.chefmenu.model.Receta;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RecetaRepository extends JpaRepository<Receta, Long> {

    List<Receta> findByUsuarioIdAndActivaTrue(Long usuarioId);

    @Query("SELECT COUNT(r) FROM Receta r WHERE r.usuario.id = :usuarioId AND r.activa = true")
    Long countRecetasActivasByUsuarioId(Long usuarioId);

    @Query("SELECT r FROM Receta r WHERE r.usuario.id = :usuarioId AND r.activa = true AND LOWER(r.nombre) LIKE LOWER(CONCAT('%', :busqueda, '%'))")
    List<Receta> buscarRecetas(Long usuarioId, String busqueda);

    List<Receta> findByUsuarioIdAndDificultad(Long usuarioId, String dificultad);
}