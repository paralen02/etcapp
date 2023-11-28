package pe.edu.upc.aaw.etcapi.repositories;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import pe.edu.upc.aaw.etcapi.entities.*;
import java.util.List;

@Repository
public interface IVendedoresRepository extends JpaRepository<Vendedores, Integer> {
    @Query(value = "SELECT v.* FROM vendedores v\n" +
            "JOIN users u ON v.user_id = u.id\n" +
            "WHERE u.username = :username", nativeQuery= true)
    Vendedores findByUsername(@Param("username") String username);
}
