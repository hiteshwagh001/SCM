package com.scm.config;

import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.web.authentication.SavedRequestAwareAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

import com.scm.SecurityConfig.jwt.JwtUtils;
import com.scm.SecurityConfig.services.UserDetailsImpl;
import com.scm.model.AppRole;
import com.scm.model.Providers;
import com.scm.model.Role;
import com.scm.model.User;
import com.scm.repositories.RoleRepo;
import com.scm.services.UserServices;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class OAuth2LoginSuccessHandler extends SavedRequestAwareAuthenticationSuccessHandler {

        private final UserServices userService;
        private final JwtUtils jwtUtils;
        private final RoleRepo roleRepository;

        @Value("${frontend.url}")
        private String frontendUrl;
        private String username;
        private String idAttributeKey;
        private String provider;
        private String profilePic;
        private String email;
        private String providerId;

        @Override
        public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
                        Authentication authentication) throws ServletException, IOException {

                OAuth2AuthenticationToken oAuth2AuthenticationToken = (OAuth2AuthenticationToken) authentication;
                String authorizedClientRegistrationId = oAuth2AuthenticationToken.getAuthorizedClientRegistrationId();
                System.out.println("Id ---------->     " + authorizedClientRegistrationId);

                DefaultOAuth2User principal = (DefaultOAuth2User) authentication.getPrincipal();
                Map<String, Object> attributes = principal.getAttributes();

                // Determine provider (GitHub or Google)
                provider = oAuth2AuthenticationToken.getAuthorizedClientRegistrationId().toUpperCase();
                providerId = attributes.getOrDefault("name", "").toString();

                if ("github".equals(oAuth2AuthenticationToken.getAuthorizedClientRegistrationId())) {
                        username = attributes.getOrDefault("login", "").toString();
                        email = attributes.getOrDefault("login", "") + "@github.com"; // Assigning a dummy email
                        idAttributeKey = "id";
                        profilePic = principal.getAttribute("avatar_url");
                } else if ("google".equals(oAuth2AuthenticationToken.getAuthorizedClientRegistrationId())) {
                        email = attributes.getOrDefault("email", "").toString();
                        username = email.split("@")[0];
                        idAttributeKey = "sub";
                        profilePic = principal.getAttribute("picture");
                }

                System.out.println("OAuth Provider: " + provider + ", Email: " + email);

                // Find or register user
                Optional<User> existingUserOptional = userService.findByEmail(email);
                User user;

                if (existingUserOptional.isPresent()) {
                        user = existingUserOptional.get();
                } else {
                        // Handle new user registration
                        Role role = roleRepository.findByRoleName(AppRole.ROLE_USER)
                                        .orElseThrow(() -> new RuntimeException("Default role not found"));

                        user = new User();
                        user.setUserId(UUID.randomUUID().toString());
                        user.setEmail(email);
                        user.setUserName(username);
                        user.setProvider(Providers.valueOf(provider));
                        user.setProfilePic(profilePic);
                        user.setRole(role);
                        user.setEmailVerified(true);
                        user.setProviderUserId(principal.getName());

                        userService.registerUser(user);
                }

                // Set authentication context
                DefaultOAuth2User oauthUser = new DefaultOAuth2User(
                                List.of(new SimpleGrantedAuthority(user.getRole().getRoleName().name())),
                                attributes,
                                idAttributeKey);

                Authentication securityAuth = new OAuth2AuthenticationToken(
                                oauthUser,
                                List.of(new SimpleGrantedAuthority(user.getRole().getRoleName().name())),
                                oAuth2AuthenticationToken.getAuthorizedClientRegistrationId());

                SecurityContextHolder.getContext().setAuthentication(securityAuth);

                // JWT Token logic
                Set<SimpleGrantedAuthority> authorities = oauthUser.getAuthorities().stream()
                                .map(authority -> new SimpleGrantedAuthority(authority.getAuthority()))
                                .collect(Collectors.toSet());

                UserDetailsImpl userDetails = new UserDetailsImpl(
                                user.getUserId(),
                                user.getUserName(),
                                user.getEmail(),
                                null, // Password not required for OAuth2 authentication
                                authorities);

                String jwtToken = jwtUtils.generateTokenFromUsername(userDetails);

                // Redirect to frontend with JWT token
                String targetUrl = UriComponentsBuilder.fromUriString(frontendUrl + "/oauth2/redirect")
                                .queryParam("token", jwtToken)
                                .build().toUriString();

                System.out.println("Redirect URL: " + targetUrl);
                this.setDefaultTargetUrl(targetUrl);

                super.onAuthenticationSuccess(request, response, authentication);
        }
}