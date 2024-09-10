package com.scm.SecurityConfig.request;

import java.util.Set;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
public class SignupRequest {

    @NotBlank(message = "Username is required!!!")
    @Size(min = 3, max = 20, message = "Min 3 characters required!!")
    private String userName;

    @NotBlank(message = "Phone number is required")
    @Pattern(regexp = "^\\d{10}$", message = "Phone number must be a valid 10-digit number")
    private String phoneNumber;

    @NotEmpty(message = "Email is required")
    @Email(message = "Invalid Email address!!")
    @Size(max = 50)
    private String email;

    @Size(min = 8, message = "Password must be at least 8 characters")
    @NotBlank(message = "Password could not be blank!!")
    private String password;

    @NotBlank(message = "About can not be null!!")
    private String about;

    @Setter
    @Getter
    private Set<String> role;

}
