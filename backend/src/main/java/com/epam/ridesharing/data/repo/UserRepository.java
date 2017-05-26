package com.epam.ridesharing.data.repo;

import com.epam.ridesharing.data.model.Address;
import com.epam.ridesharing.data.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.security.access.prepost.PreAuthorize;

import javax.annotation.security.RolesAllowed;
import java.util.List;
import java.util.Optional;

/**
 * Custom Spring Data repository for User entity.
 */
public interface UserRepository extends PagingAndSortingRepository<User, Long> {

    @Override
    @RolesAllowed("ADMIN")
    @EntityGraph(attributePaths = {"home", "office", "car"})
        // fetches relations in one query instead of n+1
    Page<User> findAll(Pageable pageable);

    @Override
    @PreAuthorize("(#user?.email == principal.username and hasRole('USER')) or hasRole('ADMIN')")
    User save(@Param("user") User user);

    @Override
    @PreAuthorize("hasRole('ADMIN')")
    <S extends User> Iterable<S> save(Iterable<S> entities);

    @Override
    @PreAuthorize("hasRole('ADMIN')")
    void delete(Long aLong);

    @Override
    @PreAuthorize("hasRole('ADMIN')")
    void delete(@Param("user") User user);

    @Override
    @PreAuthorize("hasRole('ADMIN')")
    void delete(Iterable<? extends User> entities);

    @Override
    @PreAuthorize("hasRole('ADMIN')")
    void deleteAll();

    Optional<User> findByEmailIgnoreCaseAndDisabledFalse(@Param("email") String email);

    List<User> findByDriver(@Param("driver") boolean driver);

    List<User> findByActive(@Param("active") boolean active);

    List<User> findByOfficeTypeAndOfficeAddress(@Param("type") Address.Type type, @Param("address") String address);

    @Query(value = "SELECT * FROM app_user WHERE id IN" +
            "(" +
            "	SELECT user_id" +
            "	FROM" +
            "	(" +
            "		SELECT *," +
            "		 6371 * 2 * ATAN2( SQRT( a ), SQRT( 1 - a ) ) AS distance" +
            "		FROM" +
            "		(" +
            "		 SELECT *," +
            "		  SIN(dLat / 2) * SIN(dLat / 2) + SIN(dLon / 2) * SIN(dLon / 2) * COS(lat1r) * COS(lat2r) AS a" +
            "		 FROM" +
            "		 (" +
            "		  SELECT *," +
            "		   RADIANS(lat2 - lat1) AS dLat," +
            "		   RADIANS(lon2 - lon1) AS dLon," +
            "		   RADIANS(lat1) AS lat1r," +
            "		   RADIANS(lat2) AS lat2r" +
            "		  FROM" +
            "		  (" +
            "		   SELECT * FROM" +
            "		   (" +
            "			SELECT u.id AS user_id," +
            "			 latitude as lat1," +
            "			 longitude as lon1" +
            "			FROM app_user u, ADDRESS a" +
            "			WHERE a.type = 'HOME' and a.id = u.home_id and u.id != ?#{ principal?.id } and u.office_id = ?2" +
            "		   ) as l1" +
            "		   JOIN" +
            "		   (" +
            "			SELECT longitude AS lon2," +
            "			 latitude AS lat2" +
            "			FROM app_user" +
            "			JOIN address a ON a.id = app_user.home_id" +
            "			WHERE app_user.id = ?#{ principal?.id }" +
            "		   ) as l2 ON lon1 != lon2 AND lat1 != lat2" +
            "		  ) as l" +
            "		 ) as ll" +
            "		) as lll" +
            "	) res" +
            "	WHERE res.distance < ?1" +
            ")",
            nativeQuery = true)
    List<User> findByDistanceFromHomeAndOffice(@Param("distanceKm") double distanceKm, @Param("officeId") long officeId);
}
