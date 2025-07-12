package com.SkillSwap.Auth.Service;

import com.SkillSwap.Auth.Entity.UserPrincipal;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import javax.crypto.KeyGenerator;
import javax.crypto.SecretKey;
import java.security.NoSuchAlgorithmException;
import java.util.*;
import java.util.function.Function;

@Service
public class JWTService {

    private final String secretKey;

    // Constructor: Generates a secret key and encodes it
    public JWTService() {
        try {
            KeyGenerator keyGen = KeyGenerator.getInstance("HmacSHA256");
            SecretKey sk = keyGen.generateKey();
            secretKey = Base64.getEncoder().encodeToString(sk.getEncoded());
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException(e);
        }
    }

    public Map<String, String> generateTokens(UserPrincipal userPrincipal) {
        Map<String, String> tokens = new HashMap<>();
        tokens.put("accessToken", generateToken(userPrincipal, 1000 * 60 * 2));
        tokens.put("refreshToken", generateToken(userPrincipal, 1000L * 60 * 60 * 24 * 7));
        return tokens;
    }

    // Generate a single token with custom expiry
    private String generateToken(UserPrincipal userPrincipal, long expiryMillis) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("role", userPrincipal.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .findFirst()
                .orElse("ROLE_USER"));

        return Jwts.builder()
                .claims()
                .add(claims)
                .subject(userPrincipal.getUsername())
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() + expiryMillis))
                .and()
                .signWith(getKey())
                .compact();
    }

    // Re-issue access token using a valid refresh token
    public String refreshAccessToken(String refreshToken, UserDetails userDetails) {
        if (validateToken(refreshToken, userDetails)) {
            return generateToken((UserPrincipal) userDetails, 1000 * 60 * 30); // new access token for 30 minutes
        } else {
            throw new RuntimeException("Invalid or expired refresh token");
        }
    }

    // Extract username from token
    public String extractUserName(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    // General method to extract any claim
    private <T> T extractClaim(String token, Function<Claims, T> claimResolver) {
        final Claims claims = extractAllClaims(token);
        return claimResolver.apply(claims);
    }

    // Decode and extract all claims
    private Claims extractAllClaims(String token) {
        return Jwts.parser()
                .verifyWith(getKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

    // Validate token by username and expiry
    public boolean validateToken(String token, UserDetails userDetails) {
        final String username = extractUserName(token);
        return username.equals(userDetails.getUsername()) && !isTokenExpired(token);
    }

    // Check if token is expired
    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    // Extract expiration date
    private Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    // Decode secret key for signing/verifying
    private SecretKey getKey() {
        byte[] keyBytes = Decoders.BASE64.decode(secretKey);
        return Keys.hmacShaKeyFor(keyBytes);
    }
}
