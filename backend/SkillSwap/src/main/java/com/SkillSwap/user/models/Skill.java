package com.SkillSwap.user.models;

import jakarta.persistence.*;

@Entity
@Table(name = "skill")
public class Skill {
    @Id
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private com.SkillSwap.models.User user;

    private String skills;

    // Getters and Setters
}