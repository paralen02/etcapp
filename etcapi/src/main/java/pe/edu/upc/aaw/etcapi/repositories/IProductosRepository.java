package pe.edu.upc.aaw.etcapi.repositories;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import pe.edu.upc.aaw.etcapi.entities.*;
import java.util.List;

@Repository
public interface IProductosRepository extends JpaRepository<Productos, Integer> {
    @Query(value = "SELECT p.id_productos, c.meses_uso FROM productos p JOIN caracteristicas c ON p.id_productos = c.id_caracteristicas", nativeQuery = true)
    public List<Object[]> getMesesUso();
}
