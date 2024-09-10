package com.scm.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.scm.model.AppRole;
import com.scm.model.Role;

public interface RoleRepo extends JpaRepository<Role,Long>{
        Optional<Role> findByRoleName(AppRole appRole);

}
