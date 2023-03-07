package com.service.yis.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/funding")
public class Funding {
    @GetMapping("")
    public String mainPage(){
        return "funding/main-crowdFunding";
    }
}
