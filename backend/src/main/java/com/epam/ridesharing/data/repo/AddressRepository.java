package com.epam.ridesharing.data.repo;

import com.epam.ridesharing.data.model.Address;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.transaction.annotation.Transactional;

/**
 * Custom Spring Data repository for Address entity.
 */
@Transactional(readOnly = true) // override it for modifying methods
public interface AddressRepository extends PagingAndSortingRepository<Address, Long> {

    Page<Address> findByType(@Param("type") Address.Type type, Pageable pageable);


    // OVERRIDEN METHODS //

    @Override
    @Transactional
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    <A extends Address> A save(@Param("address") A address);

    @Override
    @Transactional
    @PreAuthorize("hasRole('ADMIN')")
    <A extends Address> Iterable<A> save(Iterable<A> addresses);

    @Override
    @Transactional
    @PreAuthorize("hasRole('ADMIN')")
    void delete(Long id);

    @Override
    @Transactional
    @PreAuthorize("hasRole('ADMIN')")
    void delete(Address address);

    @Override
    @Transactional
    @PreAuthorize("hasRole('ADMIN')")
    void delete(Iterable<? extends Address> addresses);

    @Override
    @Transactional
    @PreAuthorize("hasRole('ADMIN')")
    void deleteAll();
}
