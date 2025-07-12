package com.SkillSwap.Auth.Repository;

import com.SkillSwap.Auth.Entity.UserInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepo extends JpaRepository<UserInfo,Long> {
    UserInfo findByUsername(String username);
    boolean existsByUsername(String username);

    @Query("SELECT u.username FROM UserInfo u WHERE u.id = :id")
    String findUsernameById(long id);
}
