package com.aakash.todoapp.controllers;

import com.aakash.todoapp.models.User;
import com.aakash.todoapp.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public User registerUser(@RequestBody UserRegistrationRequest request) {
        return userService.registerUser(request.getName(), request.getEmail(), request.getPassword());
    }

    @PostMapping("/login")
    public User loginUser(@RequestBody UserLoginRequest request) {
        return userService.authenticateUser(request.getEmail(), request.getPassword());
    }
}
