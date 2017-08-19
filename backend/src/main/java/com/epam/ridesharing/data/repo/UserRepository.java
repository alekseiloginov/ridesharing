package com.epam.ridesharing.data.repo;

import javax.annotation.security.RolesAllowed;
import java.util.List;
import java.util.Optional;

import com.epam.ridesharing.data.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RestResource;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.transaction.annotation.Transactional;

/**
 * Custom Spring Data repository for User entity.
 */
@Transactional(readOnly = true) // override it for modifying methods
public interface UserRepository extends PagingAndSortingRepository<User, Long> {

    @RestResource(exported = false)
    Optional<User> findByEmailIgnoreCaseAndDisabledFalse(@Param("email") String email);

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
            "			 latitude AS lat1," +
            "			 longitude AS lon1" +
            "			FROM app_user u, ADDRESS a" +
            "			WHERE a.id = u.home_id AND u.id != ?#{ principal?.id } AND u.office_id = :officeId" +
            "		   ) AS l1" +
            "		   JOIN" +
            "		   (" +
            "			SELECT longitude AS lon2," +
            "			 latitude AS lat2" +
            "			FROM app_user" +
            "			JOIN address a ON a.id = app_user.home_id" +
            "			WHERE app_user.id = ?#{ principal?.id }" +
            "		   ) AS l2 ON lon1 != lon2 AND lat1 != lat2" +
            "		  ) AS l" +
            "		 ) AS ll" +
            "		) AS lll" +
            "	) res" +
            "	WHERE res.distance < :distanceKm" +
            "   ORDER BY res.distance" +
            ")",
            nativeQuery = true)
    List<User> findByDistanceFromHomeAndOffice(@Param("distanceKm") double distanceKm, @Param("officeId") long officeId);

    @Transactional
    @RestResource(exported = false)
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    @Modifying
    @Query("update User u set u.telegramId = :chatId where u.id = :userId")
    void saveTelegramId(@Param("userId") Long userId, @Param("chatId") String chatId);


    // OVERRIDEN METHODS //

    @Override
    @RolesAllowed("ADMIN")
    // fetches relations in one query instead of n+1
    @EntityGraph(attributePaths = {"home", "office"})
    Page<User> findAll(Pageable pageable);

    @Override
    @Transactional
    @PreAuthorize("(#user?.email == principal.username and hasRole('USER')) or hasRole('ADMIN')")
    <U extends User> U save(@Param("user") U user);

    @Override
    @Transactional
    @PreAuthorize("hasRole('ADMIN')")
    <U extends User> Iterable<U> save(Iterable<U> users);

    @Override
    @Transactional
    @PreAuthorize("hasRole('ADMIN')")
    void delete(Long id);

    @Override
    @Transactional
    @PreAuthorize("hasRole('ADMIN')")
    void delete(@Param("user") User user);

    @Override
    @Transactional
    @PreAuthorize("hasRole('ADMIN')")
    void delete(Iterable<? extends User> users);

    @Override
    @Transactional
    @PreAuthorize("hasRole('ADMIN')")
    void deleteAll();
}
