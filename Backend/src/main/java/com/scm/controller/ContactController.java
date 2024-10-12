package com.scm.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.scm.forms.ContactForm;

@RequestMapping("/api/contact")
@RestController
public class ContactController {

    @PostMapping("/add-contact")
    public ResponseEntity<?> postMethodName(@RequestBody ContactForm form) {

        if (form != null) {
            // Print each field of the ContactForm object
            System.out.println("Name: " + form.getName());
            System.out.println("Email: " + form.getEmail());
            System.out.println("Phone: " + form.getPhone());
            System.out.println("Address: " + form.getAddress());
            System.out.println("Description: " + form.getDescription());
            System.out.println("GitHub: " + form.getGithub());
            System.out.println("Website: " + form.getWebsite());
            System.out.println("LinkedIn: " + form.getLinkedin());
            System.out.println("Is Favorite: " + form.isFavorite()); // Assuming isFavorite is a boolean field
            System.out.println("Image Preview: " + form.getImagePreview()); // If this is a Base64 string or similar
            // Add any other fields you have in the ContactForm class

            return ResponseEntity.ok("Contact form received and printed");
        }

        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

}
