package com.service.yis.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/test")
@RequiredArgsConstructor
public class Test {

    @GetMapping("/index")
    public String index(){return "test/index";}

    @GetMapping
    public String testMain(){return "test/main-test";
    }

    @GetMapping("/login-real")
    public String testLogin(){return "test/login";
    }

    @GetMapping("/join")
    public String testJoin(){ return "test/join-test";}

    @GetMapping("/item")
    public String testItem(){return "test/item-test-real";}

    @GetMapping("/mypage")
    public String testMypage(){return "test/mypage-test";}


    @GetMapping("/mypage/chat")
    public String testChat(){return "test/chat-test";}

    @GetMapping("/search")
    public String testSearch(){return "test/BtoB";}

    @GetMapping("/mypage-real")
    public String testMypageReal(){return "test/mypage-test";}

    @GetMapping("/mypage-customer")
    public String testMypageCustomer(){return "test/mypage-customer-test";}

    @GetMapping("/mainpage-test.html")
    public String testMainPage(){return "test/mainpage-test-real";}

    @GetMapping("/item-test-real")
    public String testItemReal(){return "test/item-test-real";}

    @GetMapping("data")
    public String data(){return "test/data";}

}
