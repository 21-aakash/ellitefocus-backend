package com.aakash.todoapp.services;

import com.aakash.todoapp.models.TodoItem;
import com.aakash.todoapp.repositories.TodoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Optional;
import java.util.Objects;
@Service
public class TodoItemService {

    @Autowired
    private TodoRepository todoRepository;


    public Iterable<TodoItem> getAll() {
        return todoRepository.findAll();
    }

    public Optional<TodoItem> getById(long id) {
        return todoRepository.findById(id);
    }

    public TodoItem save(TodoItem todoItem) {
        if (!Objects.isNull(todoItem.getId())) {


            todoItem.setCreatedAt(Instant.now());

        }

        todoItem.setUpdatedAt(Instant.now());
        return todoRepository.save(todoItem);
    }


public void delete(TodoItem todoItem) {

       todoRepository.delete(todoItem);

}

}
