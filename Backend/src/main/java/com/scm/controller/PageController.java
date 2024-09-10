package com.scm.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.scm.forms.LoginForm;
import com.scm.forms.UserForm;
import com.scm.model.AppRole;
import com.scm.model.Role;
import com.scm.model.User;
import com.scm.repositories.RoleRepo;
import com.scm.services.UserServices;

import jakarta.validation.Valid;

@RestController
// @CrossOrigin(origins = "http://localhost:5173") // Your frontend URL
@RequestMapping("/api")
public class PageController {

    @Autowired
    private UserServices userServices;

    @Autowired
    private RoleRepo roleRepo;

    @GetMapping("/hello")
    public String hello() {
        return "Connection successful!";
    }

    // @PostMapping("/signup")
    // public String signup() {
    // return "Signup page";
    // }

    @PostMapping("/signup")
    public ResponseEntity<Map<String, String>> signUp(@Valid @RequestBody UserForm userForm,
            BindingResult bindingResult) {
        Map<String, String> response = new HashMap<>();
        try {
            if (bindingResult.hasErrors()) {
                // Collect all field-specific errors
                bindingResult.getFieldErrors().forEach(error -> {
                    response.put(error.getField(), error.getDefaultMessage());
                });
                // Return the field-specific errors
                return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
            }

            User user = new User();
            user.setUserName(userForm.getUserName());
            user.setPhoneNumber(Long.parseLong(userForm.getPhoneNumber())); // Assuming phoneNumber is a Long
            user.setEmail(userForm.getEmail());
            user.setPassword(userForm.getPassword());
            user.setAbout(userForm.getAbout());

            userServices.saveUser(user);

            response.put("message", userForm.getUserName() + " registered successfully!");
            return ResponseEntity.ok(response);

        } catch (DataIntegrityViolationException e) {
            // Handle database constraint violations such as duplicate entries
            if (e.getCause() != null && e.getCause().getCause() != null &&
                    e.getCause().getCause().getMessage().contains("Duplicate entry")) {
                response.put("email", "An account with this email already exists.");
            } else {
                response.put("message", "An error occurred while processing your request.");
            }
            return ResponseEntity.status(HttpStatus.CONFLICT).body(response);
        } catch (Exception e) {
            response.put("message", "Error registering user: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<Boolean> login(@RequestBody LoginForm loginForm) {
        boolean response = userServices.login(loginForm);
        ResponseEntity<Boolean> booleanResponseEntity = new ResponseEntity<>(response, HttpStatus.OK);
        return booleanResponseEntity;
    }

    @GetMapping("/addrole")
    public String getMethodName() {
        try {
            Role role1 = new Role(AppRole.ROLE_USER);
            Role role2 = new Role(AppRole.ROLE_ADMIN);
            roleRepo.save(role1);
            roleRepo.save(role2);
            return "roles added";
        } catch (Exception e) {
            System.out.println("Errror :::::::::::  " + e);
        }
        return "roles are not added";

    }

}
