

package com.aakash.todoapp.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.aakash.todoapp.models.User;
import com.aakash.todoapp.repositories.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    public UserService(PasswordEncoder passwordEncoder) {
        this.passwordEncoder = passwordEncoder;
    }

    public User registerUser(String name, String email, String password) {
        if (userRepository.findByEmail(email).isPresent()) {
            throw new RuntimeException("User already exists with this email");
        }
        User user = new User();
        user.setName(name); // Set name
        user.setEmail(email); // Set email
        user.setPassword(passwordEncoder.encode(password)); // Hash password
        return userRepository.save(user);
    }

    public User authenticateUser(String email, String password) {
        User user = userRepository.findByEmail(email)
                                  .orElseThrow(() -> new RuntimeException("User not found"));
        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new RuntimeException("Invalid credentials");
        }
        return user;
    }

     // Method to find a user by ID
    public User findById(Long id) {
        return userRepository.findById(id).orElse(null); // Return null if not found
    }
   
}












// package com.aakash.todoapp.services;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
// import org.springframework.security.crypto.password.PasswordEncoder;
// import org.springframework.stereotype.Service;

// import com.aakash.todoapp.models.User;
// import com.aakash.todoapp.repositories.UserRepository;

// @Service
// public class UserService {

//     @Autowired
//     private UserRepository userRepository;
//  private final PasswordEncoder passwordEncoder;

   
//     public UserService(PasswordEncoder passwordEncoder) {
//         this.passwordEncoder = passwordEncoder;
//     }

//     public User registerUser(String username, String password) {
//         if (userRepository.findByUsername(username).isPresent()) {
//             throw new RuntimeException("User already exists");
//         }
//         User user = new User();
//         user.setUsername(username);
//         user.setPassword(passwordEncoder.encode(password)); // Hashing password
//         return userRepository.save(user);
//     }

//     public User authenticateUser(String username, String password) {
//         User user = userRepository.findByUsername(username)
//                                   .orElseThrow(() -> new RuntimeException("User not found"));
//         if (!passwordEncoder.matches(password, user.getPassword())) {
//             throw new RuntimeException("Invalid credentials");
//         }
//         return user;
//     }
// }
