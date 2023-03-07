package com.service.yis.controller;

import com.service.yis.domain.member.Member;
import com.service.yis.domain.member.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.annotation.PostConstruct;

@Controller
@RequestMapping
@RequiredArgsConstructor  //  확인 해보기
public class MemberController {

    private final MemberRepository memberRepository;

    @GetMapping("/join")
    public String addUserForm(){
        return "/member/join";
    }

    @PostMapping("/join")
    public String addUser(Member member){
        memberRepository.save(member);

        return "basic/items";
    }

    @PostConstruct
    public void init(){
        memberRepository.save(new Member("userA","user","1234"));
        memberRepository.save(new Member("userB","user2","2345"));
        memberRepository.save(new Member("userC","user3","34345"));
        memberRepository.save(new Member("userD","user4","34235"));

    }
}
