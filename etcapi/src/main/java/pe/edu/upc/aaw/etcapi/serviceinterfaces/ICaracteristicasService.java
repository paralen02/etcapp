package pe.edu.upc.aaw.etcapi.serviceinterfaces;
import pe.edu.upc.aaw.etcapi.entities.Caracteristicas;
import java.util.List;

public interface ICaracteristicasService {
    void insert(Caracteristicas Caracteristicas);
    void delete(int id);
    Caracteristicas listId(int id);
    List<Caracteristicas> list();
}