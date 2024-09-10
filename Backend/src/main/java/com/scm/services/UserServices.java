package com.scm.services;

import com.scm.forms.LoginForm;
import com.scm.model.User;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

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


}
