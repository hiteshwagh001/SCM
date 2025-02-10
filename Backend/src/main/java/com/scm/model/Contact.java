package com.scm.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Contact {

    @Id
    private String id; // UUID will be assigned manually

    private String name;
    private String email;
    private String phoneNumber;
    private String address;
    private String picture;

    @Column(length = 10000)
    private String description;

    @Column(columnDefinition = "BOOLEAN DEFAULT FALSE")
    private boolean favorite;

    private String websiteLink;
    private String linkedInLink;
    private String githubLink;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false) // Ensures a Contact always has a User
    private User user;

    @OneToMany(mappedBy = "contact", cascade = CascadeType.ALL, fetch = FetchType.EAGER, orphanRemoval = true)
    @Builder.Default
    private List<SocialLink> socialLinks = new ArrayList<>();
}
