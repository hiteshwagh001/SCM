package com.scm.dto;

import com.scm.model.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@NoArgsConstructor
@Data
@Builder
@AllArgsConstructor
public class UserDTO {

    private String userId;
    private String username;
    private String email;
    private String phoneNumber;
    private String about;
    private String profilePicture;
    private boolean enabled;
    private boolean emailVerified;
    private boolean phoneVerified;
    private Role role;
    private LocalDateTime createdDate;



}
