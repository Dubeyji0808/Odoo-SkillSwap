package com.SkillSwap.Auth.Service;

import com.SkillSwap.Auth.Entity.AdminInfo;
import com.SkillSwap.Auth.Entity.UserInfo;
import com.SkillSwap.Auth.Entity.UserPrincipal;
import com.SkillSwap.Auth.Repository.AdminRepo;
import com.SkillSwap.Auth.Repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class MyUserDetailService  implements UserDetailsService {

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private AdminRepo adminRepo;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        UserInfo userInfo = userRepo.findByUsername(username);
        if(userInfo!=null){
            return new UserPrincipal(userInfo);
        }
        AdminInfo adminInfo = adminRepo.findByUsername(username);
        if (adminInfo != null) {
            return new UserPrincipal(adminInfo);
        }
        throw new RuntimeException("No Username found");
    }

}
