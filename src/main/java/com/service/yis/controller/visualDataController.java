package com.service.yis.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/data")
@RequiredArgsConstructor
public class visualDataController {

    @GetMapping
    public String visualDataMain(){
        return "/visualData/main-data";
    }
}
