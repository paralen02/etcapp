package pe.edu.upc.aaw.etcapi.serviceinterfaces;
import pe.edu.upc.aaw.etcapi.entities.Repartidores;
import java.util.List;

public interface IRepartidoresService {
    void insert(Repartidores Repartidores);
    void delete(int id);
    Repartidores listId(int id);
    List<Repartidores> list();
}