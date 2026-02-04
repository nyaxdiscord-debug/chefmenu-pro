package com.chefmenu.controller;

import com.chefmenu.dto.IngredienteRequest;
import com.chefmenu.dto.IngredienteResponse;
import com.chefmenu.security.CustomUserDetails;
import com.chefmenu.service.IngredienteService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/ingredientes")
@RequiredArgsConstructor
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:3000"})
public class IngredienteController {

    private final IngredienteService ingredienteService;

    @GetMapping
    public ResponseEntity<List<IngredienteResponse>> getAllIngredientes(
            @AuthenticationPrincipal CustomUserDetails userDetails) {
        List<IngredienteResponse> ingredientes = ingredienteService.getAllIngredientes(userDetails.getUserId());
        return ResponseEntity.ok(ingredientes);
    }

    @GetMapping("/stock-bajo")
    public ResponseEntity<List<IngredienteResponse>> getIngredientesConStockBajo(
            @AuthenticationPrincipal CustomUserDetails userDetails) {
        List<IngredienteResponse> ingredientes = ingredienteService.getIngredientesConStockBajo(userDetails.getUserId());
        return ResponseEntity.ok(ingredientes);
    }

    @GetMapping("/{id}")
    public ResponseEntity<IngredienteResponse> getIngredienteById(
            @PathVariable Long id,
            @AuthenticationPrincipal CustomUserDetails userDetails) {
        IngredienteResponse ingrediente = ingredienteService.getIngredienteById(id, userDetails.getUserId());
        return ResponseEntity.ok(ingrediente);
    }

    @PostMapping
    public ResponseEntity<IngredienteResponse> createIngrediente(
            @Valid @RequestBody IngredienteRequest request,
            @AuthenticationPrincipal CustomUserDetails userDetails) {
        IngredienteResponse ingrediente = ingredienteService.createIngrediente(request, userDetails.getUserId());
        return ResponseEntity.ok(ingrediente);
    }

    @PutMapping("/{id}")
    public ResponseEntity<IngredienteResponse> updateIngrediente(
            @PathVariable Long id,
            @Valid @RequestBody IngredienteRequest request,
            @AuthenticationPrincipal CustomUserDetails userDetails) {
        IngredienteResponse ingrediente = ingredienteService.updateIngrediente(id, request, userDetails.getUserId());
        return ResponseEntity.ok(ingrediente);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteIngrediente(
            @PathVariable Long id,
            @AuthenticationPrincipal CustomUserDetails userDetails) {
        ingredienteService.deleteIngrediente(id, userDetails.getUserId());
        return ResponseEntity.noContent().build();
    }
}