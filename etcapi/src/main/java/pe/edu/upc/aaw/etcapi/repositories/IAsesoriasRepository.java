package pe.edu.upc.aaw.etcapi.repositories;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pe.edu.upc.aaw.etcapi.entities.*;
import java.util.List;

@Repository
public interface IAsesoriasRepository extends JpaRepository<Asesorias, Integer> { }
