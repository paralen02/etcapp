package pe.edu.upc.aaw.etcapi.serviceinterfaces;
import pe.edu.upc.aaw.etcapi.entities.Servicios;
import java.util.List;

public interface IServiciosService {
    void insert(Servicios Servicios);
    void delete(int id);
    Servicios listId(int id);
    List<Servicios> list();
}