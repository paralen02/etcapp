package pe.edu.upc.aaw.etcapi.repositories;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import pe.edu.upc.aaw.etcapi.entities.*;
import java.util.List;

@Repository
public interface IChatsRepository extends JpaRepository<Chats, Integer> {
    @Query(value = "SELECT * FROM chats WHERE comprador_id = :idComprador AND vendedor_id = :idVendedor", nativeQuery = true)
    Chats findByCompradorAndVendedor(@Param("idComprador") int idComprador, @Param("idVendedor") int idVendedor);

    @Query(value = "SELECT * FROM chats WHERE comprador_id = ?1", nativeQuery = true)
    List<Chats> findByComprador(int idComprador);
}
