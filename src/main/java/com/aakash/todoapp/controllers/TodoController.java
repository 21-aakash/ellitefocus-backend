package com.aakash.todoapp.controllers;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.aakash.todoapp.dto.TodoItemDTO;
import com.aakash.todoapp.models.TodoItem;
import com.aakash.todoapp.models.User;
import com.aakash.todoapp.services.TodoItemService;
import com.aakash.todoapp.services.UserService;

@RestController
@RequestMapping("/api/todos")
// @CrossOrigin(origins = "http://localhost:5173", allowedHeaders = "*", allowCredentials = "true")
public class TodoController {

    @Autowired
    private TodoItemService todoItemService;

    @Autowired
    private UserService userService; // Injected service
    // // Get all Todo items
    // @GetMapping
    // public List<TodoItemDTO> getAllTodos() {
    //     return todoItemService.getAll().stream()
    //             .map(this::convertToDTO)
    //             .collect(Collectors.toList());
    // }

    // Get all todos of a user
    @GetMapping("/user/{userId}")
    public List<TodoItemDTO> getTodosByUserId(@PathVariable("userId") Long userId) {
        System.out.println("Fetching todos for user ID: " + userId);
        List<TodoItemDTO> todos = todoItemService.getTodosByUserId(userId);
        System.out.println("Todos retrieved: " + todos);
        return todos;
    }

    // Get a specific Todo item by ID
    @GetMapping("/{id}")
    public TodoItemDTO getTodoById(@PathVariable long id) {
        Optional<TodoItem> todoItem = todoItemService.getById(id);
        if (todoItem.isPresent()) {
            return convertToDTO(todoItem.get());
        } else {
            // Handle the case where the todo item is not found
            throw new RuntimeException("Todo item not found with ID: " + id);
        }
    }

    // Create a new Todo item for a specific user
    @PostMapping("/user/{userId}")
    public TodoItemDTO createTodoForUser(@PathVariable Long userId, @RequestBody TodoItem todoItem) {
        TodoItem createdTodo = todoItemService.createTodoForUser(userId, todoItem);
        return convertToDTO(createdTodo);
    }

    @PutMapping("/{id}")
public ResponseEntity<?> updateTodo(@PathVariable long id, @RequestBody TodoItemDTO todoItemDTO) {
    try {
        // Fetch existing TodoItem using Optional
        Optional<TodoItem> optionalTodoItem = todoItemService.getById(id);
        if (!optionalTodoItem.isPresent()) {
            return ResponseEntity.notFound().build();
        }

        TodoItem todoItem = optionalTodoItem.get();
        // Update fields
        todoItem.setDescription(todoItemDTO.getDescription());
        todoItem.setIsComplete(todoItemDTO.getIsComplete());

         // Ensure the user exists
         User user = userService.findById(todoItemDTO.getUserId());
         if (user == null) {
             return ResponseEntity.badRequest().body("User not found");
         }
         todoItem.setUser(user);

        TodoItem updatedTodo = todoItemService.save(todoItem);
        return ResponseEntity.ok(convertToDTO(updatedTodo));
    } catch (Exception e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error updating todo item");
    }
}

    

    // Delete a Todo item
    @DeleteMapping("/{id}")
    public void deleteTodo(@PathVariable long id) {
        Optional<TodoItem> todoItem = todoItemService.getById(id);
        todoItem.ifPresent(todoItemService::delete);
    }

    // Helper method to convert TodoItem to TodoItemDTO
    private TodoItemDTO convertToDTO(TodoItem todoItem) {
        return new TodoItemDTO(
            todoItem.getId(),
            todoItem.getDescription(),
            todoItem.getIsComplete(),
            todoItem.getCreatedAt(),
            todoItem.getUpdatedAt(),
            todoItem.getUser().getId()  // Assumes the TodoItem has a User with an ID
        );
    }
}
