package pe.edu.upc.aaw.etcapi.serviceinterfaces;
import pe.edu.upc.aaw.etcapi.entities.Productos;
import java.util.List;

public interface IProductosService {
    void insert(Productos Productos);
    void delete(int id);
    Productos listId(int id);
    List<Productos> list();
}