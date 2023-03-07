package com.service.yis.domain.User;


import lombok.*;
import org.springframework.lang.Nullable;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name="user")
@Getter @Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class UserEntity {
    @Id
    @Column(name="user_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;

    @Column(name="user_name")
    private String userName;

    @Column(name="user_email")
    private String userEmail;

    @Column(name="user_password")
    private String userPw;

    @Column(name="mobile_number")
    private String mobileNumber;

    @Column(name="role")
    private Long role;

    @Column(name="created_at")
    private Date createdAt;

    @Column(name="changed_at")
    private Date changedAt;

    @Column(name="score")
    private Long score;

/*
    @Builder
    public UserEntity(String user_name, String user_pw) {
        this.userName = user_name;
        this.user_pw = user_pw;
    }*/

    @Builder
    public UserEntity(String userName, String userEmail, String userPw, String mobileNumber, Long role,  Date createdAt, Date changedAt, Long score) {
        this.userName = userName;
        this.userEmail = userEmail;
        this.userPw = userPw;
        this.mobileNumber = mobileNumber;
        this.role = role;
        this.createdAt = createdAt;
        this.changedAt = changedAt;
        this.score = score;
    }
}
