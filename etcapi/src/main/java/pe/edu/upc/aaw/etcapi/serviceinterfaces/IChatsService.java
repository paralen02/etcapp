package pe.edu.upc.aaw.etcapi.serviceinterfaces;
import pe.edu.upc.aaw.etcapi.entities.Chats;
import java.util.List;

public interface IChatsService {
    void insert(Chats Chats);
    void delete(int id);
    Chats listId(int id);
    List<Chats> list();
    Chats findByCompradorAndVendedor(int idComprador, int idVendedor);
    List<Chats> findByComprador(int idComprador);

}