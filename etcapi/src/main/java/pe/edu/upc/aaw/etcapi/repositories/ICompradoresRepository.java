package pe.edu.upc.aaw.etcapi.repositories;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import pe.edu.upc.aaw.etcapi.entities.*;
import java.util.List;

@Repository
public interface ICompradoresRepository extends JpaRepository<Compradores, Integer> {
    @Query(value = "SELECT c.* FROM compradores c\n" +
            "JOIN users u ON c.user_id = u.id\n" +
            "WHERE u.username = :username", nativeQuery= true)
    Compradores findByUsername(@Param("username") String username);
}
