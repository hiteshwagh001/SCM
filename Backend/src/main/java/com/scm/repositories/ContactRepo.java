package com.scm.repositories;

import com.scm.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.scm.model.Contact;

import java.util.List;

@Repository
public interface ContactRepo extends JpaRepository<Contact, String> {
    List<Contact> findByUser(User user);

    @Query("Select c from Contact c where c.userId=:userId")
    List<Contact> findByUserId(String userId);

}
