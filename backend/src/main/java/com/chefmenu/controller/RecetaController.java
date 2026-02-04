package com.chefmenu.controller;

import com.chefmenu.dto.RecetaRequest;
import com.chefmenu.dto.RecetaResponse;
import com.chefmenu.security.CustomUserDetails;
import com.chefmenu.service.RecetaService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/recetas")
@RequiredArgsConstructor
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:3000", "https://*.vercel.app", "https://*.onrender.com"})
public class RecetaController {

    private final RecetaService recetaService;

    @GetMapping
    public ResponseEntity<List<RecetaResponse>> getAllRecetas(
            @AuthenticationPrincipal CustomUserDetails userDetails) {
        List<RecetaResponse> recetas = recetaService.getAllRecetas(userDetails.getUserId());
        return ResponseEntity.ok(recetas);
    }

    @GetMapping("/{id}")
    public ResponseEntity<RecetaResponse> getRecetaById(
            @PathVariable Long id,
            @AuthenticationPrincipal CustomUserDetails userDetails) {
        RecetaResponse receta = recetaService.getRecetaById(id, userDetails.getUserId());
        return ResponseEntity.ok(receta);
    }

    @GetMapping("/{id}/escalar")
    public ResponseEntity<RecetaResponse> escalarReceta(
            @PathVariable Long id,
            @RequestParam(required = false) Integer porciones,
            @AuthenticationPrincipal CustomUserDetails userDetails) {
        if (porciones == null || porciones <= 0) {
            throw new IllegalArgumentException("Las porciones deben ser mayores a 0");
        }
        RecetaResponse receta = recetaService.escalarReceta(id, porciones, userDetails.getUserId());
        return ResponseEntity.ok(receta);
    }

    @PostMapping
    public ResponseEntity<RecetaResponse> createReceta(
            @Valid @RequestBody RecetaRequest request,
            @AuthenticationPrincipal CustomUserDetails userDetails) {
        RecetaResponse receta = recetaService.createReceta(request, userDetails.getUserId());
        return ResponseEntity.ok(receta);
    }

    @PutMapping("/{id}")
    public ResponseEntity<RecetaResponse> updateReceta(
            @PathVariable Long id,
            @Valid @RequestBody RecetaRequest request,
            @AuthenticationPrincipal CustomUserDetails userDetails) {
        RecetaResponse receta = recetaService.updateReceta(id, request, userDetails.getUserId());
        return ResponseEntity.ok(receta);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteReceta(
            @PathVariable Long id,
            @AuthenticationPrincipal CustomUserDetails userDetails) {
        recetaService.deleteReceta(id, userDetails.getUserId());
        return ResponseEntity.noContent().build();
    }
}