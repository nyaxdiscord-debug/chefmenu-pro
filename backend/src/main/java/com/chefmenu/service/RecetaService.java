package com.chefmenu.service;

import com.chefmenu.dto.*;
import com.chefmenu.model.*;
import com.chefmenu.repository.RecetaRepository;
import com.chefmenu.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RecetaService {

    private final RecetaRepository recetaRepository;
    private final UsuarioRepository usuarioRepository;
    private final IngredienteService ingredienteService;

    public List<RecetaResponse> getAllRecetas(Long usuarioId) {
        List<Receta> recetas = recetaRepository.findByUsuarioIdAndActivaTrue(usuarioId);
        return recetas.stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    public RecetaResponse getRecetaById(Long id, Long usuarioId) {
        Receta receta = recetaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Receta no encontrada"));

        if (!receta.getUsuario().getId().equals(usuarioId)) {
            throw new RuntimeException("No tienes permiso para ver esta receta");
        }

        return toResponse(receta);
    }

    @Transactional
    public RecetaResponse createReceta(RecetaRequest request, Long usuarioId) {
        Usuario usuario = usuarioRepository.findById(usuarioId)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        Long recetasActivas = recetaRepository.countRecetasActivasByUsuarioId(usuarioId);
        if (recetasActivas >= 50 && usuario.getPlanTipo() == Usuario.PlanTipo.FREE) {
            throw new RuntimeException("Has alcanzado el límite de 50 recetas en el plan gratuito. Actualiza a PRO para crear más.");
        }

        Receta receta = new Receta();
        receta.setNombre(request.getNombre());
        receta.setFotoUrl(request.getFotoUrl());
        receta.setDescripcion(request.getDescripcion());
        receta.setPorcionesBase(request.getPorcionesBase());
        receta.setTiempoPreparacion(request.getTiempoPreparacion());
        receta.setDificultad(request.getDificultad());
        receta.setUsuario(usuario);

        for (RecetaIngredienteRequest ri : request.getIngredientes()) {
            RecetaIngrediente recetaIngrediente = new RecetaIngrediente();
            recetaIngrediente.setIngredienteId(ri.getIngredienteId());
            recetaIngrediente.setCantidad(ri.getCantidad());
            recetaIngrediente.setUnidad(ri.getUnidad());
            receta.addIngredientes(recetaIngrediente);
        }

        if (request.getPasos() != null) {
            for (PasoRecetaRequest pr : request.getPasos()) {
                PasoReceta pasoReceta = new PasoReceta();
                pasoReceta.setPasoNumero(pr.getPasoNumero());
                pasoReceta.setDescripcion(pr.getDescripcion());
                receta.addPasos(pasoReceta);
            }
        }

        receta = recetaRepository.save(receta);
        return toResponse(receta);
    }

    @Transactional
    public RecetaResponse updateReceta(Long id, RecetaRequest request, Long usuarioId) {
        Receta receta = recetaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Receta no encontrada"));

        if (!receta.getUsuario().getId().equals(usuarioId)) {
            throw new RuntimeException("No tienes permiso para modificar esta receta");
        }

        receta.setNombre(request.getNombre());
        receta.setFotoUrl(request.getFotoUrl());
        receta.setDescripcion(request.getDescripcion());
        receta.setPorcionesBase(request.getPorcionesBase());
        receta.setTiempoPreparacion(request.getTiempoPreparacion());
        receta.setDificultad(request.getDificultad());
        receta.setVersion(receta.getVersion() + 1);

        receta.getIngredientes().clear();
        for (RecetaIngredienteRequest ri : request.getIngredientes()) {
            RecetaIngrediente recetaIngrediente = new RecetaIngrediente();
            recetaIngrediente.setIngredienteId(ri.getIngredienteId());
            recetaIngrediente.setCantidad(ri.getCantidad());
            recetaIngrediente.setUnidad(ri.getUnidad());
            receta.addIngredientes(recetaIngrediente);
        }

        receta.getPasos().clear();
        if (request.getPasos() != null) {
            for (PasoRecetaRequest pr : request.getPasos()) {
                PasoReceta pasoReceta = new PasoReceta();
                pasoReceta.setPasoNumero(pr.getPasoNumero());
                pasoReceta.setDescripcion(pr.getDescripcion());
                receta.addPasos(pasoReceta);
            }
        }

        receta = recetaRepository.save(receta);
        return toResponse(receta);
    }

    @Transactional
    public void deleteReceta(Long id, Long usuarioId) {
        Receta receta = recetaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Receta no encontrada"));

        if (!receta.getUsuario().getId().equals(usuarioId)) {
            throw new RuntimeException("No tienes permiso para eliminar esta receta");
        }

        receta.setActiva(false);
        recetaRepository.save(receta);
    }

    public RecetaResponse escalarReceta(Long id, Integer porcionesNuevas, Long usuarioId) {
        Receta receta = recetaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Receta no encontrada"));

        if (!receta.getUsuario().getId().equals(usuarioId)) {
            throw new RuntimeException("No tienes permiso para ver esta receta");
        }

        if (porcionesNuevas == null || porcionesNuevas <= 0) {
            throw new RuntimeException("Las porciones deben ser mayores a 0");
        }

        double factor = (double) porcionesNuevas / receta.getPorcionesBase();
        RecetaResponse response = toResponse(receta);

        for (RecetaIngredienteResponse ri : response.getIngredientes()) {
            BigDecimal cantidadEscalada = ri.getCantidad()
                    .multiply(BigDecimal.valueOf(factor))
                    .setScale(2, java.math.RoundingMode.HALF_UP);
            ri.setCantidad(cantidadEscalada);
        }

        response.setPorcionesBase(porcionesNuevas);
        return response;
    }

    private RecetaResponse toResponse(Receta receta) {
        BigDecimal costeTotal = BigDecimal.ZERO;

        List<RecetaIngredienteResponse> ingredientesResponse = receta.getIngredientes().stream()
                .map(ri -> {
                    if (ri.getIngrediente() == null) {
                        throw new RuntimeException("El ingrediente con ID " + ri.getIngredienteId() + " no existe");
                    }
                    BigDecimal costo = ri.getCantidad().multiply(ri.getIngrediente().getPrecioUnit());
                    costeTotal = costeTotal.add(costo);
                    return new RecetaIngredienteResponse(
                            ri.getId(),
                            ri.getIngrediente().getNombre(),
                            ri.getCantidad(),
                            ri.getUnidad(),
                            ri.getIngrediente().getPrecioUnit(),
                            costo
                    );
                })
                .collect(Collectors.toList());

        BigDecimal costePorPorcion = costeTotal.divide(
                BigDecimal.valueOf(receta.getPorcionesBase()),
                2,
                java.math.RoundingMode.HALF_UP
        );

        List<PasoRecetaResponse> pasosResponse = receta.getPasos().stream()
                .map(pr -> new PasoRecetaResponse(pr.getId(), pr.getPasoNumero(), pr.getDescripcion()))
                .collect(Collectors.toList());

        return new RecetaResponse(
                receta.getId(),
                receta.getNombre(),
                receta.getFotoUrl(),
                receta.getDescripcion(),
                receta.getPorcionesBase(),
                receta.getTiempoPreparacion(),
                receta.getDificultad(),
                costeTotal,
                costePorPorcion,
                ingredientesResponse,
                pasosResponse,
                receta.getFechaCreacion().toString()
        );
    }
}