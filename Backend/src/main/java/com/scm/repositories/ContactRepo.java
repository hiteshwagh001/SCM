package com.scm.repositories;

import com.scm.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.scm.model.Contact;

import java.util.List;

@Repository
public interface ContactRepo extends JpaRepository<Contact, String> {

    // Method to find contacts by User object
    List<Contact> findByUser(User user);

    // Custom query to find contacts by user ID (in the User entity)
    @Query("SELECT c FROM Contact c WHERE c.user.id = :userId")
    List<Contact> findByUserId(@Param("userId") String userId);

}
