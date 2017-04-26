package com.epam.ridesharing.data.repo;

import com.epam.ridesharing.data.model.Address;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

/**
 * Custom Spring Data repository for Address entity.
 */
public interface AddressRepository extends PagingAndSortingRepository<Address, Long> {

    List<Address> findByType(@Param("type") Address.Type type);
}
