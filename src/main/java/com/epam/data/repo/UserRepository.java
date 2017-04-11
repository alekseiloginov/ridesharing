package com.epam.data.repo;

import com.epam.data.model.Address;
import com.epam.data.model.User;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

/**
 * Custom Spring Data repository for User entity.
 */
public interface UserRepository extends PagingAndSortingRepository<User, String> {

    List<User> findByEmail(@Param("email") String email);

    List<User> findByDriver(@Param("driver") boolean driver);

    List<User> findByActive(@Param("active") boolean active);

    List<User> findByOfficeTypeAndOfficeAddress(@Param("type") Address.Type type, @Param("address") String address);
}
