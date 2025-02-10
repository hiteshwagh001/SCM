package com.scm.forms;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Setter
public class ContactForm {

    @NotBlank(message = " Please enter name")
    private String name;

    @Email(message = " Email cannot be empty")
    private String email;

    @NotBlank(message = "Phone number is required!!")
    @Pattern(regexp = "^[0-9]{10}$", message = "Invalid phone number")
    private String phone;

    @NotBlank(message = "Address is required")
    private String address;

    @NotBlank(message = "Description is required")
    private String description;


    private String website;
    private String linkedin;
    private String github;
    private String imagePreview;
    private boolean isFavorite;

}
