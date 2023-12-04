package pe.edu.upc.aaw.etcapi.repositories;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import pe.edu.upc.aaw.etcapi.entities.*;
import java.util.List;

@Repository
public interface IProductosRepository extends JpaRepository<Productos, Integer> {
    @Query(value = "SELECT p.id_productos, c.meses_uso FROM productos p JOIN caracteristicas c ON p.id_productos = c.id_caracteristicas", nativeQuery = true)
    public List<Object[]> getMesesUso();

    @Query(value = "SELECT v.distrito, COUNT(*) as total_ventas " +
            "FROM compras as co " +
            "INNER JOIN publicaciones as pu ON co.publicacion_id = pu.id_publicaciones " +
            "INNER JOIN productos as pr ON pu.producto_id = pr.id_productos " +
            "INNER JOIN vendedores as v ON pr.vendedor_id = v.id_vendedores " +
            "GROUP BY v.distrito " +
            "ORDER BY total_ventas DESC " +
            "LIMIT 3", nativeQuery = true)
    List<Object[]> getTopDistritos();

    @Query(value = "SELECT p.id_productos, c.material, p.precio, ca.tipo, pu.fecha " +
            "FROM publicaciones as pu " +
            "INNER JOIN productos as p ON pu.producto_id = p.id_productos " +
            "INNER JOIN caracteristicas as c ON p.caracteristica_id = c.id_caracteristicas " +
            "INNER JOIN categorias as ca ON p.categoria_id = ca.id_categorias " +
            "WHERE ca.tipo = :categoria " +
            "AND c.material = :material " +
            "AND pu.fecha >= CURRENT_DATE - INTERVAL '3 months'", nativeQuery = true)
    List<Object[]> getPricesByCategoryAndMaterial(@Param("categoria") String categoria, @Param("material") String material);
}
