package com.scm.controller;

import com.scm.entity.User;
import com.scm.forms.UserForm;
import com.scm.services.UserServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api")
public class PageController {

    @Autowired
    private UserServices userServices;



//    public PageController(UserServices userServices) {
//        this.userServices = userServices;
//    }

    @GetMapping("/hello")
    public String hello() {
        return "Connection successful!";
    }

    @PostMapping("/login")
    public ResponseEntity<String> login() {
        // Authentication logic here
        return new ResponseEntity<>("Logged in successfully!", HttpStatus.OK);
    }

    @PostMapping("/signup")
    public ResponseEntity<String> signUp(@RequestBody UserForm userForm) {
        try {
//            User user = User.builder()
//                    .userName(userForm.getUserName())
//                    .phoneNumber(userForm.getPhoneNumber())
//                    .email(userForm.getEmail())
//                    .password(userForm.getPassword())
//                    .about(userForm.getAbout())
//                    .build();

            User user=new User();
            user.setUserName(userForm.getUserName());
            user.setPhoneNumber(userForm.getPhoneNumber());
            user.setEmail(userForm.getEmail());
            user.setPassword(userForm.getPassword());
            user.setAbout(userForm.getAbout());

            userServices.saveUser(user);
            return ResponseEntity.ok("User registered successfully!");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error registering user: " + e.getMessage());
        }
    }

}
