package com.aakash.todoapp.controllers;

import com.aakash.todoapp.models.TodoItem;
import com.aakash.todoapp.services.TodoItemService;
import jakarta.persistence.Id;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@Controller
public class TodoFormController {


  @Autowired
  private TodoItemService todoItemService;



  @GetMapping("/create-todo")
  public String createForm(TodoItem todoItem) {
    return "newTodo";
  }

@PostMapping("/todo")
public String createTodoItem(@Validated TodoItem todoItem, BindingResult result , Model model)
{

        TodoItem item = new TodoItem();
          item.setDescription(todoItem.getDescription());
          item.setIsComplete(todoItem.getIsComplete());
          todoItemService.save(item);

          return "redirect:/";



}

@GetMapping("/delete/{id}")
public String deleteTodoItem(@PathVariable("id") Long id, Model model) {


  TodoItem todoItem = todoItemService
          .getById(id)
          .orElseThrow(() -> new IllegalArgumentException("Throw item id: " + id + ""));



  todoItemService.delete(todoItem);
    return "redirect:/";
}

  @GetMapping("/edit/{id}")
  public String showUpdateForm(@PathVariable("id") Long id, Model model) {
    TodoItem todoItem = todoItemService
            .getById(id)
            .orElseThrow(() -> new IllegalArgumentException("TodoItem id: " + id + " not found"));

    model.addAttribute("todo", todoItem);
    return "editTodo";
  }

  @PostMapping("/todo/{id}")
  public String updateTodoItem(@PathVariable("id") Long id, @Validated TodoItem todoItem, BindingResult result, Model model) {

    TodoItem item = todoItemService
            .getById(id)
            .orElseThrow(() -> new IllegalArgumentException("TodoItem id: " + id + " not found"));

    item.setIsComplete(todoItem.getIsComplete());
    item.setDescription(todoItem.getDescription());

    todoItemService.save(item);

    return "redirect:/";
  }





}
