package com.scm.ServicesImpl;


import com.scm.entity.User;
import com.scm.helper.ResourceNotFoundException;
import com.scm.repositories.UserRepo;
import com.scm.services.UserServices;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class UserServiceImpl implements UserServices {

    @Autowired
    private UserRepo userRepo;

    private Logger logger = LoggerFactory.getLogger(this.getClass());

    @Override
    public Optional<User> saveUser(User user) {
        user.setUserId(String.valueOf(UUID.randomUUID())); // Fixed: UUID.randomUUID() instead of UUID
        User save = userRepo.save(user);
        return Optional.of(save);
    }

    @Override
    public Optional<User> getUserById(String id) {
        User user = userRepo.findById(id).orElse(null);
        return Optional.of(user);
    }

    @Override
    public Optional<User> updateUser(User user) {
        try {
            User updatedUser = userRepo.findById(user.getUserId()).orElseThrow(() -> new ResourceNotFoundException("User not found!!!"));
            updatedUser.setEmail(user.getEmail());
            updatedUser.setPassword(user.getPassword());
            updatedUser.setUserName(user.getUserName());
            updatedUser.setAbout(user.getAbout());
            updatedUser.setPhoneNumber(user.getPhoneNumber());
            return Optional.of(userRepo.save(updatedUser));
        } catch (ResourceNotFoundException e) {
            logger.error("Error updating user: {}", e.getMessage());
            return Optional.empty();
        } catch (Exception e) {
            logger.error("Error updating user: {}", e.getMessage());
            return Optional.empty();
        }
    }

    @Override
    public boolean deleteUser(String id) {
        Optional<User> userOptional = userRepo.findById(id);

        if (userOptional.isPresent()) {
            userRepo.deleteById(id);
            return true;
        } else {
            logger.error("User with ID {} not found", id);
            return false;
        }
    }

    @Override
    public boolean isUserExist(String id) {
        Optional<User> userOptional = userRepo.findById(id);
        return userOptional.isPresent() ? true : false;
    }

    @Override
    public boolean isUserExistByEmail(String email) {
        Optional<User> userOptional = userRepo.findUserByEmail(email);
        return userOptional.isPresent() ? true : false;
    }

    @Override
    public Optional<List<User>> getAllUser() {
        Optional<List<User>> users = Optional.of(userRepo.findAll());

        return users.isPresent() ? Optional.of(users.get()) : Optional.empty();
    }
}
