package com.service.yis.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/search")

public class Main {

    @RequestMapping("")
    public String search(){
        return "search/search";
    }
}
