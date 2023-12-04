package pe.edu.upc.aaw.etcapi.repositories;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import pe.edu.upc.aaw.etcapi.entities.*;
import java.util.List;

@Repository
public interface IMensajesRepository extends JpaRepository<Mensajes, Integer> {
    @Query(value = "SELECT * FROM mensajes WHERE chat_id = ?1", nativeQuery = true)
    List<Mensajes> findByChat(int idChat);
}
