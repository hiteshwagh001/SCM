package com.scm.helper;


import com.scm.model.User;
import com.scm.repositories.UserRepo;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthenticatedUserService {

    private final UserRepo userRepo;

    public AuthenticatedUserService(UserRepo userRepo) {
        this.userRepo = userRepo;
    }

    // Method to get the authenticated user
    public User getAuthenticatedUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null || !authentication.isAuthenticated()) {
            throw new RuntimeException("User is not authenticated");
        }

        // Get the username from the authenticated principal
        String username = authentication.getName();

        // Fetch the user by username
        Optional<User> optionalUser = userRepo.findByUserName(username);

        if (optionalUser.isEmpty()) {
            throw new ResourceNotFoundException("User not found with username: " + username);
        }

        return optionalUser.get();
    }
}