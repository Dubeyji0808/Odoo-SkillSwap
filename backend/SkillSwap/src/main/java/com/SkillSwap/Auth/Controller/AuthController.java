package com.SkillSwap.Auth.Controller;

import com.SkillSwap.Auth.DTO.AuthRequest;
import com.SkillSwap.Auth.DTO.RefreshRequest;
import com.SkillSwap.Auth.Entity.AdminInfo;
import com.SkillSwap.Auth.Entity.UserInfo;
import com.SkillSwap.Auth.Repository.UserRepo;
import com.SkillSwap.Auth.Service.AdminService;
import com.SkillSwap.Auth.Service.JWTService;
import com.SkillSwap.Auth.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private UserService userService;


    @Autowired
    private AdminService adminService;
    @Autowired
    private UserRepo userRepo;

    @Autowired
    private JWTService jwtService;

    @Autowired
    private UserDetailsService userDetailsService;

    @PostMapping("/register/user")
    public ResponseEntity<?> registerUser(@RequestBody UserInfo user) {
        try {
            user = userService.registerUser(user);
            return new ResponseEntity<>(user, HttpStatus.OK);
        } catch (Exception e) {
            throw new RuntimeException(e.getMessage());
        }
    }


    @PostMapping("/register/admin")
    public ResponseEntity<?> register(@RequestBody AdminInfo adminInfo) {
        try {
            adminInfo = adminService.registerAdmin(adminInfo);
            return new ResponseEntity<>(adminInfo, HttpStatus.OK);
        } catch (Exception e) {
            throw new RuntimeException(e.getMessage());
        }
    }

    @PostMapping("/login/user")
    public Map<String, String> loginUser(@RequestBody AuthRequest request) {
        try {
            return userService.login(request);
        } catch (Exception e) {
            throw new RuntimeException(e.getMessage());
        }
    }


    @PostMapping("/login/admin")
    public Map<String, String> login(@RequestBody AuthRequest request) {
        try {
            return adminService.login(request);
        } catch (Exception e) {
            throw new RuntimeException(e.getMessage());
        }
    }

    @PostMapping("/refresh")
    public ResponseEntity<Map<String, String>> refresh(@RequestBody RefreshRequest request) {
        try {
            String username = jwtService.extractUserName(request.getRefreshToken());
            var userDetails = userDetailsService.loadUserByUsername(username);
            String newAccessToken = jwtService.refreshAccessToken(request.getRefreshToken(), userDetails);

            return ResponseEntity.ok(Map.of(
                    "accessToken", newAccessToken,
                    "refreshToken", request.getRefreshToken()
            ));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "Invalid refresh token"));
        }
    }
}
