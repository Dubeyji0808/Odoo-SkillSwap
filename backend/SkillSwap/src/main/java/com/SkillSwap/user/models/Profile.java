package com.SkillSwap.user.models;
import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "profile")
public class Profile {
    @Id
    private Integer id;

    private String username;
    private String email;
    private String skillsoffered;
    private String skillswanted;

    private LocalDateTime availability;
    private LocalDateTime yearofexperience;

    private String contacts;

    @Column(columnDefinition = "TEXT")
    private String profile_security;

    @OneToOne
    @JoinColumn(name = "id", referencedColumnName = "id")
    private com.SkillSwap.models.User user;

    @ManyToMany
    @JoinTable(
            name = "profile_skills",
            joinColumns = @JoinColumn(name = "profile_id"),
            inverseJoinColumns = @JoinColumn(name = "skills_user_id")
    )
    private java.util.Set<Skill> profileSkills;

    // Getters and Setters
}
