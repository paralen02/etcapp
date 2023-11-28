package pe.edu.upc.aaw.etcapi.repositories;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pe.edu.upc.aaw.etcapi.entities.*;
import java.util.List;

@Repository
public interface IFavoritosRepository extends JpaRepository<Favoritos, Integer> {
    boolean existsByCompradorIdCompradoresAndPublicacionIdPublicaciones(int idCompradores, int idPublicaciones);
    Favoritos findByCompradorIdCompradoresAndPublicacionIdPublicaciones(int idCompradores, int idPublicaciones);
}
