package com.sky.MyShop.config;


import com.sky.MyShop.entity.ERole;
import com.sky.MyShop.entity.Role;
import com.sky.MyShop.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

/**
 * This component runs on application startup and initializes the database
 * with essential data, such as user roles. This prevents "Role not found"
 * errors during user registration.
 */
@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private RoleRepository roleRepository;

    @Override
    public void run(String... args) throws Exception {
        // Check if roles are already in the database. If not, create them.
        if (roleRepository.findByName(ERole.ROLE_USER).isEmpty()) {
            roleRepository.save(createRole(ERole.ROLE_USER));
        }
        if (roleRepository.findByName(ERole.ROLE_MODERATOR).isEmpty()) {
            roleRepository.save(createRole(ERole.ROLE_MODERATOR));
        }
        if (roleRepository.findByName(ERole.ROLE_ADMIN).isEmpty()) {
            roleRepository.save(createRole(ERole.ROLE_ADMIN));
        }
    }

    private Role createRole(ERole roleName) {
        Role role = new Role();
        role.setName(roleName);
        return role;
    }
}
