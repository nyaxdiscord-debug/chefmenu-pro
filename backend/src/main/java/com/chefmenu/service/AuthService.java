package com.chefmenu.service;

import com.chefmenu.dto.AuthRequest;
import com.chefmenu.dto.AuthResponse;
import com.chefmenu.dto.RegisterRequest;
import com.chefmenu.model.Usuario;
import com.chefmenu.repository.UsuarioRepository;
import com.chefmenu.security.CustomUserDetails;
import com.chefmenu.security.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    private final AuthenticationManager authenticationManager;
    private final CustomUserDetailsService userDetailsService;

    public AuthResponse login(AuthRequest request) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
        );

        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        CustomUserDetails customUserDetails = (CustomUserDetails) userDetails;
        Usuario usuario = customUserDetails.getUsuario();

        String token = jwtUtil.generateToken(usuario.getEmail(), usuario.getId(), usuario.getPlanTipo().name());

        return new AuthResponse(
                token,
                "Bearer",
                usuario.getId(),
                usuario.getEmail(),
                usuario.getNombre(),
                usuario.getPlanTipo().name()
        );
    }

    public AuthResponse register(RegisterRequest request) {
        if (usuarioRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("El email ya está registrado");
        }

        Usuario usuario = new Usuario();
        usuario.setEmail(request.getEmail());
        usuario.setPassword(passwordEncoder.encode(request.getPassword()));
        usuario.setNombre(request.getNombre());
        usuario.setApellido(request.getApellido());
        usuario.setPlanTipo(Usuario.PlanTipo.FREE);

        usuario = usuarioRepository.save(usuario);

        String token = jwtUtil.generateToken(usuario.getEmail(), usuario.getId(), usuario.getPlanTipo().name());

        return new AuthResponse(
                token,
                "Bearer",
                usuario.getId(),
                usuario.getEmail(),
                usuario.getNombre(),
                usuario.getPlanTipo().name()
        );
    }
}