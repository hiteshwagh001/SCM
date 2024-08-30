package com.scm.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class PageController {

    @GetMapping("/hello")
    public String hello() {
        return "Connection successful!";
    }

    @PostMapping("login")
    public ResponseEntity<String >login() {
        // Authentication logic here
        return new ResponseEntity<>("Logged in successfully!", HttpStatus.OK);
    }
}
