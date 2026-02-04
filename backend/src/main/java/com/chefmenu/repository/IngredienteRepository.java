package com.chefmenu.repository;

import com.chefmenu.model.Ingrediente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;

@Repository
public interface IngredienteRepository extends JpaRepository<Ingrediente, Long> {

    List<Ingrediente> findByUsuarioId(Long usuarioId);

    List<Ingrediente> findByUsuarioIdAndStockActualLessThanAlertaStock(Long usuarioId, BigDecimal alertaStock);

    @Query("SELECT i FROM Ingrediente i WHERE i.usuario.id = :usuarioId AND i.stockActual < i.alertaStock")
    List<Ingrediente> findIngredientesConStockBajo(Long usuarioId);

    @Query("SELECT i FROM Ingrediente i WHERE i.usuario.id = :usuarioId AND (LOWER(i.nombre) LIKE LOWER(CONCAT('%', :busqueda, '%')) OR LOWER(i.proveedor) LIKE LOWER(CONCAT('%', :busqueda, '%')))")
    List<Ingrediente> buscarIngredientes(Long usuarioId, String busqueda);
}