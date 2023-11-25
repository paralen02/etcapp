package pe.edu.upc.aaw.etcapi.serviceinterfaces;
import pe.edu.upc.aaw.etcapi.entities.Publicaciones;
import java.util.List;

public interface IPublicacionesService {
    void insert(Publicaciones Publicaciones);
    void delete(int id);
    Publicaciones listId(int id);
    List<Publicaciones> list();
    List<Publicaciones> listIds(List<Integer> ids);
}