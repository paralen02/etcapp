package pe.edu.upc.aaw.etcapi.serviceinterfaces;
import pe.edu.upc.aaw.etcapi.entities.Operaciones;
import java.util.List;

public interface IOperacionesService {
    void insert(Operaciones Operaciones);
    void delete(int id);
    Operaciones listId(int id);
    List<Operaciones> list();
}