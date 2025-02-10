package com.scm.controller;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.scm.forms.ContactForm;
import com.scm.helper.AuthenticatedUserService;
import com.scm.model.Contact;
import com.scm.model.User;
import com.scm.services.ContactServices;
import com.scm.services.ImageService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/contact")
public class ContactController {

    @Autowired
    private ContactServices contactServices;

    @Autowired
    private AuthenticatedUserService authenticatedUserService;

    @Autowired
    private ImageService imageService;  // ✅ Image Service injected

    @PostMapping("/add-contact")
    public ResponseEntity<?> addContact(
            @Valid @RequestPart("contact") ContactForm form,
            @RequestPart(value = "image", required = false) MultipartFile image,
            BindingResult result,
            Authentication authentication) {

        try {
            // 🛑 Check if user is authenticated
            if (authentication == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User is not authenticated");
            }

            // 🛑 Check for form validation errors
            if (result.hasErrors()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(result.getAllErrors());
            }

            // 🛑 Get authenticated user
            User user = authenticatedUserService.getAuthenticatedUser();
            if (user == null) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("User not found");
            }

            // ✅ Handle Image Upload
            String imageUrl = null;
            if (image != null && !image.isEmpty()) {
                imageUrl = imageService.uploadImage(image);
            }

            // ✅ Create and populate contact
            Contact contact = new Contact();
            contact.setId(UUID.randomUUID().toString());
            contact.setName(form.getName());
            contact.setEmail(form.getEmail());
            contact.setFavorite(form.isFavorite());
            contact.setPhoneNumber(form.getPhone());
            contact.setAddress(form.getAddress());
            contact.setDescription(form.getDescription());
            contact.setWebsiteLink(form.getWebsite());
            contact.setLinkedInLink(form.getLinkedin());
            contact.setGithubLink(form.getGithub());
            contact.setPicture(imageUrl);  // ✅ Store uploaded image URL
            contact.setUser(user);

            // ✅ Save the contact
            Contact savedContact = contactServices.save(contact);

            // ✅ Prepare and return response
            Map<String, String> response = new HashMap<>();
            response.put("message", "Contact saved successfully");
            response.put("contactId", savedContact.getId());

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error occurred while saving contact: " + e.getMessage());
        }
    }
}
