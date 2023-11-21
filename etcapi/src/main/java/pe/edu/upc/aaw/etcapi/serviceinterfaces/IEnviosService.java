package pe.edu.upc.aaw.etcapi.serviceinterfaces;
import pe.edu.upc.aaw.etcapi.entities.Envios;
import java.util.List;

public interface IEnviosService {
    void insert(Envios Envios);
    void delete(int id);
    Envios listId(int id);
    List<Envios> list();
}