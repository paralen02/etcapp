package pe.edu.upc.aaw.etcapi.repositories;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pe.edu.upc.aaw.etcapi.entities.Role;
import java.util.List;

@Repository
public interface IRoleRepository extends JpaRepository<Role, Long> { }