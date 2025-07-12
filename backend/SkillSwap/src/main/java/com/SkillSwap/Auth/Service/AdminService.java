package com.SkillSwap.Auth.Service;

import com.SkillSwap.Auth.DTO.AuthRequest;
import com.SkillSwap.Auth.Entity.AdminInfo;
import com.SkillSwap.Auth.Entity.UserPrincipal;
import com.SkillSwap.Auth.Repository.AdminRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class AdminService {

    @Autowired
    private final AuthenticationManager authManager;

    @Autowired
    private final JWTService jwtService;

    @Autowired
    private final PasswordEncoder passwordEncoder;

    @Autowired
    private final AdminRepo adminRepo;

    public AdminService(AuthenticationManager authManager, JWTService jwtService,
                        PasswordEncoder passwordEncoder, AdminRepo adminRepo) {
        this.authManager = authManager;
        this.jwtService = jwtService;
        this.passwordEncoder = passwordEncoder;
        this.adminRepo = adminRepo;
    }

    public AdminInfo registerAdmin(AdminInfo admin) {
        if (adminRepo.existsByUsername(admin.getUsername())) {
            throw new RuntimeException("Admin already exists");
        }
        admin.setPassword(passwordEncoder.encode(admin.getPassword()));
        return adminRepo.save(admin);
    }

    public Map<String, String> login(AuthRequest request) {
        AdminInfo admin = adminRepo.findByUsername(request.getUserName());
        if (admin == null) {
            throw new RuntimeException("Admin does not exist");
        }

        Authentication authentication = authManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getUserName(), request.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);

        if (authentication.isAuthenticated()) {
            UserPrincipal principal = new UserPrincipal(admin);
            return jwtService.generateTokens(principal);
        }

        throw new RuntimeException("Authentication failed");
    }

    public List<AdminInfo> getAllAdmins() {
        return adminRepo.findAll();
    }

    public AdminInfo findAdminByUsername(String username) {
        return adminRepo.findByUsername(username);
    }

    public AdminInfo findAdminById(int id) {
        return adminRepo.findById(id).orElse(null);
    }
}
