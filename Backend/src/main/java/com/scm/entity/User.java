package com.scm.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "users")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class User {

    @Id
    private String userId;
    @Column(name = "user_name", nullable = false)
    private String userName;

    @Column(unique = true, nullable = false)
    private String email;
    private String password;

    @Column(columnDefinition = "TEXT")
    private String about;

    @Column(name = "profile_pic", columnDefinition = "TEXT")
    private String profilePic = "https://example.com/default_profile_pic.jpg";

    @Column(length = 10)
    private long phoneNumber;

    //    other properties
    private boolean enabled = false;
    private boolean emailVerified = false;
    private boolean phoneVerified = false;


    //    provider like self, google, github etc
    @Enumerated(value = EnumType.STRING)
    @Column(name = "provider")
    private Providers provider = Providers.SELF;

    private String providerUserId;

    //    contacts details
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY, orphanRemoval = true)
    private List<Contact> contacts = new ArrayList<>();
}


