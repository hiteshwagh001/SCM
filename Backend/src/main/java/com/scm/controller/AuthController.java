package com.scm.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.scm.SecurityConfig.jwt.JwtUtils;
import com.scm.SecurityConfig.request.LoginRequest;
import com.scm.SecurityConfig.request.SignupRequest;
import com.scm.SecurityConfig.response.LoginResponse;
import com.scm.SecurityConfig.services.UserDetailsImpl;
import com.scm.dto.UserDTO;
import com.scm.exception.MessageResponse;
import com.scm.helper.AuthenticatedUserService;
import com.scm.model.AppRole;
import com.scm.model.Providers;
import com.scm.model.Role;
import com.scm.model.User;
import com.scm.repositories.RoleRepo;
import com.scm.repositories.UserRepo;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    JwtUtils jwtUtils;

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private RoleRepo roleRepo;

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AuthenticatedUserService authenticatedUserService;

    @GetMapping("/hi")
    public String postMethodName() {
        return "hey";
    }

    @PostMapping("/signup")
    public ResponseEntity<?> createNewUser(@Valid @RequestBody SignupRequest signupRequest) {
        if (userRepo.existsByEmail(signupRequest.getEmail()))
            return ResponseEntity.badRequest().body(new MessageResponse("Error: Email already exists!"));

        if (userRepo.existsByUserName(signupRequest.getUserName()))
            return ResponseEntity.badRequest().body(new MessageResponse("Error: Username already exists!"));

        User user = new User(
                signupRequest.getUserName(),
                signupRequest.getEmail(),
                passwordEncoder.encode(signupRequest.getPassword()));

        Set<String> strRoles = signupRequest.getRole();
        Role role;

        if (strRoles == null || strRoles.isEmpty()) {
            role = roleRepo.findByRoleName(AppRole.ROLE_USER)
                    .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
        } else {
            String roleStr = strRoles.iterator().next();
            if (roleStr.equals("admin")) {
                role = roleRepo.findByRoleName(AppRole.ROLE_ADMIN)
                        .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
            } else {
                role = roleRepo.findByRoleName(AppRole.ROLE_USER)
                        .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
            }
        }
        user.setUserId(UUID.randomUUID().toString());
        user.setAbout(signupRequest.getAbout());
        user.setPhoneNumber(signupRequest.getPhoneNumber());
        user.setRole(role);
        userRepo.save(user);
        user.setProvider(Providers.SELF);
        return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
    }

    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@RequestBody LoginRequest loginRequest) {
        Authentication authentication;
        try {
            authentication = authenticationManager
                    .authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getUsername(),
                            loginRequest.getPassword()));
        } catch (AuthenticationException exception) {
            Map<String, Object> map = new HashMap<>();
            map.put("message", "Bad credentials");
            map.put("status", false);
            return new ResponseEntity<>(map, HttpStatus.UNAUTHORIZED); // Return 401 for bad credentials
        }

        // Set the authentication
        SecurityContextHolder.getContext().setAuthentication(authentication);

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        String jwtToken = jwtUtils.generateTokenFromUsername(userDetails);

        List<String> roles = userDetails.getAuthorities().stream()
                .map(item -> item.getAuthority())
                .collect(Collectors.toList());

        LoginResponse response = new LoginResponse(userDetails.getUsername(),
                roles, jwtToken);

        return ResponseEntity.ok(response);
    }

    @GetMapping("/profile")
    public ResponseEntity<?> getProfile() {
        try {

            User user = authenticatedUserService.getAuthenticatedUser();
            UserDTO userDTO = mapUserToDTO(user);
            return ResponseEntity.ok(userDTO);
        } catch (Exception e) {
            String exceptionType = e.getClass().getSimpleName();
            System.out.println("exception type is ------------> "+exceptionType);
            return new ResponseEntity<>( HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Corrected method to map User entity to UserDTO
    private UserDTO mapUserToDTO(User user) {
        return UserDTO.builder()
                .userId(user.getUserId())
                .username(user.getUserName())
                .email(user.getEmail())
                .phoneNumber(user.getPhoneNumber() + "")
                .about(user.getAbout())
                .profilePicture(user.getProfilePic())
                .enabled(user.isEnabled())
                .emailVerified(user.isEmailVerified())
                .phoneVerified(user.isPhoneVerified())
                .role(user.getRole())
                .createdDate(user.getCreatedDate())
                .build();
    }
}