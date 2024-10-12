package com.scm.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.scm.model.Contact;

@Service
public interface ContactServices {

    Contact save(Contact contact);

    Contact updateContact(Contact contact);

    List<Contact> getAll();

    Contact getContactById(String id);

    boolean deleteContactById(String id);

    List<Contact> searchContact(String name, String email, String phone);

    Contact getByUserId(String userId);
}
