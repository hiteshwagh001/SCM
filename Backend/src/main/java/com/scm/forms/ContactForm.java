package com.scm.forms;

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


    private String name;
    private String email;
    private String phone;
    private String address;
    private String description;
    private String website;
    private String linkedin;
    private String github;
    private String imagePreview;
    private boolean isFavorite;
    
}
