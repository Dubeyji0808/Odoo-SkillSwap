package com.SkillSwap.user.models;
import  jakarta.persistence.*;

import java.sql.Timestamp;

@Entity
@Table(name = "users")
public class User {
    @Id
    private Integer id;

    private String username;
    private String email;
    private String password;

    @Transient
    private String confirmPassword; // Not stored in DB

    private Timestamp created_at;

    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL)
    private Profile profile;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private java.util.List<Skill> skills;
}
