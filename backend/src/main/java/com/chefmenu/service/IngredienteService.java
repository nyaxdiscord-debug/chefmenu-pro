package com.chefmenu.service;

import com.chefmenu.dto.IngredienteRequest;
import com.chefmenu.dto.IngredienteResponse;
import com.chefmenu.model.Ingrediente;
import com.chefmenu.model.Usuario;
import com.chefmenu.repository.IngredienteRepository;
import com.chefmenu.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class IngredienteService {

    private final IngredienteRepository ingredienteRepository;
    private final UsuarioRepository usuarioRepository;

    public List<IngredienteResponse> getAllIngredientes(Long usuarioId) {
        List<Ingrediente> ingredientes = ingredienteRepository.findByUsuarioId(usuarioId);
        return ingredientes.stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    public IngredienteResponse getIngredienteById(Long id, Long usuarioId) {
        Ingrediente ingrediente = ingredienteRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Ingrediente no encontrado"));

        if (!ingrediente.getUsuario().getId().equals(usuarioId)) {
            throw new RuntimeException("No tienes permiso para ver este ingrediente");
        }

        return toResponse(ingrediente);
    }

    @Transactional
    public IngredienteResponse createIngrediente(IngredienteRequest request, Long usuarioId) {
        Usuario usuario = usuarioRepository.findById(usuarioId)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        Ingrediente ingrediente = new Ingrediente();
        ingrediente.setNombre(request.getNombre());
        ingrediente.setPrecioUnit(request.getPrecioUnit());
        ingrediente.setUnidad(request.getUnidad());
        ingrediente.setStockActual(request.getStockActual() != null ? request.getStockActual() : java.math.BigDecimal.ZERO);
        ingrediente.setAlertaStock(request.getAlertaStock());
        ingrediente.setProveedor(request.getProveedor());
        ingrediente.setUsuario(usuario);

        ingrediente = ingredienteRepository.save(ingrediente);
        return toResponse(ingrediente);
    }

    @Transactional
    public IngredienteResponse updateIngrediente(Long id, IngredienteRequest request, Long usuarioId) {
        Ingrediente ingrediente = ingredienteRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Ingrediente no encontrado"));

        if (!ingrediente.getUsuario().getId().equals(usuarioId)) {
            throw new RuntimeException("No tienes permiso para modificar este ingrediente");
        }

        ingrediente.setNombre(request.getNombre());
        ingrediente.setPrecioUnit(request.getPrecioUnit());
        ingrediente.setUnidad(request.getUnidad());
        ingrediente.setStockActual(request.getStockActual());
        ingrediente.setAlertaStock(request.getAlertaStock());
        ingrediente.setProveedor(request.getProveedor());

        ingrediente = ingredienteRepository.save(ingrediente);
        return toResponse(ingrediente);
    }

    @Transactional
    public void deleteIngrediente(Long id, Long usuarioId) {
        Ingrediente ingrediente = ingredienteRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Ingrediente no encontrado"));

        if (!ingrediente.getUsuario().getId().equals(usuarioId)) {
            throw new RuntimeException("No tienes permiso para eliminar este ingrediente");
        }

        ingredienteRepository.delete(ingrediente);
    }

    public List<IngredienteResponse> getIngredientesConStockBajo(Long usuarioId) {
        List<Ingrediente> ingredientes = ingredienteRepository.findIngredientesConStockBajo(usuarioId);
        return ingredientes.stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    private IngredienteResponse toResponse(Ingrediente ingrediente) {
        boolean stockBajo = ingrediente.getAlertaStock() != null &&
                ingrediente.getStockActual().compareTo(ingrediente.getAlertaStock()) < 0;

        return new IngredienteResponse(
                ingrediente.getId(),
                ingrediente.getNombre(),
                ingrediente.getPrecioUnit(),
                ingrediente.getUnidad(),
                ingrediente.getStockActual(),
                ingrediente.getAlertaStock(),
                ingrediente.getProveedor(),
                stockBajo
        );
    }
}