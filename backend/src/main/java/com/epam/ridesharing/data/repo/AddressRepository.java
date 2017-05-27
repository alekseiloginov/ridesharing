package com.epam.ridesharing.data.repo;

import com.epam.ridesharing.data.model.Address;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Custom Spring Data repository for Address entity.
 */
@Transactional(readOnly = true) // override it for modifying methods
public interface AddressRepository extends PagingAndSortingRepository<Address, Long> {

    List<Address> findByType(@Param("type") Address.Type type);


    // OVERRIDEN METHODS //

    @Override
    @Transactional
    @PreAuthorize("hasRole('ADMIN')")
    <S extends Address> Iterable<S> save(Iterable<S> entities);

    @Override
    @Transactional
    @PreAuthorize("hasRole('ADMIN')")
    void delete(Long aLong);

    @Override
    @Transactional
    @PreAuthorize("hasRole('ADMIN')")
    void delete(Address entity);

    @Override
    @Transactional
    @PreAuthorize("hasRole('ADMIN')")
    void delete(Iterable<? extends Address> entities);

    @Override
    @Transactional
    @PreAuthorize("hasRole('ADMIN')")
    void deleteAll();
}
