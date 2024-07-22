package com.aakash.todoapp.controllers;


import com.aakash.todoapp.models.TodoItem;
import com.aakash.todoapp.services.TodoItemService;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;


@Controller

public class HomeController {


    @Autowired
    private TodoItemService todoItemService;




    @GetMapping("/")
    public ModelAndView index() {


        ModelAndView modelandview = new ModelAndView("index");

        modelandview.addObject("todoItems", todoItemService.getAll());

        return modelandview;

    }


//    public String index()
//    {
//        return "index.html";
//    }



}