package pe.edu.upc.aaw.etcapi.serviceinterfaces;
import pe.edu.upc.aaw.etcapi.entities.Mensajes;
import java.util.List;

public interface IMensajesService {
    void insert(Mensajes Mensajes);
    void delete(int id);
    Mensajes listId(int id);
    List<Mensajes> list();
}