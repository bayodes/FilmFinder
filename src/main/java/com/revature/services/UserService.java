package com.revature.services;

import com.revature.models.User;
import com.revature.repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class UserService {

    private UserRepo uRepo;

    @Autowired
    public UserService(UserRepo ur) {
        this.uRepo = ur;
    }

    //Register
    public User registerNewUser(String first, String last, String username, String email, String password) {

        User register = new User(first, last, username, email, password);
        return uRepo.save(register);
    }
}