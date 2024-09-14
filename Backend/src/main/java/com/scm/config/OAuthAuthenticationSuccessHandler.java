package com.scm.config;

import java.io.IOException;
import java.util.*;

import com.scm.SecurityConfig.jwt.JwtUtils;
import com.scm.SecurityConfig.services.UserDetailsImpl;
import com.scm.model.AppRole;
import com.scm.model.Providers;
import com.scm.model.Role;
import com.scm.model.User;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.web.authentication.SavedRequestAwareAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

import com.scm.repositories.RoleRepo;
import com.scm.services.UserServices;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class OAuthAuthenticationSuccessHandler extends SavedRequestAwareAuthenticationSuccessHandler {

    private static final Logger logger = LoggerFactory.getLogger(OAuthAuthenticationSuccessHandler.class);

    @Value("${frontend.url}")
    private String frontendUrl;

    @Autowired
    private RoleRepo roleRepo;

    @Autowired
    private UserServices userServices;

    @Autowired
    private JwtUtils jwtUtils;

    @Autowired
    private PasswordEncoder passwordEncoder;

    private String provider;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
                                        Authentication authentication) throws IOException, ServletException {

        try {
            OAuth2AuthenticationToken oAuth2AuthenticationToken = (OAuth2AuthenticationToken) authentication;
            provider = oAuth2AuthenticationToken.getAuthorizedClientRegistrationId().toUpperCase();

            DefaultOAuth2User oAuthUser = (DefaultOAuth2User) authentication.getPrincipal();

            String email = null;
            String username = null;
            String profilePic = null;

            // Extract necessary attributes based on provider
            switch (provider) {
                case "GOOGLE":
                    email = (String) Optional.ofNullable(oAuthUser.getAttribute("email")).orElseThrow(() -> new RuntimeException("Email not found"));
                    profilePic = oAuthUser.getAttribute("picture").toString();
                    username = email.split("@")[0];
                    break;
                case "GITHUB":
                    email = (String) Optional.ofNullable(oAuthUser.getAttribute("email")).orElse(oAuthUser.getAttribute("login") + "@gmail.com");
                    profilePic = oAuthUser.getAttribute("avatar_url").toString();
                    username = oAuthUser.getAttribute("login").toString();
                    break;
                default:
                    throw new RuntimeException("Unsupported OAuth provider: " + provider);
            }

            // Check if the user already exists
            Optional<User> existingUser = userServices.findByEmail(email);
            User user;

            if (existingUser.isPresent()) {
                // User exists, proceed with login
                user = existingUser.get();
                logger.info("Existing user found: {}", user.getEmail());
            } else {
                // Register new user
                logger.info("New user, registering: {}", email);
                user = registerNewUser(email, username, profilePic, provider, oAuthUser);
            }

            // Generate JWT Token
            String jwtToken = generateJwtToken(user);

            // Redirect to frontend with the token
            String targetUrl = UriComponentsBuilder.fromUriString(frontendUrl + "/oauth2/redirect")
                    .queryParam("token", jwtToken)
                    .build().toUriString();
            this.setDefaultTargetUrl(targetUrl);

            super.onAuthenticationSuccess(request, response, authentication);

        } catch (Exception e) {
            logger.error("OAuth authentication failure: {}", e.getMessage(), e);
            response.sendRedirect(frontendUrl + "/login?error=oauth_failure");
        }
    }

    private User registerNewUser(String email, String username, String profilePic, String provider, DefaultOAuth2User oAuthUser) {
        try {
            Optional<Role> role = roleRepo.findByRoleName(AppRole.ROLE_USER);
            if (role.isEmpty()) {
                throw new RuntimeException("User role not found");
            }

            User newUser = new User();
            newUser.setUserId(UUID.randomUUID().toString());
            newUser.setEmail(email);
            newUser.setUserName(username);
            newUser.setProfilePic(profilePic);
            newUser.setRole(role.get());
            newUser.setEmailVerified(true);
            newUser.setEnabled(true);
            newUser.setProvider(Providers.valueOf(provider));
            newUser.setProviderUserId(oAuthUser.getName());
            newUser.setPassword(passwordEncoder.encode("SCMDEFAULTPASS"));
            newUser.setAbout("Account created by " + provider);

            // Save the new user to the database
            userServices.registerUser(newUser);
            logger.info("User registered successfully: {}", email);
            return newUser;

        } catch (Exception e) {
            logger.error("Error registering new user: {}", e.getMessage(), e);
            throw new RuntimeException("User registration failed");
        }
    }

    private String generateJwtToken(User user) {
        try {
            UserDetailsImpl userDetails = new UserDetailsImpl();
            userDetails.setUsername(user.getUserName());
            userDetails.setAuthorities(List.of(new SimpleGrantedAuthority(user.getRole().getRoleName().name())));

            // Call the `generateTokenFromUsername` from JwtUtils
            return jwtUtils.generateTokenFromUsername(userDetails);

        } catch (Exception e) {
            logger.error("JWT Token generation failed: {}", e.getMessage(), e);
            throw new RuntimeException("JWT Token generation failed");
        }
    }
}
