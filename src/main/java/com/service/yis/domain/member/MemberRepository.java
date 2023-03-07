package com.service.yis.domain.member;

import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.Map;

@Repository
public class MemberRepository {
    private static final Map<Long, Member> storeMember = new HashMap<>();
    private static long sequenceMember = 0L;


    public Member save(Member member){
        member.setUserNumber(++sequenceMember);
        storeMember.put(member.getUserNumber(), member);
        return member;
    }





}
