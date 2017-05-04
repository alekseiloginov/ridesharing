package com.epam.ridesharing.data.repo;

import com.epam.ridesharing.data.model.Address;
import com.epam.ridesharing.data.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

/**
 * Custom Spring Data repository for User entity.
 */
public interface UserRepository extends PagingAndSortingRepository<User, Long> {

    @Override
    @EntityGraph(attributePaths = {"home", "office", "car"})
        // fetches relations in one query instead of n+1
    Page<User> findAll(Pageable pageable);

    List<User> findByEmail(@Param("email") String email);

    List<User> findByDriver(@Param("driver") boolean driver);

    List<User> findByActive(@Param("active") boolean active);

    List<User> findByOfficeTypeAndOfficeAddress(@Param("type") Address.Type type, @Param("address") String address);
}