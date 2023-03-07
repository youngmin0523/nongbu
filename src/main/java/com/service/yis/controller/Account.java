package com.service.yis.controller;

import com.service.yis.domain.User.UserEntity;
import com.service.yis.domain.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.logging.SimpleFormatter;

@Controller
@RequestMapping("/account")
public class Account {

    Date date = new Date();
    SimpleDateFormat formatter = new SimpleDateFormat("yyyy.MM.dd");

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @GetMapping("/signup")
    public String singUp(Model model){
        UserEntity user = UserEntity.builder()
                .userName("abc")
                .userPw(passwordEncoder.encode("1234"))
                .userEmail("qwe")
                .mobileNumber("01020")
                .role(1L)
                .createdAt(date)
                .changedAt(date)
                .score(3L)
                .build();

        userRepository.save(user);
        return "redirect:/account/login";


    }

    @GetMapping("/login")
    public String login(){
        return "user/login";
    }

    @GetMapping("/logout")
    public String logout(){
        return "redirect:/account/login";
    }

    @GetMapping("/join")
    public String join(){
        return "user/join";
    }

    @PostMapping("/join")
    public String joinRun(UserEntity userEntity){
        userEntity.setUserPw(passwordEncoder.encode(userEntity.getUserPw()));
        userEntity.setCreatedAt(date);
        userEntity.setChangedAt(date);
        userEntity.setRole(0L);
        userEntity.setScore(0L);
        userRepository.save(userEntity);
        return "redirect:/account/login";
    }


}
