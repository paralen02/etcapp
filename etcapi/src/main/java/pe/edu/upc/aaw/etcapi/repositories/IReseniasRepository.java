package pe.edu.upc.aaw.etcapi.repositories;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import pe.edu.upc.aaw.etcapi.entities.*;
import java.util.List;

@Repository
public interface IReseniasRepository extends JpaRepository<Resenias, Integer> {
    Resenias findByCompra_IdCompras(int idCompra);
    @Query(value = "SELECT re.* FROM resenias re INNER JOIN compras co ON re.compra_id = co.id_compras INNER JOIN publicaciones pu ON co.publicacion_id = pu.id_publicaciones INNER JOIN productos pr ON pu.producto_id = pr.id_productos INNER JOIN vendedores ve ON pr.vendedor_id = ve.id_vendedores WHERE ve.id_vendedores = :idVendedor", nativeQuery = true)
    List<Resenias> findByVendedor_IdVendedores(@Param("idVendedor") int idVendedor);
}
