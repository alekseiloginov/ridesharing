package com.epam.ridesharing.data.repo;

import com.epam.ridesharing.data.model.Address;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.security.access.prepost.PreAuthorize;

import java.util.List;

/**
 * Custom Spring Data repository for Address entity.
 */
public interface AddressRepository extends PagingAndSortingRepository<Address, Long> {

    List<Address> findByType(@Param("type") Address.Type type);

    @Override
    @PreAuthorize("hasRole('ADMIN')")
    <S extends Address> Iterable<S> save(Iterable<S> entities);

    @Override
    @PreAuthorize("hasRole('ADMIN')")
    void delete(Long aLong);

    @Override
    @PreAuthorize("hasRole('ADMIN')")
    void delete(Address entity);

    @Override
    @PreAuthorize("hasRole('ADMIN')")
    void delete(Iterable<? extends Address> entities);

    @Override
    @PreAuthorize("hasRole('ADMIN')")
    void deleteAll();
}
