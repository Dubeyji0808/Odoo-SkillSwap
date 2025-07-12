package com.SkillSwap.Auth.Repository;

import com.SkillSwap.Auth.Entity.AdminInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AdminRepo extends JpaRepository<AdminInfo, Integer> {
    AdminInfo findByUsername(String username);
    boolean existsByUsername(String username);
}
