package com.chefmenu.repository;

import com.chefmenu.model.Menu;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface MenuRepository extends JpaRepository<Menu, Long> {

    List<Menu> findByUsuarioId(Long usuarioId);

    Optional<Menu> findByUsuarioIdAndFechaInicioAndFechaFin(Long usuarioId, LocalDate fechaInicio, LocalDate fechaFin);

    List<Menu> findByUsuarioIdAndFechaInicioBetweenOrderByFechaInicioDesc(Long usuarioId, LocalDate inicio, LocalDate fin);
}