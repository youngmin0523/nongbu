package com.service.yis.domain.member;

import lombok.Data;

@Data

public class Member {
    private Long userNumber;
    private String userName;
    private String userId;
    private String userPwd;

    public Member(){}

    public Member(String userName, String userId, String userPwd){
        this.userName = userName;
        this.userId = userId;
        this.userPwd = userPwd;
    }
}
