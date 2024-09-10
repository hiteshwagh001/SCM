package com.scm.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.scm.model.User;

import java.util.Optional;

@Repository
public interface UserRepo extends JpaRepository<User,String> {
    Optional<User> findUserByEmail(String email);

    Optional<User> findByUserName(String username);

    Boolean existsByUserName(String username);
    Boolean existsByEmail(String email);

    Optional<User> findByEmail(String email);
}
