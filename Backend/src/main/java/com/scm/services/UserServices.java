package com.scm.services;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.scm.forms.LoginForm;
import com.scm.model.User;

@Service
public interface UserServices {

    public Optional<User> saveUser(User user);

    public Optional<User> getUserById(String id);

    public Optional<User> updateUser(User user);

    boolean deleteUser(String id);

    boolean isUserExist(String id);

    boolean isUserExistByEmail(String email);

    Optional<List<User>> getAllUser();

    boolean login(LoginForm loginForm);

    Optional<User> findByEmail(String email);

    public void registerUser(User newUser);


}
