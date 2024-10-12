package com.scm.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.scm.helper.AuthenticatedUserService;
import com.scm.model.User;

@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    private AuthenticatedUserService authenticatedUserService;

    @GetMapping("/dashboard")
    public ResponseEntity<?> getDashboard() {
        // Fetch the authenticated user
        User user = authenticatedUserService.getAuthenticatedUser();

        // Implement your logic to return the dashboard information
        Map<String, Object> dashboardData = new HashMap<>();
        dashboardData.put("welcomeMessage", "Welcome, " + user.getUserName());
        dashboardData.put("email", user.getEmail());

        return ResponseEntity.ok(dashboardData);
    }

}
